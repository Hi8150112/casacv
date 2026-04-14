// CasaCV 交互功能 - 点赞、分享、收藏等

// 本地存储键名
const STORAGE_KEYS = {
    LIKES: 'casacv_likes',
    FAVORITES: 'casacv_favorites',
    SHARES: 'casacv_shares',
    VIEWS: 'casacv_views',
    USER_ACTIONS: 'casacv_user_actions'
};

// 获取存储数据
function getStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
}

// 保存存储数据
function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ==================== 点赞功能 ====================

// 点赞/取消点赞
function toggleLike(itemId, itemType) {
    const likes = getStorage(STORAGE_KEYS.LIKES);
    const userActions = getStorage(STORAGE_KEYS.USER_ACTIONS);
    const key = `${itemType}_${itemId}`;
    
    if (!userActions[key]) {
        userActions[key] = { liked: false, count: 0 };
    }
    
    if (userActions[key].liked) {
        // 取消点赞
        userActions[key].liked = false;
        userActions[key].count = Math.max(0, userActions[key].count - 1);
        if (likes[key]) {
            likes[key] = Math.max(0, likes[key] - 1);
        }
        showToast('Bu tira bu gosta ❤️');
    } else {
        // 点赞
        userActions[key].liked = true;
        userActions[key].count++;
        likes[key] = (likes[key] || 0) + 1;
        showToast('Bu gosta! ❤️');
        
        // 添加动画效果
        const btn = document.querySelector(`[data-like-id="${itemId}"][data-like-type="${itemType}"]`);
        if (btn) {
            btn.classList.add('liked');
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        }
    }
    
    setStorage(STORAGE_KEYS.LIKES, likes);
    setStorage(STORAGE_KEYS.USER_ACTIONS, userActions);
    updateLikeDisplay(itemId, itemType);
    
    return userActions[key].liked;
}

// 更新点赞显示
function updateLikeDisplay(itemId, itemType) {
    const likes = getStorage(STORAGE_KEYS.LIKES);
    const userActions = getStorage(STORAGE_KEYS.USER_ACTIONS);
    const key = `${itemType}_${itemId}`;
    const count = likes[key] || 0;
    const isLiked = userActions[key]?.liked || false;
    
    const elements = document.querySelectorAll(`[data-like-id="${itemId}"][data-like-type="${itemType}"]`);
    elements.forEach(el => {
        const countEl = el.querySelector('.like-count') || el;
        if (countEl) countEl.textContent = count;
        
        if (isLiked) {
            el.classList.add('liked');
            el.style.color = '#e74c3c';
        } else {
            el.classList.remove('liked');
            el.style.color = '';
        }
    });
}

// 获取点赞数
function getLikeCount(itemId, itemType) {
    const likes = getStorage(STORAGE_KEYS.LIKES);
    return likes[`${itemType}_${itemId}`] || 0;
}

// 检查是否已点赞
function hasLiked(itemId, itemType) {
    const userActions = getStorage(STORAGE_KEYS.USER_ACTIONS);
    return userActions[`${itemType}_${itemId}`]?.liked || false;
}

// ==================== 分享功能 ====================

// 分享功能
async function shareItem(itemId, itemType, title) {
    const url = window.location.href;
    const shareData = {
        title: title || 'CasaCV',
        text: 'Olha isso no CasaCV!',
        url: url
    };
    
    // 记录分享
    const shares = getStorage(STORAGE_KEYS.SHARES);
    const key = `${itemType}_${itemId}`;
    shares[key] = (shares[key] || 0) + 1;
    setStorage(STORAGE_KEYS.SHARES, shares);
    
    // 尝试使用 Web Share API
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            showToast('Partilhado com sucesso! 📤');
            return;
        } catch (err) {
            console.log('Share cancelled');
        }
    }
    
    // 备用：复制链接
    copyToClipboard(url);
}

// 复制到剪贴板
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Link kopiadu! 📋');
    } catch (err) {
        // 备用方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Link kopiadu! 📋');
    }
}

// ==================== 收藏功能 ====================

// 切换收藏
function toggleFavorite(itemId, itemType, itemData) {
    const favorites = getStorage(STORAGE_KEYS.FAVORITES);
    const key = `${itemType}_${itemId}`;
    
    if (favorites[key]) {
        delete favorites[key];
        showToast('Tiradu di favoritus ⭐');
    } else {
        favorites[key] = {
            id: itemId,
            type: itemType,
            data: itemData,
            savedAt: new Date().toISOString()
        };
        showToast('Guardadu nos favoritus! ⭐');
    }
    
    setStorage(STORAGE_KEYS.FAVORITES, favorites);
    updateFavoriteDisplay(itemId, itemType);
}

// 更新收藏显示
function updateFavoriteDisplay(itemId, itemType) {
    const favorites = getStorage(STORAGE_KEYS.FAVORITES);
    const key = `${itemType}_${itemId}`;
    const isFavorited = !!favorites[key];
    
    const elements = document.querySelectorAll(`[data-fav-id="${itemId}"][data-fav-type="${itemType}"]`);
    elements.forEach(el => {
        if (isFavorited) {
            el.classList.add('favorited');
            el.innerHTML = '<i class="fas fa-star"></i> Guardadu';
            el.style.color = '#f39c12';
        } else {
            el.classList.remove('favorited');
            el.innerHTML = '<i class="far fa-star"></i> Guarda';
            el.style.color = '';
        }
    });
}

// 检查是否已收藏
function isFavorited(itemId, itemType) {
    const favorites = getStorage(STORAGE_KEYS.FAVORITES);
    return !!favorites[`${itemType}_${itemType}_${itemId}`];
}

// 获取所有收藏
function getAllFavorites() {
    return getStorage(STORAGE_KEYS.FAVORITES);
}

// ==================== 浏览记录 ====================

// 记录浏览
function recordView(itemId, itemType) {
    const views = getStorage(STORAGE_KEYS.VIEWS);
    const key = `${itemType}_${itemId}`;
    
    if (!views[key]) {
        views[key] = {
            count: 0,
            firstView: new Date().toISOString(),
            lastView: new Date().toISOString()
        };
    }
    
    views[key].count++;
    views[key].lastView = new Date().toISOString();
    setStorage(STORAGE_KEYS.VIEWS, views);
}

// 获取浏览数
function getViewCount(itemId, itemType) {
    const views = getStorage(STORAGE_KEYS.VIEWS);
    return views[`${itemType}_${itemId}`]?.count || 0;
}

// ==================== 联系功能 ====================

// 显示联系方式弹窗
function showContactModal(name, phone, email, whatsapp) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-modal-overlay" onclick="closeContactModal()"></div>
        <div class="contact-modal-content">
            <button class="contact-modal-close" onclick="closeContactModal()">&times;</button>
            <h3><i class="fas fa-address-card"></i> Kontaktu ${name || ''}</h3>
            <div class="contact-options">
                ${phone ? `
                    <a href="tel:${phone}" class="contact-option">
                        <i class="fas fa-phone"></i>
                        <span>Liga Agora</span>
                        <small>${phone}</small>
                    </a>
                ` : ''}
                ${whatsapp ? `
                    <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" target="_blank" class="contact-option whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                        <small>${whatsapp}</small>
                    </a>
                ` : ''}
                ${email ? `
                    <a href="mailto:${email}" class="contact-option email">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                        <small>${email}</small>
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 动画
    setTimeout(() => modal.classList.add('active'), 10);
}

// 关闭联系弹窗
function closeContactModal() {
    const modal = document.querySelector('.contact-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ==================== 举报功能 ====================

// 显示举报弹窗
function showReportModal(itemId, itemType) {
    const modal = document.createElement('div');
    modal.className = 'report-modal';
    modal.innerHTML = `
        <div class="report-modal-overlay" onclick="closeReportModal()"></div>
        <div class="report-modal-content">
            <button class="report-modal-close" onclick="closeReportModal()">&times;</button>
            <h3><i class="fas fa-flag"></i> Reporta Kontenidu</h3>
            <p>Porke bu kre reporta isso?</p>
            <div class="report-reasons">
                <label><input type="radio" name="report-reason" value="spam"> Spam</label>
                <label><input type="radio" name="report-reason" value="fake"> Informason falsu</label>
                <label><input type="radio" name="report-reason" value="inappropriate"> Kontenidu inapropriadu</label>
                <label><input type="radio" name="report-reason" value="scam"> Fraude</label>
                <label><input type="radio" name="report-reason" value="other"> Outru</label>
            </div>
            <textarea id="report-details" placeholder="Detalhas adisional (opsional)..."></textarea>
            <button class="btn-submit-report" onclick="submitReport('${itemId}', '${itemType}')">
                <i class="fas fa-paper-plane"></i> Manda Report
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('active'), 10);
}

// 关闭举报弹窗
function closeReportModal() {
    const modal = document.querySelector('.report-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// 提交举报
function submitReport(itemId, itemType) {
    const reason = document.querySelector('input[name="report-reason"]:checked')?.value;
    const details = document.getElementById('report-details')?.value;
    
    if (!reason) {
        showToast('Por favor, skolhi un motivu ⚠️');
        return;
    }
    
    // 保存举报到本地存储（实际项目中应发送到服务器）
    const reports = getStorage('casacv_reports');
    const reportId = generateId();
    reports[reportId] = {
        id: reportId,
        itemId,
        itemType,
        reason,
        details,
        reportedAt: new Date().toISOString(),
        status: 'pending'
    };
    setStorage('casacv_reports', reports);
    
    showToast('Reporta manda! Obrigadu 🙏');
    closeReportModal();
}

// ==================== 评论功能 ====================

// 显示评论弹窗
function showCommentsModal(itemId, itemType) {
    const comments = getStorage(`casacv_comments_${itemType}`)[itemId] || [];
    
    const modal = document.createElement('div');
    modal.className = 'comments-modal';
    modal.innerHTML = `
        <div class="comments-modal-overlay" onclick="closeCommentsModal()"></div>
        <div class="comments-modal-content">
            <button class="comments-modal-close" onclick="closeCommentsModal()">&times;</button>
            <h3><i class="fas fa-comments"></i> Komentarius (${comments.length})</h3>
            <div class="comments-list">
                ${comments.length > 0 ? comments.map(c => `
                    <div class="comment-item">
                        <div class="comment-header">
                            <strong>${c.author}</strong>
                            <span>${formatTime(c.createdAt)}</span>
                        </div>
                        <p>${c.text}</p>
                    </div>
                `).join('') : '<p class="no-comments">Nenhum komentariu ainda. Seja o primeiro! 💬</p>'}
            </div>
            <div class="comment-input-area">
                <input type="text" id="comment-input" placeholder="Skrebe bu komentariu..." maxlength="500">
                <button onclick="submitComment('${itemId}', '${itemType}')">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('active'), 10);
    
    // 聚焦输入框
    setTimeout(() => document.getElementById('comment-input')?.focus(), 100);
}

// 关闭评论弹窗
function closeCommentsModal() {
    const modal = document.querySelector('.comments-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// 提交评论
function submitComment(itemId, itemType) {
    const input = document.getElementById('comment-input');
    const text = input?.value.trim();
    
    if (!text) {
        showToast('Por favor, skrebe alguma coisa ⚠️');
        return;
    }
    
    const allComments = getStorage(`casacv_comments_${itemType}`);
    if (!allComments[itemId]) {
        allComments[itemId] = [];
    }
    
    allComments[itemId].push({
        id: generateId(),
        author: 'Anonimu', // 实际项目中应该是登录用户
        text,
        createdAt: new Date().toISOString()
    });
    
    setStorage(`casacv_comments_${itemType}`, allComments);
    showToast('Komentariu adisionadu! 💬');
    
    // 刷新评论列表
    closeCommentsModal();
    showCommentsModal(itemId, itemType);
}

// ==================== 工具函数 ====================

// 显示提示消息
function showToast(message, duration = 3000) {
    // 移除现有 toast
    const existing = document.querySelector('.casacv-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'casacv-toast';
    toast.innerHTML = `
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // 动画显示
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // 自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 格式化时间
function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'Agora';
    if (minutes < 60) return `${minutes} min atrás`;
    if (hours < 24) return `${hours} ora atrás`;
    if (days < 30) return `${days} dia atrás`;
    
    return date.toLocaleDateString('pt-CV');
}

// 格式化数字
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有点赞按钮
    document.querySelectorAll('[data-like-id]').forEach(btn => {
        const itemId = btn.dataset.likeId;
        const itemType = btn.dataset.likeType;
        updateLikeDisplay(itemId, itemType);
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLike(itemId, itemType);
        });
    });
    
    // 初始化所有收藏按钮
    document.querySelectorAll('[data-fav-id]').forEach(btn => {
        const itemId = btn.dataset.favId;
        const itemType = btn.dataset.favType;
        updateFavoriteDisplay(itemId, itemType);
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(itemId, itemType);
        });
    });
    
    // 记录页面浏览
    const pageType = document.body.dataset.pageType;
    const pageId = document.body.dataset.pageId;
    if (pageType && pageId) {
        recordView(pageId, pageType);
    }
});

// 导出函数供全局使用
window.CasaCV = {
    toggleLike,
    getLikeCount,
    hasLiked,
    shareItem,
    copyToClipboard,
    toggleFavorite,
    isFavorited,
    getAllFavorites,
    recordView,
    getViewCount,
    showContactModal,
    closeContactModal,
    showReportModal,
    closeReportModal,
    submitReport,
    showCommentsModal,
    closeCommentsModal,
    submitComment,
    showToast,
    formatTime,
    formatNumber
};
