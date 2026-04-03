# Business Flow: Expense & Budget Visualizer

## Gambaran Umum
Aplikasi web satu halaman (single-page) yang memungkinkan user mencatat pengeluaran, melihat total saldo, dan memvisualisasikan distribusi pengeluaran per kategori — semua tersimpan di browser (localStorage).

---

## Alur Bisnis Utama

### 1. User Membuka Aplikasi
```
User buka browser → Load index.html
    → Baca data dari localStorage
    → Render daftar transaksi yang tersimpan
    → Hitung & tampilkan Total Balance
    → Render Pie Chart berdasarkan data yang ada
```

### 2. User Menambah Transaksi
```
User isi form:
    ├── Item Name   (teks)
    ├── Amount      (angka)
    └── Category    (Food / Transport / Fun)
        ↓
Klik tombol "Add"
        ↓
Validasi: semua field terisi?
    ├── TIDAK → tampilkan pesan error, stop
    └── YA   → buat objek transaksi baru
                    ↓
              Simpan ke localStorage
                    ↓
              Tambahkan ke Transaction List (UI)
                    ↓
              Update Total Balance
                    ↓
              Update Pie Chart
                    ↓
              Reset form ke kondisi kosong
```

### 3. User Menghapus Transaksi
```
User klik tombol "Delete" pada item transaksi
        ↓
Hapus item dari array data
        ↓
Update localStorage
        ↓
Re-render Transaction List
        ↓
Update Total Balance
        ↓
Update Pie Chart
```

### 4. Persistensi Data (localStorage)
```
Setiap perubahan data (tambah/hapus):
    → Serialize array transaksi ke JSON
    → Simpan ke localStorage key: "transactions"

Setiap kali halaman dibuka:
    → Baca dari localStorage key: "transactions"
    → Parse JSON → array transaksi
    → Render semua komponen UI
```

---

## Struktur Data

### Objek Transaksi
```json
{
  "id": "unique-id-timestamp",
  "name": "Makan Siang",
  "amount": 25000,
  "category": "Food"
}
```

### localStorage
```
Key: "transactions"
Value: JSON array of transaction objects
```

---

## Komponen UI & Tanggung Jawabnya

```
┌─────────────────────────────────────┐
│         TOTAL BALANCE               │  ← Update otomatis
│         Rp 125.000                  │
├─────────────────────────────────────┤
│  [Item Name] [Amount] [Category ▼]  │  ← Input Form
│              [Add Transaction]      │
├──────────────────┬──────────────────┤
│  TRANSACTION     │   PIE CHART      │
│  LIST            │                  │
│  • Makan - Food  │   🥧 Food 60%   │
│  • Grab - Trans  │   🚗 Trans 30%  │
│  • Game - Fun    │   🎮 Fun 10%    │
│  [scrollable]    │  (auto-update)   │
└──────────────────┴──────────────────┘
```

---

## Alur Data (Data Flow)

```
User Action
    ↓
Event Handler (JS)
    ↓
Update Data Array (in-memory)
    ↓
Sync ke localStorage
    ↓
Re-render UI:
    ├── Transaction List
    ├── Total Balance
    └── Pie Chart (Chart.js)
```

---

## Optional Features Flow (Pilih 3)

### A. Custom Category
```
User klik "Add Category" → input nama kategori baru
→ Tambah ke dropdown Category
→ Simpan list kategori ke localStorage
```

### B. Monthly Summary
```
User pilih bulan → filter transaksi berdasarkan bulan
→ Tampilkan total per kategori untuk bulan tersebut
→ Update chart dengan data bulan yang dipilih
```

### C. Sort Transaksi
```
User pilih sort (by amount / by category)
→ Sort array transaksi di memory
→ Re-render Transaction List (tanpa ubah localStorage)
```

### D. Spending Limit Alert
```
User set batas pengeluaran → simpan ke localStorage
Setiap tambah transaksi:
    → Hitung total
    → Jika total > limit → highlight merah / tampilkan warning
```

### E. Dark/Light Mode Toggle
```
User klik toggle → switch class pada <body>
→ CSS variables berubah (warna background, teks, dll)
→ Simpan preferensi ke localStorage
Saat load → baca preferensi → apply mode
```

---

## Tech Stack Summary

| Layer     | Teknologi         |
|-----------|-------------------|
| Structure | HTML5             |
| Styling   | CSS3              |
| Logic     | Vanilla JavaScript|
| Chart     | Chart.js          |
| Storage   | localStorage API  |
| Hosting   | GitHub Pages      |
