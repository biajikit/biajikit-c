import {useState, useEffect} from 'react';
import {getShopConfig} from '@/utils/api/shopConfig.ts';
import {ShopInfo} from '@/type/shop.ts';

let cachedData: ShopInfo = {} as ShopInfo;
let fetchPromise: Promise<ShopInfo> | null = null;

// 订阅器：支持多组件同步更新
let subscribers: (() => void)[] = [];

export function useShopConfig() {
    const [, forceUpdate] = useState({});

    // 订阅更新
    useEffect(() => {
        const update = () => forceUpdate({});
        subscribers.push(update);
        return () => {
            subscribers = subscribers.filter(s => s !== update);
        };
    }, []);

    // 初始化请求
    useEffect(() => {
        if (cachedData.menu_id) return;
        if (fetchPromise) return;

        const fetchData = async () => {
            try {
                fetchPromise = getShopConfig({}).then(res => res.data);
                const result = await fetchPromise;

                // 空值 / null 自动转为空数组，避免页面报错
                result.parking = result.parking ?? [];
                result.payment = result.payment ?? [];
                result.payment_method = result.payment_method ?? [];
                result.service_model = result.service_model ?? [];
                result.social = result.social ?? [];

                cachedData = result;
                subscribers.forEach(s => s());
            } catch (err) {
                console.error('获取店铺配置失败', err);
            }
        };

        fetchData();
    }, []);

    // 手动修改配置
    const setShopConfig = (newData: Partial<ShopInfo>) => {
        if (!cachedData.menu_id) return;
        cachedData = {...cachedData, ...newData};
        subscribers.forEach(s => s());
    };

    return {
        shopConfig: cachedData,
        loading: !cachedData && !fetchPromise,
        setShopConfig, // 外部可修改
    };
}