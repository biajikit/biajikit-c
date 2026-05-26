import {useEffect} from 'react';
import Img from '@/components/Img';
// import {getExample} from "@/utils/api/shopRecommendCard";
// import {AxiosResponse} from "axios";

export default function Index() {
    useEffect(() => {
        // const init = async () => {
        //     const xx: AxiosResponse = await getExample({})
        //     console.log(xx)
        // }
        // init()
    }, []);
    return (
        <div className="w-full">
            {/* 横向滚动列表 */}
            <div className="flex items-stretch justify-start overflow-x-auto">
                {/* 卡片项 */}
                <div className="flex-shrink-0 w-[135px] sm:w-[150px] mr-[12px] relative pb-[34px] first:ml-[20px] last:mr-[20px]">

                    {/* 图片容器 */}
                    <div className="w-full h-[135px] sm:h-[150px] relative">
                        <Img
                            src="https://s3.menukit.ai/font/img_home_hero.png"
                            className="w-full h-full object-cover rounded-[14px]"
                            alt=""
                        />

                        {/* 角标 */}
                        <div
                            className="z-1 absolute left-0 top-0 flex items-center justify-center bg-[rgba(51_51_51)]/40 h-[22px] p-[0_8px] rounded-[14px_0_14px_0] font-[500] text-[rgb(255_255_255)]">
                            sadaa
                        </div>

                        {/* 按钮组 */}
                        <div className="absolute z-1 right-[8px] bottom-[8px] flex items-center justify-between bg-white/60 backdrop-blur-[3px]">
                            {/* 减号 */}
                            <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                <i className="iconfont icon-icon_subtract text-black text-[14px]"></i>
                            </div>
                            {/* 数量 */}
                            <div className="px-[6px] flex items-center justify-center font-medium text-[14px] leading-[16px] text-[#333] text-center">
                                123
                            </div>
                            {/* 加号 */}
                            <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                <i className="iconfont icon-icon_add text-black text-[14px]"></i>
                            </div>
                        </div>
                    </div>

                    {/* 标题 */}
                    <div
                        className="mt-[10px] font-medium text-[14px] leading-[18px] text-justify text-[#333] line-clamp-2">
                        大师大大撒实打实大多数大师大大撒实打实大多数大师大大撒实打实大多数
                    </div>

                    {/* 描述 */}
                    <div className="mt-[8px] font-normal text-[12px] leading-[14px] text-[#666] line-clamp-2">
                        大师大大撒实打实大多数大师大大撒实打实大多数大师大大撒实打实大多数
                    </div>

                    {/* 标签 */}
                    <div className="mt-[5px] flex items-center justify-start overflow-y-auto">
                        <div className="mr-[3px] flex-none h-[22px] flex items-center justify-center p-[0_6px] text-[12px] bg-[rgb(61_142_235)]/24 rounded-[4px] font-[500] text-[rgb(61_142_235)]">
                            大萨达阿达阿达是
                        </div>
                        <div className="mr-[3px] flex-none h-[22px] flex items-center justify-center p-[0_6px] text-[12px] bg-[rgb(235_154_61)]/24 rounded-[4px] font-[500] text-[rgb(235_154_61)]">
                            大萨达阿达阿达是
                        </div>
                        <div className="mr-[3px] flex-none h-[22px] flex items-center justify-center p-[0_6px] text-[12px] bg-[rgb(235,61,64)]/24 rounded-[4px] font-[500] text-[rgb(235,61,64)]">
                            大萨达阿达阿达是
                        </div>
                    </div>

                    {/* 价格 */}
                    <div className="absolute left-0 font-medium text-[14px] leading-[18px] bottom-[8px] text-[#333] flex items-end justify-start">
                        CA$12.02
                        <div className="line-through text-[rgba(153,153,153,1)] ml-[4px] text-[11px] font-[500]">CA$12.02</div>
                    </div>
                </div>
            </div>
        </div>
    );
}