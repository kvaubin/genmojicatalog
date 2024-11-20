document.addEventListener('DOMContentLoaded', function() {
    const catalogGrid = document.getElementById('catalog-grid');
    const themeToggle = document.getElementById('themeToggle');
    
    // Theme toggle functionality
    function updateThemeIcon(isDark) {
        themeToggle.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        updateThemeIcon(!isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }
    
    // Function to create a Genmoji item
    function createGemojiItem(item) {
        const div = document.createElement('div');
        div.className = 'catalog-item';
        div.innerHTML = `
            <div class="emoji">${item.emoji}</div>
            <h2 class="title">${item.title}</h2>
            <p class="description">${item.description}</p>
        `;
        return div;
    }
    
    // Function to load Genmoji items
    async function loadGemojiItems() {
        // Replace this with your actual data source
        const items = [
            { emoji: '🌟', title: 'Star', description: 'A shining star genmoji' },
            { emoji: '🎨', title: 'Art', description: 'Artist palette genmoji' },
            { emoji: '🎮', title: 'Game', description: 'Gaming controller genmoji' },
            // Add more items as they're added to your app
        ];
        
        catalogGrid.innerHTML = '';
        items.forEach(item => {
            catalogGrid.appendChild(createGemojiItem(item));
        });
    }
    
    // Initial load
    loadGemojiItems();
});
