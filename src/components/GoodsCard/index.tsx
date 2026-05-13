import {useEffect, useState} from 'react';
import {getGoodsList} from "@/utils/api/goodsCard.ts";
import {AxiosResponse} from "axios";
import ModelTitle from "@/components/ModelTitle";
import {useScrollTrigger} from '@/hooks/useTriggerVisibility';

interface ApiResponse<T = any> {
    msg: string;
    code: number;
    data: T;
    pager: {
        page: number;
        page_size: number;
        total_rows: number;
    };
    count: number;
}

interface ProductItem {
    id: number;
    created_at: string;
    updated_at: string;
    store_id: number;
    menu_id: number;
    product_id: number;
    class_id: number;
    base_name: string;
    base_description: string;
    primary_image_url: string;
    calories: number;
    translations: null | any; // 你可以后续扩展成具体类型
    status: number;
    archived_at: string;
    price_minor: number;
    original_price_minor: number;
    is_sold_out: number;
    removed_at: string;
    sort: number;
}

interface CategoryItem {
    id: number;
    created_at: string;
    updated_at: string;
    store_id: number;
    menu_id: number;
    base_name: string;
    translations: null | any;
    status: number;
    sort: number;
    product: ProductItem[];
    total: number;
}

export default function Index() {
    const [cardList, setCardList] = useState<CategoryItem[]>([]);

    useEffect(() => {
        const init = async () => {
            const {data} = await getGoodsList({});
            setCardList(data);
        };

        init();
    }, []);
    const {bindTarget} = useScrollTrigger();
    return (
        <div ref={bindTarget}>
            {cardList.map((item, index) => (
                <div key={index}>
                    <ModelTitle title={item.base_name}></ModelTitle>
                    <div className="w-full p-[0_16px] sm:flex sm:flex-wrap">
                        {item.product.map((goods, ind) => {
                            return (
                                <div key={ind}
                                     className="flex items-start justify-between min-h-[114px] sm:min-h-[128px] sm:w-[calc(50%-10px)] sm:odd:w-[calc(50%+10px)] sm:odd:pr-[20px] pb-[16px] border-b border-b-[rgba(126,134,142,0.1)] last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 mb-[16px]">
                                    <div className="mr-[10px]">
                                        {/* 标题 */}
                                        <div
                                            className="mt-[6px] line-clamp-1 text-[rgba(51,51,51,1)] font-[500] text-[14px]">
                                            {goods.base_name}
                                        </div>
                                        {/* 描述 */}
                                        <div
                                            className="mt-[8px] line-clamp-2 text-[rgba(102,102,102,1)] font-[400] text-[12px]">
                                            {goods.base_description}
                                        </div>
                                        {/* 标签 */}
                                        {/*<div className="mt-[5px] flex items-center justify-start overflow-y-auto w-full">*/}
                                        {/*    <div*/}
                                        {/*        className="mr-[3px] flex-none h-[22px] flex items-center justify-center p-[0_6px] text-[12px] bg-[rgb(61_142_235)]/24 rounded-[4px] font-[500] text-[rgb(61_142_235)]">*/}
                                        {/*        大萨达阿达阿达是*/}
                                        {/*    </div>*/}
                                        {/*    <div*/}
                                        {/*        className="mr-[3px] flex-none h-[22px] flex items-center justify-center p-[0_6px] text-[12px] bg-[rgb(235_154_61)]/24 rounded-[4px] font-[500] text-[rgb(235_154_61)]">*/}
                                        {/*        大萨达阿达阿达是*/}
                                        {/*    </div>*/}
                                        {/*    <div*/}
                                        {/*        className="mr-[3px] flex-none h-[22px] flex items-center justify-center p-[0_6px] text-[12px] bg-[rgb(235,61,64)]/24 rounded-[4px] font-[500] text-[rgb(235,61,64)]">*/}
                                        {/*        大萨达阿达阿达是*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/* 价格 */}
                                        <div
                                            className="font-medium text-[14px] leading-[18px] bottom-[8px] text-[#333] flex items-end justify-start mt-[10px]">
                                            {goods.price_minor}
                                            {goods.original_price_minor > 0 &&
                                                <div
                                                    className="line-through text-[rgba(153,153,153,1)] ml-[4px] text-[11px] font-[500]">
                                                    {goods.original_price_minor}
                                                </div>}

                                        </div>
                                    </div>
                                    <div
                                        className="flex-none h-[114px] sm:h-[128px] w-[114px] sm:w-[128px] relative">
                                        <img
                                            src={goods.primary_image_url}
                                            className="w-full h-full object-cover rounded-[10px]"
                                            alt=""
                                        />
                                        {/* 角标 */}
                                        {goods.calories > 0 &&
                                            <div
                                                className="z-1 absolute left-0 top-0 flex items-center justify-center bg-[rgba(51_51_51)]/40 h-[22px] p-[0_8px] rounded-[10px_0_10px_0] font-[500] text-[rgb(255_255_255)]">
                                                {goods.calories}
                                            </div>
                                        }

                                        {/* 按钮组 */}
                                        <div
                                            className="absolute z-1 right-[50%] translate-x-1/2 bottom-[6px] flex items-center justify-between bg-white/60 backdrop-blur-[3px]">
                                            {/* 减号 */}
                                            <div
                                                className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                                <i className="iconfont icon-icon_subtract text-black text-[14px]"></i>
                                            </div>
                                            {/* 数量 */}
                                            <div
                                                className="px-[6px] flex items-center justify-center font-medium text-[14px] leading-[16px] text-[#333] text-center">
                                                123
                                            </div>
                                            {/* 加号 */}
                                            <div
                                                className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                                <i className="iconfont icon-a-Union2 text-black text-[12px]"></i>
                                            </div>
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