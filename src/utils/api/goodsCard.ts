import {service} from "@/utils/request";
// 获取商品类型及数据列表
export const getGoodsList = (params:object) => service.post('api/v1/web/products', params, {
    whiteApi: true
})
