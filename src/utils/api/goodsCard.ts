import {service} from "@/utils/request";
// 获取方案模板数据
export const getGoodsList = (params:object) => service.post('api/v1/component/goodsList', params, {
    whiteApi: true
})
