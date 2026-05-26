import {useEffect} from 'react';
import {useDialog} from "@/hooks/dialogConfig";
import {useScrollTrigger} from '@/hooks/useTriggerVisibility';
import {useGoodsList} from "@/hooks/useGoodsList.ts";

export default function Index({}) {
    const {showDialog, setDialog} = useDialog();
    const {
        isOutOfView,
        activeTitleIndex,
        scrollToIndex,
        navContainerRef,
        navItemRefs,
        refreshNavRefs,
    } = useScrollTrigger();

    const { cardList } = useGoodsList();

    // 监听 cardList 数组更新导航节点数据
    useEffect(() => {
        if (cardList.length > 0) {
            refreshNavRefs();
        }
    }, [cardList]);

    return (
        <>
            {isOutOfView &&
                <div
                    className="fixed left-0 top-[56px] w-full bg-[rgba(255,255,255,1)] z-8 p-[26px_16px_0_16px] flex items-start justify-start sm:hidden">
                    <div className="w-full flex items-center justify-start overflow-x-auto h-[26px] mr-[12px]"
                         ref={navContainerRef}>
                        {cardList.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    navItemRefs.current[index] = el;
                                }}
                                onClick={() => scrollToIndex(index)}
                                className={`h-[24px] mr-[26px] flex-none font-[500] text-[14px] relative ${
                                    activeTitleIndex === index
                                        ? 'text-[rgba(51,51,51,1)]'
                                        : 'text-[rgba(153,153,153,1)]'
                                }`}
                            >
                                {item.class_name}
                                {activeTitleIndex === index &&
                                    <div
                                        className="w-[20px] h-[2px] bg-[rgba(51,51,51,1)] absolute left-[50%] bottom-0 translate-x-[-50%]"></div>}
                            </div>
                        ))}
                    </div>
                    <i className="iconfont icon-santiaogang text-[16px] cursor-pointer flex-none"
                       onClick={() => setDialog('navModelShow')}></i>
                </div>}

            <div
                className="flex-none hidden sm:block w-[166px] mr-[20px] mt-[20px] sticky top-0 h-screen overflow-y-auto">
                {cardList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={`relative h-[22px] flex justify-start items-center pl-[20px] font-[500] text-[16px] mb-[16px] cursor-pointer ${activeTitleIndex === index ? 'text-[rgba(51,51,51,1)]' : 'text-[rgba(153,153,153,1)]'}`}>
                        {item.class_name}
                        {activeTitleIndex === index &&
                            <div className="h-full w-[2px] bg-[rgba(51,51,51,1)] absolute right-0 top-0"></div>}
                    </div>
                ))}
            </div>

            {showDialog === 'navModelShow' &&
                <div
                    className="w-full h-full fixed left-0 top-0 bg-[rgba(51,51,51,0.6)] backdrop-blur-[4px] z-11 flex justify-end sm:hidden"
                    onClick={() => setDialog()}>
                    <div className="h-full p-[27px_16px_0_16px] bg-[rgba(255,255,255,1)] pop-right">
                        <div className="h-[24px] flex items-start justify-start">
                            <div className="text-center w-full">
                                {/*打算打打*/}
                            </div>
                            <i className="iconfont icon-santiaogang text-[16px] flex-none"></i>
                        </div>
                        <div className="h-[calc(100vh-51px)] pt-[24px] overflow-y-auto">
                            {cardList.map((item, index) => (
                                <div className="h-[42px] flex items-center justify-between cursor-pointer"
                                     onClick={() => scrollToIndex(index)}
                                     key={index}>
                                    <div
                                        className={`text-[14px] font-[500] mr-[110px] ${activeTitleIndex === index ? 'text-[rgba(51,51,51,1)]' : 'text-[rgba(153,153,153,1)]'}`}>
                                        {item.class_name}
                                    </div>
                                    {activeTitleIndex === index &&
                                        <i className="iconfont icon-icon_done text-[16px] text-[rgba(51,51,51,1)]"></i>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </>
    );
}