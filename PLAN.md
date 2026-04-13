# CasaCV 佛得角租房平台 - 发展规划

## 项目概述
- **项目名称**: CasaCV
- **定位**: 佛得角最专业的租房平台
- **目标用户**: 本地居民、外籍人士、华人社区、游客
- **联系方式**: houlei@live.cn

---

## 第一阶段：优化现有功能（1-2周）

### 语言扩展
当前：中文、英文、葡萄牙语
**新增**：
- **克里奥尔语 (Kriolu)** - 佛得角本地语言，最重要！
- **法语** - 服务法语区非洲移民和游客

### 页面优化
1. **首页增加信任元素**
   - 平台已验证房源数量
   - 成功交易数
   - 用户评价展示

2. **增加"找工作"板块**
   - 租房 + 求职 一站式
   - 针对外籍人士和本地求职者
   - 分类：全职、兼职、临时工

3. **联系方式统一**
   - 全站显示联系邮箱：houlei@live.cn
   - 增加 WhatsApp 联系按钮

---

## 第二阶段：推广获客（持续）

### 线上推广

#### 1. 社交媒体
| 平台 | 策略 |
|------|------|
| **Facebook** | 佛得角人最常用的平台，创建 CasaCV 主页 |
| **Instagram** | 发布精美房源图片，吸引年轻人 |
| **WhatsApp** | 建立群组，发布最新房源 |

#### 2. 本地合作
- **与中介合作** - 让他们来平台发布房源
- **与酒店合作** - 推荐长住客人使用
- **与中国人商会** - 华人社区推广
- **与佛得角大学** - 学生租房需求大

#### 3. SEO优化
- 优化 Google 搜索关键词："aluguel praia", "casa mindelo", "rent cape verde"
- 提交到佛得角本地网站目录

### 线下推广
- 在普拉亚、明德卢张贴海报
- 机场、港口放置宣传单
- 与本地电台合作

---

## 第三阶段：功能扩展（1-3个月）

### 1. 用户系统
```
用户类型：
├── 租客
│   ├── 浏览房源
│   ├── 收藏房源
│   └── 联系房东
├── 房东
│   ├── 发布房源
│   ├── 管理房源
│   └── 查看咨询
└── 中介
    ├── 批量发布
    └── 置顶推广
```

### 2. 找工作板块
**功能**：
- 职位发布（企业/个人）
- 简历上传
- 职位分类：建筑、服务、旅游、IT、中文翻译
- 薪资范围筛选

**针对人群**：
- 在佛得角找工作的中国人
- 想招中国人的本地企业
- 游客找短期工作

### 3. 地图找房
- 集成 Google Maps
- 按区域显示房源
- 显示周边设施（超市、医院、学校）

### 4. 聊天系统
- 站内消息（无需加微信）
- 支持图片发送
- 自动翻译功能

### 5. 在线支付（后期）
- 集成当地支付方式
- 信用卡支付
- 押金托管服务

---

## 第四阶段：商业化（3-6个月）

### 盈利模式

| 服务 | 收费方式 |
|------|---------|
| 房源置顶 | CVE 500/周 |
| 首页推荐 | CVE 2000/月 |
| 中介会员 | CVE 5000/月，无限发布 |
| 广告位 | 按展示收费 |
| 求职置顶 | CVE 300/周 |

### 增值服务
- 房屋拍照服务
- 合同模板下载
- 搬家服务推荐
- 清洁服务推荐

---

## 技术实现规划

### 技术栈建议
```
前端: HTML + CSS + JavaScript (保持现状)
后端: Node.js + Express / Python + Flask
数据库: MongoDB / PostgreSQL
地图: Google Maps API
支付: Stripe / 本地支付接口
部署: GitHub Pages → 后期迁移到服务器
```

### 数据库设计
```
用户表 (users)
├── id, name, email, phone, type, created_at

房源表 (listings)
├── id, title, city, district, price, rooms, type, images, user_id, status

职位表 (jobs)
├── id, title, company, location, salary, type, description, contact

消息表 (messages)
├── id, from_user, to_user, content, created_at
```

---

## 推广文案（克里奥尔语 + 多语言）

### 口号
- **Kriolu**: "CasaCV - Bu ka bu moradia!" (CasaCV - 你的家！)
- **葡萄牙语**: "CasaCV - Encontre sua casa em Cabo Verde"
- **英语**: "CasaCV - Find your home in Cape Verde"
- **中文**: "CasaCV - 佛得角租房首选"

### Facebook 推广帖（示例）
```
🇨🇻 Boas notícias pra quem ta procura casa!

CasaCV é o plataforma novo pra aluguel em Cabo Verde.
✅ Fácil di usa
✅ Sem taxa di intermediação
✅ Casa na Praia, Mindelo, e tudu ilhas

Entra já: https://hi8150112.github.io/casacv/

#CasaCV #AluguelCaboVerde #CasaPraia #CasaMindelo
```

---

## 下一步行动

### 本周要做
1. [ ] 添加克里奥尔语翻译
2. [ ] 优化首页，增加信任元素
3. [ ] 创建 Facebook 页面
4. [ ] 在华人微信群分享链接

### 需要我帮你做
1. [ ] 克里奥尔语翻译文件
2. [ ] 找工作板块页面
3. [ ] 推广海报设计
4. [ ] Facebook 推广文案

---

## 联系方式
- **邮箱**: houlei@live.cn
- **网站**: https://hi8150112.github.io/casacv/

---

*最后更新: 2026年4月13日*
