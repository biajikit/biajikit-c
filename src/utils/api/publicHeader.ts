import {service} from "@/utils/request";
// 获取方案模板数据
export const getHeaderConfig = (params:object) => service.post('api/v1/component/header', params, {
    whiteApi: true
})
