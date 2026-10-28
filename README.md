# Osamah Abbood — React Portfolio

Workintech Sprint 12 projesi. İkinci Figma alternatifi temel alınmıştır.

## Çalıştırma

```sh
npm install
npm run dev
```

## Yayına hazırlama

```sh
npm run build
```

Vercel: Framework **Vite**, build command **npm run build**, output **dist**.
Render: Static Site, build **npm install && npm run build**, publish directory **dist**.

## Yapı

- `src/main.jsx`: Header, Hero, Skills, Profile, Projects ve Footer component'ları. SettingsProvider dil ve tema bilgisini paylaşır.
- `src/data.json`: Türkçe ve İngilizce metinler.
- `src/style.css`: Responsive tasarım ve tema renkleri.

Dil ve tema localStorage'da saklanır. Axios, GitHub API'den gerçek repository verilerini alır. İstek sırasında yükleme, boş sonuç ve hata durumları gösterilir. Başarısız istek tekrar denenebilir. GitHub API anonim isteklerde hız sınırı uygulayabilir.

## Kişiselleştirme

GitHub: https://github.com/ozy-world
Avatar GitHub profilinden alınır. Gerçek iletişim e-postası ve LinkedIn bilgisi verilmediği için eklenmedi.

## Teslim kontrolü

- [x] React ve Vite
- [x] Bölümlere ayrılmış component'lar
- [x] Context API
- [x] Türkçe / İngilizce (i18n paketi yok)
- [x] Açık / koyu tema ve localStorage
- [x] Axios API isteği, yükleme ve hata yönetimi
- [x] Responsive CSS
- [x] Production build
- [ ] Figma ile son görsel karşılaştırma
- [ ] GitHub repository bağlantısı
- [ ] Vercel / Render canlı bağlantısı
- [ ] Öğrencinin kaydedeceği Loom videosu

