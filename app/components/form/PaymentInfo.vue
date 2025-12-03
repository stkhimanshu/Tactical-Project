<script setup lang="ts">
// import { useFormStore } from "../../../stores/index";
import { useCheckoutChamp } from '~/composables/useCheckoutChamp'
import { useFormStore } from '~~/stores/formStore';
const { importOrder } = useCheckoutChamp()
const fromStore = useFormStore();

const emit = defineEmits(["Checkout"])
defineProps({
  formValues: Object,
  errors: Object,
  className: String,
});
const handlePaymentOptionClick = (option: string) => {
  fromStore.formSchema.paymentMethod = option;
};
// function submitCheckout() {
//   emit('Checkout')
// }

async function submitOrder() {
  const payload = {
    ...fromStore.formSchema,
    sessionId: localStorage.getItem("sessionid") || "",
    pageType: 'checkoutPage',
    requestUri: window.location.href,
    httpReferer: document.referrer,
    userAgent: navigator.userAgent,
    campaignId: useRuntimeConfig().public.CC_CAMPAIGN_ID,

    productId: fromStore.formSchema.productId,
    productQty: fromStore.formSchema.productQty,

    cardNumber: fromStore.formSchema.cardNumber,
    cardMonth: fromStore.formSchema.cardMonth,
    cardYear: fromStore.formSchema.cardYear,
    cardCvv: fromStore.formSchema.cardCvv
  }
  console.log("ORDER PAYLOAD", payload);
  const response = await importOrder(JSON.stringify(payload));
  console.log("Order Import Response:", response);
}

</script>
<template>
  <section id="paymentManagement">
    <small class="font-medium">All transactions are secure and encrypted</small>
    <div class="mt-2 border border-solid border-[#dadada] rounded-lg">
      <aside @click="() => handlePaymentOptionClick('CREDITCARD')"
        class="flex font-semibold items-center gap-2 sm:gap-3  p-4 text-lg cursor-pointer">

        <div
          :class="[fromStore.formSchema.paymentMethod === 'CREDITCARD' ? 'bg-green-500 w-3 h-3 rounded-4xl border-2' : 'bg-white w-3 h-3 rounded-4xl border-2']">
        </div>
        <div class="bg-transparent">
          <h3>Credit Card</h3>
        </div>


        <img src="/images/card.svg" class="w-24 sm:w-34" />
      </aside>
      <!-- Card Section -->
      <Transition>
        <div v-if="fromStore.formSchema.paymentMethod === 'CREDITCARD'" class="bg-[#fafafa] p-4">
          <CustomInput v-model="fromStore.formSchema.cardNumber" id="cardNumber" type="text" placeholder="Card Number" />
          <div class="sm:flex sm:space-x-4">
            <CustomInput v-model="fromStore.formSchema.cardMonth"  id="cardMonth" type="text" placeholder="MM" />
            <CustomInput v-model="fromStore.formSchema.cardYear" id="cardYear" type="text" placeholder="YYYYY" />
            <CustomInput v-model="fromStore.formSchema.cardCvv" id="cardCvv" type="text" placeholder="CVV Code" />
          </div>

        </div>
      </Transition>

      <aside @click="() => handlePaymentOptionClick('PAYPAL')"
        class="flex font-semibold items-center gap-2 sm:gap-3 p-4 text-lg cursor-pointer">

        <div
          :class="[fromStore.formSchema.paymentMethod === 'PAYPAL' ? 'bg-green-500 w-3 h-3 rounded-4xl border-2' : 'bg-white w-3 h-3 rounded-4xl border-2']">
        </div>
        <div class="bg-transparent">
          <img src="/images/paypal-title.svg" class="bg-transparent">
        </div>
      </aside>
      <Transition>
        <div v-if="fromStore.formSchema.paymentMethod === 'PAYPAL'" class="bg-[#fafafa] p-6">
          <img src="/images/new-paypal-logo.webp" class="w-2/3 mx-auto" alt="">
        </div>
      </Transition>
      <!-- Submit Button -->
      <div class="p-4" id="purchaseButton" v-if="fromStore.formSchema.paymentMethod !== 'PAYPAL'">
        <button type="submit" @click="submitOrder"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold tracking-wide py-4 rounded-xl text-center">Complete
          Secure Purchase</button>
      </div>
    </div>
  </section>

</template>