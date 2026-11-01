# BÁO CÁO TRẢ LỜI CÂU HỎI BỔ SUNG — BUỔI 7 (REACT NATIVE BOOKSTORE)

 Nguyễn Văn Anh Đức  - 23704871

---

### Câu 1: Cấu trúc điều hướng
> **Câu hỏi:** Vì sao `BookDetail` được đăng ký ở Stack mà không đặt trong Tab? Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?

**Trả lời:**
- `BookDetail` được đăng ký ở cấp `RootStack` (Native Stack) ngoài cùng để khi người dùng nhấn xem chi tiết sách, màn hình này sẽ phủ lên toàn bộ ứng dụng (che khuất thanh Bottom Tab) và tự động có nút quay lại (`← Back`) trên header để quay về danh sách sách trước đó.
- Nếu đặt `BookDetail` vào bên trong `TabNavigator`:
  - `BookDetail` sẽ trở thành một tab riêng biệt hoặc hiển thị ngang cấp với các tab Home, Giỏ hàng...
  - Thanh Tab Bar bên dưới vẫn sẽ luôn hiển thị ở đáy màn hình.
  - Màn hình sẽ không có nút quay lại tự động của Stack, làm sai cấu trúc điều hướng chuẩn (Master-Detail Pattern) và gây trải nghiệm người dùng (UX) không hợp lý trên ứng dụng di động.

---

### Câu 2: Redux & Immer, useMemo
> **Câu hỏi:** Trong reducer viết `state.items.push(...)` mà sao state gốc không bị sửa trực tiếp? Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?

**Trả lời:**
- Redux Toolkit tích hợp sẵn thư viện **Immer**. Khi thao tác trong reducer, đối tượng `state` mà ta tương tác thực chất là một "Draft State" (bọc bởi Proxy). Immer ghi nhận tất cả thay đổi trên bản nháp này rồi tự động tạo ra một đối tượng State mới hoàn toàn bất biến (immutable) để lưu vào Redux Store mà không hề đột biến (mutate) state gốc ban đầu.
- Nếu bỏ `useMemo` trong hook `useCart`:
  - **Kết quả hiển thị KHÔNG thay đổi** (tổng tiền và tổng số lượng vẫn tính toán ra số liệu chính xác).
  - **Hậu quả:** Hàm `reduce` sẽ bị thực thi lại sau mỗi lần component re-render (ngay cả khi mảng `items` không hề thay đổi). Khi giỏ hàng có nhiều mặt hàng hoặc màn hình render liên tục, việc tính toán lại liên tục này sẽ gây lãng phí tài nguyên CPU và giảm hiệu năng hiển thị của ứng dụng. `useMemo` giúp cache lại kết quả và chỉ tính lại khi `items` thực sự thay đổi.

---

### Câu 3: Promise.all & Promise.allSettled
> **Câu hỏi:** Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì? Tìm cách để vẫn hiện được danh sách sách (gợi ý: `Promise.allSettled`) và nói rõ cách đó phải đánh đổi gì.

**Trả lời:**
- Nếu `getCategories()` lỗi và `getBooks()` thành công thì màn hình Home sẽ **hiển thị trạng thái lỗi (`ErrorView`) kèm nút "Thử lại"**, danh sách sách sẽ hoàn toàn không được hiển thị. Lý do là `Promise.all` hoạt động theo cơ chế "fail-fast" — chỉ cần một Promise bị reject thì toàn bộ `Promise.all` lập tức bị reject.
- Để vẫn hiển thị được danh sách sách, ta thay `Promise.all` bằng `Promise.allSettled`:
  ```ts
  const results = await Promise.allSettled([getBooks(), getCategories()]);
  if (results[0].status === "fulfilled") {
    setBooks(results[0].value);
  }
  if (results[1].status === "fulfilled") {
    setCategories(results[1].value);
  }
  ```
- **Đánh đổi:** 
  - Code xử lý kết quả phức tạp hơn vì phải kiểm tra `status` của từng kết quả (`fulfilled` hay `rejected`).
  - Trải nghiệm giao diện bị khuyết thiếu một phần (người dùng xem được sách nhưng không có thanh chip danh mục để lọc), đòi hỏi phải thiết kế thêm thông báo lỗi cục bộ nhẹ nhàng (toast/banner) thay vì màn hình lỗi toàn trang.

---

### Câu 4: Cơ chế Debounce
> **Câu hỏi:** Vì sao không đặt `setTimeout` thẳng trong `onChangeText`? Hàm dọn dẹp (`return () => clearTimeout`) giúp tránh lỗi gì?

**Trả lời:**
- Không nên đặt `setTimeout` thẳng trong `onChangeText` vì mỗi khi người dùng gõ một ký tự, một timer độc lập mới sẽ được tạo ra mà các timer trước đó không hề bị hủy; kết quả là mỗi phím gõ đều sẽ lần lượt kích hoạt lọc dữ liệu sau độ trễ (chỉ bị trễ đi chứ không gom lại được thành một lần lọc duy nhất cho từ khóa cuối cùng).
- Hàm dọn dẹp (`return () => clearTimeout(t)`) trong `useEffect` giải quyết 2 vấn đề:
  1. Hủy bỏ timer cũ ngay khi giá trị `value` thay đổi trước khi timer kịp hoàn thành, đảm bảo chỉ có lượt gõ phím cuối cùng (sau khi người dùng ngừng gõ đủ thời gian `delay`) mới được áp dụng.
  2. Ngăn ngừa lỗi **Memory Leak** và cảnh báo cập nhật state trên một component đã bị unmount (khi người dùng chuyển sang màn hình khác trước khi timer kết thúc).

---

### Câu 5: Code bổ sung — Sắp xếp theo giá tăng dần / giảm dần
> **Câu hỏi:** Thêm tuỳ chọn sắp xếp “Giá tăng dần / giảm dần” cho Home. Chỉ cần thêm một state và sửa một chỗ trong `visibleBooks`. Chụp màn hình kết quả đính kèm.

**Đoạn code bổ sung:**

1. **Khai báo thêm state trong `HomeScreen.tsx`:**
   ```tsx
   type SortOrder = "asc" | "desc" | null;
   const [sortOrder, setSortOrder] = useState<SortOrder>(null);
   ```

2. **Cập nhật `useMemo` của `visibleBooks`:**
   ```tsx
   const visibleBooks = useMemo(() => {
     const list = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
     if (!sortOrder) return list;
     return [...list].sort((a, b) =>
       sortOrder === "asc" ? a.price - b.price : b.price - a.price
     );
   }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
   ```

3. **Giao diện nút chuyển đổi sắp xếp (đặt cạnh nút Xóa bộ lọc hoặc trong header):**
   ```tsx
   <Pressable
     style={styles.sortBtn}
     onPress={() => setSortOrder((curr) => (curr === "asc" ? "desc" : curr === "desc" ? null : "asc"))}
   >
     <Text style={styles.sortText}>
       {sortOrder === "asc" ? "Giá: Thấp → Cao ⬆" : sortOrder === "desc" ? "Giá: Cao → Thấp ⬇" : "Sắp xếp giá ⬍"}
     </Text>
   </Pressable>
   ```

