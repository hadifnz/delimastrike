# SUKOL - Sistem Jadual Perlawanan

Website untuk menguruskan dan memaparkan jadual perlawanan SUKOL. Sistem ini membolehkan admin untuk menguruskan jadual perlawanan pelbagai kategori sukan dan membolehkan pengguna melihat jadual tersebut tanpa perlu log masuk.

## Ciri-ciri

- Paparan jadual perlawanan untuk umum tanpa perlu log masuk
- Panel admin untuk menguruskan jadual perlawanan
- Kemampuan untuk menambah pelbagai kategori sukan (bola sepak, badminton, dll)
- Kemaskini skor secara masa nyata untuk perlawanan yang sedang berlangsung
- Penapis untuk melihat jadual mengikut kategori sukan
- Paparan untuk perlawanan akan datang

## Teknologi

- Frontend: React.js
- Backend & Authentication: Firebase (Firestore & Authentication)
- Hosting: Netlify
- Version Control: GitHub
- Tema: Merah gelap dan putih

## Struktur Projek

```
├── public/                 # Fail statik
│   ├── index.html          # Fail HTML utama
│   ├── logo.svg            # Logo SUKOL
│   └── manifest.json       # Manifest untuk PWA
├── src/                    # Kod sumber
│   ├── components/         # Komponen UI
│   │   ├── admin/          # Komponen khusus admin
│   │   ├── Footer.js       # Komponen footer
│   │   ├── Navbar.js       # Komponen navigasi
│   │   └── PrivateRoute.js # Komponen untuk laluan terhad
│   ├── contexts/           # React Contexts
│   │   └── AuthContext.js  # Konteks autentikasi
│   ├── pages/              # Halaman utama
│   │   ├── Admin.js        # Halaman admin
│   │   ├── Home.js         # Halaman utama
│   │   ├── Login.js        # Halaman log masuk
│   │   └── NotFound.js     # Halaman 404
│   ├── services/           # Perkhidmatan Firebase
│   │   ├── firebase.js     # Konfigurasi Firebase
│   │   └── matchService.js # Perkhidmatan perlawanan
│   ├── styles/             # Fail CSS
│   │   ├── App.css         # Gaya komponen
│   │   └── index.css       # Gaya global
│   ├── App.js              # Komponen utama
│   └── index.js            # Titik masuk aplikasi
├── .env                    # Pembolehubah persekitaran
├── .env.example           # Contoh pembolehubah persekitaran
├── .gitignore             # Fail yang diabaikan oleh Git
├── netlify.toml           # Konfigurasi Netlify
├── package.json           # Dependencies dan skrip
└── README.md              # Dokumentasi projek
```

## Persediaan Projek

### Prasyarat

- Node.js dan npm dipasang pada komputer anda
- Akaun Firebase
- Akaun GitHub
- Akaun Netlify

### Langkah Pemasangan

1. Klon repositori ini:
   ```
   git clone [URL_REPOSITORI_ANDA]
   cd SUKOL-25
   ```

2. Pasang semua dependencies:
   ```
   npm install
   ```

3. Salin fail `.env.example` kepada `.env` dan kemaskini dengan konfigurasi Firebase anda:
   ```
   cp .env.example .env
   ```

4. Jalankan aplikasi dalam mod pembangunan:
   ```
   npm start
   ```

5. Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi dalam pelayar web.

## Penghospitan

### Firebase

1. Buat projek baru di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan Authentication dengan kaedah Email/Password
3. Aktifkan Firestore Database
4. Kemaskini fail `.env` dengan konfigurasi Firebase anda

### Netlify

1. Sambungkan repositori GitHub anda ke Netlify
2. Tetapkan pembolehubah persekitaran yang sama seperti dalam fail `.env`
3. Deploy aplikasi anda

## Penyelenggaraan

Untuk menambah admin baru, anda perlu mendaftarkan pengguna baru di Firebase Authentication.

## Lesen

Hak Cipta © 2023 SUKOL