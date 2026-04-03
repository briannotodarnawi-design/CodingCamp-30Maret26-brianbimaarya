# Ringkasan Tugas: Expense & Budget Visualizer

## Tentang Tugas
Kamu diminta membangun sebuah **web app mobile-friendly** bernama **Expense & Budget Visualizer** — aplikasi untuk mencatat dan memvisualisasikan pengeluaran harian.

---

## Deadline & Pengumpulan
- Deadline: **Sabtu pukul 11.59 WIB**
- Link submit dibuka pada hari **Rabu**
- Format nama repository: `CodingCamp-[ddmmyy]-[namapeserta]`
  - Contoh: `CodingCamp-30Mar26-yamaroni`
  - Tanggal yang dipakai adalah **hari pertama kamu ikut kursus** (bukan hari selesai)

---

## Fitur Wajib (MVP)

### 1. Input Form
- Field: **Item Name**, **Amount**, **Category** (Food, Transport, Fun)
- Tambahkan transaksi ke list saat form di-submit
- Validasi: semua field harus diisi

### 2. Transaction List
- Daftar scrollable semua transaksi
- Tampilkan: nama, jumlah, dan kategori
- Ada tombol **hapus** tiap item

### 3. Total Balance
- Tampil di bagian atas halaman
- Update otomatis saat item ditambah/dihapus

### 4. Visual Chart
- **Pie chart** distribusi pengeluaran per kategori
- Update otomatis saat data berubah
- Boleh pakai **Chart.js** atau library chart lainnya

---

## Batasan Teknis

| Kode | Aturan |
|------|--------|
| TC-1 | Stack: HTML + CSS + Vanilla JavaScript (no React/Vue/dll) |
| TC-2 | Penyimpanan: gunakan **localStorage** (client-side only, no backend) |
| TC-3 | Harus jalan di Chrome, Firefox, Edge, Safari |

---

## Non-Functional Requirements
- **NFR-1 Simplicity**: UI bersih, mudah dipakai, tidak perlu setup rumit
- **NFR-2 Performance**: Load cepat, UI responsif, tidak ada lag
- **NFR-3 Visual Design**: Estetis, hierarki visual jelas, tipografi mudah dibaca

---

## Aturan Folder
```
project/
├── index.html
├── css/
│   └── style.css       ← hanya 1 file CSS
└── js/
    └── app.js          ← hanya 1 file JS
```

---

## Optional Challenges (Pilih 3 dari 5)
- [ ] Tambah kategori custom oleh user
- [ ] Tampilan ringkasan bulanan (monthly summary)
- [ ] Sort transaksi berdasarkan jumlah atau kategori
- [ ] Highlight pengeluaran yang melebihi batas tertentu
- [ ] Toggle dark/light mode

---

## Cara Submit
1. Upload source code ke **GitHub Repository**
2. Publish website via **GitHub Pages**
3. Isi form Paperform dengan:
   - AWS Builder ID
   - Screenshot file `.md` di Kiro
   - URL GitHub Repo
   - URL website yang sudah dipublish

> ⚠️ Jika tidak submit semua link di Paperform, submission dianggap tidak valid.

---

## Tools yang Dibutuhkan
- **Kiro** — untuk memahami tugas, breakdown fitur, dan bantu coding
- **GitHub Desktop** — untuk push code ke GitHub
- **GitHub Account** — untuk repo dan GitHub Pages
