# Audit proyek — 28 Oktober 2026

## Cakupan dan perubahan

HTML aktif, seluruh CSS/JavaScript lokal, referensi gambar, galeri, navigasi, template dialog, dependensi CDN, server preview, dokumen dan sumber desain diperiksa.

- CSS dipindahkan ke `assets/css`, JavaScript ke `assets/js`.
- Gambar dikelompokkan menjadi hero, about, programs, dan portfolio; nama file aktif memakai huruf kecil. Logo dan ornamen memiliki folder tersendiri.
- Semua referensi HTML/data diperbarui; folder portofolio ganda digabung menjadi `portfolio`.
- `card.dataset.portfolioId` dihapus karena tidak dibaca HTML, CSS, maupun JavaScript. ID karya masih digunakan oleh placeholder dan data.
- Tidak ditemukan kelas CSS lokal tanpa pemakai setelah memperhitungkan template dan galeri dinamis. Fallback gambar, avatar opsional, validasi URL kontak, pengembalian fokus, navigasi aktif, reduced motion dan fallback viewport tetap diperlukan.
- Empat gambar tidak direferensikan dihapus: `hero-header.jpg`, `hero-header3.jpg`, `porto4.jpg`, `porto6.jpg`.
- `Logo_Gekrafs_Baru.png` di root dihapus karena SHA-256 identik dengan logo aktif.
- Panduan portfolio lama yang bertentangan dihapus. Total enam file tak terpakai yang dibuang: 5.954.587 byte (sekitar 5,68 MiB).
- HTML Desktop/Mobile, AI, PDF, dan logo alternatif dipindahkan ke `references/design`, tetap utuh sebagai referensi historis. Tautan relatif dalam HTML referensi tidak dimigrasikan; halaman ini bukan website aktif.
- Folder kosong SVG/element/portofolio dibersihkan. Dokumentasi berada di `docs`; `.gitignore` mengecualikan backup, referensi, log, dan artefak uji.
- Server preview disesuaikan dan diaktifkan kembali.

## Validasi

- ZIP sebelum perubahan: 39 file; hash seluruh entri cocok dengan sumber.
- Sintaks JavaScript aktif dan server preview lulus `node --check`.
- Referensi baru diverifikasi. File CSS/gambar dipindahkan tanpa perubahan isi; JavaScript hanya berubah pada path data dan penghapusan atribut yang tidak dibaca.
- Chrome headless, lebar 390 dan 1440 piksel: tidak ada error JavaScript, ID duplikat, anchor rusak, atau overflow horizontal.
- Menu HP dapat dibuka, ditutup melalui Escape, dan ditutup setelah memilih link.
- Delapan kartu membuka dialog dengan gambar berhasil dimuat. Escape menutup dialog. Kontak kosong tetap menyembunyikan tombol kontak.
- Semua kelas CSS lokal memiliki pemakai di DOM atau template.
- Screenshot dan rincian pengujian tersedia di `artifacts/`.

## Temuan tersisa

- Delapan foto pengurus belum tersedia sejak sebelum audit; permintaan gambar menghasilkan 404 dan placeholder tampil. Beberapa nama pengurus dan identitas kreator masih placeholder.
- Tailwind runtime, Lucide, dan Google Fonts membutuhkan internet. Audit tidak mengganti CDN dengan build lokal.
- Gambar belum dikompresi ulang agar kualitas visual asli tetap terjaga.
- Pengujian memakai Chrome dengan viewport HP, bukan perangkat Android/iPhone fisik. Layanan eksternal tidak diaudit keamanannya.
- Ngrok tetap bergantung pada laptop aktif dan koneksi stabil.
