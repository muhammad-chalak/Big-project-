// JavaScript سەرەکی بۆ پرۆژەی ئیسلامی

// کاتەکانی پەیج بۆ چالاککردنی ئەنیمەیشنەکان
document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
    setupEventListeners();
    loadInitialContent();
});

// دەستپێکردنی سایتی
function initializeSite() {
    // چالاککردنی بەشی هەواڵەکان
    setupNewsTicker();
    
    // چالاککردنی سیستەمی زمان
    setupLanguageSystem();
    
    // چالاککردنی سیستەمی گەڕان
    setupSearchSystem();
    
    // چالاککردنی سیستەمی تۆمارکردن
    setupSubscription();
    
    // چالاککردنی ئەنیمەیشنەکان
    setupAnimations();
    
    // چالاککردنی کاریگەرییەکانی کارتەکان
    setupCardEffects();
}

// دانانی گوێگرەکان بۆ ڕووداوەکان
function setupEventListeners() {
    // گۆڕینی تێم
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // گۆڕینی زمان
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.dataset.lang);
        });
    });
    
    // گەڕان
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('focus', showSearchDropdown);
        searchInput.addEventListener('blur', hideSearchDropdown);
    }
    
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // پەڕەگەڕان
    window.addEventListener('scroll', handleScroll);
    
    // کاریگەرییەکانی ماووس
    setupHoverEffects();
}

// بارکردنی ناوەڕۆکی سەرەتا
function loadInitialContent() {
    // نیشاندانی کارتەکان بە شێوەیەکی کاتبەند
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 200);
    });
    
    // نیشاندانی زانایان بە شێوەیەکی کاتبەند
    const scholarCards = document.querySelectorAll('.scholar-card');
    scholarCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-in-bottom');
        }, index * 300);
    });
    
    // بارکردنی داتا
    loadSampleData();
}

// سیستەمی هەواڵەکان
function setupNewsTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) return;
    
    const tickerItems = tickerContent.querySelectorAll('span');
    let currentIndex = 0;
    
    // نیشاندانی یەکەم ئایتم
    if (tickerItems.length > 0) {
        tickerItems[0].classList.add('active');
    }
    
    // گۆڕینی هەواڵەکان هەر ٥ چرکەیەک
    setInterval(() => {
        if (tickerItems.length > 0) {
            tickerItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % tickerItems.length;
            tickerItems[currentIndex].classList.add('active');
        }
    }, 5000);
}

// سیستەمی زمان
function setupLanguageSystem() {
    // چێکردنی زمانەکانی ناوەخۆ
    const savedLang = localStorage.getItem('preferredLanguage') || 'ku';
    switchLanguage(savedLang, false);
}

function switchLanguage(lang, save = true) {
    // چالاککردنی دوگمەی زمان
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // لەبەرگرتنەوەی زمان لە ناوەخۆ
    if (save) {
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // وەرگێڕانی ناوەڕۆک (لێرەدا تەنها نموونەیەکە)
    translateContent(lang);
}

function translateContent(lang) {
    // لە ڕاستیدا، ئەمە پێویستی بە APIی وەرگێڕان هەیە
    // لێرەدا تەنها نیشاندانی هەواڵێکە
    console.log(`وەرگێڕان بۆ زمانی ${lang}`);
    
    // گۆڕینی دەقە سادەکان بەپێی زمان
    const translations = {
        ku: {
            searchPlaceholder: "گەڕان بەناو پرۆژەکە...",
            welcome: "بەخێربێن بۆ گەورەترین سەنتەری زانستی ئیسلامی"
        },
        ar: {
            searchPlaceholder: "البحث في المشروع...",
            welcome: "مرحبًا بكم في أكبر مركز علمي إسلامي"
        },
        en: {
            searchPlaceholder: "Search through the project...",
            welcome: "Welcome to the largest Islamic scientific center"
        },
        fa: {
            searchPlaceholder: "جستجو در پروژه...",
            welcome: "به بزرگترین مرکز علمی اسلامی خوش آمدید"
        }
    };
    
    const t = translations[lang] || translations.ku;
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    
    const welcomeText = document.querySelector('.hero-title');
    if (welcomeText) welcomeText.textContent = t.welcome;
}

// سیستەمی گەڕان
function setupSearchSystem() {
    // بۆ نموونە، داتایەکی سادە
    window.searchData = [
        { title: "مێژووی ئیسلام", url: "history.html", category: "مێژوو" },
        { title: "زانایانی ئیسلامی", url: "scholars.html", category: "زانایان" },
        { title: "کتێبە ئیسلامییەکان", url: "books.html", category: "کتێب" },
        { title: "قورئان", url: "#", category: "قورئان" },
        { title: "شارستانییەتی ئیسلامی", url: "#", category: "شارستانییەت" },
        { title: "هونەری ئیسلامی", url: "#", category: "هونەر" },
        { title: "زانست لە ئیسلامدا", url: "#", category: "زانست" },
        { title: "فەلسەفەی ئیسلامی", url: "#", category: "فەلسەفە" }
    ];
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    if (query.length > 0) {
        showSearchDropdown();
        updateSearchSuggestions(query);
    } else {
        hideSearchDropdown();
    }
}

function showSearchDropdown() {
    const dropdown = document.getElementById('searchDropdown');
    if (dropdown) dropdown.style.display = 'block';
}

function hideSearchDropdown() {
    // دوای کەمێک بۆ ئەوەی کرتەکردن لەسەر لینکەکان بکرێت
    setTimeout(() => {
        const dropdown = document.getElementById('searchDropdown');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

function updateSearchSuggestions(query) {
    const dropdown = document.getElementById('searchDropdown');
    if (!dropdown) return;
    
    const suggestions = window.searchData.filter(item => 
        item.title.includes(query) || item.category.includes(query)
    );
    
    let html = '<div class="search-suggestions"><h3>ئەنجامەکان:</h3>';
    
    if (suggestions.length > 0) {
        suggestions.forEach(item => {
            html += `<a href="${item.url}"><i class="fas fa-search"></i> ${item.title} <span class="search-category">(${item.category})</span></a>`;
        });
    } else {
        html += '<p class="no-results">هیچ ئەنجامێک نەدۆزرایەوە</p>';
    }
    
    html += '</div>';
    dropdown.innerHTML = html;
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        alert(`گەڕان بۆ: ${query}\n\nلە ڕاستیدا، ئەمە پێویستی بە پەیوەندیکردن بە سێرڤەر هەیە.`);
        // لە ڕاستیدا: window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// سیستەمی تۆمارکردن
function setupSubscription() {
    const form = document.getElementById('subscribeForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // لە ڕاستیدا، ئەمە پێویستی بە AJAX هەیە
                alert(`سوپاس بۆ تۆمارکردنت! ئیمەیڵەکەت ${email} تۆمارکرا.`);
                this.reset();
            } else {
                alert('تکایە ئیمەیڵێکی دروست بنووسە.');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// سیستەمی تێم
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#themeToggle i');
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// چالاککردنی تێمی پاشەکەوتکراو
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';
    
    if (isDark) {
        document.body.classList.add('dark-theme');
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// کاریگەرییەکانی ماووس
function setupHoverEffects() {
    // کارتەکان
    const cards = document.querySelectorAll('.featured-card, .scholar-card, .feature-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// کاریگەرییەکانی سکرۆڵ
function handleScroll() {
    // نیشاندانی دوگمەی گەڕانەوە بۆ سەرەوە
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        if (scrollTop > 500) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
    
    // چالاککردنی ئەنیمەیشنەکان کاتێک لە بینەردایە
    activateScrollAnimations();
}

// ئەنیمەیشنەکانی سکرۆڵ
function setupAnimations() {
    // زیادکردنی دوگمەی گەڕانەوە بۆ سەرەوە
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function activateScrollAnimations() {
    const elements = document.querySelectorAll('.timeline-item, .feature-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        
        if (position < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

// کاریگەرییەکانی کارتەکان
function setupCardEffects() {
    // کلیککردن لەسەر کارتەکان
    const cards = document.querySelectorAll('.featured-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('card-link')) {
                const link = this.querySelector('.card-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });
}

// بارکردنی داتای نموونەیی
function loadSampleData() {
    // لە ڕاستیدا، ئەمە پێویستی بە API هەیە
    console.log('داتای نموونەیی بارکرا');
}

// فەنکشنی گشتی بۆ نمایشدانی هەواڵ
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // نیشاندان
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // داخستن
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // خۆکار داخستن
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// دەستپێکردنی پاش تەواوبوونی بارکردن
window.addEventListener('load', function() {
    // بارکردنی تێمی پاشەکەوتکراو
    loadSavedTheme();
    
    // نیشاندانی هەواڵی بەخێربێن
    setTimeout(() => {
        showNotification('بەخێربێن بۆ پرۆژەی ئیسلامی! هەموو تایبەتمەندییەکان ئێستا بەردەستن.', 'success');
    }, 1000);
});