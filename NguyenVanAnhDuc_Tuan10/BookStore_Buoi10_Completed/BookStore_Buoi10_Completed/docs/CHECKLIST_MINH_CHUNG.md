# Hướng dẫn chụp minh chứng — Buổi 10

Theo đề, mỗi bài bắt buộc phải có 1 ảnh, tổng cộng **10 ảnh**. Khi chụp, mở Snack để nhìn thấy **code + preview + đồng hồ hệ thống**. Bài Bonus có hai ảnh riêng nếu bạn quyết định nộp.

| File ảnh | Kịch bản kiểm tra / nội dung ảnh |
|---|---|
| `10.1.png` | Home có `📚 BookStore`, mở App.tsx có `SafeAreaProvider` |
| `10.2.png` | Home hiện danh sách từ `FlatList`, có 10 cuốn và ✅/❌; mở code HomeScreen |
| `10.3.png` | Home ở layout row thấy BookCard ảnh/giá/rating, mở code BookCard có `React.memo` |
| `10.4.png` | Bật Switch `Dạng lưới`, thấy ảnh dọc và rating badge trên ảnh; mở BookCard có `isTile` |
| `10.5.png` | Bật Switch, Home có **2 cột**, mở HomeScreen thấy `numColumns`, `key`, `RefreshControl` |
| `10.6.png` | Nhập `nha gia` để tìm `Nhà Giả Kim`; hoặc kết hợp chip `Văn học` |
| `10.7.png` | Nhấn vào sách `Clean Code`, đến màn `Chi tiết sách`; mở navigation.tsx |
| `10.8.png` | Giỏ hàng rỗng và code App.tsx có `Provider`, store/cartSlice có reducer + selectors |
| `10.9.png` | Thêm ít nhất hai sách vào giỏ, thấy nút −/+, badge tab và tổng tiền |
| `10.10.png` | Đánh dấu yêu thích ít nhất hai sách, sang tab `Yêu thích` thấy đúng hai cuốn |
| `10.11a.png` | **Bonus**: `USE_API = true`, tắt server, thấy lỗi API + nút `Thử lại` + `Dùng dữ liệu mảng` |
| `10.11b.png` | **Bonus**: bật json-server, nhấn `Thử lại`, hiện dữ liệu từ API |

## Thử nhanh logic

1. `nha gia` tìm được `Nhà Giả Kim` (không cần dấu).
2. Chọn `Lập trình` chỉ hiện sách thuộc thể loại đó.
3. Bật/tắt lưới liên tục: FlatList không báo `Changing numColumns on the fly is not supported`.
4. Thêm `Clean Code` hai lần, giỏ có một dòng số lượng 2; tổng tiền `778.000 đ`.
5. Giảm số lượng của một sách từ 1 về 0: dòng đó bị xóa; khi giỏ trống badge biến mất.
6. Thử `React Native in Action` (hết hàng): nút Thêm vào giỏ bị vô hiệu hóa.
7. Yêu thích `Nhà Giả Kim`, vào tab Yêu thích kiểm tra; nhấn bỏ thích và thấy sách biến mất.
8. Từ tab Yêu thích bấm vào sách, xem đúng màn Chi tiết.
9. Thử thao tác `RefreshControl` trên Expo Go/preview iOS hoặc Android, vì web thường không hỗ trợ cử chỉ kéo để làm mới.

> Ảnh minh chứng chưa được tạo sẵn, vì đề yêu cầu ảnh chụp *kết quả chạy thật* trong Snack kèm khung code và đồng hồ của bạn.
