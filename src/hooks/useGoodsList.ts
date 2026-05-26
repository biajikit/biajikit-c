import {useState, useEffect, useMemo} from 'react';
import {ProductClass, ProductItem} from '@/type/goods.ts';
import {getGoodsList} from '@/utils/api/goodsCard.ts';
import {useLanguage} from "@/assets/dict/language.tsx";

// 全局缓存 + 全局状态订阅（保证跨组件同步）
let cachedPromise: Promise<ProductClass[]> | null = null;
let cachedData: ProductClass[] | null = null;
let lastLang: string | null = null;

// 全局监听列表（解决跨组件更新）
let listeners: (() => void)[] = [];

// 触发所有组件更新
function notifyListeners() {
    listeners.forEach(listener => listener());
}

export function useGoodsList() {
    const [, forceUpdate] = useState(0); // 跨组件刷新触发器
    const {lang} = useLanguage();

    // 每次创建实例都订阅，保证数据统一
    useEffect(() => {
        const listener = () => forceUpdate(n => n + 1);
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    // 统一从全局缓存读取（所有组件共用一份数据）
    const cardList = cachedData || [];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // ======================
    // 暴露方法：修改商品列表里某个数据的值
    // ======================
    const updateProductField = (
        productId: number,
        field: keyof ProductClass['list'][0],
        value: any
    ) => {
        if (!cachedData) return;

        // 全新拷贝 → 修改 → 覆盖全局缓存
        const newData = cachedData.map(cls => ({
            ...cls,
            list: cls.list.map(item => ({
                ...item,
                cart_num: (item as any).cart_num ?? 0
            }))
        }));

        newData.forEach(cls => {
            cls.list.forEach(item => {
                if (item.product_id === productId) {
                    (item as any)[field] = value;
                }
            });
        });

        // 更新全局缓存
        cachedData = newData;

        // 🔥 通知所有组件刷新（跨组件实时更新）
        notifyListeners();
    };

    // ======================
    // 实时计算总数（跨组件实时）
    // ======================
    const {totalCartNum, totalCartPrice, oldTotalCartPrice, totalList} = useMemo(() => {
        let totalNum: number = 0,
            totalPrice: number = 0,
            oldTotal: number = 0,
            listData: Array<ProductItem> = []


        cardList.forEach(cls => {
            cls.list.forEach(item => {
                totalNum += item.cart_num || 0;
                totalPrice += (item.cart_num || 0) * (item.price_minor || 0);
                oldTotal += (item.cart_num || 0) * (item.original_price_minor || item.price_minor || 0);
                if (item.cart_num) listData.push(item)
            });
        });

        return {
            totalCartNum: totalNum,
            totalCartPrice: totalPrice,
            oldTotalCartPrice: oldTotal,
            totalList: listData
        };
    }, [cardList]);

    // 清空数据
    function clearCartData() {
        cardList.forEach(cls => {
            cls.list.forEach(item => {
                updateProductField(item.product_id, 'cart_num', 0)
            });
        });
    }

    // ======================
    // 语言切换 + 数据请求
    // ======================
    useEffect(() => {
        if (lastLang !== null && lastLang !== lang) {
            cachedData = null;
            cachedPromise = null;
        }
        lastLang = lang;

        if (cachedData) {
            setLoading(false);
            notifyListeners(); // 同步所有组件
            return;
        }

        if (cachedPromise) {
            cachedPromise.then(data => {
                cachedData = data;
                notifyListeners();
                setLoading(false);
            }).catch(err => {
                setError(err as Error);
                setLoading(false);
            });
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                cachedPromise = getGoodsList({}).then(res => res.data);
                const data = await cachedPromise;

                data.forEach(item => {
                    item.list.forEach(product => {
                        product.cart_num = product.cart_num ?? 0;
                    });
                });

                cachedData = data;
                notifyListeners(); // 🔥 关键：所有组件同步
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [lang]);

    return {
        cardList,
        loading,
        error,
        updateProductField,
        totalCartNum, // 跨组件实时总数
        totalCartPrice,
        oldTotalCartPrice,
        totalList,
        clearCartData
    };
}