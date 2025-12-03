import createPlugin from "tailwindcss/plugin";

export default defineEventHandler(async (event) => {
    const body: { [key: string]: string } = await readBody(event);
    const runtime = useRuntimeConfig();
    const params = new URLSearchParams({
        loginId: runtime.CC_LOGIN_ID,
        password: runtime.CC_PASSWORD,
        campaignId: runtime.public.CC_CAMPAIGN_ID,
        ...body,
    });

    const base = runtime.public.checkoutChampApiBase || 'https://api.checkoutchamp.com'

    const url = `${base}/landers/clicks/import/?${params.toString()}`
    // console.log('sadsadsad', url);

    const res = await $fetch(url, {
        method: 'GET'
    }).catch((err: any) => {
        return { error: true, message: err?.message || 'network error' }
    })
    return res
})