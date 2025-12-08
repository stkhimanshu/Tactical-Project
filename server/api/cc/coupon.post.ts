export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const runtime = useRuntimeConfig();

    const base = runtime.public.checkoutChampApiBase || "https://api.checkoutchamp.com";

    if (!body?.couponCode) {
        return { error: true, message: "Coupon code is required." };
    }
    const params = new URLSearchParams({
        loginId: runtime.CC_LOGIN_ID,
        password: runtime.CC_PASSWORD,
        campaignId: runtime.public.CC_CAMPAIGN_ID,
        couponCode: body.couponCode,
        product1_id: body.product1_id,
        product1_qty: body.productQty
    })

    const url = `${base}/order/coupon/?${params.toString()}`;
    try {
        let response = await $fetch(url, { method: "GET" });
        return JSON.parse(response);
    } catch (err) {
        return { error: true, message: err?.message || 'Network Error' };
    }
})