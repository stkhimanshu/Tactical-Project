<script setup lang="ts">
// import { useFormStore } from "../../../stores/index";
import { useCheckoutChamp } from '~/composables/useCheckoutChamp'
import { useFormStore } from '~~/stores/formStore';
const { importOrder } = useCheckoutChamp()
const formStore = useFormStore();
const sessionId = ref('' as string)
const emit = defineEmits(["Checkout"])
defineProps({
  formValues: Object,
  errors: Object,
  className: String,
});
const handlePaymentOptionClick = (option: string) => {
  formStore.formSchema.paymentMethod = option;
};

async function submitOrder() {
  const payload = {
    ...formStore.formSchema,
    sessionId: sessionId.value || localStorage.getItem("sessionId") || "",
    pageType: 'orderPage',
    requestUri: window.location.href,
    httpReferer: document.referrer,
    userAgent: navigator.userAgent,
    campaignId: useRuntimeConfig().public.CC_CAMPAIGN_ID,
    country: formStore.formSchema.country || "IN",
    billingCountry: formStore.formSchema.billingCountry || "IN",

    product1_id: formStore.formSchema.productId || "93",
    product1_qty: formStore.formSchema.productQty || 1,
    paySource: formStore.formSchema.paymentMethod === "PAYPAL" ? "PAYPAL" : "CREDITCARD",

    cardNumber: formStore.formSchema.cardNumber,
    cardMonth: formStore.formSchema.cardMonth,
    cardYear: formStore.formSchema.cardYear,
    cardCvv: formStore.formSchema.cardCvv
  }
  console.log("ORDER PAYLOAD", payload);
  const response = await importOrder(JSON.stringify(payload));
  // console.log("Order Import Response:", response);

  if (response?.result === "SUCCESS" && response?.message?.orderId) {
    localStorage.setItem("orderId", response.message.orderId);
    return navigateTo('/UpsalePage');
  } else {
    console.log("order failed:", response);
  }
}

</script>
<template>
  <section id="paymentManagement">
    <small class="font-medium">All transactions are secure and encrypted</small>
    <div class="mt-2 border border-solid border-[#dadada] rounded-lg">
      <aside @click="() => handlePaymentOptionClick('CREDITCARD')"
        class="flex font-semibold items-center gap-2 sm:gap-3  p-4 text-lg cursor-pointer">

        <div
          :class="[formStore.formSchema.paymentMethod === 'CREDITCARD' ? 'bg-green-500 w-3 h-3 rounded-4xl border-2' : 'bg-white w-3 h-3 rounded-4xl border-2']">
        </div>
        <div class="bg-transparent">
          <h3>Credit Card</h3>
        </div>


        <img src="/images/card.svg" class="w-24 sm:w-34" />
      </aside>
      <!-- Card Section -->
      <Transition>
        <div v-if="formStore.formSchema.paymentMethod === 'CREDITCARD'" class="bg-[#fafafa] p-4">
          <CustomInput v-model="formStore.formSchema.cardNumber" field="cardNumber" id="cardNumber"
            placeholder="Card Number" />

          <div class="sm:flex sm:space-x-4">
            <CustomInput v-model="formStore.formSchema.cardMonth" field="cardMonth" id="cardMonth" type="text"
              placeholder="MM" />
            <CustomInput v-model="formStore.formSchema.cardYear" field="cardYear" id="cardYear" type="text"
              placeholder="YYYYY" />
            <CustomInput v-model="formStore.formSchema.cardCvv" field="cardCvv" id="cardCvv" type="text"
              placeholder="CVV Code" />
          </div>

        </div>
      </Transition>

      <aside @click="() => handlePaymentOptionClick('PAYPAL')"
        class="flex font-semibold items-center gap-2 sm:gap-3 p-4 text-lg cursor-pointer">

        <div
          :class="[formStore.formSchema.paymentMethod === 'PAYPAL' ? 'bg-green-500 w-3 h-3 rounded-4xl border-2' : 'bg-white w-3 h-3 rounded-4xl border-2']">
        </div>
        <div class="bg-transparent">
          <img src="/images/paypal-title.svg" class="bg-transparent">
        </div>
      </aside>
      <Transition>
        <div v-if="formStore.formSchema.paymentMethod === 'PAYPAL'" class="bg-[#fafafa] p-6">
          <img src="/images/new-paypal-logo.webp" class="w-2/3 mx-auto" alt="">
        </div>
      </Transition>
      <!-- Submit Button -->
      <div class="p-4" id="purchaseButton" v-if="formStore.formSchema.paymentMethod !== 'PAYPAL'">
        <button type="submit" @click="submitOrder"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold tracking-wide py-4 rounded-xl text-center">Complete
          Secure Purchase</button>
      </div>
    </div>
  </section>

</template>