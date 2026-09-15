// Ngôi sao 4 cánh tâm (x, y), bán kính r; waist càng nhỏ cánh càng mảnh.
export const sparklePath = (x, y, r, waist = 0.22) => {
  const k = r * waist;
  return `M${x} ${y - r}L${x + k} ${y - k}L${x + r} ${y}L${x + k} ${y + k}L${x} ${y + r}L${x - k} ${y + k}L${x - r} ${y}L${x - k} ${y - k}Z`;
};
