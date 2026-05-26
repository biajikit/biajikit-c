import {useLanguage} from "@/assets/dict/language.tsx";
import {useDialog} from "@/hooks/dialogConfig";
import Img from '@/components/Img';
import {useGoodsList} from "@/hooks/useGoodsList.ts";
import {useEffect, useMemo, useRef, useState} from "react";
import {useShopConfig} from "@/hooks/shopConfigMsg.ts";
import {getStorage, setStorage} from "@/core/publicFn.ts";
import {placeOrder} from "@/utils/api/order.ts";
import {OrderParams} from "@/type/goods.ts";

export default function Index({}) {
    const {t, lang} = useLanguage() // 语言设置
    const {shopConfig} = useShopConfig(); //店铺信息
    const {showDialog, setDialog} = useDialog(); // 弹框设置
    const [cartStatus, setCartStatus] = useState(''); // 弹框状态 默认空 send:提交中 sendOver:提交完成 list:历史列表 detail:历史详情 orderDetail:订单页跳转的详情
    const [historyList, setHistoryList] = useState<OrderParams[]>([]); // 历史订单列表
    const [detailActive, setDetailActive] = useState(0); // 当前历史列表选中
    const [userWrite, setUserWrite] = useState({
        table_no: '',
        customer_note: '',
    }); // 用户填写的信息
    // 购物车各类总数及数据列表
    const {
        totalCartNum,
        totalCartPrice,
        oldTotalCartPrice,
        totalList,
        updateProductField,
        clearCartData
    } = useGoodsList();
    const targetRef = useRef<HTMLDivElement>(null); // 若未填写桌号滚动到桌号元素
    useEffect(() => {
        setCartStatus('')
        setHistoryList(getStorage('orderHistoryList') ?? []);
    }, [showDialog])

    // 历史状态取本地存储 正常取购物车选中
    const cartListData = useMemo(() => {
        if (['detail', 'orderDetail'].includes(cartStatus)) return historyList[detailActive].products
        return totalList
    }, [cartStatus, totalList, detailActive])
    // 确认按钮显示文字
    const confirmButtonText = useMemo(() => {
        let text: string = ''
        switch (cartStatus) {
            case 'send':
                text = 'order.sending';
                break;
            case 'sendOver':
                text = 'order.viewOrder';
                break;
            case 'detail':
                text = 'order.addMore';
                break;
            case 'orderDetail':
                text = 'order.addMore';
                break;
            default:
                text = 'cart.placeOrder';

        }
        return text
    }, [cartStatus])

    // 计算显示优惠金额
    const isDetail = ['detail', 'orderDetail'].includes(cartStatus);
    const discount = isDetail ? historyList[detailActive].discount_minor : oldTotalCartPrice - totalCartPrice;
    return (
        <>
            {/*购物车按钮*/}
            <button aria-label={String(t('nav.cart') ?? '')}
                    onClick={() => setDialog('showCartDialog')}
                    className="h-[36px] w-[36px] rounded-[50%] bg-[rgba(51,51,51,1)] backdrop-blur-[4px] flex items-center justify-center cursor-pointer flex-none relative">
                <i className="iconfont icon-fi_shopping-cart text-[rgba(255,255,255,1)] text-[16px]"></i>

                {/*购物车数量*/}
                {totalCartNum > 0 &&
                    <div
                        className="absolute left-[20px] top-[-5px] rounded-[7.5px] bg-[rgba(255,73,64,1)] h-[15px] p-[0_5px] font-[500] text-[10px] text-[rgba(255,255,255,1)] leading-[14px]">
                        {totalCartNum}
                    </div>}
            </button>

            {/*购物车浮窗*/}
            {!showDialog && totalCartNum > 0 &&
                <div onClick={() => setDialog('showCartDialog')}
                     className="fixed z-3 left-[50%] translate-x-[-50%] bottom-[50px] w-[calc(100%-52px)] sm:w-[535px] h-[60px] rounded-[35px] bg-[rgba(0,0,0,0.8)] backdrop-blur-[4px] flex items-center justify-center cursor-pointer p-[0_25px_0_6px]">
                    <div className="flex-none w-[57px] mr-[10px] flex items-center justify-start">
                        <div
                            className="bg-[rgba(255,255,255,0.1)] h-[48px] min-w-[46px] p-[0_12] rounded-[24px] font-[500] text-[18px] text-[rgba(255,255,255,1)] flex items-center justify-center">
                            {totalCartNum}
                        </div>
                    </div>
                    <div className="w-full sm:text-center">
                        <div className="font-[400] text-[12px] text-[rgba(255,255,255,0.6)]">
                            {t('cart.floating.viewCart')}
                        </div>
                        <div className="font-[500] text-[14px] text-[rgba(255,255,255,1)]">
                            {t('cart.floating.yourOrder')}
                        </div>
                    </div>
                    <div className="font-[500] text-[18px] text-[rgba(255,255,255,1)] ml-[10px] flex-none">
                        {shopConfig?.currency} {totalCartPrice}
                    </div>
                </div>}

            {/*购物车弹框*/}
            {showDialog === 'showCartDialog' &&
                <div
                    className="bg-[rgba(51,51,51,0.6)] z-11 fixed left-0 top-0 w-full h-full flex items-end justify-center md:justify-end"
                    onClick={() => setDialog('')}>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }}
                         className="max-h-[85vh] md:max-h-full md:h-full w-full md:w-1/2 bg-[rgba(255,255,255,1)] pop-up md:pop-right rounded-[14px_14px_0_0] md:rounded-[0] pb-[70px] flex flex-col h-full">

                        {/*头部按钮*/}
                        <div
                            className={`flex items-center ${['list', 'detail', 'orderDetail'].includes(cartStatus) ? 'justify-between' : 'justify-end'} h-[56px] p-[0_16px]`}>
                            {['list', 'detail', 'orderDetail'].includes(cartStatus) &&
                                <i onClick={() => {
                                    if (cartStatus === 'detail') setCartStatus('list')
                                    else if (cartStatus === 'orderDetail') setCartStatus('sendOver')
                                    else setCartStatus('')
                                }}
                                   className="iconfont icon-icon_arrow_left text-[20px] cursor-pointer"></i>}
                            <i onClick={() => setDialog('')}
                               className="iconfont icon-icon_close_dialog text-[20px] cursor-pointer"></i>
                        </div>

                        {/*订单信息*/}
                        <div className="mt[15px] p-[0_20px_20px_20px] flex-1 overflow-y-auto">
                            {/*历史记录栏*/}
                            {cartStatus === '' && historyList.length > 0 &&
                                <div onClick={() => setCartStatus('list')}
                                     className="p-[12px_16px] border border-[rgba(23,26,29,0.1)] rounded-[16px] mb-[26px] flex items-center justify-between">
                                    <div className="mr-[16px]">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.placedCount', {count: historyList.length})}
                                        </div>
                                        <div className="mt-[8px] font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {t('order.tableNumberValue', {tableNumber: historyList[0].table_no})}·{shopConfig.currency}{historyList.reduce((sum, item) => sum + (item.total_minor || 0), 0)}
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between flex-none font-[400] text-[14px] text-[rgba(51,51,51,1)]">
                                        {t('order.view')}
                                        <i className="iconfont icon-icon_arrow_right text-[12px] text-[rgba(51,51,51,1)] ml-[4px]"></i>
                                    </div>
                                </div>}

                            {/*历史记录列表*/}
                            {cartStatus === 'list' &&
                                historyList.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => {
                                            setDetailActive(index)
                                            setCartStatus('detail')
                                        }}
                                             className="p-[12px_16px] border border-[rgba(23,26,29,0.1)] rounded-[16px] mb-[12px]">
                                            <div className="flex items-center justify-between">
                                                <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                                    #{item.table_no}
                                                </div>
                                                <div className="font-[400] text-[12px] text-[rgba(153,153,153,1)]">
                                                    {t('order.itemCount', {count: item.item_count})}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-[5px]">
                                                <div className="font-[400] text-[12px] text-[rgba(153,153,153,1)]">
                                                    {item.created_at}
                                                </div>
                                                <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                                    {shopConfig.currency}{item.total_minor}
                                                </div>
                                            </div>
                                            <div className="mt-[8px] font-[500] text-[14px] text-[rgba(61,142,235,1)]">
                                                {t('order.placed')}
                                            </div>
                                        </div>
                                    )
                                })}


                            {/*历史记录详情*/}
                            {['detail', 'orderDetail'].includes(cartStatus) &&
                                <div
                                    className="m-[20px_0] sm:m-[30px_0] p-[12px_16px] sm:p-[20px] bg-[rgba(247,247,247,1)] rounded-[8px]">
                                    <div className="mb-[5px] font-[500] text-[14px] text-[rgba(61,142,235,1)]">
                                        {t('order.placed')}
                                    </div>
                                    <div
                                        className="font-[400] text-[12px] text-[rgba(153,153,153,1)] mb-[12px] sm:mb-[20px]">
                                        {t('order.sentToRestaurant')}
                                    </div>
                                    <div className="flex items-center justify-between mb-[5px] sm:mb-[8px]">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.number')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {historyList[detailActive].order_id}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-[5px] sm:mb-[8px]">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.table')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {historyList[detailActive].table_no}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-[5px] sm:mb-[8px]">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.total')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {shopConfig.currency}{historyList[detailActive].total_minor}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.placedAt')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {historyList[detailActive].created_at}
                                        </div>
                                    </div>
                                </div>}

                            {/*订单完成状态*/}
                            {cartStatus === 'sendOver' &&
                                <div
                                    className="p-[32px_20px_45px_20px] sm:p-[44px_0_45px_0] sm:max-w-[444px] m-[0_auto]">
                                    <div
                                        className="m-[0_auto] w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] bg-[rgba(21,123,248,1)] rounded-[50%] flex items-center justify-center">
                                        <i className="iconfont icon-icon_done text-[rgba(255,255,255,1)] font-[900] text-[60px] sm:text-[70px] p-[4px_0_0_4px]"></i>
                                    </div>
                                    <div
                                        className="mt-[16px] sm:mt-[20px] font-[500] te-[16px] text-[rgba(51,51,51,1)] text-center">
                                        {t('order.placed')}
                                    </div>
                                    <div className="mt-[30px] flex items-center justify-between">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.number')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {historyList[detailActive].order_id}
                                        </div>
                                    </div>
                                    <div className="mt-[12px] flex items-center justify-between">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.table')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {historyList[detailActive].table_no}
                                        </div>
                                    </div>
                                    <div className="mt-[12px] flex items-center justify-between">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.total')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {shopConfig.currency}{historyList[detailActive].total_minor}
                                        </div>
                                    </div>
                                    <div className="mt-[12px] flex items-center justify-between">
                                        <div className="font-[500] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('order.placedAt')}
                                        </div>
                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                            {historyList[detailActive].created_at}
                                        </div>
                                    </div>
                                    <div
                                        className="mt-[30px] text-center font-[400] text-[14px] text-[rgba(153,153,153,1)]">
                                        {t('order.sentToRestaurant')}
                                    </div>
                                </div>}

                            {/*商品列表*/}
                            {((cartStatus === '' && totalCartNum > 0) || ['send', 'detail', 'orderDetail'].includes(cartStatus)) &&
                                cartListData.map((item, index) => (
                                    <div className="flex items-center justify-between mb-[26px]" key={index}>
                                        <Img src={item.primary_image_url}
                                             alt=""
                                             className="h-[90px] w-[90px] sm:w-[128px] sm:h-[128px] flex-none mr-[12px]"/>
                                        <div className="text-left w-full">
                                            <div
                                                className="font-[500] text-[14px] text-[rgba(51,51,51,1)] line-clamp-1">
                                                {item.base_name}
                                            </div>
                                            <div
                                                className="mt-[10px] font-[400] text-[12px] text-[rgba(102,102,102,1)] mb-[14px] sm:mb-[28px] min-h-[12px] sm:min-h-[38px] line-clamp-1 sm:line-clamp-2">
                                                {item.base_description}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-end justify-start">
                                                    <div
                                                        className="font-[500] text-[16px] text-[rgba(61,142,235,1)]">
                                                        {shopConfig?.currency} {item.price_minor}
                                                    </div>
                                                    {item.original_price_minor > 0 &&
                                                        <div
                                                            className="font-[500] text-[12px] text-[rgba(153,153,153,1)] pb-[1px] ml-[4px] line-through">
                                                            {shopConfig?.currency} {item.original_price_minor}
                                                        </div>}

                                                </div>
                                                <div
                                                    className="h-[30px] flex items-center justify-center bg-[rgba(247,247,247,1)] rounded-[17px] backdrop-blur-[4px]">
                                                    {item.cart_num > 0 && !['detail', 'orderDetail'].includes(cartStatus) &&
                                                        <div
                                                            onClick={() => {
                                                                if (cartStatus === 'send') return
                                                                updateProductField(item.product_id, 'cart_num', item.cart_num - 1)
                                                            }}
                                                            className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] rounded-[50%] flex items-center justify-center bg-[rgba(255,255,255,1)] backdrop-blur-[3px] mr-[2px]">
                                                            <i className="iconfont icon-icon_subtract text-[12px] text-black"></i>
                                                        </div>}

                                                    {item.cart_num > 0 &&
                                                        <div className="font-[500] text-[14px] text-[rgba(51,51,51,1)]">
                                                            {['detail', 'orderDetail'].includes(cartStatus) && 'x'}{item.cart_num}
                                                        </div>}

                                                    {item.cart_num < item.stock && !['detail', 'orderDetail'].includes(cartStatus) &&
                                                        <div
                                                            onClick={() => {
                                                                if (cartStatus === 'send') return
                                                                updateProductField(item.product_id, 'cart_num', item.cart_num + 1)
                                                            }}
                                                            className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] rounded-[50%] flex items-center justify-center bg-[rgba(255,255,255,1)] backdrop-blur-[3px] ml-[2px]">
                                                            <i className="iconfont icon-icon_add text-[12px] text-black"></i>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {/*输入区域*/}
                            {(((cartStatus === '' || cartStatus === 'send') && totalCartNum > 0) || ['detail', 'orderDetail'].includes(cartStatus)) &&
                                <div>
                                    <div className="mt-[32px]" ref={targetRef}>
                                        <div className="flex items-start justify-start">
                                        <span
                                            className="font-[600] text-[14px] text-[rgba(255,58,48,1)] pt-[2px]">*</span>
                                            {t('cart.tableNumber')}
                                        </div>
                                        <input type="text"
                                               value={['detail', 'orderDetail'].includes(cartStatus)
                                                   ? historyList[detailActive]?.table_no
                                                   : userWrite.table_no}
                                               onChange={(e) => setUserWrite(prev => ({
                                                   ...prev,
                                                   table_no: e.target.value
                                               }))}
                                               maxLength={50}
                                               disabled={['detail', 'orderDetail'].includes(cartStatus)}
                                               className="mt-[10px] h-[46px] bg-[rgba(247,247,247,1)] rounded-[8px] p-[0_16px]"
                                               placeholder={String(t('cart.tableNumber') ?? '')}/>
                                    </div>
                                    <div className="mt-[26px]">
                                        <div className="flex items-start justify-start">
                                            {t('cart.note')}
                                        </div>
                                        <input type="text"
                                               value={['detail', 'orderDetail'].includes(cartStatus)
                                                   ? historyList[detailActive]?.customer_note
                                                   : userWrite.customer_note}
                                               onChange={(e) => setUserWrite(prev => ({
                                                   ...prev,
                                                   customer_note: e.target.value
                                               }))}
                                               maxLength={50}
                                               disabled={['detail', 'orderDetail'].includes(cartStatus)}
                                               className="mt-[10px] h-[46px] bg-[rgba(247,247,247,1)] rounded-[8px] p-[0_16px]"
                                               placeholder={String(t('cart.specialRequests') ?? '')}/>
                                    </div>
                                </div>}
                        </div>

                        {/*无数据状态*/}
                        {totalCartNum <= 0 && cartStatus === '' &&
                            <div className="p-[80px_20px] md:p-[180px_20px] text-center">
                                <Img src={`shopCartNoData.png`}
                                     alt='noData'
                                     className="w-[180px] h-[180px] inline-block"
                                />
                                <div className="mt-[6px] text-[rgba(153,153,153,1)] text-[16px] font-[500]">
                                    {t('cart.empty.title')}
                                </div>
                                <div onClick={() => setDialog('')}
                                     className="rounded-[6px] inline-flex items-center justify-center bg-[rgba(23,26,29,1)] h-[30px] font-[400] text-[14px] text-[rgba(255,255,255,1)] m-[16px_auto_0_auto] p-[0_20px]">
                                    {t('cart.empty.orderNow')}
                                </div>
                            </div>}

                        {/*金额信息 按钮区域*/}
                        <div>
                            {/*金额*/}
                            {!(['sendOver', 'list'].includes(cartStatus)) && (cartStatus !== '' || totalCartNum > 0) &&
                                <div className="p-[16px_30px_0_30px]">
                                    <div className="flex items-center justify-between mb-[8px]">
                                        <div className="font-[400] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('cart.subtotal')}
                                        </div>
                                        <div className="font-[400] text-[14px] text-[rgba(153,153,153,1)]">
                                            {shopConfig?.currency} {['detail', 'orderDetail'].includes(cartStatus) ? historyList[detailActive].subtotal_minor : oldTotalCartPrice}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-[12px]">
                                        <div className="font-[400] text-[14px] text-[rgba(153,153,153,1)]">
                                            {t('cart.discount')}
                                        </div>
                                        <div className="font-[400] text-[14px] text-[rgba(153,153,153,1)]">
                                            {discount > 0 && '-'} {shopConfig?.currency}{discount}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-[500] text-[16px] text-[rgba(51,51,51,1)]">
                                            {t('cart.total')}
                                        </div>
                                        <div className="font-[500] text-[16px] text-[rgba(51,51,51,1)]">
                                            {shopConfig?.currency} {['detail', 'orderDetail'].includes(cartStatus) ? historyList[detailActive].total_minor : totalCartPrice}
                                        </div>
                                    </div>
                                </div>}

                            {/*按钮*/}
                            {((cartStatus === '' && totalCartNum > 0) || (cartStatus !== '' && cartStatus !== 'list')) &&
                                <div className="mt-[28px] flex items-center justify-center p-[0_20px] flex-wrap">
                                    <div onClick={() => confirmButtonClick()}
                                         className={`w-full sm:flex-1 h-[48px] flex items-center justify-center rounded-[12px] font-[500] text-[16px] text-[rgba(255,255,255,1)] cursor-pointer ${cartStatus === 'send' ? 'bg-[rgba(218,218,218,1)]' : 'bg-[rgba(23,26,29,1)]'}`}>
                                        {t(confirmButtonText)}
                                    </div>
                                    {cartStatus === 'sendOver' &&
                                        <div onClick={() => setDialog('')}
                                             className="w-full sm:flex-1 h-[48px] flex items-center justify-center rounded-[12px] border border-[rgba(23,26,29,0.16)] font-[500] text-[16px] text-[rgba(23,26,29,1)] mt-[12px] sm:mt-[0] sm:ml-[20px] cursor-pointer">
                                            {t('order.addMore')}
                                        </div>}
                                </div>}
                        </div>
                    </div>
                </div>}
        </>

    );

    // 按钮点击
    async function confirmButtonClick() {
        switch (cartStatus) {
            case '': // 下单
                await confirmOrder()
                break;
            case 'sendOver': // 下单完成-跳转到订单详情页
                setCartStatus('orderDetail')
                break;
            case 'detail': // 订单详情-关闭弹框 继续点单
                setDialog('')
                break;
            case 'orderDetail': // 订单详情-关闭弹框 继续点单
                setDialog('')
                break;

        }
    }

    // 确认下单
    async function confirmOrder() {
        // 未输入桌号 滚动定位
        if (!userWrite.table_no) {
            targetRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            return
        }
        setCartStatus('send')
        let param: OrderParams = {
            member_id: getStorage('fingerprint'),          // 顾客ID
            table_no: userWrite.table_no,           // 桌号
            store_id: shopConfig.store_id,            // 店铺ID
            menu_id: shopConfig.menu_id,             // 菜单ID
            customer_note: userWrite.customer_note,      // 顾客备注
            locale: lang,             // 语言环境
            currency: shopConfig.currency,           // 币种
            subtotal_minor: oldTotalCartPrice,      // 商品小计金额
            discount_minor: oldTotalCartPrice - totalCartPrice,      // 订单折扣金额
            total_minor: totalCartPrice,         // 订单最终合计金额
            item_count: totalCartNum,           // 订单内商品总数量
            products: totalList            // 选择的商品列表
        }

        const {data, code} = await placeOrder(param)
        if (code === 200) {
            // 赋值订单号 下单时间
            param.order_id = data.order_id
            param.created_at = data.created_at
            // 保存数据到本地
            let userHistoryList: Array<OrderParams> = getStorage('orderHistoryList') || []
            userHistoryList.unshift(param)
            setStorage('orderHistoryList', userHistoryList)
            // 更新历史记录列表
            setHistoryList(userHistoryList)
            // 设置当前选中的历史记录详情
            setDetailActive(0)
            // 清空购物车
            clearCartData()
            // 清空用户输入内容
            setUserWrite({
                ...userWrite,
                customer_note: '',
                table_no: '',
            })
            // 跳转到历史详情
            setCartStatus('sendOver')
        } else {
            setCartStatus('')
        }
    }
}