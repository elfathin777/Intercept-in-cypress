# Cypress OrangeHRM Login Automation with Intercept

## Deskripsi

Project ini adalah automation testing menggunakan **Cypress** untuk menguji **fitur login di OrangeHRM** baik skenario **berhasil** maupun **gagal**.
Setiap test case wajib menggunakan **`cy.intercept()`** yang menangkap request API ke endpoint pada halaman OrangeHRM.

Intercept digunakan untuk memastikan aplikasi mengirim request yang benar, dan untuk memvalidasi response yang diintercept sesuai ekspektasi.

---

## Prasyarat

* Node.js (v14 atau lebih tinggi)
* NPM
* Koneksi Internet aktif (untuk akses ke [https://opensource-demo.orangehrmlive.com](https://opensource-demo.orangehrmlive.com))

---

## Instalasi Project Cypress

1. **Inisialisasi project Node.js**

   ```bash
   npm init -y
   ```

2. **Install Cypress**

   ```bash
   npm install cypress --save-dev
   ```

3. **Jalankan Cypress GUI**

   ```bash
   npx cypress open
   ```

---

## Cara Menjalankan Test

1. Pastikan koneksi internet aktif.
2. Jalankan:

   ```bash
   npx cypress open
   ```
3. Pilih file test yang telah dibuat (`intercept.cy.js`).
4. Pastikan semua test case **berhasil (ceklis hijau)** dan **intercept berhasil (ter-trigger dan mendapatkan response 200 atau sesuai yang dimock).**

---

## Daftar Test Case

| Kode Test  | Deskripsi                                                |
| ---------- | -------------------------------------------------------- |
| TC.Log.001 | Login dengan username dan password yang valid            |
| TC.Log.002 | Login gagal dengan username dan password yang invalid    |
| TC.Log.003 | Login gagal dengan username invalid dan password valid   |
| TC.Log.004 | Login gagal dengan username valid dan password invalid   |
| TC.Log.005 | Login gagal dengan username lowercase dan password valid |
| TC.Log.006 | Login gagal dengan username valid dan password uppercase |
| TC.Log.007 | Login gagal dengan username dan password kosong          |
| TC.Log.008 | Login gagal dengan username kosong dan password valid    |
| TC.Log.009 | Login gagal dengan username valid dan password kosong    |

---

## Tips

* Pastikan Anda menggunakan **`cy.intercept()`** di setiap test case untuk menangkap:

  ```javascript
  cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('actionSummary');
  ```

* Jangan lupa menggunakan:

  ```javascript
  cy.wait('@actionSummary');
  ```

  Untuk menunggu hingga request **action-summary** benar-benar terkirim dan divalidasi.


---

## Tools yang Digunakan

* Cypress
* JavaScript ES6

