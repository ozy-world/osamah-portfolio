# Yaklaşık 4 dakikalık sunum notları

## 0:00–0:30 — Giriş
Merhaba, ben Osamah. Bu projede React ile kişisel portfolyomu geliştirdim. Verilen tasarımlardan ikinci alternatifi temel aldım. Projeyi Vite ile oluşturdum. React, CSS, Context API ve Axios kullandım.

## 0:30–1:40 — Uygulama
Önce ana sayfayı, yeteneklerimi, profilimi ve projelerimi göstereceğim. Sağ üstteki butonlardan temayı ve dili değiştirebiliyorum. Sayfayı yenilediğimde tercihlerim korunuyor, çünkü localStorage'a kaydediliyor. Küçük ekranlarda bölümler alt alta geliyor.

## 1:40–2:40 — Component ve veri yapısı
main.jsx dosyasında her bölüm için ayrı bir component var. Header, Hero, Skills, Profile, Projects ve Footer kullandım. Tekrar eden yetenek ve proje kartlarını map ile oluşturdum. Türkçe ve İngilizce içerikleri data.js dosyasında tuttum. Böylece metinleri değiştirmek için arayüz koduna müdahale etmem gerekmiyor.

## 2:40–3:30 — State ve API
SettingsProvider dil ve tema bilgisini tutuyor. Component'lar bu bilgilere useContext ile erişiyor. useEffect, tercihler değiştiğinde localStorage'ı ve sayfanın temasını güncelliyor. Projects component'ı Axios ile GitHub API'den kendi hesabımdaki repository'leri getiriyor. Yükleme, hata ve boş liste durumlarını ayrı gösteriyorum. Component kaldırılırsa devam eden isteği AbortController ile iptal ediyorum.

## 3:30–4:00 — Kapanış
Bu projede component yapısını, veri akışını ve API kullanımını birlikte uyguladım. En sevdiğim özellik dil ve tema tercihlerinin korunması oldu. İleride daha fazla proje eklemek ve tasarımı geliştirmek istiyorum. Teşekkür ederim.

Sunumu ezberlemek yerine her özelliği uygulamada göstererek kendi cümlelerinle anlat. Anlamadığın satırları sunumdan önce incele.
