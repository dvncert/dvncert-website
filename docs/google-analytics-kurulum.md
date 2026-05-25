# Yönetim panelinde Google Analytics + Search Console verisi

Yönetim panelindeki "Genel Bakış" sayfası, sitenin **gerçek ziyaretçi** (GA4) ve
**arama performansı** (Search Console) verilerini gösterir. Bunun için bir kez
Google Cloud servis hesabı kurmanız ve Vercel'e üç ortam değişkeni eklemeniz yeterli.

Ölçüm etiketi (`G-3VJDV7WQBG`) zaten sitede yüklü ve veri topluyor; buradaki adımlar
o veriyi **panele çekmek** içindir.

---

## 1. Google Cloud projesi + servis hesabı

1. https://console.cloud.google.com → üstten bir proje seçin ya da **New Project** ile oluşturun.
2. **APIs & Services → Library**'den şu ikisini **Enable** edin:
   - **Google Analytics Data API**
   - **Google Search Console API**
3. **APIs & Services → Credentials → Create Credentials → Service account**:
   - Bir ad verin (ör. `dvncert-panel-okuyucu`), **Create and continue**, rol vermeden **Done**.
4. Oluşan servis hesabına tıklayın → **Keys → Add key → Create new key → JSON → Create**.
   - İnen `.json` dosyasını saklayın. İçinde `client_email` (…@…iam.gserviceaccount.com) ve `private_key` var.

> `client_email` adresini bir sonraki adımda yetki verirken kullanacaksınız.

## 2. Yetkilendirme

**Google Analytics (GA4):**
1. https://analytics.google.com → **Yönetici (Admin)** → ilgili **Mülk (Property)** → **Mülk erişim yönetimi**.
2. **+ → Kullanıcı ekle**: servis hesabının `client_email` adresini yapıştırın, rol **Görüntüleyici (Viewer)**, ekleyin.
3. **Mülk numarasını** not edin: **Yönetici → Mülk ayarları → Mülk Kimliği** (yalnızca rakam, ör. `123456789`).

**Search Console:**
1. https://search.google.com/search-console → mülkünüzü seçin → **Ayarlar → Kullanıcılar ve izinler**.
2. **Kullanıcı ekle**: aynı `client_email` adresini ekleyin, izin **Tam (Full)** ya da **Sınırlı**.
3. Mülk adresini not edin:
   - Alan adı mülkü ise: `sc-domain:dvncert.com`
   - URL öneki mülkü ise: `https://dvncert.com/` (sondaki `/` dahil)

## 3. Vercel ortam değişkenleri

Vercel → proje → **Settings → Environment Variables** (Production; istenirse Preview de):

| Key | Değer |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | İnen JSON dosyasının **tüm içeriği** (kopyala-yapıştır). |
| `GA4_PROPERTY_ID` | GA4 mülk numarası, ör. `123456789` |
| `GSC_SITE_URL` | `sc-domain:dvncert.com` ya da `https://dvncert.com/` |

> JSON'u yapıştırırken sorun yaşarsanız, dosyayı base64'e çevirip öyle de koyabilirsiniz
> (kod her iki biçimi de kabul eder):
> - PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("anahtar.json"))`
> - macOS/Linux: `base64 -i anahtar.json`

Kaydedince **Deployments → en üstteki deploy → ⋯ → Redeploy** ile yeniden yayınlayın
(ortam değişkenleri ancak yeni dağıtımda etkin olur).

## 4. Yerel geliştirme (opsiyonel)

Aynı üç değişkeni `.env.local` dosyasına ekleyin. `GOOGLE_SERVICE_ACCOUNT_JSON` için
JSON tek satıra sığmıyorsa base64 biçimini kullanmak en kolayı.

---

## Notlar

- Panelde veriler **15 dakika önbelleklenir** (her sayfa açılışında Google'a istek atılmaz).
- GA4 verisi neredeyse anlıktır; **Search Console verisi 2–3 gün gecikmelidir** (panel son 3 günü hariç tutar).
- Yapılandırma eksikse panel çökmeden "henüz bağlı değil" notu gösterir; yetki/numarada hata varsa
  ilgili bölümde kırmızı bir hata kutusu çıkar.
- Tek servis hesabı hem GA4 hem Search Console için yeterlidir.
