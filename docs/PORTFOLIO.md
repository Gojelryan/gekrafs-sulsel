# Gambar portofolio aktif

Galeri saat ini menggunakan **8 gambar** di folder `assets/images/portfolio/`.
Judul, kategori, dan deskripsi sementara disusun berdasarkan isi visual gambar.
Nama kreator, lokasi, avatar, dan kontak belum diisi; merek pada gambar tidak otomatis dianggap sebagai pemilik akun.

| Kode | File | Judul |
| --- | --- | --- |
| PF-01 | `pf-01.jpg` | Tas dan Suvenir Daur Ulang |
| PF-02 | `pf-02.jpg` | Kopi Robusta Toraja |
| PF-03 | `pf-03.jpg` | Brownies Cokelat dengan Taburan Kacang |
| PF-05 | `pf-05.jpg` | Songkok dengan Motif Geometris |
| PF-07 | `pf-07.jpg` | Proses Pengerjaan Panel Dekoratif |
| PF-08 | `pf-08.jpg` | Pia Jadul dalam Kemasan Hijau |
| PF-09 | `pf-09.jpg` | Poster Musik Rock in Celebes |
| PF-10 | `pf-10.jpg` | Ragam Sajian Kopitiam |

Edit informasi di `assets/js/portfolio-data.js`. Dimensi `imageWidth` dan `imageHeight` mengikuti file asli. Galeri menggunakan grid dengan kartu berasio 4:5 agar tepi setiap baris sejajar. Foto memenuhi kartu dengan pemotongan seperlunya; popup tetap menampilkan gambar utuh. Urutan karya dibaca dari kiri ke kanan, lalu ke baris berikutnya.

Field tersedia: `id`, `title`, `category`, `description`, `image`, `imageWidth`, `imageHeight`, `creator`, `avatar`, `location`, `contactUrl`.

Isi `avatar` dengan path gambar jika tersedia; nilai kosong menampilkan inisial. Isi `contactUrl` dengan URL lengkap agar tombol Hubungi Kreator muncul. Ganti identitas placeholder dengan data anggota yang sesuai.
