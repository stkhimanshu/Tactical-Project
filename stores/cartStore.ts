import { defineStore } from "pinia";
import { ref, computed } from "vue";
// export const useCartStore = defineStore('cartStore', () => {


//     const productDetails = (productName: string, pro) => {
//         console.log("product", productDetails)
//     }

//     return {
//         productDetails
//     };
// });


// export const useCartStore = defineStore("cartStore", {
//   state: () => ({
//     selectedProduct: null as any,
//      totalAmount: 0 
//   }),

//   actions: {
//     saveProduct(product: any) {
//       this.selectedProduct = product;
//       this.totalAmount = Number(product.price); 
//     }
//   }
// });


export const useCartStore = defineStore("cart", () => {
  const selectedProduct = ref<any>(null);
  const basePrice = ref(0);
  // Discount
  const discountAmount = ref(0);
  const couponSuccess = ref<any | null>(null);
  const couponError = ref<string | null>(null);
  const discountLoading = ref(false);

  const shipping = ref(0);
  const salesTax = ref(0);

  const subTotal = computed(() => basePrice.value);

  const totalAmount = computed(() => {
    return (
      basePrice.value -
      discountAmount.value +
      shipping.value +
      salesTax.value
    ).toFixed(2);
  });


  function saveProduct(product: any) {
    selectedProduct.value = product;
    basePrice.value = Number(product.price) || 0;
    discountAmount.value = 0;
    couponSuccess.value = null;
    couponError.value = null;
  }
  function applyDiscount(priceDiscount: number = 0, shipDiscount: number = 0) {
    discountAmount.value = Number(priceDiscount);
    if (shipDiscount > 0) {
      shipping.value = Math.max(0, shipping.value - shipDiscount);
    }
  }

  function setCouponError(message: string) {
    couponError.value = message;
    couponSuccess.value = null;
    discountAmount.value = 0;
  }

  function clearDiscount() {
    discountAmount.value = 0;
    couponSuccess.value = null;
  }

  return {
    // state
    selectedProduct,
    basePrice,
    discountAmount,
    couponSuccess,
    couponError,
    discountLoading,
    shipping,
    salesTax,

    // computed
    subTotal,
    totalAmount,

    // actions
    saveProduct,
    applyDiscount,
    setCouponError,
    clearDiscount,
  };

})