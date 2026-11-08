
### Câu 1: Cờ `ready` trong `useAutoPersist`
**Câu hỏi:** *Trong `useAutoPersist`, nếu bỏ điều kiện `ready` thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.*

**Trả lời:**
Nếu bỏ điều kiện `if (ready)`, giỏ hàng đã lưu trước đó trong `AsyncStorage` sẽ **bị xóa sạch (bị ghi đè bởi mảng rỗng)** mỗi khi mở lại app.

**Thứ tự các lần render giải thích nguyên nhân:**
1. **Lần render đầu tiên (Initial Mount):**
   - Redux store khởi tạo state `cart.items` mặc định là một mảng rỗng `[]`.
   - Effect đọc dữ liệu `loadJSON<CartItem[]>(CART_KEY)` trong `usePersistence` là tác vụ bất đồng bộ (async), cần thời gian chờ I/O đọc ổ đĩa (`Promise` chưa giải quyết xong).
   - Nếu không có điều kiện `if (ready)`, hook `useAutoPersist` sẽ chạy ngay sau lần render đầu tiên với `value = []` và gọi lệnh `saveJSON(CART_KEY, [])`. Lệnh này lập tức ghi đè mảng rỗng lên dữ liệu giỏ hàng cũ đang lưu trong `AsyncStorage`.
2. **Lần render tiếp theo (khi Promise đọc dữ liệu hoàn tất):**
   - Hàm `loadJSON` hoàn tất nhưng lúc này nội dung trong `AsyncStorage` đã bị ghi đè thành rỗng (`[]`).
   - Store nhận mảng rỗng và giỏ hàng của người dùng bị mất vĩnh viễn.

**Kết luận:** Cờ `ready` đóng vai trò là "chốt chặn an toàn" (guard flag), chỉ chuyển sang `true` sau khi dữ liệu cũ đã được nạp thành công vào Redux (`hydrateCart`, `hydrateWishlist`). Điều này ngăn việc ghi đè trạng thái khởi tạo rỗng lên dữ liệu đã lưu.

---

### Câu 2: Token giả & Vấn đề bảo mật
**Câu hỏi:** *Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?*

**Trả lời:**
1. **Hai điểm không an toàn trong ứng dụng hiện tại:**
   - **Mật khẩu lộ dưới dạng plain-text:** Mật khẩu người dùng được lưu trữ dạng văn bản thô trong `db.json` và trả về toàn bộ cho client. Quá trình kiểm tra mật khẩu diễn ra tại client (`user.password === password`). Bất kỳ ai mở tab Network hoặc debug đều có thể thấy toàn bộ mật khẩu của mọi tài khoản.
   - **Token tự sinh không có chữ ký số (tamper-prone):** Token chỉ là một chuỗi ngẫu nhiên do client tự sinh (`"demo-token-" + ...`), không có chữ ký số từ server và không có thời hạn hết hạn (TTL). Bất kỳ ai cũng có thể giả mạo token hợp lệ để vượt qua kiểm tra đăng nhập.

2. **Cơ chế trong hệ thống thực tế:**
   - **Bên kiểm tra mật khẩu:** Bắt buộc phải là **Server (Backend)**. Client chỉ gửi mật khẩu qua kênh truyền mã hóa (HTTPS). Server sử dụng các thuật toán băm một chiều an toàn kết hợp muối (salt) như `bcrypt`, `Argon2` hoặc `scrypt` để so khớp hash. Client không bao giờ được phép biết hash hay mật khẩu của user khác.
   - **Nơi lưu trữ Token an toàn:** Thay vì lưu chuỗi thô trong `AsyncStorage` (vốn không được mã hóa và dễ bị lộ qua XSS hoặc trích xuất file), hệ thống thực tế nên lưu token vào:
     - **Mobile (React Native):** Sử dụng **`expo-secure-store`** (lưu trong iOS Keychain hoặc Android Keystore/EncryptedSharedPreferences với mã hóa phần cứng).
     - **Web:** Sử dụng **`HttpOnly + Secure + SameSite Cookie`** để ngăn chặn JavaScript truy cập trực tiếp nhằm phòng chống tấn công XSS.

---

### Câu 3: Hai effect trong `CartItemRow`
**Câu hỏi:** *Thử xóa effect đồng bộ `setQty(item.quantity)`. Với thao tác nào thì số hiển thị trên nút bị lệch so với store?*

**Trả lời:**
Khi xóa effect đồng bộ `useEffect(() => { setQty(item.quantity); }, [item.quantity])`, số lượng hiển thị trên component `CartItemRow` sẽ bị lệch so với Redux store trong các trường hợp:
1. **Nạp dữ liệu sau khi mở lại App (`hydrateCart`):** Khi app mở, `CartItemRow` có thể mount với `item.quantity` ban đầu. Sau khi `usePersistence` nạp dữ liệu từ `AsyncStorage` và cập nhật Redux store, nếu không có effect đồng bộ thì state cục bộ `qty` vẫn giữ nguyên giá trị cũ của lần render đầu.
2. **Thêm cùng một sản phẩm từ màn hình khác:** Khi người dùng đang có sản phẩm trong giỏ (ví dụ số lượng = 1), sau đó mở lại màn hình **Chi tiết sách** (`BookDetailScreen`) và bấm tiếp **"Thêm vào giỏ"**. Lúc này số lượng trong store tăng lên 2, nhưng khi chuyển sang tab Giỏ hàng, nút vẫn hiển thị số 1 do `qty` nội bộ không đồng bộ lại theo prop `item.quantity`.
3. **Thao tác Xóa và Thêm lại:** Khi xóa một sản phẩm rồi thêm lại cùng sản phẩm đó với số lượng khác, component được tái sử dụng có thể hiển thị sai số lượng so với store.

---

### Câu 4: Một nguồn state (Single Source of Truth)
**Câu hỏi:** *Nếu `HeartButton` giữ trạng thái bằng `useState` riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?*

**Trả lời:**
1. **Sự sai lệch khi dùng `useState` riêng lẻ:**
   - Mỗi component `HeartButton` sẽ sở hữu một vùng nhớ độc lập.
   - Khi người dùng bấm thả tim một cuốn sách ở màn hình chính (lưới sách), chỉ state cục bộ tại thẻ sách đó đổi sang màu đỏ.
   - Khi bấm vào cuốn sách đó để mở trang **Chi tiết sách**, `HeartButton` ở trang chi tiết có state riêng của nó (khởi tạo mặc định là `false`) nên tim vẫn hiển thị màu xám (chưa thích). Trạng thái giữa hai màn hình hoàn toàn bị đứt gãy và không nhất quán.
2. **Cách Redux Store giải quyết:**
   - Redux store đóng vai trò là **Một nguồn chân lý duy nhất (Single Source of Truth)** lưu trữ danh sách ID các cuốn sách yêu thích (`wishlist.ids`).
   - Mọi nơi hiển thị nút tim (`BookCard` ở Home, `BookDetailScreen`, `WishlistScreen`) đều đọc chung qua hook `useWishlist()`.
   - Khi bất kỳ nơi nào kích hoạt action `toggle(bookId)`, state trong store cập nhật -> tất cả các component đang lắng nghe `wishlist.ids` đều nhận dữ liệu mới và re-render đồng bộ ngay lập tức.

---

### Câu 5: Code bổ sung — Biểu tượng 👁 Ẩn/Hiện mật khẩu
**Câu hỏi:** *Thêm biểu tượng 👁 cạnh ô Mật khẩu ở màn Đăng nhập: bấm để hiện/ẩn mật khẩu (gợi ý: một state `showPassword` điều khiển `secureTextEntry`). Chụp ảnh màn hình kết quả.*

**Đoạn code đã triển khai:**

1. **Cập nhật component [`FormField.tsx`](src/components/FormField.tsx):** Thêm prop `rightAccessory` để gắn biểu tượng tương tác bên phải ô nhập:
```tsx
interface Props extends TextInputProps {
  label: string;
  error?: string | null;
  rightAccessory?: React.ReactNode;
}

export function FormField({ label, error, rightAccessory, style, ...rest }: Props) {
  if (rightAccessory) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputRow, error ? styles.inputError : null]}>
          <TextInput
            style={[styles.inputInner, style]}
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            {...rest}
          />
          {rightAccessory}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
```

2. **Cập nhật màn hình [`LoginScreen.tsx`](src/screens/LoginScreen.tsx):** Khai báo state `showPassword` và truyền icon toggle:
```tsx
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

<FormField
  label="Mật khẩu"
  value={password}
  onChangeText={setPassword}
  error={errors.password}
  secureTextEntry={!showPassword}
  rightAccessory={
    <Pressable
      onPress={() => setShowPassword((v) => !v)}
      hitSlop={8}
      accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    >
      <Text style={{ fontSize: 18 }}>{showPassword ? "👁️" : "🙈"}</Text>
    </Pressable>
  }
/>
```

**Kết quả:**
- Khi `showPassword === false`: Ô mật khẩu có `secureTextEntry = true` (ẩn các ký tự thành chấm tròn `••••••`), hiển thị icon `🙈`.
- Khi bấm vào icon: `showPassword` chuyển thành `true`, `secureTextEntry = false` (hiển thị rõ mật khẩu văn bản), hiển thị icon `👁️`.
