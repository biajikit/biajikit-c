import {useLanguage} from "@/assets/dict/language.tsx";

export default function Index() {

    const {t} = useLanguage() // 语言设置
    const payList = [
        {
            label: t('store.payment.applePay'),
            img: 'applePay'
        },
        {
            label: t('store.payment.googlePay'),
            img: 'googlePay'
        },
        {
            label: t('store.payment.paypal'),
            img: 'paypal'
        },
        {
            label: t('store.payment.alipay'),
            img: 'alipay'
        },
        {
            label: t('store.payment.weChatPay'),
            img: 'weChatPay'
        },
        {
            label: t('store.payment.unionPay'),
            img: 'unionPay'
        },
        {
            label: t('store.payment.octopus'),
            img: 'octopus'
        },
        {
            label: t('store.payment.payMe'),
            img: 'payMe'
        },
        {
            label: t('store.payment.payPay'),
            img: 'payPay'
        },
        {
            label: t('store.payment.suica'),
            img: 'suica'
        },
        {
            label: t('store.payment.pasmo'),
            img: 'pasmo'
        },
        {
            label: t('store.payment.rakutenPay'),
            img: 'rakutenPay'
        },
        {
            label: t('store.payment.dBarai'),
            img: 'dBarai'
        },
        {
            label: t('store.payment.jcb'),
            img: 'jcb'
        },
        {
            label: t('store.payment.payNow'),
            img: 'payNow'
        },
        {
            label: t('store.payment.payLah'),
            img: 'payLah'
        },
        {
            label: t('store.payment.grabPay'),
            img: 'grabPay'
        },
        {
            label: t('store.payment.promptPay'),
            img: 'promptPay'
        },
        {
            label: t('store.payment.trueMoneyWallet'),
            img: 'trueMoneyWallet'
        },
        {
            label: t('store.payment.venmo'),
            img: 'venmo'
        },
        {
            label: t('store.payment.cashApp'),
            img: 'cashApp'
        },
        {
            label: t('store.payment.bancontact'),
            img: 'bancontact'
        },
        {
            label: t('store.payment.blik'),
            img: 'blik'
        },
        {
            label: t('store.payment.mbWay'),
            img: 'mbWay'
        },
        {
            label: t('store.payment.multibanco'),
            img: 'multibanco'
        },
        {
            label: t('store.payment.mobilePay'),
            img: 'mobilePay'
        },
        {
            label: t('store.payment.twint'),
            img: 'twint'
        },
        {
            label: t('store.payment.vipps'),
            img: 'vipps'
        },

    ] // 支付图标列表
    const mediaList = [
        {
            label: t('store.payment.facebook'),
            img: 'facebook',
            link: ''
        },
        {
            label: t('store.payment.instagram'),
            img: 'instagram',
            link: ''
        },
        {
            label: t('store.payment.youtube'),
            img: 'youtube',
            link: ''
        },
        {
            label: t('store.payment.tiktok'),
            img: 'tiktok',
            link: ''
        },
        {
            label: t('store.payment.x'),
            img: 'x',
            link: ''
        },
        {
            label: t('store.payment.xiaohongshu'),
            img: 'xiaohongshu',
            link: ''
        },
        {
            label: t('store.payment.douyin'),
            img: 'douyin',
            link: ''
        },
        {
            label: t('store.payment.whatsapp'),
            img: 'whatsapp',
            link: ''
        },

    ] // 媒体列表

    return (
        <div className="pb-[1145px] sm:p-[0_104px_45px_104px]">
            <div
                className="mt-[30px] text-center text-[rgba(51,51,51,1)] text-[16px] font-[500] p-[0_40px] sm:p-[0_25px]:">
                阿斯达大师大师大多
            </div>
            <div
                className="mt-[8px] text-[14px] text-[rgba(51,51,51,1)] font-[500] line-clamp-2 p-[0_40px] sm:p-[0_25px]">
                阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大阿诗丹顿的点点滴滴滴滴答答大大大
            </div>
            <div className="mt-[10px] text-center p-[0_30px]">
                <div className="text-[rgba(21,123,248,1)] font-[500] text-[14px] cursor-pointer">大大大啊是的</div>
                <div className="text-[rgba(21,123,248,1)] font-[500] text-[14px] cursor-pointer">大大大啊是的</div>
                <div className="text-[rgba(21,123,248,1)] font-[500] text-[14px] cursor-pointer">大大大啊是的</div>
            </div>
            <div className="mt-[52px] p-[0_30px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)]">
                <div className="">打算但事实上少时诵诗书是</div>
                <div className="flex items-center justify-center mt-[5px]">
                    {t('store.service.dineIn')}
                    <div className="m-[0_4px]">/</div>
                    {t('store.service.takeaway')}
                    <div className="m-[0_4px]">/</div>
                    {t('store.service.delivery')}
                    <div className="m-[0_4px]">/</div>
                    {t('store.service.driveThru')}
                </div>
                <div className="flex items-center justify-center mt-[5px]">
                    {t('store.parking.free')}
                    <div className="m-[0_4px]">/</div>
                    {t('store.parking.paid')}
                </div>
            </div>
            <div
                className="mt-[56px] p-[0_30px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)] flex items-center justify-center">
                {t('store.payment.cash')}
                <div className="m-[0_4px]">/</div>
                {t('store.payment.creditCard')}
                <div className="m-[0_4px]">/</div>
                {t('store.payment.debitCard')}
            </div>

            <div
                className="p-[0_55px] sm:p-[0_18px] mt-[8px] sm:mt-[12px] flex items-center justify-start md:justify-center flex-wrap">
                {payList.map((item, index) => {
                    return (
                        <div className="w-[40px] h-[40px] m-[0_6px_6px_0]" key={index}>
                            <img src={`/img/pay/${item.img}.png`}
                                alt={String(item.label ?? '')}
                                aria-label={String(item.label ?? '')}
                                className="w-full h-full flex-none object-contain"
                            />
                        </div>
                    )
                })}
            </div>

            <div className="mt-[55px] p-[0_30px] flex items-center justify-start md:justify-center flex-wrap">
                {mediaList.map((item, index) => {
                    return (
                        <div className="w-[50px] h-[50px] m-[0_6px_6px_0]" key={index}>
                            <img onClick={() => window.open(item.link)}
                                 src={`/img/media/${item.img}.png`}
                                 alt={String(item.label ?? '')}
                                 aria-label={String(item.label ?? '')}
                                 className="w-full h-full flex-none object-contain"/>
                        </div>
                    )
                })}
            </div>

            <div className="m-[50px_50px_0_50px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)]">
                {t('footer.copyright', {year: 2026, storeName: '的撒大电视'})}
            </div>

            <div
                className="m-[4px_50px_0_50px] text-center font-[400] text-[14px] text-[rgba(102,102,102,1)] flex items-center justify-center">
                {t('footer.poweredBy', {
                    BiajiKit: (
                        <span
                            className="m-[0_4px] font-[400] text-[12px] text-[rgba(21,123,248,1)] cursor-pointer"
                            onClick={() => window.open('https://baidu.com')}>
                            BiajiKit
                        </span>),
                })}
            </div>
        </div>
    );
}