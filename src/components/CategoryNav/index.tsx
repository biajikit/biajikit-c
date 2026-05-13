import {useState} from 'react';
import {useDialog} from "@/hooks/dialogConfig";
import {useScrollTrigger } from '@/hooks/useTriggerVisibility';

export default function Index({}) {
    const [navActive, setNavActive] = useState(0)
    const {showDialog, setDialog} = useDialog(); // 弹框设置
    const {isOutOfView} = useScrollTrigger ();
    return (
        <>
            {/*小屏模式*/}
            {isOutOfView &&
                <div
                    className="fixed left-0 top-[56px] w-full bg-[rgba(255,255,255,1)] z-8 p-[26px_16px_0_16px] flex items-start justify-start sm:hidden">
                    <div className="w-full flex items-center justify-start overflow-y-auto h-[26px] mr-[12px]">
                        <div
                            className="h-[24px] mr-[26px] flex-none font-[500] text-[14px] text-[rgba(51,51,51,1)] relative">
                            啊大大啊但是
                            <div
                                className="w-[20px] h-[2px] bg-[rgba(51,51,51,1)] absolute left-[50%] bottom-0 translate-x-[-50%]"></div>
                        </div>
                        <div
                            className="h-[24px] mr-[26px] flex-none font-[500] text-[14px] text-[rgba(153,153,153,1)] relative">
                            啊大大啊但是
                        </div>
                        <div
                            className="h-[24px] mr-[26px] flex-none font-[500] text-[14px] text-[rgba(153,153,153,1)] relative">
                            啊大大啊但是
                        </div>
                        <div
                            className="h-[24px] mr-[26px] flex-none font-[500] text-[14px] text-[rgba(153,153,153,1)] relative">
                            啊大大啊但是
                        </div>
                        <div
                            className="h-[24px] mr-[26px] flex-none font-[500] text-[14px] text-[rgba(153,153,153,1)] relative">
                            啊大大啊但是
                        </div>
                        <div
                            className="h-[24px] mr-[26px] flex-none font-[500] text-[14px] text-[rgba(153,153,153,1)] relative">
                            啊大大啊但是
                        </div>
                    </div>
                    <i className="iconfont icon-santiaogang text-[16px] cursor-pointer flex-none"
                       onClick={() => setDialog('navModelShow')}></i>
                </div>}
            {/*大屏模式*/}
            <div
                className="flex-none hidden sm:block w-[166px] mr-[20px] mt-[20px] sticky top-0 h-screen overflow-y-auto">
                <div
                    className="relative h-[22px] flex justify-start items-center pl-[20px] font-[500] text-[16px] text-[rgba(51,51,51,1)] mb-[16px] cursor-pointer">
                    大萨达是多少
                    <div className="h-full w-[2px] bg-[rgba(51,51,51,1)] absolute right-0 top-0"></div>
                </div>
                <div
                    className="relative h-[22px] flex justify-start items-center pl-[20px] font-[500] text-[16px] text-[rgba(153,153,153,1)] mb-[16px] cursor-pointer">
                    大萨达是多少
                </div>
                <div
                    className="relative h-[22px] flex justify-start items-center pl-[20px] font-[500] text-[16px] text-[rgba(153,153,153,1)] mb-[16px] cursor-pointer">
                    大萨达是多少
                </div>
                <div
                    className="relative h-[22px] flex justify-start items-center pl-[20px] font-[500] text-[16px] text-[rgba(153,153,153,1)] mb-[16px] cursor-pointer">
                    大萨达是多少
                </div>
            </div>

            {/*小屏右侧弹框*/}
            {showDialog === 'navModelShow' &&
                <div
                    className="w-full h-full fixed left-0 top-0 bg-[rgba(51,51,51,0.6)] backdrop-blur-[4px] z-11 flex justify-end sm:hidden"
                    onClick={() => setDialog()}>
                    <div className="h-full p-[27px_16px_0_16px] bg-[rgba(255,255,255,1)] pop-right">
                        <div className="h-[24px] flex items-start justify-start">
                            <div className="text-center w-full">
                                打算打打
                            </div>
                            <i className="iconfont icon-santiaogang text-[16px] flex-none"></i>
                        </div>
                        <div className="h-[calc(100vh-51px)] pt-[24px] overflow-y-auto">
                            <div className="h-[42px] flex items-center justify-between cursor-pointer">
                                <div className="text-[rgba(51,51,51,1)] text-[14px] font-[500] mr-[110px]">
                                    啊实打实大萨达
                                </div>
                                <i className="iconfont icon-icon_done text-[16px] text-[rgba(51,51,51,1)]"></i>
                            </div>
                            <div className="h-[42px] flex items-center justify-between cursor-pointer">
                                <div className="text-[rgba(153,153,153,1)] text-[14px] font-[500] mr-[110px]">
                                    啊实打实大萨达
                                </div>
                            </div>
                            <div className="h-[42px] flex items-center justify-between cursor-pointer">
                                <div className="text-[rgba(153,153,153,1)] text-[14px] font-[500] mr-[110px]">
                                    啊实打实大萨达
                                </div>
                            </div>
                            <div className="h-[42px] flex items-center justify-between cursor-pointer">
                                <div className="text-[rgba(153,153,153,1)] text-[14px] font-[500] mr-[110px]">
                                    啊实打实大萨达
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}