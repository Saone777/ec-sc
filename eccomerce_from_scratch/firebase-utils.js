// Firebase utils - simplified for browser script tags (no import/export)
const firebaseConfig = {
  apiKey: "AIzaSyB3nQgj8oV1okOZAtDslw6NsM4tx-HGacw",
  authDomain: "flexwear-c2921.firebaseapp.com",
  projectId: "flexwear-c2921",
  storageBucket: "flexwear-c2921.firebasestorage.app",
  messagingSenderId: "182122475555",
  appId: "1:182122475555:web:995f5ccd049b0479b20196",
  databaseURL: "https://flexwear-c2921-default-rtdb.firebaseio.com/",
};

// Load Firebase SDKs
const script1 = document.createElement("script");
script1.src =
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js";
document.head.appendChild(script1);

const script2 = document.createElement("script");
script2.src =
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth-compat.js";
document.head.appendChild(script2);

const script3 = document.createElement("script");
script3.src =
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-database-compat.js";
document.head.appendChild(script3);

script3.onload = () => {
  window.firebase.initializeApp(firebaseConfig);
  window.auth = window.firebase.auth();
  window.db = window.firebase.database();
  signInAnonymously();
};

// Get or create user ID
async function getUserId() {
  return new Promise((resolve) => {
    window.auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        const userData = JSON.parse(localStorage.getItem("user")) || {};
        resolve(
          userData.email
            ? btoa(userData.email)
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(0, 20)
            : "anonymous_" + Date.now(),
        );
      }
    });
  });
}

// Sign in anonymously
function signInAnonymously() {
  window.auth.signInAnonymously().catch(console.error);
}

// Load cart from Firebase
async function loadCartFromDB() {
  const userId = await getUserId();
  const snapshot = await window.db.ref(`carts/${userId}/items`).once("value");
  if (snapshot.exists()) {
    const items = snapshot.val();
    const cart = Object.values(items).map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

// Save cart to Firebase
async function saveCartToDB() {
  const userId = await getUserId();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const items = {};
  cart.forEach((item) => {
    items[item.id] = item;
  });
  await window.db.ref(`carts/${userId}`).set({ items });
}

// Remove item from cart in Firebase
async function removeItemFromDB(productId) {
  const userId = await getUserId();
  await window.db.ref(`carts/${userId}/items/${productId}`).remove();
}

// Global functions
window.loadCartFromDB = loadCartFromDB;
window.saveCartToDB = saveCartToDB;
window.removeItemFromDB = removeItemFromDB;
window.getUserId = getUserId;
