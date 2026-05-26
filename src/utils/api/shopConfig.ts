import {service} from "@/utils/request";
// 获取商铺信息
export const getShopConfig = (params:object) => service.post('api/v1/web/configs', params, {
    whiteApi: true
})
