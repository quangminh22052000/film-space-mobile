# MMKV

MMKV là một thư viện lưu trữ key-value hiệu năng cao được phát triển bởi WeChat (Weixin) và được sử dụng rộng rãi trong các ứng dụng mobile, đặc biệt là React Native và Android/iOS native.
Nó được dùng để lưu trữ dữ liệu nhỏ gọn, truy cập nhanh như:

## 🔑 Key-value storage (tương tự AsyncStorage, SharedPreferences trên Android hoặc NSUserDefaults trên iOS).

- ⚡ Hiệu năng rất cao: đọc/ghi nhanh hơn nhiều so với AsyncStorage.

## 🔒 Hỗ trợ mã hóa dữ liệu (Encrypt).

## 📦 Dùng cho dữ liệu cần lưu lâu dài như:

- Token đăng nhập (JWT, AccessToken, RefreshToken).
- Cài đặt người dùng (dark mode, ngôn ngữ, notification settings...).
- Cache tạm thời (ví dụ: kết quả API, trạng thái ứng dụng...).

## 👉 Trong React Native, react-native-mmkv thường được dùng thay thế AsyncStorage vì:

- Nhanh hơn gấp nhiều lần.
- Dữ liệu được lưu native (không qua bridge JS ↔ native quá nhiều).
- Dễ dùng: chỉ cần set, get, delete.
