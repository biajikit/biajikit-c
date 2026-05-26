export interface ProductItem {
    product_id: number;
    menu_id: number;
    primary_image_url: string;
    calories: number;
    price_minor: number;
    base_description: string;
    base_name: string;
    class_name: string;
    lang: string;
    original_price_minor: number;
    stock: number;
    cart_num: number; // 购物车数量
}

export interface OrderParams {
    member_id: string;          // 顾客ID
    table_no: string;           // 桌号
    store_id: number;           // 店铺ID
    menu_id: number;            // 菜单ID
    customer_note: string;      // 顾客备注
    locale: string;             // 语言环境
    currency: string;           // 币种
    subtotal_minor: number;    // 商品小计金额
    discount_minor: number;    // 订单折扣金额
    total_minor: number;       // 订单最终合计金额
    item_count: number;        // 订单内商品总数量
    products: ProductItem[]; // 选择的数据列表
    order_id?: number; // 订单号
    created_at?: number; // 下单时间
}

export interface ProductClass {
    class_name: string;
    list: ProductItem[];
}