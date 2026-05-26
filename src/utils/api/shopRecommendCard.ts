import {service} from "@/utils/request";
// 获取推荐类型及数据列表
export const getExample = (params:object) => service.post('api/v1/web_page/get_example', params, {
    whiteApi: true
})
