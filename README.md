# Scrapbook Ciam

Scrapbook interaktif empat bab yang dibuat dengan React, TypeScript, Vite, Tailwind CSS, dan GSAP.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite (biasanya `http://localhost:5173`). Untuk memeriksa perubahan:

```bash
npm run lint
npm run build
```

Hasil build berada di folder `dist/`.

## Mengisi konten

- Enam kartu bab 1 dan animasi tumpukan saat scroll: `src/ChapterOneStack.tsx`.
- Enam kartu bab 2 dan animasi buku saat scroll: `src/ChapterTwoBook.tsx`.
- Empat kartu bab 3 dan animasi rangkaian kereta saat scroll: `src/ChapterThreeTrain.tsx`.
- Foto penutup dan pesan kaca yang dapat digeser pada bab 4: `src/ChapterFourPhoto.tsx`.
- Foto wanita tanpa latar dan pesan pop-up di panel kiri bab 4: `src/ChapterFourCutout.tsx` dan `public/assets/chapter4-woman-cutout.png`.
- Pesan di panel kiri: `src/LeftPane.tsx` dan `src/StarburstButton.tsx`.
- Foto bab 1: `public/assets/foto1.jpeg` sampai `foto6.jpeg`.
- Foto depan/belakang di panel kiri bab 3: `public/assets/chapter3-front.jpg` dan `public/assets/chapter3-back.jpg`.
- Hiasan panel kiri bab 2: `public/assets/chapter2-stitch.png` (dua sisi yang sama berputar otomatis) dan `public/assets/chapter2-arrows-original.png` (sembilan panah diperbesar dalam dua baris). Keduanya ditampilkan dengan putih yang menyatu dengan warna panel; versi panah transparan hasil olahan disimpan di `public/assets/chapter2-arrows.png`.
- Latar panel kanan bab 1, 2, dan 3: `public/assets/chapter1-birds.png`, `chapter2-roses.png`, dan `chapter3-background.png`.
- Latar panel kanan bab 4: `public/assets/chapter4-background.jpg`. Foto asli dipertahankan; lapisan warna pada CSS membuat tampilannya sedikit lebih gelap. Bab ini memiliki judul Chapter 4 di atas foto, pesan kaca yang bisa digeser, dan catatan cinta di panel kiri.
- Section setelah bab 4: `public/assets/ending-video.mp4`, ditampilkan memenuhi layar tanpa panel kiri/kanan dan tanpa tombol. Video diputar otomatis, tanpa suara, dan berulang agar autoplay bekerja di browser. Empat baris kutipan cinta ditempatkan di tengah video mengikuti referensi tipografi yang diberikan.

Empat paragraf pengantar di panel kiri memakai gabungan huruf sans dan tulisan sambung, mengikuti contoh tipografi. Panel kaca bab 4 berbentuk persegi dengan blur tipis. Klik potongan foto wanita di panel kiri untuk menampilkan atau menyembunyikan pesan cinta.

Judul dan kartu pertama tiap bab terlihat bersamaan. Kartu bab 1 dan 2 berada di tengah area di bawah judul dan berukuran sekitar 10% lebih besar. Bab 1 menampilkan enam foto kenangan yang naik dari bawah dan bertumpuk satu per satu. Bab 2 memakai ilustrasi rencana masa depan; keenam kartunya masuk dari kanan dan menumpuk seperti lembaran buku. Bab 3 memiliki empat kartu yang berjejer dan bergerak bersama dari kanan ke kiri seperti rangkaian kereta. Judul bab tetap terlihat sampai kartu terakhir selesai, lalu halaman bergulir ke bab berikutnya. Bab 4 menampilkan foto penuh tanpa kartu dan pesan kaca yang bisa digeser dengan pointer atau tombol panah. Pada perangkat yang memilih pengurangan animasi, semua kartu ditampilkan berurutan tanpa efek gerak. Teks dan gambar bisa diganti sesuai cerita yang ingin dibagikan.

Judul CHAPTER pada panel kanan kini memakai huruf kolase warna-warni yang besar dan terpusat. Angka bab berada di sisi kanan sebagai potongan kertas yang berayun; garis dekoratif lama dihapus. Animasi berhenti bila perangkat memilih pengurangan gerak.

## Musik

Berkas yang diberikan untuk scrapbook ini tersimpan sebagai `public/assets/song.aac` dan diputar melalui panel kiri. Jika ingin mengganti sumber audio, letakkan berkas baru di `public/assets/` lalu buat `.env.local` di folder proyek, misalnya:

```env
VITE_AUDIO_SRC=/assets/lagu-baru.mp3
```

Mulai ulang `npm run dev` setelah mengubah `.env.local`. Progres, durasi, tombol putar, dan penggeser mengikuti berkas audio sebenarnya. Pastikan Anda mempunyai izin untuk mempublikasikan lagu tersebut. Semua berkas di `public/`, termasuk foto dan audio, dapat diakses pengunjung setelah situs dipublikasikan.

## Catatan Git

Folder `scrapbook-ciam` kini memiliki repositori Git sendiri dengan branch `main` dan remote `https://github.com/OrganicoconutSugar/ScrapbookVite.git`. Jalankan perintah Git dari folder proyek ini agar berkas lain di `Documents` tidak ikut masuk.
