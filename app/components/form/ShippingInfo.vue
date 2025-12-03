<script setup lang="ts">
import createPlugin from 'tailwindcss/plugin';
import { ref, onMounted } from 'vue'
import { useCheckoutChamp } from '~/composables/useCheckoutChamp'
import { useFormStore } from '~~/stores/formStore';
const { importClick, importLead } = useCheckoutChamp();
const formStore = useFormStore();
const formData = formStore.formSchema;

const sessionId = ref('' as string)



onMounted(async () => {
    const saved = localStorage.getItem("saveForm");
    if (saved) Object.assign(formData, JSON.parse(saved));
    // const storedSession = localStorage.getItem("sessionId");
    // sessionId.value = storedSession || null;

    sessionId.value = localStorage.getItem("sessionId") || "";

    // localStorage.removeItem("saveForm");
    // if (saved) {
    //     Object.assign(formData, JSON.parse(saved));
    //     console.log("localStorage:", formData);
    // }

    // For IpAddress
    let ipAddress = "";
    try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ipAddress = data.ip;
    } catch (e) {
        console.warn("Failed to fetch IP address", e);
    }
    try {
        const currentUrl = window.location.href;
        const dataObject = {
            requestUri: currentUrl,
            ipAddress: ipAddress,
            pageType: 'checkoutPage',
            // httpReferer: document.referrer || '',
            // userAgent: navigator.userAgent || '',
            campaignId: useRuntimeConfig().public.CC_CAMPAIGN_ID || "",
            sessionId: sessionId.value || ""
        }
        // const resp: any = await importClick(JSON.stringify(dataObject))
        // let jsonResponse = JSON.parse(resp);
        // if (jsonResponse?.message?.sessionId) {
        //     sessionId.value = jsonResponse.message.sessionId;
        //     localStorage.setItem("sessionId", sessionId.value)
        // } else {
        //     console.warn('Import Click response', resp)
        // }
        const resp: any = await importClick(JSON.stringify(dataObject))
        let jsonResponse = JSON.parse(resp);
        if (jsonResponse.result == 'ERROR') {
            console.warn("Session invalid → requesting new session...");
            localStorage.removeItem("sessionId");
            sessionId.value = "";
            const retryResp: any = await importClick(JSON.stringify({
                ...dataObject,
                sessionId: ""
            }));
            const retryJson = JSON.parse(retryResp);
            if (retryJson?.message?.sessionId) {
                sessionId.value = retryJson.message.sessionId;
                localStorage.setItem("sessionId", sessionId.value);
            }
            return;
        }
        // Succes Case
        else {
            localStorage.setItem("sessionId", jsonResponse.message.sessionId);
        }

    } catch (error) {
        console.error('Error importing click', error)
        localStorage.removeItem("sessionId");
        // sessionId.value = null
    }



})
const saveForm = () => {
    localStorage.setItem('saveForm', JSON.stringify(formData))
    console.log("Form saved:", formData);
}
// watch(
//   () => formStore.formSchema,
//   (newVal) => {
//     localStorage.setItem("saveForm", JSON.stringify(newVal))
//     console.log("Auto-saved:", newVal)
//   },
//   { deep: true }
// )
async function submitLead() {
    const payload = {
        ...formStore.formSchema,
        sessionId: sessionId.value || localStorage.getItem("sessionId") || "",
        pageType: "leadPage",
        requestUri: window.location.href,
        httpReferer: document.referrer,
        userAgent: navigator.userAgent,
        campaignId: useRuntimeConfig().public.CC_CAMPAIGN_ID
    }
    console.log('payload', payload)

    const response = await importLead(JSON.stringify(payload))
    console.log("Lead Import Response:", response)
}
</script>
<template>
    <SectionLabel title="Step 2: Shipping Information" />
    <form @submit.prevent="saveForm" class="w-full mx-auto &:mb-2">
        <input @blur="submitLead" v-model="formStore.formSchema.firstName" type="text" placeholder="First Name"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">
        <input @blur="submitLead" v-model="formStore.formSchema.lastName" type="text" placeholder="Last Name"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">
        <input @blur="submitLead" v-model="formStore.formSchema.emailAddress" type="email"
            placeholder="Email (For Order Confirmation)"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">
        <input @blur="submitLead" v-model="formStore.formSchema.phoneNumber" type="phone"
            placeholder="Phone (For Courier Delivery)"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">
        <input @blur="submitLead" v-model="formStore.formSchema.address1" type="text" placeholder="Address"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">
        <input @blur="submitLead" v-model="formStore.formSchema.address2" type="text" placeholder="Address 2"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">
        <input @blur="submitLead" v-model="formStore.formSchema.city" type="text" placeholder="Town / City"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-400 m-1">

        <div class="grid grid-cols-2 gap-4">
            <select @blur="submitLead" v-model="formStore.formSchema.country"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 m-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select State</option>
                <option value="">India</option>
                <option value="">Texas</option>
                <option value="">New York</option>
            </select>
            <input @blur="submitLead" v-model="formStore.formSchema.postalCode" type="number" placeholder="Postal Code"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 m-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <!-- 
            <button type="button" @click="submitLead" class="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">
                Continue
            </button> -->
        </div>

    </form>
</template>