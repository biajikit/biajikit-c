import {service} from "@/utils/request";
import {ApiResponse} from "@/type/common.ts";
// 下单
export const placeOrder = (params: object): Promise<ApiResponse> => service.post('api/v1/web/order', params, {
    whiteApi: true
})
