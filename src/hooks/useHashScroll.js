import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router không tự cuộn tới anchor; cuộn sau khi nội dung của route đã render.
export default function useHashScroll(ready = true) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!ready) return undefined;

    const frame = requestAnimationFrame(() => {
      const target = hash
        ? document.getElementById(decodeURIComponent(hash.slice(1)))
        : null;

      if (target) {
        target.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, ready]);
}
