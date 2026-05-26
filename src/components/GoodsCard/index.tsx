import {useEffect} from 'react';
import ModelTitle from "@/components/ModelTitle";
import {useScrollTrigger} from '@/hooks/useTriggerVisibility';
import Img from '@/components/Img';
import {useGoodsList} from "@/hooks/useGoodsList.ts";
import {ProductItem} from "@/type/goods.ts";
import {useShopConfig} from "@/hooks/shopConfigMsg.ts";

export default function Index() {
    const {cardList, updateProductField} = useGoodsList();
    const {bindTarget, titleRef, updateTitles} = useScrollTrigger();
    const {shopConfig} = useShopConfig(); //店铺信息

    // 监听 cardList 数组更新分类标题节点数据
    useEffect(() => {
        if (cardList.length > 0) {
            updateTitles();
        }
    }, [cardList]);

    return (
        <div ref={bindTarget}>
            {cardList.map((item, index) => (
                <div key={index}>
                    <div
                        ref={(el) => {
                            if (el) {
                                titleRef.current[index] = el;
                            }
                        }}
                    >
                        <ModelTitle title={item.class_name}/>
                    </div>
                    <div className="w-full p-[0_16px] sm:flex sm:flex-wrap">
                        {item.list.map((goods: ProductItem, ind: number) => {
                            return (
                                <div key={ind}
                                     className="flex items-start justify-between min-h-[114px] sm:min-h-[128px] sm:w-[calc(50%-10px)] sm:odd:w-[calc(50%+10px)] sm:odd:pr-[20px] pb-[16px] border-b border-b-[rgba(126,134,142,0.1)] last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 mb-[16px]">
                                    <div className="mr-[10px]">
                                        <div
                                            className="mt-[6px] line-clamp-1 text-[rgba(51,51,51,1)] font-[500] text-[14px]">
                                            {goods.base_name}
                                        </div>
                                        <div
                                            className="mt-[8px] line-clamp-2 text-[rgba(102,102,102,1)] font-[400] text-[12px]">
                                            {goods.base_description}
                                        </div>
                                        <div
                                            className="font-medium text-[14px] leading-[18px] bottom-[8px] text-[#333] flex items-end justify-start mt-[10px]">
                                            {shopConfig?.currency} {goods.price_minor}
                                            {goods.original_price_minor > 0 &&
                                                <div
                                                    className="line-through text-[rgba(153,153,153,1)] ml-[4px] text-[11px] font-[500]">
                                                    {shopConfig?.currency} {goods.original_price_minor}
                                                </div>}
                                        </div>
                                    </div>
                                    <div className="flex-none h-[114px] sm:h-[128px] w-[114px] sm:w-[128px] relative">
                                        <Img src={goods.primary_image_url}
                                             className="w-full h-full object-cover rounded-[10px]" alt=""/>
                                        {goods.calories > 0 &&
                                            <div
                                                className="z-1 absolute left-0 top-0 flex items-center justify-center bg-[rgba(51_51_51)]/40 h-[22px] p-[0_8px] rounded-[10px_0_10px_0] font-[500] text-[rgb(255_255_255)]">
                                                {goods.calories}
                                            </div>
                                        }
                                        <div
                                            className="absolute z-1 right-[8px] bottom-[6px] flex items-center justify-between bg-white/60 backdrop-blur-[3px]">
                                            {/*减*/}
                                            {goods.cart_num > 0 &&
                                                <div
                                                    onClick={() => updateProductField(goods.product_id, 'cart_num', goods.cart_num - 1)}
                                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                                    <i className="iconfont icon-icon_subtract text-black text-[14px]"></i>
                                                </div>}

                                            {/*数量*/}
                                            {goods.cart_num > 0 &&
                                                <div
                                                    className="px-[6px] flex items-center justify-center font-medium text-[14px] leading-[16px] text-[#333] text-center">
                                                    {goods.cart_num}
                                                </div>
                                            }

                                            {/*加*/}
                                            {goods.cart_num < goods.stock &&
                                                <div
                                                    onClick={() => updateProductField(goods.product_id, 'cart_num', goods.cart_num + 1)}
                                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                                    <i className="iconfont icon-icon_add text-black text-[14px]"></i>
                                                </div>}

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}