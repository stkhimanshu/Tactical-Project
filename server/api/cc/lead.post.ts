// export default defineEventHandler(async (event) => {
//     const body: { [key: string]: string } = await readBody(event);

//     const runtime = useRuntimeConfig();
//     const loginId = runtime.CC_LOGIN_ID
//     const password = runtime.CC_PASSWORD
//     const base = runtime.public.checkoutChampApiBase || 'https://api.checkoutchamp.com'
//     const params = new URLSearchParams()
//     params.set('loginId', loginId)
//     params.set('password', password)

//     if (body.firstName) params.set('firstName', body.firstName)
//     if (body.lastName) params.set('lastName', body.lastName)
//     if (body.emailAddress) params.set('emailAddress', body.emailAddress)
//     if (body.phoneNumber) params.set("phoneNumber", body.phoneNumber)
//     if (body.address1) params.set("address1", body.address1 || '')
//     if (body.address2) params.set("address2", body.address2)
//     if (body.city) params.set("city", body.city || '')
//     if (body.state) params.set("state", body.state || '')
//     if (body.postalCode) params.set("postalCode", body.postalCode || '')
//     if (body.country) params.set("country", body.country || '')

//     if (body.sessionId) params.set('sessionId', body.sessionId)
//     if (body.campaignId) params.set('campaignId', String(body.campaignId))

//     const url = `${base}/leads/import/?${params.toString()}`

//     try {
//         return await $fetch(url, { method: 'GET' })
//     } catch (err: any) {
//         return { error: true, message: err?.message || 'Network Error' }
//     }
// })



export default defineEventHandler(async (event) => {
    const body = await readBody<Record<string, any>>(event);
    // console.log("Lead Body", body, "Lead Body end")
    const runtime = useRuntimeConfig();
    const base = runtime.public.checkoutChampApiBase || 'https://api.checkoutchamp.com';
        const params = new URLSearchParams({
        loginId: runtime.CC_LOGIN_ID,
        password: runtime.CC_PASSWORD,
        campaignId: runtime.public.CC_CAMPAIGN_ID,
        ...body,
    });
    const url = `${base}/leads/import/?${params.toString()}`
    try {

        let response: any = await $fetch(url, { method: 'GET' });
        return JSON.parse(response)
    } catch (err: any) {
        return { error: true, message: err?.message || 'Network Error' };
    }

})