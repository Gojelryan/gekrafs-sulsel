> Catatan historis sebelum penataan 28 Oktober 2026. Struktur terkini: README.md dan docs/AUDIT.md.

# Struktur dan hasil audit

Website aktif terdiri dari `index.html`, `style.css`, `script.js`, serta folder `assets`. Tidak ada framework, package manager, atau proses build. Tailwind, Lucide, dan Google Fonts dimuat dari CDN.

## Pendekatan yang disarankan

Pertahankan HTML statis untuk satu halaman ini. Gunakan class bersama untuk elemen berulang (seperti `sector-card` dan gambar di `asset-frame`), serta Tailwind untuk grid, breakpoint, dan layout section. Jumlah baris bukan ukuran performa: menggabungkan kode menjadi satu baris hanya menyulitkan perawatan.

Jika jumlah halaman atau kebutuhan CMS bertambah, pertimbangkan template/komponen saat build: Header, Footer, SectionHeading, SectorCard, ProgramCard, dan MemberCard. Hasil akhirnya tetap HTML statis. Memindahkan seluruh konten ke rendering JavaScript hanya untuk mengurangi panjang HTML menambah ketergantungan browser yang belum diperlukan.

## Pembersihan yang dilakukan

- Mengganti tiga kelompok class berulang pada 17 kartu subsektor dengan styling bersama.
- Menyatukan styling 13 gambar dalam `.asset-frame > img`.
- Menghapus permintaan font weight 600 karena tidak digunakan.
- Menggabungkan deklarasi interaksi tautan/tombol dan menghapus spasi class berlebih.
- Menyatukan logika gambar berhasil/gagal; pencarian placeholder dilakukan sekali per gambar.
- Semua fungsi navigasi, aksesibilitas, placeholder, breakpoint, ikon, dan isi halaman tetap dipertahankan karena digunakan.

Total ukuran tiga file kode aktif turun dari 34.082 menjadi 30.897 byte (9,3%). Angka ini tidak termasuk dependensi CDN dan gambar. Konten teks, anchor, tujuan WhatsApp, serta path aset diperiksa agar tetap sama. Uji logika menu, fokus Escape, breakpoint, navigasi aktif, dan gambar gagal/berhasil lulus; tampilan belum diuji langsung di browser.

## Aset dan file referensi

HTML Desktop/Mobile, PDF draft, dan dua logo di root adalah bahan referensi desain, bukan dependensi halaman aktif. File tersebut sengaja dipertahankan sebagai sumber asli. Saat deployment cukup sertakan `index.html`, `style.css`, `script.js`, dan `assets`.

Empat foto program dan delapan foto pengurus belum tersedia. Path serta placeholder sengaja dipertahankan agar file dapat diisi mengikuti `assets/README.md`.

## Prioritas optimasi berikutnya

1. Optimalkan foto hero (2,87 MB) dan kerajinan (3,12 MB), serta sediakan ukuran gambar sesuai layar. Ini lebih berdampak pada transfer data daripada pemangkasan HTML beberapa KB.
2. Saat menyiapkan build produksi, kompilasi Tailwind menjadi CSS lokal dan minifikasi hasil build, sambil menjaga source tetap mudah dibaca.
3. Jika menambah proses build, kelola konten kartu dalam data dan template pada saat build; jangan menggandakan source dan HTML hasil build untuk diedit manual bersamaan.
