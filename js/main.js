// CasaCV 主要JavaScript功能

// 模拟房源数据
const listingsData = [
    {
        id: 1,
        title: { zh: "普拉亚市中心精装三室公寓", en: "3-Bedroom Apartment in Praia Center", pt: "Apartamento T3 no Centro da Praia" },
        location: { zh: "普拉亚 · 普拉托区", en: "Praia · Plateau", pt: "Praia · Platô" },
        price: 45000,
        priceType: "month",
        type: "apartment",
        rentType: "long",
        rooms: 3,
        bathrooms: 2,
        area: 120,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
        badge: "long"
    },
    {
        id: 2,
        title: { zh: "明德卢海景别墅", en: "Sea View Villa in Mindelo", pt: "Moradia com Vista Mar em Mindelo" },
        location: { zh: "圣维森特岛 · 明德卢", en: "São Vicente · Mindelo", pt: "São Vicente · Mindelo" },
        price: 85000,
        priceType: "month",
        type: "villa",
        rentType: "long",
        rooms: 4,
        bathrooms: 3,
        area: 200,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
        badge: "long"
    },
    {
        id: 3,
        title: { zh: "圣玛丽亚海滩度假公寓", en: "Beach Resort Apartment in Santa Maria", pt: "Apartamento de Férias em Santa Maria" },
        location: { zh: "萨尔岛 · 圣玛丽亚", en: "Sal · Santa Maria", pt: "Sal · Santa Maria" },
        price: 8000,
        priceType: "day",
        type: "apartment",
        rentType: "short",
        rooms: 2,
        bathrooms: 1,
        area: 80,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
        badge: "short"
    },
    {
        id: 4,
        title: { zh: "普拉亚华人区精装两室", en: "2-Bedroom in Praia Chinese District", pt: "T2 na Zona Chinesa da Praia" },
        location: { zh: "普拉亚 · 阿瓜德根区", en: "Praia · Água de Gato", pt: "Praia · Água de Gato" },
        price: 35000,
        priceType: "month",
        type: "apartment",
        rentType: "long",
        rooms: 2,
        bathrooms: 1,
        area: 90,
        image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600",
        badge: "long"
    },
    {
        id: 5,
        title: { zh: "博阿维斯塔岛海滨别墅", en: "Beachfront Villa in Boa Vista", pt: "Moradia Frente ao Mar na Boa Vista" },
        location: { zh: "博阿维斯塔岛 · 萨尔雷", en: "Boa Vista · Sal Rei", pt: "Boa Vista · Sal Rei" },
        price: 120000,
        priceType: "month",
        type: "villa",
        rentType: "long",
        rooms: 5,
        bathrooms: 4,
        area: 300,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
        badge: "long"
    },
    {
        id: 6,
        title: { zh: "普拉亚单身公寓拎包入住", en: "Studio Apartment in Praia", pt: "Estúdio na Praia" },
        location: { zh: "普拉亚 · 塔拉法尔区", en: "Praia · Tarrafal", pt: "Praia · Tarrafal" },
        price: 25000,
        priceType: "month",
        type: "studio",
        rentType: "long",
        rooms: 1,
        bathrooms: 1,
        area: 45,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600",
        badge: "long"
    }
];

// 生成房源卡片HTML
function createListingCard(listing) {
    const lang = currentLang || 'zh';
    const priceUnit = listing.priceType === 'day' 
        ? translations[lang].price_day 
        : translations[lang].price_month;
    
    const badgeText = listing.rentType === 'short' 
        ? (lang === 'zh' ? '短租' : lang === 'en' ? 'Short-term' : 'Temporada')
        : (lang === 'zh' ? '长租' : lang === 'en' ? 'Long-term' : 'Anual');
    
    const roomsText = lang === 'zh' ? '室' : lang === 'en' ? 'BD' : 'Q';
    const bathText = lang === 'zh' ? '卫' : lang === 'en' ? 'BA' : 'B';
    const areaText = lang === 'zh' ? '㎡' : lang === 'en' ? 'm²' : 'm²';
    
    return `
        <div class="listing-card" onclick="viewListing(${listing.id})">
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.title[lang]}" loading="lazy">
                <span class="listing-badge ${listing.badge}">${badgeText}</span>
                <button class="listing-favorite" onclick="event.stopPropagation(); toggleFavorite(${listing.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="listing-content">
                <div class="listing-price">${listing.price.toLocaleString()} CVE <span>${priceUnit}</span></div>
                <h3 class="listing-title">${listing.title[lang]}</h3>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${listing.location[lang]}</span>
                </div>
                <div class="listing-features">
                    <span><i class="fas fa-bed"></i> ${listing.rooms} ${roomsText}</span>
                    <span><i class="fas fa-bath"></i> ${listing.bathrooms} ${bathText}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${listing.area}${areaText}</span>
                </div>
            </div>
        </div>
    `;
}

// 渲染精选房源
function renderFeaturedListings() {
    const container = document.getElementById('featured-listings');
    if (!container) return;
    
    const featured = listingsData.slice(0, 6);
    container.innerHTML = featured.map(listing => createListingCard(listing)).join('');
}

// 渲染所有房源（列表页）
function renderAllListings() {
    const container = document.getElementById('all-listings');
    if (!container) return;
    
    container.innerHTML = listingsData.map(listing => createListingCard(listing)).join('');
}

// 搜索功能
function search() {
    const location = document.getElementById('search-location')?.value;
    const propertyType = document.getElementById('property-type')?.value;
    const rentType = document.getElementById('rent-type')?.value;
    
    // 构建查询参数
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (rentType) params.append('rent', rentType);
    
    // 跳转到列表页
    window.location.href = `listings.html${params.toString() ? '?' + params.toString() : ''}`;
}

// 设置城市搜索
function setCity(city) {
    const searchInput = document.getElementById('search-location');
    if (searchInput) {
        searchInput.value = city;
    }
}

// 查看房源详情
function viewListing(id) {
    window.location.href = `listing-detail.html?id=${id}`;
}

// 收藏功能
function toggleFavorite(id) {
    const btn = event.target.closest('.listing-favorite');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.background = '#ef4444';
        btn.style.color = '#fff';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.background = '#fff';
        btn.style.color = '#1f2937';
    }
}

// 移动端菜单切换
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('show');
}

// 筛选功能
function filterListings() {
    const city = document.getElementById('filter-city')?.value;
    const type = document.getElementById('filter-type')?.value;
    const rent = document.getElementById('filter-rent')?.value;
    const price = document.getElementById('filter-price')?.value;
    
    let filtered = [...listingsData];
    
    if (city) {
        filtered = filtered.filter(l => l.location[currentLang].toLowerCase().includes(city.toLowerCase()));
    }
    if (type) {
        filtered = filtered.filter(l => l.type === type);
    }
    if (rent) {
        filtered = filtered.filter(l => l.rentType === rent);
    }
    if (price) {
        const [min, max] = price.split('-').map(p => p === 'max' ? Infinity : parseInt(p));
        filtered = filtered.filter(l => l.price >= min && l.price <= max);
    }
    
    const container = document.getElementById('all-listings');
    if (container) {
        container.innerHTML = filtered.map(listing => createListingCard(listing)).join('');
    }
}

// 发布房源表单提交
function publishListing(event) {
    event.preventDefault();
    
    const formData = {
        title: document.getElementById('title')?.value,
        city: document.getElementById('city')?.value,
        district: document.getElementById('district')?.value,
        address: document.getElementById('address')?.value,
        rentType: document.getElementById('rent-type')?.value,
        propertyType: document.getElementById('property-type')?.value,
        rooms: document.getElementById('rooms')?.value,
        area: document.getElementById('area')?.value,
        price: document.getElementById('price')?.value,
        deposit: document.getElementById('deposit')?.value,
        description: document.getElementById('description')?.value,
        contactName: document.getElementById('contact-name')?.value,
        contactPhone: document.getElementById('contact-phone')?.value,
        contactWechat: document.getElementById('contact-wechat')?.value
    };
    
    console.log('发布房源:', formData);
    alert('房源发布成功！审核通过后将显示在列表中。');
    
    // 重置表单
    event.target.reset();
}

// =============================
// 社区统计数字动态展示
// =============================
// 基础值（虚拟种子数据，让平台看起来有人气）
const BASE_STATS = {
    members:     3247,
    listings:    512,
    jobs:        189,
    confessions: 1024
};

// 每次访问随机微小增量，制造「实时增长」感
function getAnimatedStat(base) {
    const delta = Math.floor(Math.random() * 5);
    return base + delta;
}

// 数字滚动动画
function animateCount(el, target, duration) {
    if (!el) return;
    const start = 0;
    const step = Math.ceil(target / (duration / 16));
    let current = start;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
    }, 16);
}

function initStatsBar() {
    const members     = document.getElementById('stat-members');
    const listings    = document.getElementById('stat-listings');
    const jobs        = document.getElementById('stat-jobs');
    const confessions = document.getElementById('stat-confessions');

    if (!members) return; // 只在首页运行

    animateCount(members,     getAnimatedStat(BASE_STATS.members),     1200);
    animateCount(listings,    getAnimatedStat(BASE_STATS.listings),    900);
    animateCount(jobs,        getAnimatedStat(BASE_STATS.jobs),        800);
    animateCount(confessions, getAnimatedStat(BASE_STATS.confessions), 1000);
}

// =============================
// 内容审核 — 屏蔽词过滤
// =============================
// 屏蔽词表：政治敏感、色情、仇恨、暴力、欺诈相关
const BANNED_KEYWORDS = [
    // 政治类
    'golpe','revolução','governo corrup','ditador','manifesto','terroris',
    // 仇恨/歧视类
    'racis','morte a','odio','ódio','discrimina','fascis',
    // 色情类
    'sexo','pornô','nude','pelad','escort','programa',
    // 暴力类
    'matar','matarei','arma','faca','violência','bomba',
    // 欺诈类
    'golpista','fraude','scam','piramide','pirâmide',
    // 中文词
    '政治','色情','裸','赌博','传销','杀','炸弹','仇恨','种族'
];

/**
 * 检查文本是否含违禁词
 * @param {string} text
 * @returns {{ ok: boolean, matched: string|null }}
 */
function checkContent(text) {
    if (!text || !text.trim()) return { ok: false, matched: null };
    const lower = text.toLowerCase();
    for (const kw of BANNED_KEYWORDS) {
        if (lower.includes(kw.toLowerCase())) {
            return { ok: false, matched: kw };
        }
    }
    return { ok: true, matched: null };
}

/**
 * 举报某条内容（记录到 localStorage）
 * @param {string} contentId
 * @param {string} reason
 */
function reportContent(contentId, reason) {
    const reports = JSON.parse(localStorage.getItem('cv_reports') || '[]');
    reports.push({ id: contentId, reason, time: new Date().toISOString() });
    localStorage.setItem('cv_reports', JSON.stringify(reports));
    alert('Obrigadu! Denúncia recebida. / 举报已收到，我们将尽快审核。');
}

// =============================
// 初始化页面
// =============================
document.addEventListener('DOMContentLoaded', () => {
    // 统计条动画
    initStatsBar();
    // 渲染房源
    renderFeaturedListings();
    renderAllListings();
    
    // 绑定表单提交
    const publishForm = document.getElementById('publish-form');
    if (publishForm) {
        publishForm.addEventListener('submit', publishListing);
    }
    
    // 绑定筛选器
    const filters = document.querySelectorAll('.filter-group select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterListings);
    });
    
    // 处理URL参数（列表页筛选）
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('location')) {
        const locationInput = document.getElementById('search-location');
        if (locationInput) locationInput.value = urlParams.get('location');
    }
    if (urlParams.has('type')) {
        const typeSelect = document.getElementById('filter-type') || document.getElementById('property-type');
        if (typeSelect) typeSelect.value = urlParams.get('type');
    }
    if (urlParams.has('rent')) {
        const rentSelect = document.getElementById('filter-rent') || document.getElementById('rent-type');
        if (rentSelect) rentSelect.value = urlParams.get('rent');
    }
    
    // 执行筛选
    if (window.location.pathname.includes('listings.html')) {
        filterListings();
    }
});
