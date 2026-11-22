/**
 * Nguồn kiểm tra tĩnh không yêu cầu mạng, dùng TypeScript compiler API.
 * Chạy sau `npm install`: node docs/validate-source.cjs
 * Không thay thế việc mở Expo Snack hoặc chạy npm run typecheck.
 */
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.join(__dirname, '..');
let passed = 0;
function ok(name, fn) { fn(); console.log('✓', name); passed++; }
function get(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }
const sourceFiles = [];
function visit(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.isDirectory()) { if (f.name !== 'node_modules' && f.name !== '.expo') visit(path.join(dir, f.name)); }
    else if (/\.tsx?$/.test(f.name)) sourceFiles.push(path.join(dir, f.name));
  }
}
visit(root);
ok('Toàn bộ các file .ts/.tsx parse không lỗi cú pháp', () => {
  for (const p of sourceFiles) {
    const src = ts.createSourceFile(p, fs.readFileSync(p, 'utf8'), ts.ScriptTarget.Latest, true, p.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    assert.equal(src.parseDiagnostics.length, 0, p + ': ' + src.parseDiagnostics.map(d=>d.messageText).join(', '));
  }
});
ok('Import nội bộ trỏ tới file thật', () => {
  for (const p of sourceFiles) {
    const text = fs.readFileSync(p, 'utf8');
    const rx = /\bfrom\s*["'](\.[^"']+)["']/g;
    for (const match of text.matchAll(rx)) {
      const name = path.resolve(path.dirname(p), match[1]);
      assert.ok(['.ts', '.tsx', '.js', '/index.ts', '/index.tsx'].some(ext => fs.existsSync(name + ext)), `${path.relative(root,p)} -> ${match[1]}`);
    }
  }
});
ok('Không còn TODO BT10 trong source', () => {
  for (const p of sourceFiles) assert.ok(!/TODO\s+BT10/.test(fs.readFileSync(p, 'utf8')), p);
});
function transpile(rel) {
  return ts.transpileModule(get(rel), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
}
function evaluate(rel, requireMock={}) {
  const exports = {};
  new Function('exports', 'require', 'module', transpile(rel))(exports, (name) => {
    if (Object.hasOwn(requireMock, name)) return requireMock[name];
    throw new Error(`Need mock ${name} for ${rel}`);
  }, { exports });
  return exports;
}
const util = evaluate('utils.ts');
ok('Format VND và tìm kiếm tiếng Việt không dấu', () => {
  assert.equal(util.formatPrice(389000), '389.000 đ');
  assert.equal(util.normalize('Nhà Giả Kim'), 'nha gia kim');
  assert.equal(util.normalize('Đắc Nhân Tâm'), 'dac nhan tam');
  assert.equal(util.normalize('  Tô Hoài '), 'to hoai');
});
const data = evaluate('data/books.ts');
ok('Dữ liệu 10 cuốn và db.json nhất quán', () => {
  const json = JSON.parse(get('db.json'));
  assert.equal(data.BOOKS.length, 10);
  assert.equal(json.books.length, 10);
  assert.deepEqual(data.BOOKS.map(x=>x.id), json.books.map(x=>x.id));
  assert.equal(new Set(data.BOOKS.map(x=>x.id)).size, 10);
});
function createSlice({name,initialState,reducers={},extraReducers}) {
  const handlers = {};
  if (extraReducers) {
    const b = { addCase(action, reducer) { handlers[action.type] = reducer; return this; } };
    extraReducers(b);
  }
  return {
    actions: Object.fromEntries(Object.keys(reducers).map(k=>[k, (payload)=>({ type:name+'/'+k, payload })])),
    reducer: (state=structuredClone(initialState),action)=>{
      const s = structuredClone(state);
      const f = reducers[action.type?.startsWith(name+'/') ? action.type.slice(name.length+1) : ''] || handlers[action.type];
      if(f) f(s,action);
      return s;
    }
  };
}
function createAsyncThunk(type) {
  const thunk=()=>{};
  for(const kind of ['pending','fulfilled','rejected']) thunk[kind] = {type:`${type}/${kind}`};
  return thunk;
}
const mockToolkit = {createSlice,createAsyncThunk};
const cart = evaluate('store/cartSlice.ts', {'@reduxjs/toolkit':mockToolkit});
ok('Giỏ hàng: thêm, tăng, giảm, xóa, selector count/total', () => {
  let s=cart.default(undefined,{type:'init'});
  const b={id:'1',title:'Clean Code',price:389000};
  s=cart.default(s,cart.addToCart(b));
  s=cart.default(s,cart.addToCart(b));
  assert.equal(cart.selectCartCount({cart:s}),2);
  assert.equal(cart.selectCartTotal({cart:s}),778000);
  s=cart.default(s,cart.decrease('1'));
  assert.equal(cart.selectCartCount({cart:s}),1);
  s=cart.default(s,cart.decrease('1'));
  assert.equal(cart.selectCartCount({cart:s}),0);
  s=cart.default(s,cart.addToCart(b));
  s=cart.default(s,cart.removeFromCart('1'));
  assert.equal(cart.selectCartCount({cart:s}),0);
  s=cart.default(s,cart.addToCart(b));
  s=cart.default(s,cart.clearCart());
  assert.equal(cart.selectCartTotal({cart:s}),0);
});
const fav = evaluate('store/favoritesSlice.ts', {'@reduxjs/toolkit':mockToolkit});
ok('Yêu thích: thêm, bỏ và selector theo id', () => {
  let s=fav.default(undefined,{type:'init'});
  s=fav.default(s,fav.toggleFavorite('3'));
  assert.deepEqual(fav.selectFavoriteIds({favorites:s}),['3']);
  assert.equal(fav.selectIsFavorite('3')({favorites:s}),true);
  s=fav.default(s,fav.toggleFavorite('3'));
  assert.equal(fav.selectIsFavorite('3')({favorites:s}),false);
});
const books = evaluate('store/booksSlice.ts', {'@reduxjs/toolkit':mockToolkit, '../config':{API_URL:'http://localhost:3000'}});
ok('Bonus: fetchBooks.pending / fulfilled / rejected cập nhật state', () => {
  let s=books.default(undefined,{type:'init'});
  assert.equal(s.status,'idle');
  s=books.default(s,{type:'books/fetchBooks/pending'});
  assert.equal(s.status,'loading');
  s=books.default(s,{type:'books/fetchBooks/fulfilled',payload:data.BOOKS});
  assert.equal(s.status,'succeeded');
  assert.equal(s.items.length,10);
  s=books.default(s,{type:'books/fetchBooks/rejected',payload:'Không kết nối được'});
  assert.equal(s.status,'failed');
  assert.equal(s.error,'Không kết nối được');
});
ok('UI và điều hướng có đầy đủ các thành phần trong đề', () => {
  const app = get('App.tsx');
  assert.match(app, /<Provider store=\{store\}>/);
  assert.match(app, /<SafeAreaProvider>/);
  assert.match(app, /<NavigationContainer>/);
  const home = get('screens/HomeScreen.tsx');
  for (const symbol of ['FlatList', 'RefreshControl', 'ActivityIndicator', 'useMemo', 'numColumns', 'normalize', 'BookCard', 'setCategory', 'SafeAreaView']) assert.ok(home.includes(symbol), symbol);
  assert.match(home, /key=\{String\(numColumns\)\}/);
  const nav = get('navigation.tsx');
  for (const symbol of ['createNativeStackNavigator', 'createBottomTabNavigator', 'tabBarBadge', 'Detail']) assert.ok(nav.includes(symbol), symbol);
  assert.match(get('components/BookCard.tsx'), /export default React\.memo\(BookCard\)/);
  const detail = get('screens/DetailScreen.tsx');
  assert.match(detail, /dispatch\(addToCart\(book\)\)/);
  assert.match(detail, /dispatch\(toggleFavorite\(book\.id\)\)/);
});
console.log(`\n${passed} nhóm kiểm tra tĩnh / logic đạt. Chưa xác minh build và render trong Expo.`);
