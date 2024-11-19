// Theme handling
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);

    // Initial content load
    loadCatalogItems();
});

// Sample Genmoji catalog data
const gemojiItems = [
    {
        emoji: '🌟',
        title: 'Star',
        description: 'A shining star genmoji'
    },
    {
        emoji: '🎨',
        title: 'Art',
        description: 'Artist palette genmoji'
    },
    {
        emoji: '🎮',
        title: 'Game',
        description: 'Gaming controller genmoji'
    },
    // Add more items as needed
];

// Function to create a catalog item
function createCatalogItem(item) {
    const div = document.createElement('div');
    div.className = 'catalog-item';
    div.innerHTML = `
        <div class="emoji">${item.emoji}</div>
        <h2 class="title">${item.title}</h2>
        <p class="description">${item.description}</p>
        <div class="item-actions">
            <button class="favorite-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    return div;
}

// Function to load catalog items
function loadCatalogItems() {
    const catalogGrid = document.getElementById('catalog-grid');
    catalogGrid.innerHTML = ''; // Clear existing items
    
    gemojiItems.forEach(item => {
        const itemElement = createCatalogItem(item);
        catalogGrid.appendChild(itemElement);
    });
}

// Add these styles to your styles.css file
const additionalStyles = `
.emoji {
    font-size: 48px;
    margin-bottom: 10px;
}

.item-actions {
    margin-top: 10px;
}

.favorite-btn {
    background: none;
    border: none;
    color: #ff4757;
    cursor: pointer;
    padding: 5px;
    transition: transform 0.2s ease;
}

.favorite-btn:hover {
    transform: scale(1.1);
}
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
