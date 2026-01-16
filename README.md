# katalog
UAS FRONTEND

Gambaran Umum
Katalog Produk Mini adalah aplikasi web berbasis frontend murni yang mengimplementasikan operasi CRUD (Create, Read, Update, Delete) lengkap tanpa menggunakan backend atau API eksternal. Data disimpan secara lokal di browser menggunakan localStorage, membuat aplikasi ini berfungsi penuh bahkan tanpa koneksi internet.

✨ Fitur Utama
🔧 Operasi CRUD Lengkap
Create - Tambah produk baru dengan form validasi

Read - Tampilkan produk dengan berbagai filter dan pencarian

Update - Edit detail produk yang sudah ada

Delete - Hapus produk dengan konfirmasi ganda

🎨 Antarmuka Pengguna
Desain Responsif - Tampilan optimal di desktop, tablet, dan mobile

UI Modern - Gradien warna, animasi halus, dan ikon Font Awesome

Dashboard Statistik - Ringkasan produk dan stok real-time

Notifikasi Interaktif - Feedback visual untuk setiap aksi

🔍 Fitur Lanjutan
Pencarian Real-time - Temukan produk dengan cepat

Filter Multi-level - Filter berdasarkan kategori dan status stok

Sorting Cerdas - Urutkan berdasarkan harga, nama, atau tanggal

Rating Produk - Sistem rating 1-5 bintang

Data Persisten - Data tetap tersimpan meskipun browser ditutup

🚀 Teknologi yang Digunakan
HTML5 - Struktur aplikasi

CSS3 - Styling dengan Flexbox, Grid, dan animasi

JavaScript Vanilla - Logika aplikasi tanpa framework

Font Awesome - Ikon untuk UI yang lebih baik

Google Fonts - Tipografi modern (Poppins & Inter)

LocalStorage - Penyimpanan data di browser

📁 Struktur File
text
katalog-produk-mini/
├── index.html          # Struktur utama aplikasi
├── style.css           # Styling dan layout
├── script.js           # Logika aplikasi dan CRUD operations
└── README.md           # Dokumentasi ini


🛠️ Cara Menggunakan
1. Menjalankan Aplikasi
bash
# Clone repository atau salin file
# Buka file index.html di browser modern
# Tidak memerlukan server atau instalasi
2. Menambahkan Produk Baru
Isi form di sidebar kiri

Masukkan nama, kategori, harga, dan stok

Klik "Tambah Produk"

Produk akan muncul di grid utama

3. Mengedit Produk
Klik tombol "Edit" pada produk yang ingin diedit

Form akan terisi dengan data produk

Ubah data yang diperlukan

Klik "Perbarui Produk"

4. Menghapus Produk
Klik tombol "Hapus" pada produk

Konfirmasi penghapusan di modal

Produk akan dihapus dari daftar

5. Filter dan Pencarian
Gunakan kotak pencarian untuk mencari produk

Pilih kategori di dropdown filter

Atur urutan dengan dropdown sorting

📊 Data Contoh
Aplikasi dilengkapi dengan 6 produk contoh:

Laptop Gaming Pro

Smartphone Flagship

Kemeja Formal Premium

Buku Pemrograman JavaScript

Kopi Arabika Specialty

Sepatu Running Premium

🔧 Teknis Implementasi
Penyimpanan Data
javascript
// Data disimpan di localStorage browser
localStorage.setItem('productCatalog', JSON.stringify(products));
Struktur Data Produk
javascript
{
  id: Number,           // ID unik produk
  name: String,         // Nama produk
  description: String,  // Deskripsi produk
  price: Number,        // Harga dalam Rupiah
  stock: Number,        // Jumlah stok
  category: String,     // Kategori produk
  rating: Number,       // Rating 1-5
  createdAt: Date       // Tanggal pembuatan
}
Fitur Keamanan
Validasi input form

Konfirmasi untuk operasi delete

Batasan karakter untuk deskripsi

Validasi angka positif untuk harga dan stok

📱 Responsif Design
Aplikasi mendukung berbagai ukuran layar:

Desktop (> 1200px): Layout dua kolom

Tablet (768px - 1200px): Layout adaptif

Mobile (< 768px): Layout satu kolom

🎨 Desain Visual
Skema Warna
Primary: Gradien ungu-biru (#667eea → #764ba2)

Success: Hijau (#38a169)

Danger: Merah (#e53e3e)

Warning: Kuning (#f6ad55)

Background: Gradien abu-abu (#f5f7fa → #e4e8f0)

Tipografi
Heading: Poppins (bold, modern)

Body: Inter (clean, readable)

🔄 Alur Kerja CRUD










🧪 Testing Manual
Test Case 1: Menambah Produk
Isi semua field form

Klik "Tambah Produk"

Verifikasi produk muncul di grid

Verifikasi notifikasi sukses muncul

Test Case 2: Mengedit Produk
Klik "Edit" pada produk

Ubah nama produk

Klik "Perbarui Produk"

Verifikasi perubahan tersimpan

Test Case 3: Menghapus Produk
Klik "Hapus" pada produk

Klik "Hapus" di modal konfirmasi

Verifikasi produk hilang dari grid

Test Case 4: Pencarian
Ketik nama produk di kotak pencarian

Verifikasi hanya produk relevan yang ditampilkan

⚠️ Batasan dan Catatan
Penyimpanan Lokal: Data hanya tersimpan di browser yang sama

Kapasitas: localStorage memiliki limit ~5-10MB

Browser Support: Memerlukan browser modern dengan JavaScript enabled

Keamanan: Tidak cocok untuk data sensitif karena disimpan di client-side
