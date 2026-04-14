// CasaCV 用户认证系统

const Auth = {
    currentUser: null,

    // 初始化
    init() {
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.updateUI();
        });
    },

    // 更新 UI 显示
    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const userAvatar = document.getElementById('user-avatar');
        
        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userAvatar) {
                userAvatar.style.display = 'flex';
                userAvatar.innerHTML = this.currentUser.photoURL ? 
                    `<img src="${this.currentUser.photoURL}" alt="avatar">` :
                    `<span>${this.currentUser.displayName?.[0] || this.currentUser.email[0].toUpperCase()}</span>`;
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (userAvatar) userAvatar.style.display = 'none';
        }
    },

    // 邮箱注册
    async register(email, password, name) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: name });
            
            // 创建用户文档
            await db.collection('users').doc(userCredential.user.uid).set({
                email,
                name,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                favorites: [],
                listings: 0
            });
            
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // 邮箱登录
    async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // Google 登录
    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await auth.signInWithPopup(provider);
            
            // 检查是否新用户
            if (result.additionalUserInfo.isNewUser) {
                await db.collection('users').doc(result.user.uid).set({
                    email: result.user.email,
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    favorites: [],
                    listings: 0
                });
            }
            
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // 登出
    async logout() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // 错误信息本地化
    getErrorMessage(code) {
        const messages = {
            'auth/email-already-in-use': 'Email ja uza',
            'auth/invalid-email': 'Email invalidu',
            'auth/weak-password': 'Senha fraku (minimu 6 karakter)',
            'auth/user-not-found': 'Usuario ka nu eksisti',
            'auth/wrong-password': 'Senha erradu',
            'auth/popup-closed-by-user': 'Login kansela'
        };
        return messages[code] || 'Erro: ' + code;
    },

    // 显示登录弹窗
    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <button class="auth-close" onclick="this.closest('.auth-modal').remove()">&times;</button>
                <h2>Entra na CasaCV</h2>
                <button class="btn-google" onclick="Auth.loginWithGoogle().then(r => r.success && document.querySelector('.auth-modal').remove())">
                    <i class="fab fa-google"></i> Kontinua ku Google
                </button>
                <div class="auth-divider"><span>o</span></div>
                <form id="login-form" onsubmit="Auth.handleLogin(event)">
                    <input type="email" id="login-email" placeholder="Email" required>
                    <input type="password" id="login-password" placeholder="Senha" required>
                    <button type="submit" class="btn-primary">Entra</button>
                </form>
                <p class="auth-switch">Ka ten konta? <a href="#" onclick="Auth.showRegisterModal(); return false;">Kria konta</a></p>
            </div>
        `;
        document.body.appendChild(modal);
    },

    // 显示注册弹窗
    showRegisterModal() {
        document.querySelector('.auth-modal')?.remove();
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <button class="auth-close" onclick="this.closest('.auth-modal').remove()">&times;</button>
                <h2>Kria Konta</h2>
                <button class="btn-google" onclick="Auth.loginWithGoogle().then(r => r.success && document.querySelector('.auth-modal').remove())">
                    <i class="fab fa-google"></i> Kontinua ku Google
                </button>
                <div class="auth-divider"><span>o</span></div>
                <form id="register-form" onsubmit="Auth.handleRegister(event)">
                    <input type="text" id="reg-name" placeholder="Naran" required>
                    <input type="email" id="reg-email" placeholder="Email" required>
                    <input type="password" id="reg-password" placeholder="Senha" required minlength="6">
                    <button type="submit" class="btn-primary">Kria Konta</button>
                </form>
                <p class="auth-switch">Ja ten konta? <a href="#" onclick="Auth.showLoginModal(); return false;">Entra</a></p>
            </div>
        `;
        document.body.appendChild(modal);
    },

    // 处理登录表单
    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const result = await this.login(email, password);
        if (result.success) {
            document.querySelector('.auth-modal')?.remove();
            showToast('Bem-vindu!');
        } else {
            showToast(result.error, 'error');
        }
    },

    // 处理注册表单
    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        
        const result = await this.register(email, password, name);
        if (result.success) {
            document.querySelector('.auth-modal')?.remove();
            showToast('Konta kriadu!');
        } else {
            showToast(result.error, 'error');
        }
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => Auth.init());
