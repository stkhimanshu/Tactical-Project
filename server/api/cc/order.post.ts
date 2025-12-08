export default defineEventHandler(async (event) => {
    const body = await readBody<Record<string, any>>(event);
    console.log("ORDER BODY", body);
    const runtime = useRuntimeConfig();

    const base = runtime.public.checkoutChampApiBase || 'https://api.checkoutchamp.com';

    const params = new URLSearchParams({
        loginId: runtime.CC_LOGIN_ID,
        password: runtime.CC_PASSWORD,
        campaignId: runtime.public.CC_CAMPAIGN_ID,
        ...body
    })
    const url = `${base}/order/import/?${params.toString()}`;
    // console.log("URLLLLL", url)
    try {
        let response: any = await $fetch(url, { method: 'GET' });
        return JSON.parse(response)
    } catch (err: any) {
        return { error: true, message: err?.message || 'Network Error' };
    }
})