// Firebase 配置 - CasaCV 后端
const firebaseConfig = {
    apiKey: "AIzaSyCasaCV-YourAPIKey",
    authDomain: "casacv-app.firebaseapp.com",
    projectId: "casacv-app",
    storageBucket: "casacv-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 导出常用实例
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// 启用离线持久化
db.enablePersistence({
    synchronizeTabs: true
}).catch((err) => {
    console.log('Persistence error:', err);
});

console.log('Firebase initialized');
