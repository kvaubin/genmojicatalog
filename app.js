{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Theme handling\
document.addEventListener('DOMContentLoaded', function() \{\
    // Theme toggle functionality\
    const themeToggle = document.getElementById('themeToggle');\
    const themeIcon = themeToggle.querySelector('i');\
    \
    // Check for saved theme preference\
    const savedTheme = localStorage.getItem('theme');\
    if (savedTheme === 'dark') \{\
        document.documentElement.setAttribute('data-theme', 'dark');\
        themeIcon.classList.replace('fa-moon', 'fa-sun');\
    \}\
    \
    function toggleTheme() \{\
        const currentTheme = document.documentElement.getAttribute('data-theme');\
        if (currentTheme === 'dark') \{\
            document.documentElement.removeAttribute('data-theme');\
            themeIcon.classList.replace('fa-sun', 'fa-moon');\
            localStorage.setItem('theme', 'light');\
        \} else \{\
            document.documentElement.setAttribute('data-theme', 'dark');\
            themeIcon.classList.replace('fa-moon', 'fa-sun');\
            localStorage.setItem('theme', 'dark');\
        \}\
    \}\
    \
    themeToggle.addEventListener('click', toggleTheme);\
\
    // Tab functionality\
    const tabItems = document.querySelectorAll('.tab-item');\
    tabItems.forEach(tab => \{\
        tab.addEventListener('click', () => \{\
            tabItems.forEach(t => t.classList.remove('active'));\
            tab.classList.add('active');\
            updateContent(tab.textContent.trim());\
        \});\
    \});\
\});\
\
// Catalog item rendering\
function createCatalogItem(item) \{\
    const div = document.createElement('div');\
    div.className = 'catalog-item';\
    div.innerHTML = `\
        <div class="emoji">$\{item.emoji\}</div>\
        <h2 class="title">$\{item.title\}</h2>\
        <p class="description">$\{item.description\}</p>\
    `;\
    return div;\
\}\
\
// Example catalog data (replace with your actual data source)\
const catalogItems = [\
    \{ emoji: '\uc0\u55356 \u57119 ', title: 'Star', description: 'A shining star emoji' \},\
    \{ emoji: '\uc0\u55356 \u57256 ', title: 'Art', description: 'Artist palette' \},\
    // Add more items as needed\
];\
\
// Update content based on selected tab\
function updateContent(tabName) \{\
    const catalogGrid = document.getElementById('catalog-grid');\
    catalogGrid.innerHTML = '';\
\
    switch(tabName.toLowerCase()) \{\
        case 'catalog':\
            catalogItems.forEach(item => \{\
                catalogGrid.appendChild(createCatalogItem(item));\
            \});\
            break;\
        case 'create':\
            // Add create view content\
            catalogGrid.innerHTML = '<div class="create-view">Create View Coming Soon</div>';\
            break;\
        case 'favorites':\
            // Add favorites view content\
            catalogGrid.innerHTML = '<div class="favorites-view">Favorites Coming Soon</div>';\
            break;\
        case 'profile':\
            // Add profile view content\
            catalogGrid.innerHTML = '<div class="profile-view">Profile Coming Soon</div>';\
            break;\
    \}\
\}\
\
// Initial content load\
window.onload = () => \{\
    updateContent('catalog');\
\};}