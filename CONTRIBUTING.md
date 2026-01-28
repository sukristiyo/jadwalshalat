# Contributing to Jadwal Shalat PWA

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## Cara Berkontribusi

### 1. Fork Repository
Klik tombol "Fork" di pojok kanan atas halaman repository.

### 2. Clone Fork Anda
```bash
git clone https://github.com/YOUR_USERNAME/jadwalshalat.git
cd jadwalshalat
npm install
```

### 3. Buat Branch Baru
```bash
git checkout -b feature/amazing-feature
```

Gunakan nama branch yang deskriptif:
- `feature/` - untuk fitur baru
- `fix/` - untuk bug fixes
- `docs/` - untuk dokumentasi
- `style/` - untuk perubahan styling

### 4. Lakukan Perubahan
- Ikuti style code yang sudah ada
- Tambahkan comments jika perlu
- Test di browser dan mobile

### 5. Commit Changes
```bash
git add .
git commit -m "Add: feature description"
```

Gunakan conventional commits:
- `Add:` - fitur baru
- `Fix:` - perbaikan bug
- `Update:` - update fitur existing
- `Docs:` - perubahan dokumentasi
- `Style:` - perubahan CSS/UI

### 6. Push ke Fork
```bash
git push origin feature/amazing-feature
```

### 7. Buat Pull Request
- Buka repository Anda di GitHub
- Klik "Pull Request" → "New Pull Request"
- Isi deskripsi lengkap tentang perubahan Anda
- Screenshot jika ada perubahan UI

## Code Style Guidelines

### JavaScript
- Gunakan ES6+ features
- Async/await untuk asynchronous code
- Descriptive variable names
- Add comments untuk logic yang kompleks

### CSS
- Gunakan CSS variables untuk colors
- Mobile-first approach
- Support dark mode
- Consistent naming (kebab-case)

### File Organization
- Put APIs in separate functions
- Group related functions
- Keep files focused and modular

## Testing Checklist

Sebelum submit PR, pastikan:
- [ ] Code berjalan tanpa error di console
- [ ] Test di Chrome dan Firefox
- [ ] Test di mobile view (responsive)
- [ ] Test dark mode
- [ ] Test dengan lokasi berbeda
- [ ] No console warnings

## Reporting Bugs

Jika menemukan bug:
1. Cek [Issues](https://github.com/yourusername/jadwalshalat/issues) - mungkin sudah dilaporkan
2. Buat Issue baru dengan template:
   - **Deskripsi Bug**: Apa yang terjadi?
   - **Langkah Reproduksi**: Bagaimana bug terjadi?
   - **Expected Behavior**: Apa yang seharusnya terjadi?
   - **Screenshots**: Jika ada
   - **Environment**: Browser, OS, device

## Request Feature

Punya ide fitur baru?
1. Buka Issue baru dengan label `enhancement`
2. Jelaskan:
   - **Problem**: Masalah apa yang diselesaikan?
   - **Solution**: Solusi yang Anda usulkan
   - **Alternatives**: Alternatif lain yang dipertimbangkan

## Questions?

Jangan ragu untuk bertanya di:
- GitHub Issues
- Email: your.email@example.com

---

**Terima kasih atas kontribusi Anda! 🙏**
