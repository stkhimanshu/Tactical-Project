<script setup>
import { useCheckoutChamp } from '~/composables/useCheckoutChamp';
const { importUpsell } = useCheckoutChamp();

async function submitUpsale() {
    const orderId = localStorage.getItem("orderId");
    if (!orderId) {
        console.error("No orderId found. Upsell cannot be processed.");
        return;
    }
    const payload = {
        orderId,
        productId: "99",
        // product1_qty: 1,
        pageType: "upsellPage",
        requestUri: window.location.href,
        httpReferer: document.referrer,
        userAgent: navigator.userAgent
    }
    const response = await importUpsell(JSON.stringify(payload));
    // if (response?.result === "SUCCESS") {
    //     return navigateTo("/ThankYouPage");
    // } else {
    //     alert("Upsell failed. Please try again.");
    // }
}
</script>

<template>
    <section class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <NuxtImg src="/images/product1.jpg" />

        <div class="mt-4">
            <h2 class="text-2xl font-bold text-gray-800">Want a Camera</h2>
            <p class="text-gray-600 mt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, esse placeat animi recusandae magnam
                quibusdam doloremque fuga ipsam, sunt sapiente possimus, vitae nihil id facere consectetur quas qui
                voluptatum odit.
            </p>

            <button @click="submitUpsale"
                class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition">
                Order Now
            </button>
        </div>
    </section>
</template>
