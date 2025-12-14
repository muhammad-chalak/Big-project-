// JavaScript بۆ سیستەمی گۆڕینی زمان

class LanguageSwitcher {
    constructor() {
        this.currentLang = 'ku';
        this.translations = {};
        this.init();
    }
    
    async init() {
        await this.loadTranslations();
        this.setupEventListeners();
        this.applySavedLanguage();
    }
    
    async loadTranslations() {
        try {
            // لە ڕاستیدا، ئەمە پێویستی بە بارکردنی لە سێرڤەر هەیە
            // لێرەدا تەنها نموونەیەک بەکارهێنراوە
            this.translations = {
                ku: this.getKurdishTranslations(),
                ar: this.getArabicTranslations(),
                en: this.getEnglishTranslations(),
                fa: this.getPersianTranslations()
            };
        } catch (error) {
            console.error('هەڵە لە بارکردنی وەرگێڕانەکان:', error);
        }
    }
    
    getKurdishTranslations() {
        return {
            // ماڵپەڕی سەرەکی
            "welcome": "بەخێربێن بۆ گەورەترین سەنتەری زانستی ئیسلامی",
            "subtitle": "پەیمانگایەکی فراوان بۆ لێکۆڵینەوە و ناسینی میراتی ئیسلامی",
            "search_placeholder": "گەڕان بەناو پرۆژەکە...",
            "featured_content": "ناوەڕۆکی تایبەت",
            "explore_sections": "گەڕان بەناو بەشە جیاوازەکانی پرۆژە",
            "islamic_history": "مێژووی ئیسلام",
            "islamic_scholars": "زانایانی ئیسلامی",
            "islamic_books": "کتێب و سەرچاوەکان",
            "articles_research": "بابەت و لێکۆڵینەوە",
            
            // مێژوو
            "history_title": "مێژووی کورتەی ئیسلام",
            "history_subtitle": "سەیرکردنی گەشەسەندنی شارستانییەتی ئیسلامی بە درێژایی سەدەکان",
            "view_full_history": "بینینی مێژووی تەواو",
            
            // زانایان
            "scholars_title": "زانایانی بەناوبانگی ئیسلامی",
            "scholars_subtitle": "ئەو پسپۆڕانەی کە میراتی ئیسلامییان پێشخستووە",
            "view_all_scholars": "بینینی هەموو زانایان",
            
            // تایبەتمەندییەکان
            "features_title": "تایبەتمەندییەکانی پرۆژە",
            "features_subtitle": "ئەو شتانەی کە ئێمە جیادەکەینەوە",
            "multilingual": "فرە زمان",
            "advanced_search": "گەڕانی پێشکەوتوو",
            "extensive_data": "داتای فراوان",
            "responsive": "وەڵامدەرەوە",
            "islamic_design": "دیزاینی ئیسلامی",
            "resources_download": "داگرتنی سەرچاوەکان",
            
            // هەواڵنامە
            "newsletter_title": "بەشداری لە پرۆژەکە بکە",
            "newsletter_text": "تۆمار ببە بۆ وەرگرتنی هەواڵ و نوێکارییەکانی پرۆژەکە. هەروەها دەتوانیت بەشدار بیت لە زیادکردنی ناوەڕۆک.",
            "email_placeholder": "ئیمەیڵەکەت بنووسە",
            "subscribe": "تۆمارکردن",
            "agree_terms": "ڕازی دەبم بە مەرجەکانی بەکارهێنان و سیاسەتی پاراستنی هەواڵە تایبەتییەکان",
            
            // پێپەڕە
            "about_us": "دەربارەی ئێمە",
            "contact_us": "پەیوەندیمان پێوەبکە",
            "faq": "پرسیارە باوەکان",
            "terms": "مەرجەکانی بەکارهێنان",
            "privacy": "سیاسەتی پاراستنی هەواڵە تایبەتییەکان",
            "courses": "کۆرسەکان",
            "copyright": "هەموو مافەکان پارێزراون",
            "help": "یارمەتی"
        };
    }
    
    getArabicTranslations() {
        return {
            "welcome": "مرحبًا بكم في أكبر مركز علمي إسلامي",
            "subtitle": "معهد واسع للبحث والتعريف بالتراث الإسلامي",
            "search_placeholder": "البحث في المشروع...",
            "featured_content": "محتوى مميز",
            "explore_sections": "استكشاف الأقسام المختلفة للمشروع",
            "islamic_history": "التاريخ الإسلامي",
            "islamic_scholars": "علماء الإسلام",
            "islamic_books": "الكتب والمراجع",
            "articles_research": "مقالات وبحوث",
            "history_title": "نبذة عن التاريخ الإسلامي",
            "history_subtitle": "نظرة على تطور الحضارة الإسلامية عبر القرون",
            "view_full_history": "عرض التاريخ الكامل",
            "scholars_title": "أشهر علماء الإسلام",
            "scholars_subtitle": "الخبراء الذين قدموا التراث الإسلامي",
            "view_all_scholars": "عرض جميع العلماء",
            "features_title": "مميزات المشروع",
            "features_subtitle": "ما يميزنا عن الآخرين",
            "multilingual": "متعدد اللغات",
            "advanced_search": "بحث متقدم",
            "extensive_data": "بيانات شاملة",
            "responsive": "متجاوب",
            "islamic_design": "تصميم إسلامي",
            "resources_download": "تحميل المصادر",
            "newsletter_title": "شارك في المشروع",
            "newsletter_text": "اشترك لتلقي أخبار وتحديثات المشروع. يمكنك أيضًا المشاركة في إضافة المحتوى.",
            "email_placeholder": "أدخل بريدك الإلكتروني",
            "subscribe": "اشتراك",
            "agree_terms": "أوافق على شروط الاستخدام وسياسة الخصوصية",
            "about_us": "من نحن",
            "contact_us": "اتصل بنا",
            "faq": "الأسئلة الشائعة",
            "terms": "شروط الاستخدام",
            "privacy": "سياسة الخصوصية",
            "courses": "الدورات",
            "copyright": "جميع الحقوق محفوظة",
            "help": "مساعدة"
        };
    }
    
    getEnglishTranslations() {
        return {
            "welcome": "Welcome to the largest Islamic scientific center",
            "subtitle": "A comprehensive institute for research and introduction of Islamic heritage",
            "search_placeholder": "Search through the project...",
            "featured_content": "Featured Content",
            "explore_sections": "Explore the different sections of the project",
            "islamic_history": "Islamic History",
            "islamic_scholars": "Islamic Scholars",
            "islamic_books": "Books and References",
            "articles_research": "Articles and Research",
            "history_title": "Brief History of Islam",
            "history_subtitle": "Viewing the development of Islamic civilization through centuries",
            "view_full_history": "View Full History",
            "scholars_title": "Famous Islamic Scholars",
            "scholars_subtitle": "Experts who advanced Islamic heritage",
            "view_all_scholars": "View All Scholars",
            "features_title": "Project Features",
            "features_subtitle": "What distinguishes us from others",
            "multilingual": "Multilingual",
            "advanced_search": "Advanced Search",
            "extensive_data": "Extensive Data",
            "responsive": "Responsive",
            "islamic_design": "Islamic Design",
            "resources_download": "Resources Download",
            "newsletter_title": "Participate in the Project",
            "newsletter_text": "Subscribe to receive news and updates of the project. You can also participate in adding content.",
            "email_placeholder": "Enter your email",
            "subscribe": "Subscribe",
            "agree_terms": "I agree to the terms of use and privacy policy",
            "about_us": "About Us",
            "contact_us": "Contact Us",
            "faq": "Frequently Asked Questions",
            "terms": "Terms of Use",
            "privacy": "Privacy Policy",
            "courses": "Courses",
            "copyright": "All rights reserved",
            "help": "Help"
        };
    }
    
    getPersianTranslations() {
        return {
            "welcome": "به بزرگترین مرکز علمی اسلامی خوش آمدید",
            "subtitle": "یک موسسه جامع برای تحقیق و معرفی میراث اسلامی",
            "search_placeholder": "جستجو در پروژه...",
            "featured_content": "محتوای ویژه",
            "explore_sections": "کاوش در بخش‌های مختلف پروژه",
            "islamic_history": "تاریخ اسلام",
            "islamic_scholars": "عالمان اسلامی",
            "islamic_books": "کتاب‌ها و مراجع",
            "articles_research": "مقالات و پژوهش‌ها",
            "history_title": "تاریخچه مختصر اسلام",
            "history_subtitle": "نگاهی به توسعه تمدن اسلامی در طول قرن‌ها",
            "view_full_history": "مشاهده تاریخ کامل",
            "scholars_title": "عالمان مشهور اسلامی",
            "scholars_subtitle": "متخصصانی که میراث اسلامی را پیش بردند",
            "view_all_scholars": "مشاهده همه عالمان",
            "features_title": "ویژگی‌های پروژه",
            "features_subtitle": "چیزی که ما را از دیگران متمایز می‌کند",
            "multilingual": "چندزبانه",
            "advanced_search": "جستجوی پیشرفته",
            "extensive_data": "داده‌های گسترده",
            "responsive": "واکنش‌گرا",
            "islamic_design": "طراحی اسلامی",
            "resources_download": "دانلود منابع",
            "newsletter_title": "در پروژه مشارکت کنید",
            "newsletter_text": "اشتراک برای دریافت اخبار و به‌روزرسانی‌های پروژه. شما همچنین می‌توانید در افزودن محتوا مشارکت کنید.",
            "email_placeholder": "ایمیل خود را وارد کنید",
            "subscribe": "اشتراک",
            "agree_terms": "من با شرایط استفاده و سیاست حفظ حریم خصوصی موافقم",
            "about_us": "درباره ما",
            "contact_us": "تماس با ما",
            "faq": "سوالات متداول",
            "terms": "شرایط استفاده",
            "privacy": "سیاست حفظ حریم خصوصی",
            "courses": "دوره‌ها",
            "copyright": "تمام حقوق محفوظ است",
            "help": "کمک"
        };
    }
    
    setupEventListeners() {
        // دوگمەکانی زمان
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.switchToLanguage(lang);
            });
        });
    }
    
    applySavedLanguage() {
        const savedLang = localStorage.getItem('siteLanguage') || 'ku';
        this.switchToLanguage(savedLang, false);
    }
    
    switchToLanguage(lang, save = true) {
        if (!this.translations[lang]) {
            console.error(`زمانی ${lang} پشتگیری ناکرێت`);
            return;
        }
        
        this.currentLang = lang;
        
        // نوێکردنەوەی دەقەکان
        this.updateTexts();
        
        // نوێکردنەوەی دوگمەکانی زمان
        this.updateLanguageButtons(lang);
        
        // گۆڕینی دەقەکان بەپێی زمانی نوێ
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        
        // پاشەکەوتکردن لە ناوەخۆ
        if (save) {
            localStorage.setItem('siteLanguage', lang);
        }
        
        // نیشاندانی هەواڵ
        this.showLanguageChangeNotification(lang);
    }
    
    updateTexts() {
        const translations = this.translations[this.currentLang];
        
        // نوێکردنەوەی هەموو دەقەکان بەپێی data-key
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // نوێکردنەوەی جێگەکراوەکان
        const placeholders = document.querySelectorAll('[data-translate-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
        
        // نوێکردنەوەی ناونیشانەکان
        const titles = document.querySelectorAll('[data-translate-title]');
        titles.forEach(element => {
            const key = element.getAttribute('data-translate-title');
            if (translations[key]) {
                element.title = translations[key];
            }
        });
    }
    
    updateLanguageButtons(activeLang) {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.lang === activeLang) {
                button.classList.add('active');
            }
        });
    }
    
    showLanguageChangeNotification(lang) {
        const langNames = {
            ku: "کوردی",
            ar: "العربية",
            en: "English",
            fa: "فارسی"
        };
        
        const message = `زمان گۆڕدرا بۆ ${langNames[lang]}`;
        
        // دروستکردنی هەواڵ
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-language"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // نیشاندان
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // لابردن دوای چەند چرکەیەک
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    getTranslation(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// دەستپێکردنی سیستەمی زمان
let languageSwitcher;

document.addEventListener('DOMContentLoaded', function() {
    languageSwitcher = new LanguageSwitcher();
});

// فەنکشنی گشتی بۆ بەکارهێنان لە ئەندرۆیدا
function switchLanguage(lang) {
    if (languageSwitcher) {
        languageSwitcher.switchToLanguage(lang);
    }
}

// CSS بۆ هەواڵەکانی زمان
const style = document.createElement('style');
style.textContent = `
    .language-notification {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .language-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .language-notification i {
        font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
        .language-notification {
            left: 10px;
            right: 10px;
            bottom: 10px;
        }
    }
`;
document.head.appendChild(style);