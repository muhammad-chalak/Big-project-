// JavaScript بۆ سیستەمی گەڕانی پێشکەوتوو

class AdvancedSearch {
    constructor() {
        this.searchIndex = [];
        this.searchResults = [];
        this.currentQuery = '';
        this.init();
    }
    
    async init() {
        await this.buildSearchIndex();
        this.setupSearchUI();
        this.setupKeyboardShortcuts();
    }
    
    async buildSearchIndex() {
        try {
            // لە ڕاستیدا، ئەمە پێویستی بە بارکردنی لە سێرڤەر هەیە
            // لێرەدا تەنها داتای نموونەیی دروست دەکەین
            this.searchIndex = [
                {
                    id: 1,
                    title: "مێژووی ئیسلام",
                    content: "مێژووی ئیسلام لە دامەزراندنی دەوڵەتی ئیسلامیەوە تا ئەمڕۆ. گەشەسەندنی شارستانییەتی ئیسلامی لە هەموو لایەنەکانیەوە.",
                    url: "history.html",
                    category: "مێژوو",
                    tags: ["مێژوو", "ئیسلام", "شارستانییەت"],
                    importance: 10
                },
                {
                    id: 2,
                    title: "زانایانی ئیسلامی",
                    content: "ژیان و کارەکانی گەورە زانایانی ئیسلامی لە هەموو بوارەکانەوە: فێقه، هەڵگەڕانەوە، فیزیا، ماتماتیک.",
                    url: "scholars.html",
                    category: "زانایان",
                    tags: ["زانایان", "فێقه", "زانست"],
                    importance: 9
                },
                {
                    id: 3,
                    title: "کتێبە ئیسلامییەکان",
                    content: "کتێبە بەناوبانگەکانی میراتی ئیسلامی، لە چاپی کۆنەوە تا وەشانە دیجیتاڵییەکانی ئەمڕۆ.",
                    url: "books.html",
                    category: "کتێب",
                    tags: ["کتێب", "میرات", "سەرچاوە"],
                    importance: 8
                },
                {
                    id: 4,
                    title: "قورئان",
                    content: "کتێبی پیرۆزی قورئان، وەرگێڕان، لێکدانەوە و زانستی قورئان.",
                    url: "quran.html",
                    category: "قورئان",
                    tags: ["قورئان", "عەرەبی", "لێکدانەوە"],
                    importance: 10
                },
                {
                    id: 5,
                    title: "شارستانییەتی ئیسلامی",
                    content: "شارستانییەتی ئیسلامی و دەستکەوتەکانی لە زانست، هونەر، پێگەیشتن و تەلارسازی.",
                    url: "civilization.html",
                    category: "شارستانییەت",
                    tags: ["شارستانییەت", "هونەر", "تەلارسازی"],
                    importance: 7
                },
                {
                    id: 6,
                    title: "هونەری ئیسلامی",
                    content: "هونەری ئیسلامی، نیگارکێشان، خط، تەلارسازی و کاری دەستی.",
                    url: "art.html",
                    category: "هونەر",
                    tags: ["هونەر", "نیگار", "خط"],
                    importance: 6
                },
                {
                    id: 7,
                    title: "زانست لە ئیسلامدا",
                    content: "بەشداری زانایانی ئیسلامی لە گەشەسەندنی زانستە جیاوازەکاندا.",
                    url: "science.html",
                    category: "زانست",
                    tags: ["زانست", "پزیشکی", "فەلسەفە"],
                    importance: 8
                },
                {
                    id: 8,
                    title: "فەلسەفەی ئیسلامی",
                    content: "فەلسەفە و بیرکردنەوە لە شارستانییەتی ئیسلامیدا، لە ڕۆژگاری کۆنەوە تا مۆدێرن.",
                    url: "philosophy.html",
                    category: "فەلسەفە",
                    tags: ["فەلسەفە", "بیرکردنەوە", "منطق"],
                    importance: 7
                }
            ];
            
            console.log('پێکهاتەی گەڕان دروستکرا بە', this.searchIndex.length, 'تۆمار');
        } catch (error) {
            console.error('هەڵە لە دروستکردنی پێکهاتەی گەڕان:', error);
        }
    }
    
    setupSearchUI() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            // گوێگرتن بۆ تێکردن
            searchInput.addEventListener('input', (e) => {
                this.currentQuery = e.target.value.trim();
                this.handleRealTimeSearch();
            });
            
            // گوێگرتن بۆ فۆکەس
            searchInput.addEventListener('focus', () => {
                this.showSearchSuggestions();
            });
            
            // گوێگرتن بۆ کیبۆرد
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                } else if (e.key === 'Escape') {
                    this.hideSearchDropdown();
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateSuggestions(e.key);
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }
        
        // دروستکردنی dropdownی گەڕان
        this.createSearchDropdown();
    }
    
    createSearchDropdown() {
        let dropdown = document.getElementById('searchDropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'searchDropdown';
            dropdown.className = 'search-dropdown';
            dropdown.style.display = 'none';
            
            const searchBox = document.querySelector('.search-box');
            if (searchBox) {
                searchBox.appendChild(dropdown);
            }
        }
    }
    
    handleRealTimeSearch() {
        if (this.currentQuery.length === 0) {
            this.hideSearchDropdown();
            return;
        }
        
        if (this.currentQuery.length < 2) {
            this.showSearchSuggestions();
            return;
        }
        
        this.search(this.currentQuery);
        this.showSearchResults();
    }
    
    search(query) {
        if (!query || query.length < 2) {
            this.searchResults = [];
            return;
        }
        
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        
        this.searchResults = this.searchIndex.map(item => {
            let score = 0;
            
            // پشکنینی ناونیشان
            searchTerms.forEach(term => {
                if (item.title.toLowerCase().includes(term)) {
                    score += 10;
                }
            });
            
            // پشکنینی ناوەڕۆک
            searchTerms.forEach(term => {
                if (item.content.toLowerCase().includes(term)) {
                    score += 5;
                }
            });
            
            // پشکنینی تاگەکان
            searchTerms.forEach(term => {
                if (item.tags.some(tag => tag.toLowerCase().includes(term))) {
                    score += 8;
                }
            });
            
            // پشکنینی بەش
            searchTerms.forEach(term => {
                if (item.category.toLowerCase().includes(term)) {
                    score += 7;
                }
            });
            
            // زیادکردنی گرنگی
            score += item.importance;
            
            return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // تەنها ١٠ ئەنجامی سەرەکی
    }
    
    showSearchSuggestions() {
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown) return;
        
        // نیشاندانی پێشنیارەکانی گەڕان
        const suggestions = this.getSearchSuggestions();
        
        let html = `
            <div class="search-suggestions">
                <h3><i class="fas fa-lightbulb"></i> پێشنیارەکانی گەڕان</h3>
                <div class="suggestions-list">
        `;
        
        suggestions.forEach(suggestion => {
            html += `
                <a href="#" class="suggestion-item" data-suggestion="${suggestion}">
                    <i class="fas fa-search"></i>
                    <span>${suggestion}</span>
                </a>
            `;
        });
        
        html += `
                </div>
                <div class="search-tips">
                    <h4><i class="fas fa-tips"></i> ڕێنماییەکانی گەڕان:</h4>
                    <p>• بەکارهێنانی وشەی زیاتر بۆ ئەنجامێکی وردتر</p>
                    <p>• بەکارهێنانی "..." بۆ گەڕانی تەواو</p>
                    <p>• بەکارهێنانی - بۆ لابردنی وشە</p>
                </div>
            </div>
        `;
        
        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
        
        // زیادکردنی کاریگەری بۆ پێشنیارەکان
        this.setupSuggestionEvents();
    }
    
    getSearchSuggestions() {
        return [
            "مێژووی ئیسلام",
            "زانایانی ئیسلامی",
            "کتێبە ئیسلامییەکان",
            "قورئان",
            "شارستانییەتی ئیسلامی",
            "هونەری ئیسلامی",
            "زانست لە ئیسلامدا",
            "فەلسەفەی ئیسلامی"
        ];
    }
    
    showSearchResults() {
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown || this.searchResults.length === 0) {
            this.showNoResults();
            return;
        }
        
        let html = `
            <div class="search-results">
                <div class="results-header">
                    <h3><i class="fas fa-search"></i> ئەنجامەکانی گەڕان</h3>
                    <span class="results-count">${this.searchResults.length} ئەنجام</span>
                </div>
                <div class="results-list">
        `;
        
        this.searchResults.forEach(result => {
            const relevance = Math.min(Math.floor(result.score / 2), 100);
            
            html += `
                <a href="${result.url}" class="result-item">
                    <div class="result-content">
                        <h4>${result.title}</h4>
                        <p>${this.highlightQuery(result.content, this.currentQuery)}</p>
                        <div class="result-meta">
                            <span class="result-category">${result.category}</span>
                            <span class="result-relevance">
                                <i class="fas fa-chart-line"></i>
                                ${relevance}% هاوڕێیی
                            </span>
                        </div>
                    </div>
                    <div class="result-arrow">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                </a>
            `;
        });
        
        html += `
                </div>
                <div class="results-footer">
                    <button id="viewAllResults" class="btn-view-all">
                        <i class="fas fa-external-link-alt"></i>
                        بینینی هەموو ئەنجامەکان
                    </button>
                </div>
            </div>
        `;
        
        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
        
        // زیادکردنی کاریگەری بۆ بینینی هەموو ئەنجامەکان
        const viewAllBtn = document.getElementById('viewAllResults');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAllResults();
            });
        }
    }
    
    showNoResults() {
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown) return;
        
        const html = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>هیچ ئەنجامێک نەدۆزرایەوە</h3>
                <p>هیچ تۆمارێک بۆ "${this.currentQuery}" نەدۆزرایەوە. تکایە وشەیەکی جیاواز تاقی بکەرەوە.</p>
                <div class="search-tips">
                    <h4>ڕێنماییەکانی گەڕان:</h4>
                    <ul>
                        <li>دڵنیابە لە ڕێکخستنی وشەکان</li>
                        <li>هەوڵ بدە وشەیەکی سادەتر بەکاربهێنیت</li>
                        <li>بەکارهێنانی وشەی زیاتر بۆ ئەنجامێکی وردتر</li>
                    </ul>
                </div>
            </div>
        `;
        
        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
    }
    
    highlightQuery(text, query) {
        if (!query || query.length < 2) return text;
        
        const searchTerms = query.toLowerCase().split(' ');
        let highlightedText = text;
        
        searchTerms.forEach(term => {
            if (term.length > 1) {
                const regex = new RegExp(`(${term})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
            }
        });
        
        // کورتکردنەوەی دەقەکە
        if (highlightedText.length > 150) {
            highlightedText = highlightedText.substring(0, 150) + '...';
        }
        
        return highlightedText;
    }
    
    setupSuggestionEvents() {
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const suggestion = item.dataset.suggestion;
                document.getElementById('searchInput').value = suggestion;
                this.currentQuery = suggestion;
                this.performSearch();
            });
        });
    }
    
    navigateSuggestions(key) {
        const suggestions = document.querySelectorAll('.suggestion-item, .result-item');
        if (suggestions.length === 0) return;
        
        let currentIndex = -1;
        suggestions.forEach((item, index) => {
            if (item.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        let newIndex;
        if (key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % suggestions.length;
        } else {
            newIndex = currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1;
        }
        
        suggestions.forEach(item => item.classList.remove('active'));
        suggestions[newIndex].classList.add('active');
        
        // ڕێکخستنی سکرۆڵ بۆ بینینی ئایتمی چالاک
        suggestions[newIndex].scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
        });
    }
    
    performSearch() {
        if (this.currentQuery.length < 2) {
            this.showSearchSuggestions();
            return;
        }
        
        // لە ڕاستیدا، ئەمە پێویستی بە ناردنی بۆ سێرڤەر هەیە
        // لێرەدا تەنها نیشاندانی ئەنجامەکانی ناوەخۆییە
        this.search(this.currentQuery);
        
        if (this.searchResults.length > 0) {
            this.showSearchResults();
        } else {
            this.showNoResults();
        }
        
        // تۆمارکردنی گەڕان
        this.logSearch(this.currentQuery);
    }
    
    showAllResults() {
        // لە ڕاستیدا، ئەمە پێویستی بە پەڕەیەکی تایبەتی گەڕان هەیە
        // لێرەدا تەنها نیشاندانی هەواڵێکە
        alert(`بینینی هەموو ئەنجامەکان بۆ "${this.currentQuery}"\n\nلە ڕاستیدا، ئەمە پێویستی بە پەڕەیەکی تایبەتی گەڕان هەیە.`);
    }
    
    hideSearchDropdown() {
        const dropdown = document.getElementById('searchDropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
    
    logSearch(query) {
        // لە ڕاستیدا، ئەمە پێویستی بە ناردنی بۆ سێرڤەر هەیە
        console.log(`گەڕان: ${query}`);
        
        // پاشەکەوتکردن لە ناوەخۆ بۆ مێژووی گەڕان
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        searchHistory.unshift({
            query: query,
            timestamp: new Date().toISOString()
        });
        
        // پاراستنی تەنها ١٠ تۆماری دوایین
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory.slice(0, 10)));
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K بۆ فۆکەسکردنی سەرچاوەی گەڕان
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
            
            // / بۆ فۆکەسکردنی سەرچاوەی گەڕان
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    }
    
    getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }
    
    clearSearchHistory() {
        localStorage.removeItem('searchHistory');
    }
}

// دەستپێکردنی سیستەمی گەڕان
let advancedSearch;

document.addEventListener('DOMContentLoaded', function() {
    advancedSearch = new AdvancedSearch();
});

// فەنکشنی گشتی بۆ بەکارهێنان لە ئەندرۆیدا
function performSearch(query) {
    if (advancedSearch) {
        advancedSearch.currentQuery = query;
        advancedSearch.performSearch();
    }
}

// زیادکردنی CSS بۆ dropdownی گەڕان
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-results {
        max-height: 500px;
        overflow-y: auto;
    }
    
    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
    }
    
    .results-count {
        background-color: var(--primary-color);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
    }
    
    .results-list {
        padding: 10px 0;
    }
    
    .result-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
        text-decoration: none;
        color: var(--text-color);
        transition: var(--transition);
    }
    
    .result-item:hover {
        background-color: rgba(46, 139, 87, 0.05);
    }
    
    .result-item.active {
        background-color: rgba(46, 139, 87, 0.1);
    }
    
    .result-content {
        flex: 1;
    }
    
    .result-content h4 {
        color: var(--primary-dark);
        margin-bottom: 8px;
    }
    
    .result-content p {
        color: var(--text-light);
        font-size: 0.9rem;
        margin-bottom: 10px;
        line-height: 1.5;
    }
    
    .result-content mark {
        background-color: rgba(212, 175, 55, 0.3);
        color: inherit;
        padding: 2px 4px;
        border-radius: 3px;
    }
    
    .result-meta {
        display: flex;
        gap: 15px;
        font-size: 0.8rem;
    }
    
    .result-category {
        background-color: rgba(46, 139, 87, 0.1);
        color: var(--primary-color);
        padding: 3px 8px;
        border-radius: 12px;
    }
    
    .result-relevance {
        color: var(--secondary-color);
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .result-arrow {
        color: var(--text-light);
        font-size: 0.9rem;
    }
    
    .results-footer {
        padding: 15px;
        border-top: 1px solid var(--border-color);
        text-align: center;
    }
    
    .btn-view-all {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        transition: var(--transition);
    }
    
    .btn-view-all:hover {
        background-color: var(--primary-dark);
    }
    
    .no-results {
        padding: 30px;
        text-align: center;
    }
    
    .no-results-icon {
        font-size: 3rem;
        color: var(--text-light);
        margin-bottom: 20px;
    }
    
    .no-results h3 {
        color: var(--primary-dark);
        margin-bottom: 10px;
    }
    
    .no-results p {
        color: var(--text-light);
        margin-bottom: 20px;
    }
    
    .search-tips {
        background-color: rgba(46, 139, 87, 0.05);
        padding: 15px;
        border-radius: 10px;
        margin-top: 20px;
        text-align: right;
    }
    
    .search-tips h4 {
        color: var(--primary-dark);
        margin-bottom: 10px;
        font-size: 1rem;
    }
    
    .search-tips ul {
        padding-right: 20px;
        color: var(--text-light);
    }
    
    .search-tips li {
        margin-bottom: 5px;
    }
    
    .suggestions-list {
        padding: 10px 0;
    }
    
    .suggestion-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 15px;
        text-decoration: none;
        color: var(--text-color);
        border-radius: 8px;
        transition: var(--transition);
    }
    
    .suggestion-item:hover {
        background-color: rgba(46, 139, 87, 0.1);
    }
    
    .suggestion-item.active {
        background-color: rgba(46, 139, 87, 0.2);
    }
`;
document.head.appendChild(searchStyles);