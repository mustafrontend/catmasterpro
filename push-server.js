/**
 * Kedi App — Push Backend (Node.js + Express + firebase-admin)
 * VPS'te çalışır. FCM üzerinden hem Android hem iOS'a gönderir (iOS için APNs'i FCM iletir).
 *
 * Kurulum:
 *   npm init -y
 *   npm install express firebase-admin
 *
 * Firebase Console > Project Settings > Service Accounts > "Generate new private key"
 *   → indirdiğin JSON'u serviceAccountKey.json olarak bu dosyanın yanına koy.
 *   → .gitignore'a EKLE, repoya gönderme.
 *
 * iOS için: Firebase Console > Cloud Messaging > APNs Authentication Key (.p8) yükle (bir kez).
 *
 * Çalıştır: node push-server.js
 */

const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

// --- Basit token deposu (DEMO). Prod'da veritabanı kullan (Postgres/SQLite/Redis). ---
// Yapı: userId -> Set<token>
const tokenStore = new Map();

function saveToken(userId, token) {
  if (!tokenStore.has(userId)) tokenStore.set(userId, new Set());
  tokenStore.get(userId).add(token);
}

function getTokens(userId) {
  return Array.from(tokenStore.get(userId) || []);
}

function removeToken(token) {
  for (const set of tokenStore.values()) set.delete(token);
}

// --- Basit API korumasi (prod'da gerçek auth kullan) ---
const API_SECRET = process.env.API_SECRET || "degistir-bunu";
function requireSecret(req, res, next) {
  if (req.headers["x-api-secret"] !== API_SECRET) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

/**
 * 1) Cihaz token kaydı
 * Uygulama, @capacitor/push-notifications'tan aldığı token'ı buraya gönderir.
 * body: { userId, token, platform }
 */
app.post("/register-token", (req, res) => {
  const { userId, token } = req.body || {};
  if (!userId || !token) {
    return res.status(400).json({ error: "userId ve token zorunlu" });
  }
  saveToken(userId, token);
  res.json({ ok: true });
});

/**
 * 2) Belirli bir kullanıcıya push gönder (sunucudan tetiklenen bildirim)
 * Örn: winback kampanyası, "yeni içerik eklendi".
 * body: { userId, title, body, data? }
 */
app.post("/send", requireSecret, async (req, res) => {
  const { userId, title, body, data } = req.body || {};
  const tokens = getTokens(userId);
  if (tokens.length === 0) {
    return res.status(404).json({ error: "bu kullanici icin token yok" });
  }

  const message = {
    tokens,
    notification: { title, body },
    data: data || {}, // sadece string değerler kabul eder
    android: { priority: "high" },
    apns: {
      payload: { aps: { sound: "default" } },
    },
  };

  try {
    const resp = await admin.messaging().sendEachForMulticast(message);

    // Geçersiz/expired token'ları temizle
    resp.responses.forEach((r, i) => {
      if (!r.success) {
        const code = r.error?.code;
        if (
          code === "messaging/registration-token-not-registered" ||
          code === "messaging/invalid-registration-token"
        ) {
          removeToken(tokens[i]);
        }
      }
    });

    res.json({ successCount: resp.successCount, failureCount: resp.failureCount });
  } catch (err) {
    console.error("send error:", err);
    res.status(500).json({ error: "gonderim basarisiz" });
  }
});

/**
 * 3) Toplu / segment gönderim için topic kullanımı (opsiyonel ama önerilir)
 * Cihaz uygulama tarafında admin SDK olmadan topic'e abone OLAMAZ;
 * ya client SDK ile subscribe eder ya da sunucuda token'ı topic'e ekleriz:
 *   admin.messaging().subscribeToTopic(tokens, "all-users")
 * Sonra herkese tek çağrıyla:
 */
app.post("/send-topic", requireSecret, async (req, res) => {
  const { topic, title, body, data } = req.body || {};
  try {
    const id = await admin.messaging().send({
      topic,
      notification: { title, body },
      data: data || {},
    });
    res.json({ ok: true, id });
  } catch (err) {
    console.error("topic send error:", err);
    res.status(500).json({ error: "gonderim basarisiz" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Push backend calisiyor: http://localhost:${PORT}`));
