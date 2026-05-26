/**
 * 店铺信息接口类型
 */
export interface ShopInfo {
    banner_img: string; // 轮播图
    email: string; // 邮箱
    lang: string; // 语言
    logo_img: string; // logo图
    menu_description: string; // 菜单描述
    menu_id: number; // 菜单ID
    menu_name: string; // 菜单名称
    open_time: string; // 营业时间
    parking: string[] | null; // 停车信息
    payment: string[] | null; // 支付方式
    payment_method: string[] | null; // 支付类型
    service_model: string[] | null; // 服务方式
    social: SocialItem[] | null; // 社交平台
    tell: string; // 联系电话
    store_name: string // 店铺名
    store_id: number // 店铺id
    pub_time: string; // 提交年份
    currency: string // 店铺货币
}

// 社交平台单个项
export interface SocialItem {
    img: string;    // 图标标识：facebook / x / instagram ...
    path: string;   // 跳转链接
}