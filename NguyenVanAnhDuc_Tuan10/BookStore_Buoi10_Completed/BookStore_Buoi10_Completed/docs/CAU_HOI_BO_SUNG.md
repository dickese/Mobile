# Trả lời câu hỏi bổ sung (mỗi câu ≤ 5 dòng)

**1. Vì sao đổi `numColumns` của FlatList phải đổi cả `key`?**
`FlatList` không hỗ trợ đổi trực tiếp số cột của cùng một instance. Đổi `key` khiến React hủy danh sách cũ và tạo danh sách mới với bố cục tương ứng. Nếu thiếu `key`, ứng dụng thường báo `Changing numColumns on the fly is not supported`.

**2. Dữ liệu nào dùng `useState`, dữ liệu nào dùng Redux?**
Dùng `useState` cho trạng thái cục bộ của màn Home như `keyword`, `category`, `isTile`. Dùng Redux cho trạng thái nhiều màn cùng đọc/chỉnh sửa: giỏ hàng (`DetailScreen`, `CartScreen`, tab badge) và ID sách yêu thích (`DetailScreen`, `FavoritesScreen`).

**3. Vì sao reducer được `push` và sửa `quantity` trực tiếp?**
`createSlice` của Redux Toolkit sử dụng Immer, tạo một *draft state* để reducer được viết cú pháp như mutate. Immer biến các thao tác đó thành trạng thái mới theo kiểu immutable. Ở component React thông thường, mutate state trực tiếp có thể khiến React không nhận ra thay đổi.

**4. Vì sao `selectIsFavorite(id)` trả về một hàm? Lợi ích chỉ lưu ID?**
Hàm ngoài nhận `id`, hàm bên trong nhận `RootState`, phù hợp với `useAppSelector`. Chỉ lưu ID tránh nhân bản thông tin sách, giảm trùng lặp và không bị sai lệch khi tên hoặc giá sách thay đổi ở nguồn dữ liệu chung.

**5. Bỏ `useCallback` ở `onSelect` thì `React.memo` còn tác dụng không?**
Nếu không có `useCallback`, mỗi lần Home render sẽ tạo `onSelect` mới, nên BookCard nhận prop hàm khác và có thể render lại dù sách không đổi. `React.memo` vẫn hoạt động cho các trường hợp props ổn định, nhưng giảm hiệu quả tối ưu với `onSelect` này.

**6. `createAsyncThunk` tác động những trường nào khi pending/fulfilled/rejected?**
`pending`: `status = loading`, `error = null`. `fulfilled`: `status = succeeded`, cập nhật `items` từ dữ liệu trả về. `rejected`: `status = failed`, cập nhật `error` từ `rejectWithValue` hoặc thông báo mặc định.
