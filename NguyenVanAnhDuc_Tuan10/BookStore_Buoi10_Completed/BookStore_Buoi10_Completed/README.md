# BookStore — Thực hành React Native Buổi 10 (đã hoàn thành)

Project Expo + TypeScript được hoàn thiện từ bộ Starter do bạn cung cấp, theo tài liệu **Buổi 10: BookStore với React Navigation và Redux Toolkit**. Hoàn thành **Bài 10.1–10.10** và bổ sung logic của **Bài 10.11 (Bonus)**, với `USE_API = false` mặc định để ứng dụng chạy trực tiếp không cần máy chủ.

## 1. Chạy trên Expo Snack (ưu tiên theo đề)

1. Vào **https://snack.expo.dev/**, tạo một Snack mới dùng TypeScript.
2. Tạo file `App.tsx` rồi **xóa `App.js` mặc định** nếu Snack đã tạo sẵn.
3. Tạo lần lượt các file đúng đường dẫn trong cấu trúc bên dưới, và dán nội dung từ các file tương ứng. Có thể dùng tài liệu **`ALL_IN_ONE_COMPLETED.md`** (tất cả file gộp một chỗ) để sao chép nhanh.
4. Trong tab **Dependencies**, thêm 7 gói:
   - `react-native-safe-area-context`
   - `react-native-screens`
   - `@react-navigation/native`
   - `@react-navigation/native-stack`
   - `@react-navigation/bottom-tabs`
   - `@reduxjs/toolkit`
   - `react-redux`
5. Xem màn hình ở tab **Web / Preview**, hoặc dùng Expo Go và QR Code. Chọn SDK tương thích với dependencies do Snack đề xuất; phiên bản gói trong project local có thể cần điều chỉnh theo SDK Snack.
6. **Không dán `db.json`, `package.json`, `tsconfig.json`, `README.md`, `docs/`** vào Snack; `db.json` chỉ dành cho phần Bonus khi chạy máy chủ bên ngoài.
7. Đăng nhập và chọn **Save / Share** để lưu đường dẫn Snack trên tài khoản của bạn.

> **Lưu ý:** Đây là mã nguồn hoàn chỉnh để bạn import thủ công. Chưa có đường dẫn Snack đã được lưu trên tài khoản cá nhân của bạn. File `.zip` không phải cơ chế nhập nguyên project được tài liệu buổi học yêu cầu; đề hướng dẫn tạo từng file.

## 2. Chạy project bằng Expo CLI (trên máy tính)

Yêu cầu Node.js, npm. Thực thi trong thư mục project:

```bash
npm install
npx expo start
```

- Nhấn `w` để chạy web; hoặc quét mã QR bằng Expo Go nếu SDK tương thích với Expo Go trên thiết bị.
- Có thể chạy `npm run typecheck` sau khi cài dependencies.
- Cấu hình Expo SDK và các phiên bản gói trong `package.json` làm mốc cho project local; bạn có thể chạy `npx expo install --fix` nếu Expo báo gói không tương thích.

## 3. Cấu trúc project

```text
BookStore_Buoi10_Completed/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── theme.ts
├── types.ts
├── utils.ts
├── config.ts
├── navigation.tsx
├── data/
│   └── books.ts
├── components/
│   └── BookCard.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── DetailScreen.tsx
│   ├── CartScreen.tsx
│   └── FavoritesScreen.tsx
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   ├── cartSlice.ts
│   ├── favoritesSlice.ts
│   └── booksSlice.ts
├── db.json
├── ALL_IN_ONE_COMPLETED.md
└── docs/
    ├── CHECKLIST_MINH_CHUNG.md
    └── CAU_HOI_BO_SUNG.md
```

## 4. Đã triển khai

| Bài | Hạng mục | Trạng thái |
| --- | --- | --- |
| 10.1 | SafeAreaProvider, SafeAreaView, header `📚 BookStore` | ✅ |
| 10.2 | FlatList 10 sách, keyExtractor, ActivityIndicator | ✅ |
| 10.3 | BookCard có props typed, memo, ảnh/giá/rating/trạng thái | ✅ |
| 10.4 | Cùng BookCard hỗ trợ layout row/tile | ✅ |
| 10.5 | Switch lưới 1/2 cột và RefreshControl | ✅ |
| 10.6 | Tìm kiếm không dấu + filter thể loại, kết hợp điều kiện | ✅ |
| 10.7 | Native Stack + Bottom Tabs + Detail params | ✅ |
| 10.8 | Redux Provider + cart slice + selectors | ✅ |
| 10.9 | Thêm, tăng, giảm, xóa giỏ, tổng tiền và tab badge | ✅ |
| 10.10 | Lưu ID yêu thích, toggle và lọc tab Yêu thích | ✅ |
| 10.11 | createAsyncThunk, xử lý lỗi/loading/success, fallback mảng | ✅ (Bonus) |

## 5. Bài 10.11 (Bonus: json-server)

Mặc định `config.ts` có `USE_API = false`; vì thế các bài 10.1–10.10 chạy trực tiếp từ `data/books.ts`.

Để thử API khi chạy trên máy tính:

```bash
npx json-server@0.17.4 --watch db.json --port 3000 --host 0.0.0.0
```

Truy cập `http://localhost:3000/books` để kiểm tra. Đặt `USE_API = true` trong `config.ts` để Home gọi API. Tắt server để xem lỗi với hai nút **Thử lại** và **Dùng dữ liệu mảng**. Điện thoại chạy Expo Go cần IP LAN của máy chạy json-server thay vì localhost (và cùng mạng Wi-Fi). **Đổi lại `USE_API = false` trước khi nộp bài**, theo đề.

## 6. Kiểm tra và nộp bài

Xem `docs/CHECKLIST_MINH_CHUNG.md` để biết cách thử từng bài và chụp ảnh minh chứng có **cả code, preview và đồng hồ hệ thống** theo tài liệu; 10 ảnh cần tự chụp từ Snack khi app đang chạy. Xem `docs/CAU_HOI_BO_SUNG.md` để lấy 6 câu trả lời ngắn theo đề.

**Trạng thái xác minh:** Đã kiểm tra cú pháp/logic nguồn bằng bộ kiểm tra tĩnh tại môi trường tạo file. Chưa chạy ứng dụng thực tế trong Expo Snack / Expo Go (cần tải dependencies và dùng phiên Snack của bạn), vì vậy không kèm ảnh chụp giả lập thay cho ảnh minh chứng thật.
