import {useEffect, useState} from 'react';
import Img from '@/components/Img';
import ModelTitle from "@/components/ModelTitle";
import {useLanguage} from "@/assets/dict/language.tsx";
import {getRecommendList} from "@/utils/api/goodsCard.ts";
import {ProductClass, ProductItem} from "@/type/goods.ts";
import {useShopConfig} from "@/hooks/shopConfigMsg.ts";
import {useGoodsList} from "@/hooks/useGoodsList.ts";

export default function Index() {
    const {lang} = useLanguage(),
        [recommendDataList, setRecommendDataList] = useState([] as ProductClass[]),
        {shopConfig} = useShopConfig(); //店铺信息
    useEffect(() => {
        getRecommend()
    }, [lang]);

    async function getRecommend() {
        let res = await getRecommendList()
        let data: ProductClass[] = res.data.map((cls: ProductClass) => ({
            ...cls,
            list: cls.list.map(item => ({
                ...item,
                cart_num: (item as any).cart_num ?? 0
            }))
        }));
        setRecommendDataList(data)
    }

    const {updateProductField} = useGoodsList();

    function setGoodData<T extends keyof ProductItem>(
        id: number,
        key: T,
        value: ProductItem[T]
    ): void {
        let data: ProductClass[] = recommendDataList.map((cls: ProductClass) => ({
            ...cls,
            list: cls.list.map((item: ProductItem) => {
                if (id === item.product_id) {
                    item[key] = value;
                    updateProductField(item.product_id, key, value);
                }
                return {...item};
            }),
        }));
        setRecommendDataList(data);
    }

    return (
        <div className="w-full">
            {recommendDataList.map((item, index) => {
                return (
                    <div key={index}>
                        <ModelTitle title={item.class_name}></ModelTitle>
                        {/* 横向滚动列表 */}
                        <div className="flex items-stretch justify-start overflow-x-auto">
                            {/* 卡片项 */}
                            {item.list.map((goods, ind) => {
                                return (
                                    <div key={ind}
                                         className="flex-shrink-0 w-[135px] sm:w-[150px] mr-[12px] relative pb-[34px] first:ml-[20px] last:mr-[20px]">

                                        {/* 图片容器 */}
                                        <div className="w-full h-[135px] sm:h-[150px] relative">
                                            <Img
                                                src={goods.primary_image_url}
                                                className="w-full h-full object-cover rounded-[14px]"
                                                alt=""
                                            />

                                            {/* 角标 */}
                                            {goods.calories > 0 &&
                                                <div
                                                    className="z-1 absolute left-0 top-0 flex items-center justify-center bg-[rgba(51_51_51)]/40 h-[22px] p-[0_8px] rounded-[14px_0_14px_0] font-[500] text-[rgb(255_255_255)]">
                                                    {goods.calories}
                                                </div>}


                                            {/* 按钮组 */}
                                            <div
                                                className="absolute z-1 right-[8px] bottom-[8px] flex items-center justify-between bg-white/60 backdrop-blur-[3px]">
                                                {/* 减号 */}
                                                {goods.cart_num > 0 &&
                                                    <div
                                                        onClick={() => setGoodData(goods.product_id, 'cart_num', goods.cart_num - 1)}
                                                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                                        <i className="iconfont icon-icon_subtract text-black text-[14px]"></i>
                                                    </div>}

                                                {/* 数量 */}
                                                {goods.cart_num > 0 &&
                                                    <div
                                                        className="px-[6px] flex items-center justify-center font-medium text-[14px] leading-[16px] text-[#333] text-center">
                                                        {goods.cart_num}
                                                    </div>}

                                                {/* 加号 */}
                                                {goods.cart_num < goods.stock &&
                                                    <div
                                                        onClick={() => setGoodData(goods.product_id, 'cart_num', goods.cart_num + 1)}
                                                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/60 backdrop-blur-[3px] cursor-pointer">
                                                        <i className="iconfont icon-icon_add text-black text-[14px]"></i>
                                                    </div>}
                                            </div>
                                        </div>

                                        {/* 标题 */}
                                        <div
                                            className="mt-[10px] font-medium text-[14px] leading-[18px] text-justify text-[#333] line-clamp-2">
                                            {goods.base_name}
                                        </div>

                                        {/* 描述 */}
                                        <div
                                            className="mt-[8px] font-normal text-[12px] leading-[14px] text-[#666] line-clamp-2">
                                            {goods.base_description}
                                        </div>

                                        {/* 标签 */}
                                        {/*<div className="mt-[5px] flex items-center justify-start overflow-y-auto">*/}
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
                                            className="absolute left-0 font-medium text-[14px] leading-[18px] bottom-[8px] text-[#333] flex items-end justify-start">
                                            {shopConfig?.currency} {goods.price_minor}
                                            {goods.original_price_minor > 0 &&
                                                <div
                                                    className="line-through text-[rgba(153,153,153,1)] ml-[4px] text-[11px] font-[500]">
                                                    {shopConfig?.currency} {goods.original_price_minor}
                                                </div>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}