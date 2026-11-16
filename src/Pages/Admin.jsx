import { useCallback, useEffect, useMemo, useState } from "react";
import { FiLogOut, FiRefreshCw, FiSearch } from "react-icons/fi";
import {
  SUPABASE_TABLE,
  getSupabaseClient,
  isSupabaseConfigured,
} from "../service/supabaseClient";

const PAGE_SIZE = 200;

const formatDateTime = (value) => {
  const date = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatBirthDate = (iso) => {
  const [year, month, day] = String(iso).split("-");
  return `${day}/${month}/${year}`;
};

function Admin() {
  const client = getSupabaseClient();
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!client) {
      setCheckingSession(false);
      return undefined;
    }
    client.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, [client]);

  const loadRows = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    setLoadError("");
    const { data, error, count } = await client
      .from(SUPABASE_TABLE)
      .select("id, full_name, birth_date, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE);

    if (error) setLoadError(error.message);
    else {
      setRows(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [client]);

  useEffect(() => {
    if (session) loadRows();
  }, [session, loadRows]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoginError("");
    setSigningIn(true);
    const { error } = await client.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setLoginError(
        /invalid login/i.test(error.message)
          ? "Email hoặc mật khẩu không đúng."
          : error.message
      );
    } else {
      setPassword("");
    }
    setSigningIn(false);
  };

  const visibleRows = useMemo(() => {
    const needle = keyword.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (row) =>
        row.full_name.toLowerCase().includes(needle) ||
        formatBirthDate(row.birth_date).includes(needle)
    );
  }, [rows, keyword]);

  if (!isSupabaseConfigured()) {
    return (
      <section className="admin-page">
        <div className="admin-card">
          <h1>Trang quản trị</h1>
          <p className="admin-note">
            Chưa cấu hình Supabase. Cần đặt VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY rồi chạy lại.
          </p>
        </div>
      </section>
    );
  }

  if (checkingSession) {
    return (
      <section className="admin-page">
        <p className="admin-note">Đang kiểm tra đăng nhập…</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="admin-page">
        <form className="admin-card" onSubmit={handleSignIn} noValidate>
          <span className="eyebrow">Khu vực quản trị</span>
          <h1>Đăng nhập</h1>
          <p className="admin-note">Chỉ tài khoản quản trị mới xem được lịch sử tra cứu.</p>

          <div className="field">
            <label htmlFor="admin-email">Email</label>
            <div className="field-control">
              <input
                id="admin-email"
                className="field-input"
                type="email"
                value={email}
                autoComplete="username"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="admin-password">Mật khẩu</label>
            <div className="field-control">
              <input
                id="admin-password"
                className="field-input"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          {loginError && (
            <p className="form-alert" role="alert">
              {loginError}
            </p>
          )}

          <button type="submit" className="primary-button" disabled={signingIn}>
            {signingIn ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="admin-page is-wide">
      <header className="admin-header">
        <div>
          <span className="eyebrow">Khu vực quản trị</span>
          <h1>Lịch sử tra cứu</h1>
          <p className="admin-note">
            Đang đăng nhập: {session.user.email} · Tổng cộng {total} người
            {total > PAGE_SIZE ? ` (hiển thị ${PAGE_SIZE} lượt mới nhất)` : ""}
          </p>
        </div>
        <div className="admin-actions">
          <button type="button" className="ghost-button" onClick={loadRows} disabled={loading}>
            <FiRefreshCw aria-hidden="true" /> {loading ? "Đang tải…" : "Tải lại"}
          </button>
          <button type="button" className="ghost-button" onClick={() => client.auth.signOut()}>
            <FiLogOut aria-hidden="true" /> Đăng xuất
          </button>
        </div>
      </header>

      <div className="field admin-search">
        <div className="field-control">
          <FiSearch className="input-icon" aria-hidden="true" />
          <input
            className="field-input"
            type="search"
            value={keyword}
            placeholder="Tìm theo họ tên hoặc ngày sinh"
            onChange={(event) => setKeyword(event.target.value)}
            aria-label="Tìm theo họ tên hoặc ngày sinh"
          />
        </div>
      </div>

      {loadError && (
        <p className="form-alert" role="alert">
          Không đọc được dữ liệu: {loadError}
        </p>
      )}

      {!loadError && visibleRows.length === 0 && (
        <p className="admin-note">{loading ? "Đang tải…" : "Chưa có lượt tra cứu nào."}</p>
      )}

      {visibleRows.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Lưu lúc</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.full_name}</td>
                  <td>{formatBirthDate(row.birth_date)}</td>
                  <td>{formatDateTime(row.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Admin;
