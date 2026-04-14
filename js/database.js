// CasaCV 数据库操作

const Database = {
    // 房源相关
    listings: {
        // 获取所有房源
        async getAll(filters = {}) {
            let query = db.collection('listings').orderBy('createdAt', 'desc');
            
            if (filters.city) query = query.where('city', '==', filters.city);
            if (filters.type) query = query.where('type', '==', filters.type);
            if (filters.status) query = query.where('status', '==', filters.status);
            
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },

        // 获取单个房源
        async getById(id) {
            const doc = await db.collection('listings').doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        },

        // 发布房源
        async create(data) {
            const user = auth.currentUser;
            if (!user) throw new Error('Tenki loga');

            const listing = {
                ...data,
                userId: user.uid,
                userName: user.displayName || user.email,
                userPhoto: user.photoURL || null,
                status: 'active',
                views: 0,
                likes: 0,
                favorites: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await db.collection('listings').add(listing);
            
            // 更新用户房源计数
            await db.collection('users').doc(user.uid).update({
                listings: firebase.firestore.FieldValue.increment(1)
            });

            return docRef.id;
        },

        // 更新房源
        async update(id, data) {
            await db.collection('listings').doc(id).update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        },

        // 删除房源
        async delete(id) {
            await db.collection('listings').doc(id).delete();
        },

        // 增加浏览量
        async incrementViews(id) {
            await db.collection('listings').doc(id).update({
                views: firebase.firestore.FieldValue.increment(1)
            });
        }
    },

    // 评论相关
    comments: {
        // 获取评论
        async getByListing(listingId) {
            const snapshot = await db.collection('comments')
                .where('listingId', '==', listingId)
                .orderBy('createdAt', 'desc')
                .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },

        // 添加评论
        async add(listingId, content) {
            const user = auth.currentUser;
            if (!user) throw new Error('Tenki loga');

            const comment = {
                listingId,
                userId: user.uid,
                userName: user.displayName || user.email,
                userPhoto: user.photoURL || null,
                content,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('comments').add(comment);
        },

        // 删除评论
        async delete(commentId) {
            await db.collection('comments').doc(commentId).delete();
        }
    },

    // 点赞相关
    likes: {
        // 检查是否已点赞
        async hasLiked(listingId) {
            const user = auth.currentUser;
            if (!user) return false;

            const doc = await db.collection('likes')
                .doc(`${user.uid}_${listingId}`)
                .get();
            return doc.exists;
        },

        // 切换点赞
        async toggle(listingId) {
            const user = auth.currentUser;
            if (!user) throw new Error('Tenki loga');

            const likeRef = db.collection('likes').doc(`${user.uid}_${listingId}`);
            const listingRef = db.collection('listings').doc(listingId);

            const likeDoc = await likeRef.get();

            if (likeDoc.exists) {
                // 取消点赞
                await likeRef.delete();
                await listingRef.update({
                    likes: firebase.firestore.FieldValue.increment(-1)
                });
                return false;
            } else {
                // 添加点赞
                await likeRef.set({
                    userId: user.uid,
                    listingId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                await listingRef.update({
                    likes: firebase.firestore.FieldValue.increment(1)
                });
                return true;
            }
        }
    },

    // 收藏相关
    favorites: {
        // 获取用户收藏
        async getByUser(userId) {
            const snapshot = await db.collection('favorites')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();
            
            const listingIds = snapshot.docs.map(doc => doc.data().listingId);
            
            // 获取房源详情
            const listings = [];
            for (const id of listingIds) {
                const listing = await Database.listings.getById(id);
                if (listing) listings.push(listing);
            }
            return listings;
        },

        // 检查是否已收藏
        async hasFavorited(listingId) {
            const user = auth.currentUser;
            if (!user) return false;

            const doc = await db.collection('favorites')
                .doc(`${user.uid}_${listingId}`)
                .get();
            return doc.exists;
        },

        // 切换收藏
        async toggle(listingId) {
            const user = auth.currentUser;
            if (!user) throw new Error('Tenki loga');

            const favRef = db.collection('favorites').doc(`${user.uid}_${listingId}`);
            const listingRef = db.collection('listings').doc(listingId);
            const userRef = db.collection('users').doc(user.uid);

            const favDoc = await favRef.get();

            if (favDoc.exists) {
                // 取消收藏
                await favRef.delete();
                await listingRef.update({
                    favorites: firebase.firestore.FieldValue.increment(-1)
                });
                await userRef.update({
                    favorites: firebase.firestore.FieldValue.arrayRemove(listingId)
                });
                return false;
            } else {
                // 添加收藏
                await favRef.set({
                    userId: user.uid,
                    listingId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                await listingRef.update({
                    favorites: firebase.firestore.FieldValue.increment(1)
                });
                await userRef.update({
                    favorites: firebase.firestore.FieldValue.arrayUnion(listingId)
                });
                return true;
            }
        }
    },

    // 联系表单
    contacts: {
        // 提交联系请求
        async submit(listingId, message, contactInfo) {
            const user = auth.currentUser;
            
            const contact = {
                listingId,
                message,
                contactInfo,
                userId: user?.uid || null,
                userName: user?.displayName || contactInfo.name || 'Anonimu',
                status: 'pending',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('contacts').add(contact);
        }
    },

    // 举报
    reports: {
        // 提交举报
        async submit(contentId, contentType, reason, details) {
            const user = auth.currentUser;

            const report = {
                contentId,
                contentType, // 'listing', 'comment', etc.
                reason,
                details,
                userId: user?.uid || null,
                status: 'pending',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('reports').add(report);
        }
    }
};
