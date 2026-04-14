// CasaCV - Kriolu di Kabu Verdi (地道佛得角克里奥尔语词汇表)
// 基于佛得角日常真实口语，非机器翻译

const KrioluVocab = {
    // 导航与核心功能
    nav: {
        home: "Nhas Kaza",                    // 首页（我的家）
        confession: "Paredi di Anonimu",      // 匿名告白墙
        listings: "Kaza pa Aluguel",          // 租房
        jobs: "Traballu",                     // 招聘/工作
        community: "Komunidade",              // 社区
        services: "Servisu",                  // 本地服务
        trade: "Negosiu",                     // 贸易/商业
        profile: "Meu Perfil",                // 个人中心
        publish: "Publika",                   // 发布
        search: "Buska",                      // 搜索
        filter: "Filtra",                     // 筛选
        more: "Mais",                         // 更多
        back: "Volta",                        // 返回
        close: "Fexa",                        // 关闭
        save: "Guarda",                       // 保存
        delete: "Apaga",                      // 删除
        edit: "Muda",                         // 编辑
        cancel: "Kansela"                     // 取消
    },
    
    // 告白墙专用
    confession: {
        title: "Paredi di Anonimu",           // 匿名墙
        placeholder: "Skreve kuza bo kre fala...", // 写你想说的...
        anonymous: "Anonimu",                 // 匿名
        post: "Publika",                      // 发布
        like: "Gosta",                        // 喜欢/点赞
        comment: "Komentariu",                // 评论
        share: "Partilha",                    // 分享
        report: "Denuncia",                   // 举报
        noContent: "Nada atxa",               // 没找到
        success: "Publika susesu!",           // 发布成功
        error: "Erru: skreve kumidade"        // 错误：写内容
    },
    
    // 租房专用
    listings: {
        title: "Kaza pa Aluguel",             // 待租房源
        searchPlaceholder: "Buska kaza na Praia, Mindelo...",
        city: "Sidadi",                       // 城市
        type: "Tipu",                         // 类型
        price: "Prezu",                       // 价格
        rooms: "Kuartu",                      // 房间
        bathrooms: "Banhu",                   // 卫生间
        area: "Area",                         // 面积
        contact: "Kontata",                   // 联系
        landlord: "Proprietariu",             // 房东
        available: "Disponivel",              // 可用
        notAvailable: "Nada disponivel",      // 不可用
        longTerm: "Prazu longu",              // 长租
        shortTerm: "Purtu prazu",             // 短租
        featured: "Destaka",                  // 精选
        new: "Novu"                           // 新上
    },
    
    // 招聘专用
    jobs: {
        title: "Traballu",                    // 工作
        searchPlaceholder: "Buska traballu...",
        position: "Kargu",                    // 职位
        company: "Empresa",                   // 公司
        salary: "Sodru",                      // 工资（佛得角常用sodru）
        location: "Lokal",                    // 地点
        fullTime: "Tempu inteiru",            // 全职
        partTime: "Tempu parcial",            // 兼职
        apply: "Kandidata",                   // 申请
        requirements: "Rekesitu",             // 要求
        experience: "Esperiensia"             // 经验
    },
    
    // 社区/爆料
    community: {
        title: "Komunidade",                  // 社区
        complaint: "Voz di Povu",             // 百姓之声（爆料）
        news: "Notisia",                      // 新闻
        help: "Ajuda",                        // 求助
        discuss: "Diskute"                    // 讨论
    },
    
    // 表单与提示
    form: {
        name: "Nomi",                         // 姓名
        phone: "Telefone",                    // 电话
        email: "Korreiu",                     // 邮箱
        password: "Senha",                    // 密码
        submit: "Manda",                      // 提交
        required: "Obrigatoriu",              // 必填
        optional: "Opisonal",                 // 选填
        success: "Susesu",                    // 成功
        error: "Erru",                        // 错误
        loading: "Karregando...",             // 加载中
        empty: "Nada atxa"                    // 空/无内容
    },
    
    // 时间表达
    time: {
        today: "Oji",                         // 今天
        yesterday: "Onti",                    // 昨天
        daysAgo: "dia atras",                 // 天前
        hoursAgo: "ora atras",                // 小时前
        minutesAgo: "minutu atras",           // 分钟前
        justNow: "Dja"                        // 刚刚
    },
    
    // 互动反馈
    feedback: {
        likeSuccess: "Bo gosta!",             // 你点赞了
        commentSuccess: "Komentariu publika!", // 评论发布
        shareSuccess: "Partilha susesu!",     // 分享成功
        reportSuccess: "Denuncia manda!",     // 举报已提交
        saved: "Guarda susesu!",              // 保存成功
        deleted: "Apaga susesu!"              // 删除成功
    }
};

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KrioluVocab;
}
