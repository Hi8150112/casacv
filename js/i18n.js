// CasaCV 单语言支持 - 仅克里奥尔语(Kriolu)
// 移除中文支持，统一使用当地语言

const i18n = {
    // 导航
    nav_home: "Inisio",
    nav_listings: "Kasa",
    nav_publish: "Publika",
    nav_jobs: "Trabaiu",
    nav_china: "Negósiu China",
    nav_tenders: "Licitasaun",
    nav_services: "Servisu",
    nav_confession: "Mural Amor",
    nav_reviews: "Avaliasaun",
    nav_complaints: "Voz di Povu",
    nav_taxi: "Taxi",
    
    // 通用
    login: "Entra",
    register: "Regista",
    logout: "Sai",
    search: "Buska",
    submit: "Manda",
    cancel: "Kansela",
    confirm: "Konfirma",
    save: "Guarda",
    edit: "Muda",
    delete: "Apaga",
    back: "Volta",
    loading: "Karregando...",
    no_data: "Nada pa mostra",
    error: "Erro",
    success: "Susesu",
    
    // 首页
    hero_title: "Atxa Bu Kasa na Kabu Verdi",
    hero_subtitle: "Praia, Mindelo, Sal... Aluguel pa tempu o pa anu",
    search_placeholder: "Buska kasa, trabaiu, servisu...",
    popular_cities: "Sidadis Popular:",
    
    // 房源
    listings_title: "Kasa Disponivel",
    listings_subtitle: "Atxa kasa di kalidadi na Kabu Verdi",
    price_month: "/mes",
    price_day: "/dia",
    bedrooms: "Kuartu",
    bathrooms: "Banhu",
    area: "Area",
    
    // 工作
    jobs_title: "Trabaiu Disponivel",
    jobs_subtitle: "Atxa oportunidadis di empregu",
    salary: "Salariu",
    full_time: "Tempu konpletu",
    part_time: "Tempu parsial",
    
    // 中国商务
    china_title: "Negósiu ku China",
    china_subtitle: "Importasaun i parceria ku China",
    
    // 招投标
    tenders_title: "Licitasaun",
    tenders_subtitle: "Oportunidadis di governo i empresas",
    
    // 本地服务
    services_title: "Servisu Lokais",
    services_subtitle: "Atxa profisionais",
    
    // 表白墙
    confession_title: "Mural di Amor",
    confession_subtitle: "Partilha bu sentimentu anonimamente",
    like: "Gosta",
    comment: "Komenta",
    share: "Partilha",
    
    // 大众点评
    reviews_title: "Avaliasaun",
    reviews_subtitle: "Avalia lokais na Kabu Verdi",
    rating: "Nota",
    
    // 爆料投诉
    complaints_title: "Voz di Povu",
    complaints_subtitle: "Reklama problemas di comunidadi",
    
    // 出租车群
    taxi_title: "Grupu Taxi WhatsApp",
    taxi_subtitle: "Entra na grupu, txoma taxi rapidu",
    
    // 发布
    publish_title: "Publika",
    publish_subtitle: "Publika anunsio grátis",
    
    // 积分系统
    points: "Pontus",
    level: "Nivel",
    invite: "Konvida",
    check_in: "Marca Presensa",
    
    // 统计
    users: "Utilizador",
    posts: "Publikasaun",
    replies: "Resposta",
    online: "Ligadu",
    today_new: "Novu oji",
    
    // 页脚
    footer_about: "Sobre",
    footer_contact: "Kontaktu",
    footer_privacy: "Privasidadi",
    footer_terms: "Termus"
};

// 获取翻译文本
function t(key) {
    return i18n[key] || key;
}

// 初始化页面文本
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[key]) {
            el.textContent = i18n[key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[key]) {
            el.placeholder = i18n[key];
        }
    });
});
