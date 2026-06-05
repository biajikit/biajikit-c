import {useState, useEffect} from 'react';
import {getShopConfig} from '@/utils/api/shopConfig.ts';
import {ShopInfo} from '@/type/shop.ts';
import {getStorage} from "@/core/publicFn.ts";
import {languageKeyList} from "@/assets/dict/pageLanguage.ts";
import {useLanguage} from "@/assets/dict/language.tsx";

let cachedData: ShopInfo = {} as ShopInfo;
let fetchPromise: Promise<ShopInfo> | null = null;

let subscribers: (() => void)[] = [];
let listeners: (() => void)[] = [];

function notifyListeners() {
    listeners.forEach(listener => listener());
}

export function useShopConfig() {
    const [, forceUpdate] = useState({});
    const {lang} = useLanguage();

    // 订阅组件刷新
    useEffect(() => {
        const update = () => forceUpdate({});
        subscribers.push(update);
        return () => {
            subscribers = subscribers.filter(s => s !== update);
        };
    }, []);

    // 切换 lang 时清空缓存，强制重新请求
    useEffect(() => {
        // 切换语言时清空缓存，这样下一次执行会重新请求
        cachedData = {} as ShopInfo;
    }, [lang]);

    // 请求逻辑（lang 变化会触发）
    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchPromise = getShopConfig({}).then(res => res.data);
                const result = await fetchPromise;

                result.parking = result.parking ?? [];
                result.payment = result.payment ?? [];
                result.payment_method = result.payment_method ?? [];
                result.service_model = result.service_model ?? [];
                result.social = result.social ?? [];
                result.addr = result.addr ?? []

                cachedData = result;
                subscribers.forEach(s => s());

                languageKeyList.forEach(languageKey => {
                    languageKey.show = result.lang_config.includes(languageKey.key)
                });

                if (!getStorage('lang')) {
                    let locale = 'EN';
                    const localeFind = languageKeyList.find(
                        (language) =>
                            language.key.toLowerCase() === navigator.language.toLowerCase() &&
                            result.lang_config.includes(language.key)
                    );
                    if (localeFind) locale = localeFind.key;
                    else if (result.first_lang) locale = result.first_lang;

                    const {setLang} = useLanguage();
                    setLang(locale);
                }

                notifyListeners();
            } catch (err) {
                console.error('获取店铺配置失败', err);
            } finally {
                fetchPromise = null;
            }
        };

        // 只要没数据，就请求（lang 切换后缓存已清空，所以会重新请求）
        if (!cachedData.menu_id && !fetchPromise) {
            fetchData();
        }
    }, [lang]); // 依赖 lang，切换就跑

    const setShopConfig = (newData: Partial<ShopInfo>) => {
        if (!cachedData.menu_id) return;
        cachedData = {...cachedData, ...newData};
        subscribers.forEach(s => s());
    };

    return {
        shopConfig: cachedData,
        loading: !cachedData.menu_id,
        setShopConfig,
    };
}