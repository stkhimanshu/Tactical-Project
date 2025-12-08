import { defineStore } from "pinia";
import { ref } from "vue";
import type { FormData } from "~~/app/utils/interface"; // adjust path accordingly

export const useFormStore = defineStore("form", () => {

  const formSchema = ref<FormData>({
    phoneNumber: "",
    emailAddress: "",
    firstName: "",
    lastName: "",

    address1: "",
    address2: "",
    city: "",
    country: "US",
    state: "",
    postalCode: "",

    // SHIPPING METHOD
    shippingMethod: "",
    shippingId: "",

    sameAddress: true,
    billShipSame: true,
    billingFirstName: "",
    billingLastName: "",
    billingAddress1: "",
    billingAddress2: "",
    billingCity: "",
    billingCountry: "",
    billingState: "",
    billingPostalCode: "",

    discountCode: "",
    couponCode: "",

    paymentMethod: "CREDITCARD",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",

    // PRODUCT INFO (⭐ REQUIRED FOR ORDER IMPORT)
    productId: "",
    productQty: 1,

    cavv: "",
    xid: "",
    eci: "",
    version: "",
    acsTransId: "",
    status: "",
  });

  return {
    formSchema,
  };
});
