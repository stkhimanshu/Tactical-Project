export function useCheckoutChamp() {
    const importClick = async (payload: string) => {
        return await $fetch('/api/cc/click', {
            method: 'POST',
            body: payload
        })
    }
    const importLead = async (payload: Record<string, any>) => {
        return await $fetch('/api/cc/lead', {
            method: 'POST',
            body: payload
        })
    }

    const importOrder = async (payload: any) => {
        return await $fetch('/api/cc/order', {
            method: 'POST',
            body: payload
        })
    }

    const importUpsell = async(payload: any)=>{
        return await $fetch('/api/cc/upsell', {
            method: "POST",
            body: payload
        })
    }

    return { importClick, importLead, importOrder, importUpsell }
}