import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getFirestore, collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};

try {
    // Initialize Firebase with error handling
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log("Firebase initialized successfully");

    // Listen for real-time updates
    const q = query(collection(db, "genmoji"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const container = document.getElementById("genmoji-container");
        container.innerHTML = "";
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="no-data">No Genmojis found. Create some in the iOS app!</p>';
            return;
        }
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const card = createGemojiCard(data);
            container.appendChild(card);
        });
    }, (error) => {
        console.error("Error listening to Firestore:", error);
        const container = document.getElementById("genmoji-container");
        container.innerHTML = '<p class="error">Error loading Genmojis. Please try again later.</p>';
    });

} catch (error) {
    console.error("Error initializing Firebase:", error);
    const container = document.getElementById("genmoji-container");
    container.innerHTML = '<p class="error">Error connecting to Firebase. Please check your configuration.</p>';
}

function createGemojiCard(data) {
    const card = document.createElement("div");
    card.className = "genmoji-card";
    
    const content = data.imageData 
        ? `<img src="data:image/png;base64,${data.imageData}" alt="${data.name}" class="genmoji-image">`
        : `<div class="genmoji-text">${data.contentString}</div>`;
    
    const date = data.createdAt?.toDate();
    const timeAgo = date ? getTimeAgo(date) : '';
    
    card.innerHTML = `
        <div class="genmoji-content">
            ${content}
        </div>
        <div class="genmoji-info">
            <h3>${data.name}</h3>
            <p class="creator">by ${data.creator}</p>
            <div class="stats">
                <span>❤️ ${data.likes}</span>
                <span>⭐️ ${data.votes}</span>
            </div>
            <p class="time">${timeAgo}</p>
        </div>
    `;
    
    return card;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
}
