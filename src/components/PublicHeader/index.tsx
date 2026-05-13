import {useEffect, useRef, useState} from 'react';
import {useLanguage} from "@/assets/dict/language.tsx";
import {languageKeyList} from "@/assets/dict/pageLanguage";
import {useDialog} from "@/hooks/dialogConfig";
import ShopCart from '@/components/ShopCart/index'
import {getHeaderConfig} from "@/utils/api/publicHeader";
import {AxiosResponse} from "axios";

export default function Index({}) {

    const {t, setLang, lang, abbreviation} = useLanguage() // 语言设置
    const {showDialog, setDialog} = useDialog(); // 弹框设置
    const menuDom = useRef<HTMLDivElement>(null); // 导航菜单元素
    const [menuState, setMenuState] = useState({
        loadingOver: false, // 是否加载完
        outSize: false,     // 是否超长
    }); // 导航菜单显隐

    useEffect(() => {
        // 菜单栏长度监听计算
        const check = () => {
            if (!menuDom.current) return;
            const h = menuDom.current.offsetHeight;
            setMenuState(prev => ({...prev, outSize: h > 24, loadingOver: true}));
        };

        check();
        window.addEventListener('resize', check);
        const observer = new ResizeObserver(check);
        if (menuDom.current) observer.observe(menuDom.current);

        return () => {
            window.removeEventListener('resize', check);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="">
            <div className="h-[56px]"></div>
            <div
                className="h-[56px] flex justify-between items-center p-[0_16px] fixed left-0 top-0 z-10 w-full bg-[rgba(255,255,255,1)]">
                <img src="https://s3.menukit.ai/font/img_home_hero.png" alt=""
                     className="h-[36px] flex-none mr-[16px]"/>
                <div className="flex items-center justify-end w-full">
                    {/*导航菜单*/}
                    {menuState.outSize ?
                        <div onClick={() => setDialog('headerMenu')}
                             className="flex items-center justify-center mr-[18px] cursor-pointer">
                            <i className={`iconfont ${showDialog === 'headerMenu' ? 'icon-icon_close_dialog' : 'icon-santiaogang'} text-[20px]`}></i>
                        </div>
                        :
                        <div className={`w-full ${menuState.loadingOver ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center justify-end flex-wrap" ref={menuDom}>
                                <div className="font-[500] text-[16px] text-[rgba(51,51,51,1)] mr-[70px] flex-none">
                                    大师大师大
                                </div>
                            </div>
                        </div>}
                    {/*购物车*/}
                    <ShopCart></ShopCart>
                    {/*语言切换按钮*/}
                    <button aria-label={String(t('nav.language') ?? '')}
                            onClick={() => setDialog('languageDialog')}
                            className="h-[36px] rounded-[18px] p-[0_9px] bg-[rgba(51,51,51,1)] backdrop-blur-[4px] flex items-center justify-center cursor-pointer ml-[10px]">
                        <i className="iconfont icon-icon_website text-[16px] text-[rgba(255,255,255,1)]"></i>
                        <div
                            className="font-[500] text-[14px] m-[0_4px] text-[rgba(255,255,255,1)]">{abbreviation}</div>
                        <i className="iconfont icon-icon_arrow_down text-[12px]  text-[rgba(255,255,255,1)]"></i>
                    </button>
                </div>
            </div>

            {/*弹框*/}
            {(showDialog === 'languageDialog' || showDialog === 'headerMenu') &&
                <div onClick={() => setDialog('')}
                     className="h-[calc(100%-56px)] fixed w-full top-[56px] left-0 bg-[rgba(51,51,51,0.6)] z-9 backdrop-blur-[4px]">
                    {/*语言选择*/}
                    {showDialog === 'languageDialog' &&
                        <div className="p-[20px_26px] bg-[rgba(255,255,255,1)] max-h-[50vh] overflow-y-auto pop-down">
                            {languageKeyList.map((item: any, index) => (
                                <div key={index}
                                     className="h-[44px] flex items-center justify-between cursor-pointer"
                                     onClick={() => setLang(item.key)}>
                                    <div
                                        className={`font-[500] text-[16px]  ${lang === item.key ? 'text-[rgba(51,51,51,1)]' : 'text-[rgba(153,153,153,1)]'}`}>
                                        {item.name}
                                    </div>
                                    <i className={`iconfont icon-icon_done ${lang !== item.key && 'hidden'}`}></i>
                                </div>
                            ))}
                        </div>}

                    {/*菜单选择*/}
                    {showDialog === 'headerMenu' &&
                        <div>
                            <div
                                className="p-[20px_26px] bg-[rgba(255,255,255,1)] max-h-[50vh] overflow-y-auto pop-down">
                                <div className="h-[44px] flex items-center justify-between cursor-pointer">
                                    <div className={`font-[500] text-[16px]  text-[rgba(51,51,51,1)]`}>
                                        阿达是大多数
                                    </div>
                                    <i className={`iconfont icon-icon_arrow_right`}></i>
                                </div>
                                <div className="h-[44px] flex items-center justify-between cursor-pointer">
                                    <div className={`font-[500] text-[16px]  text-[rgba(51,51,51,1)]`}>
                                        阿达是大多数
                                    </div>
                                    <i className={`iconfont icon-icon_arrow_right`}></i>
                                </div>
                            </div>
                        </div>}
                </div>}
        </div>
    );
}