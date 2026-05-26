import {useLanguage} from "@/assets/dict/language.tsx";
import Img from '@/components/Img';
import {useShopConfig} from "@/hooks/shopConfigMsg.ts";
import {payList} from "@/assets/dict/payList.ts";

export default function Index() {

    const {t} = useLanguage() // 语言设置
    const {shopConfig} = useShopConfig(); //店铺信息

    return (
        <div className="pb-[45px] sm:p-[0_104px_45px_104px]">
            {/*店铺名*/}
            {shopConfig?.menu_name &&
                <div
                    className="mt-[30px] text-center text-[rgba(51,51,51,1)] text-[16px] font-[500] p-[0_40px] sm:p-[0_25px]:">
                    {shopConfig?.menu_name}
                </div>}

            {/*店铺描述*/}
            {shopConfig?.menu_description &&
                <div
                    className="mt-[8px] text-[14px] text-[rgba(51,51,51,1)] font-[500] line-clamp-2 p-[0_40px] sm:p-[0_25px]">
                    {shopConfig?.menu_description}
                </div>}

            {/*电话/邮箱*/}
            {(shopConfig?.tell || shopConfig?.email) &&
                <div className="mt-[10px] text-center p-[0_30px]">
                    {shopConfig?.tell &&
                        <a href={`tel:${shopConfig.tell}`}
                           className="text-[rgba(21,123,248,1)] font-[500] text-[14px] cursor-pointer block">{shopConfig.tell}</a>}
                    {shopConfig?.email &&
                        <a href={`mailto:${shopConfig.email}`}
                           className="text-[rgba(21,123,248,1)] font-[500] text-[14px] cursor-pointer block">
                            {shopConfig.email}
                        </a>}
                </div>}

            {/*自定义信息/服务方式/停车信息*/}
            {(shopConfig?.open_time || shopConfig?.service_model?.length || shopConfig?.service_model?.length) &&
                <div className="mt-[52px] p-[0_30px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)]">

                    {/*自定义信息*/}
                    {shopConfig?.open_time && <div className="">{shopConfig?.open_time}</div>}

                    {/*服务方式*/}
                    {shopConfig?.service_model?.length &&
                        <div className="flex items-center justify-center mt-[5px]">
                            {shopConfig?.service_model?.map((item, index) => {
                                return (
                                    <div className="inline" key={index}>
                                        {index > 0 && <div className="inline m-[0_4px]">/</div>}
                                        {t(`store.service.${item}`)}
                                    </div>
                                )
                            })}
                        </div>}

                    {/*停车信息*/}
                    {shopConfig?.parking?.length &&
                        <div className="flex items-center justify-center mt-[5px]">
                            {shopConfig?.parking?.map((item, index) => {
                                return (
                                    <div className="inline" key={index}>
                                        {index > 0 && <div className="inline m-[0_4px]">/</div>}
                                        {t(`store.parking.${item}`)}
                                    </div>
                                )
                            })}
                        </div>}
                </div>}

            {/*支付类型*/}
            {shopConfig?.payment_method?.length &&
                <div
                    className="mt-[56px] p-[0_30px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)] flex items-center justify-center">
                    {shopConfig.payment_method.map((item, index) => {
                        return (
                            <div className="inline" key={index}>
                                {index > 0 && <div className="inline m-[0_4px]">/</div>}
                                {t(`store.payment.${item}`)}
                            </div>
                        )
                    })}
                </div>
            }

            {/*支付方式*/}
            {shopConfig?.payment?.length &&
                <div
                    className="p-[0_55px] sm:p-[0_18px] mt-[8px] sm:mt-[12px] flex items-center justify-start md:justify-center flex-wrap">
                    {payList.map((item, index) => {
                        return (
                            <div key={index}>
                                {shopConfig?.payment?.includes(item.img) &&
                                    <div className="w-[40px] h-[40px] m-[0_6px_6px_0]">
                                        <Img src={`pay/${item.img}.png`}
                                             alt={String(item.label ?? '')}
                                             aria-label={String(item.label ?? '')}
                                             className="w-full h-full flex-none object-contain"/>
                                    </div>}
                            </div>
                        )
                    })}
                </div>}

            {/*媒体*/}
            {shopConfig?.social?.length &&
                <div className="mt-[55px] p-[0_30px] flex items-center justify-start md:justify-center flex-wrap">
                    {shopConfig?.social?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="w-[50px] h-[50px] m-[0_6px_6px_0]">
                                    <Img onClick={() => window.open(item.path)}
                                         src={`media/${item.img}.png`}
                                         alt={t(`footer.social.${item.img}`)}
                                         aria-label={t(`footer.social.${item.img}`)}
                                         className="w-full h-full flex-none object-contain"/>
                                </div>
                            </div>
                        )
                    })}
                </div>}


            <div className="m-[50px_50px_0_50px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)]">
                {t('footer.copyright', {year: shopConfig?.pub_time, storeName: shopConfig?.store_name})}
            </div>

            <div
                className="m-[4px_50px_0_50px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)] flex items-center justify-center">
                {t('footer.poweredBy', {
                    BiajiKit: (
                        <span
                            className="m-[0_4px] font-[400] text-[12px] text-[rgba(21,123,248,1)] cursor-pointer"
                            onClick={() => window.open('https://biajiKit.com')}>
                            BiajiKit
                        </span>),
                })}
            </div>
        </div>
    );
}