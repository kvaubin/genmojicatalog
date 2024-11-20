// Add this to your existing app.js
function syncWithApp(gemojiData) {
    // Update local storage
    localStorage.setItem('gemojiItems', JSON.stringify(gemojiData));
    
    // Update display
    updateCatalog();
}

// Add an API endpoint to receive updates
if (window.location.pathname.includes('/api/sync')) {
    addEventListener('fetch', event => {
        event.respondWith(handleSync(event.request));
    });
}

async function handleSync(request) {
    if (request.method === 'POST') {
        const gemojiData = await request.json();
        syncWithApp(gemojiData);
        return new Response('Sync successful', { status: 200 });
    }
    return new Response('Method not allowed', { status: 405 });
}
