// CasaCV - Mural di Amor (表白墙) 逻辑
// 含内容审核、举报、点赞功能

// =============================
// 屏蔽词（与 main.js 同步）
// =============================
const BANNED_KW = [
    'golpe','revolução','governo corrup','ditador','manifesto','terroris',
    'racis','morte a','odio','ódio','discrimina','fascis',
    'sexo','pornô','nude','pelad','escort','programa',
    'matar','matarei','arma','faca','violência','bomba',
    'golpista','fraude','scam','piramide','pirâmide',
    '政治','色情','裸','赌博','传销','杀','炸弹','仇恨','种族'
];

function moderateText(text) {
    if (!text || !text.trim()) return { ok: false, reason: 'empty' };
    if (text.trim().length < 5) return { ok: false, reason: 'too_short' };
    if (text.trim().length > 500) return { ok: false, reason: 'too_long' };
    const lower = text.toLowerCase();
    for (const kw of BANNED_KW) {
        if (lower.includes(kw.toLowerCase())) return { ok: false, reason: 'banned', kw };
    }
    return { ok: true };
}

// =============================
// 虚拟初始表白数据（引流用）
// =============================
const SEED_CONFESSIONS = [
    { id: 1,  to: 'Mariana da Praia', text: 'Desde ki N odja-u na merkadu di Sucupira, N ka konsigi para di pensa na bu. Bu sorisu é bida pa mi.', city: 'praia',   time: '2026-04-10', likes: 87 },
    { id: 2,  to: '',                  text: 'Trabaia na djunta-mó di Mindelo tudu dia kuma si N ta kre odja alguem. Kel alguem sabi ki é el.', city: 'mindelo', time: '2026-04-11', likes: 54 },
    { id: 3,  to: 'Carlos do Sal',    text: 'Fia di ki N ta vê bu na praia ki N labanta sedo tudu dia. Speransa ki un dia bu odja mi.', city: 'sal',     time: '2026-04-09', likes: 102 },
    { id: 4,  to: 'Tchinda',          text: 'Na skola juntos durante 3 anu, mas N nunka tevi corajem. Agora bu ta morar longi. N arrependidu.', city: 'praia',   time: '2026-04-08', likes: 143 },
    { id: 5,  to: '',                  text: 'Aluga kasa di bu irmãu ma pa estar perto di bu. Speransa ki un dia bu descobre.', city: 'mindelo', time: '2026-04-12', likes: 38 },
    { id: 6,  to: 'Fátima',           text: 'Bu voz é musika pa mi. Quando bu kanta na Igreja, N ta sinti paz. Obrigadu por existi.', city: 'praia',   time: '2026-04-07', likes: 67 },
    { id: 7,  to: 'João do Porto Novo', text: 'Djugamos futebol juntos na campo di Mindelo. Bu és o melhor amigo ki N tevi. Kre ki bu sabi.', city: 'mindelo', time: '2026-04-06', likes: 29 },
    { id: 8,  to: '',                  text: 'Trabaia mesmu supermercado 2 anu. Tudu cliente manda bu bem mais ki mi. Sabi porki.', city: 'sal',     time: '2026-04-11', likes: 91 },
    { id: 9,  to: 'Dulce de Santa Maria', text: 'Bu dança na festa di Carnaval fizisti ki N eskece tudu preocupação. Bu és pura alegria.', city: 'sal',     time: '2026-04-10', likes: 76 },
    { id: 10, to: 'Amigo di infancia', text: 'Krescemos djuntu na Achada Santo António. Bu mudasti pa Lisboa mas N ainda ta pensa na dia ki nos brincaba juntos.', city: 'praia', time: '2026-04-05', likes: 115 },
    { id: 11, to: '',                  text: 'Professor di portugues na liceu. Graças a bu N passei no exame. Bu mudasti minha vida.', city: 'mindelo', time: '2026-04-04', likes: 48 },
    { id: 12, to: 'Nha vizinha',       text: 'Tudu manhã N odja bu rega jardim. Kel rotina é razão ki N labanta sedo kum sorriso.', city: 'praia',   time: '2026-04-03', likes: 61 },
    { id: 13, to: 'Condutor di hiace', text: 'Bu para pa N mesmu ki era longi di bu rota. Kel bondade N nunka eskesi.', city: 'sal',     time: '2026-04-09', likes: 33 },
    { id: 14, to: '',                  text: 'Encontramos na fila di TACV. Você perdeu o voo, eu perdi o coração.', city: 'praia',   time: '2026-04-02', likes: 158 },
    { id: 15, to: 'Chico',             text: 'Jogou guitarra na varanda tudu noite. Bu musica era minha companhia nas noites de saudade.', city: 'mindelo', time: '2026-04-01', likes: 84 },
];

// =============================
// localStorage 存储
// =============================
const STORAGE_KEY = 'casacv_confessions';
const LIKES_KEY   = 'casacv_confession_likes';

function loadConfessions() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const userOnes = JSON.parse(stored);
            return [...userOnes, ...SEED_CONFESSIONS];
        } catch(e) { /* ignore */ }
    }
    return [...SEED_CONFESSIONS];
}

function saveUserConfession(conf) {
    const stored = localStorage.getItem(STORAGE_KEY);
    const userOnes = stored ? JSON.parse(stored) : [];
    userOnes.unshift(conf);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnes.slice(0, 200)));
}

function getLikedSet() {
    const s = localStorage.getItem(LIKES_KEY);
    return s ? new Set(JSON.parse(s)) : new Set();
}
function saveLike(id) {
    const s = getLikedSet();
    s.add(id);
    localStorage.setItem(LIKES_KEY, JSON.stringify([...s]));
}

// =============================
// 渲染
// =============================
let currentFilter = 'all';
let allConfessions = loadConfessions();

function timeAgo(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return 'Oji';
    if (diffDays === 1) return '1 dia atras';
    if (diffDays < 7)  return `${diffDays} dias atras`;
    return d.toLocaleDateString('pt-CV');
}

function renderConfessions(filter) {
    currentFilter = filter || currentFilter;
    const list = document.getElementById('confession-list');
    if (!list) return;

    let data = [...allConfessions];
    if (currentFilter === 'praia')   data = data.filter(c => c.city === 'praia');
    if (currentFilter === 'mindelo') data = data.filter(c => c.city === 'mindelo');
    if (currentFilter === 'sal')     data = data.filter(c => c.city === 'sal');
    if (currentFilter === 'recent')  data = data.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 20);
    if (currentFilter === 'popular') data = data.sort((a, b) => (b.likes||0) - (a.likes||0)).slice(0, 20);

    const liked = getLikedSet();
    list.innerHTML = data.map(c => `
        <div class="confession-card" id="conf-${c.id}">
            <div class="confession-header">
                <span class="confession-id">💌 #${c.id}</span>
                <span class="confession-time">${timeAgo(c.time)}</span>
            </div>
            ${c.to ? `<div class="confession-to">📣 Para: ${escapeHtml(c.to)}</div>` : ''}
            <div class="confession-content">${escapeHtml(c.text)}</div>
            <div class="confession-actions">
                <span class="confession-action ${liked.has(c.id)?'liked':''}" onclick="likeConfession(${c.id}, this)">
                    <i class="fas fa-heart"></i>
                    <span id="likes-${c.id}">${c.likes || 0}</span>
                </span>
                <span class="confession-action" onclick="reportConfession(${c.id})">
                    <i class="fas fa-flag"></i> Denunciar
                </span>
            </div>
        </div>
    `).join('');

    // 更新统计条
    const totalEl = document.getElementById('total-confessions');
    if (totalEl) totalEl.textContent = allConfessions.length;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// =============================
// 提交表白（带审核）
// =============================
function submitConfession() {
    const toEl   = document.getElementById('confession-to');
    const textEl = document.getElementById('confession-text');
    const cityEl = document.getElementById('confession-location');

    const text = textEl ? textEl.value : '';
    const to   = toEl   ? toEl.value   : '';

    const check = moderateText(text);
    if (!check.ok) {
        if (check.reason === 'empty' || check.reason === 'too_short') {
            alert('Skrivi algu (minim 5 letras). / 请至少写5个字。');
        } else if (check.reason === 'too_long') {
            alert('Txeu longu! Maksim 500 letras. / 内容太长，请控制在500字以内。');
        } else {
            alert('⚠️ Konteúdu proibidu. / 内容含违禁词，请修改后重新发送。');
        }
        return;
    }

    const newConf = {
        id:    Date.now(),
        to:    to.trim(),
        text:  text.trim(),
        city:  cityEl ? cityEl.value : '',
        time:  new Date().toISOString().slice(0, 10),
        likes: 0
    };

    saveUserConfession(newConf);
    allConfessions = loadConfessions();

    // 清空输入
    if (toEl)   toEl.value = '';
    if (textEl) textEl.value = '';
    if (cityEl) cityEl.value = '';

    renderConfessions(currentFilter);
    alert('✅ Konfissão mandadu! / 表白已发布！');
}

// =============================
// 点赞
// =============================
function likeConfession(id, el) {
    const liked = getLikedSet();
    if (liked.has(id)) {
        alert('Ja da like! / 您已点赞过了。');
        return;
    }
    saveLike(id);
    const likesEl = document.getElementById(`likes-${id}`);
    if (likesEl) likesEl.textContent = parseInt(likesEl.textContent || '0') + 1;
    el.classList.add('liked');

    // 同步更新数据
    const conf = allConfessions.find(c => c.id === id);
    if (conf) conf.likes = (conf.likes || 0) + 1;
}

// =============================
// 举报
// =============================
function reportConfession(id) {
    const reasons = [
        'Konteúdu proibidu / 违禁内容',
        'Spam / 垃圾信息',
        'Informason falsa / 虚假信息',
        'Agresson / 骚扰攻击',
        'Outru / 其他'
    ];
    const reason = prompt(`Motivo di denúncia:\n${reasons.map((r,i)=>`${i+1}. ${r}`).join('\n')}\n\n(输入序号 1-5)`);
    if (!reason) return;
    const idx = parseInt(reason) - 1;
    const reasonText = reasons[idx] || '其他';

    const reports = JSON.parse(localStorage.getItem('cv_reports') || '[]');
    reports.push({ type: 'confession', id, reason: reasonText, time: new Date().toISOString() });
    localStorage.setItem('cv_reports', JSON.stringify(reports));

    alert('Obrigadu! Denúncia recebida. Nos ta analisá. / 举报已收到，我们将尽快处理。');
}

// =============================
// 筛选 Tab
// =============================
function filterConfessions(filter) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderConfessions(filter);
}

// =============================
// 初始化
// =============================
document.addEventListener('DOMContentLoaded', () => {
    renderConfessions('all');
});
