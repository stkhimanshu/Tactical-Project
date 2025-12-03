export default defineEventHandler(async (event) => {
    const body = await readBody<Record<string, any>>(event);
    const runtime = useRuntimeConfig();

    const base = runtime.public.checkoutChampApiBase || 'https://api.checkoutchamp.com';

    const params = new URLSearchParams({
        loginId: runtime.CC_LOGIN_ID,
        password: runtime.CC_PASSWORD,
        campaignId: runtime.public.CC_CAMPAIGN_ID,
        ...body
    })
    const url = `${base}/orders/import/?${params.toString()}`;
    try {
        return await $fetch(url, { method: 'GET' });
    }catch (err: any) {
        return { error: true, message: err?.message || 'Network Error' };
    }
})