import {useLanguage} from "@/assets/dict/language.tsx";
import {useDialog} from "@/hooks/dialogConfig";

export default function Index({}) {
    const {t} = useLanguage() // 语言设置
    const {showDialog, setDialog} = useDialog(); // 弹框设置
    return (
        <>
            {/*购物车按钮*/}
            <button aria-label={String(t('nav.cart') ?? '')}
                    onClick={() => setDialog('showCartDialog')}
                    className="h-[36px] w-[36px] rounded-[50%] bg-[rgba(51,51,51,1)] backdrop-blur-[4px] flex items-center justify-center cursor-pointer flex-none relative">
                <i className="iconfont icon-fi_shopping-cart text-[rgba(255,255,255,1)] text-[16px]"></i>
                <div
                    className="absolute left-[20px] top-[-5px] rounded-[7.5px] bg-[rgba(255,73,64,1)] h-[15px] p-[0_5px] font-[500] text-[10px] text-[rgba(255,255,255,1)]">
                    999
                </div>
            </button>
            {/*购物车浮窗*/}
            {!showDialog &&
                <div onClick={() => setDialog('showCartDialog')}
                     className="fixed z-3 left-[50%] translate-x-[-50%] bottom-[50px] w-[calc(100%-52px)] sm:w-[535px] h-[60px] rounded-[35px] bg-[rgba(0,0,0,0.8)] backdrop-blur-[4px] flex items-center justify-center cursor-pointer p-[0_25px_0_6px]">
                    <div className="flex-none w-[57px] mr-[10px] flex items-center justify-start">
                        <div
                            className="bg-[rgba(255,255,255,0.1)] h-[48px] min-w-[46px] p-[0_12] rounded-[24px] font-[500] text-[18px] text-[rgba(255,255,255,1)] flex items-center justify-center">
                            10
                        </div>
                    </div>
                    <div className="w-full sm:text-center">
                        <div className="font-[400] text-[12px] text-[rgba(255,255,255,0.6)]">啊实打实大大是的</div>
                        <div className="font-[500] text-[14px] text-[rgba(255,255,255,1)]">大撒大声地</div>
                    </div>
                    <div className="font-[500] text-[18px] text-[rgba(255,255,255,1)] ml-[10px] flex-none">
                        $31.00
                    </div>
                </div>}

            {/*购物车弹框*/}
            {showDialog === 'showCartDialog' &&
                <div className="bg-[rgba(51,51,51,0.6)] z-11 fixed left-0 top-0 w-full h-full flex items-end justify-center md:justify-end"
                     onClick={() => setDialog('')}>
                    <div className="h-[80vh] md:h-full w-full md:w-1/2 bg-[rgba(255,255,255,1)] pop-up md:pop-right rounded-[14px_14px_0_0] md:rounded-[0]">

                    </div>
                </div>}
        </>

    );
}