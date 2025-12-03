import { requestOptions } from "./helper";

export const serverApiHandler = async(endpoint: string, body: object, config: {CC_LOGIN_ID: string,
    CC_PASSWORD: string, public: {CC_CAMPAIGN_ID: string} }, query:any) =>{
        const params = new URLSearchParams({
            loginId: config.CC_LOGIN_ID,
            password: config.CC_PASSWORD,
            campaignId: config.public.CC_CAMPAIGN_ID,
            ...body,
        });
        const response: any = await $fetch(`${endpoint}?${params.toString()}`, requestOptions);
        const result = JSON.parse(response);
        if (query.encrypt == 'false') return result
        return encryptedResult(result)
    }