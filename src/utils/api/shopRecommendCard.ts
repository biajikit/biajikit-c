import {service} from "@/utils/request";
// 获取方案模板数据
export const getExample = (params:object) => service.post('api/v1/web_page/get_example', params, {
    whiteApi: true
})
