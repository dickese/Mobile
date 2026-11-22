// Hiển thị giá tiền theo định dạng Việt Nam, ví dụ 389000 -> "389.000 đ".
export const formatPrice = (n: number): string =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";

// Bỏ dấu tiếng Việt để "nha gia" tìm được "Nhà Giả Kim".
export const normalize = (s: string): string =>
  s.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
