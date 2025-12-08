<script setup>
import { useCartStore } from "../../../stores/index";
import { useFormStore } from '~~/stores/formStore';
import { PaymentInfo } from '../form/export';
const cartStore = useCartStore();
import { useCheckoutChamp } from '~/composables/useCheckoutChamp';
const { applyCoupon } = useCheckoutChamp();
const formStore = useFormStore();
const couponCode = ref("");
const couponSuccessMsg = ref("");
const couponError = ref("");

async function handleApplyCoupon() {
    couponError.value = "";

    if (!couponCode.value) {
        couponError.value = "Please enter a coupon code";
        return;
    }
    const product = cartStore.selectedProduct;
    // product id
    const productId = product?.campaignProductId || product?.id || product?.productId || "";

    const payload = {
        campaignId: useRuntimeConfig().public.CC_CAMPAIGN_ID,
        couponCode: couponCode.value,
        productId: formStore.formSchema.productId,
        productQty: formStore.formSchema.productQty,

        // Shipping data
        shipProfileId: formStore.formSchema.shippingId || "",
        shipState: formStore.formSchema.state || null,
        shipCountry: formStore.formSchema.country || null,
        shipCarrier: null,
        shipMethod: formStore.formSchema.shippingMethod || null,
        shipUpcharge: "0",

        product1_id: productId,
        product1_price: product?.price || null,
        product1_qty: formStore.formSchema.productQty || 1,
        product1_shipPrice: "0",
        variant1_id: null,
    };

    const response = await applyCoupon(payload);

    console.log("COUPON RESPONSE:", response);

    if (response?.result === "SUCCESS") {
        const priceDiscount = Number(response?.message?.priceDiscount || 0);
        const shipDiscount = Number(response?.message?.shipDiscount || 0);
        if (priceDiscount === 0 && shipDiscount === 0) {
            cartStore.clearDiscount();
            couponError.value = `${couponCode.value} Please enter a valid coupon`;
            couponSuccessMsg.value = "";
            return;
        }
        cartStore.applyDiscount(priceDiscount, shipDiscount);
        formStore.formSchema.couponCode = couponCode.value;
        couponError.value = "";
        couponSuccessMsg.value = `Coupon "${couponCode.value}" applied successfully! 🎉`;

    } else {
        couponError.value = "Please enter a valid coupon";
        couponSuccessMsg.value = ""
    }
}

</script>

<template>
    <div class="p-2 lg:p-3">
        <section class="border shadow-sm rounded-md p-4">
            <!-- <div class="flex items-center justify-between w-full p-4 bg-[#fafafa]"> -->
            <!-- <div class="flex items-center space-x-2 ">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="flex items-center space-x-1">
                        <span>Hide order summary</span>
                        <i class="fas fa-angle-down"></i>
                    </span>
                </div> -->
            <!-- <div class="font-semibold"> -->
            <!-- ${{ cartStore.totalAmount }} -->
            <!-- </div> -->
            <!-- </div> -->
            <div class="p-4 bg-[#fafafa] space-y-2">

                <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>${{ cartStore.basePrice }}</span>
                </div>

                <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ${{ cartStore.discountAmount }}</span>
                </div>

                <div class="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${{ cartStore.totalAmount }}</span>
                </div>

            </div>


            <div class="flex mt-4 space-x-2" v-if="cartStore.selectedProduct">
                <div class="flex gap-2">
                    <img :src="cartStore.selectedProduct.image" class="w-10 h-10 rounded object-cover" />
                    <h3 class="font-semibold text-xs sm:text-sm mt-1 w-4/5">{{ cartStore.selectedProduct.productName }}
                    </h3>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <span class="text-gray-500 line-through text-sm">
                        ${{ cartStore.selectedProduct.compareAtPrice }}
                    </span>
                    <span class="text-xl font-bold text-[#3AB34A]">
                        ${{ cartStore.selectedProduct.price }}
                    </span>
                </div>
            </div>

            <p v-else>No product selected yet.</p>

            <div class="flex items-center gap-4 w-full p-4 border-t border-b border-gray-300">
                <input type="text" placeholder="Discount Code" v-model="couponCode"
                    class="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />

                <button @click="handleApplyCoupon"
                    class="bg-blue-600 text-white px-6 py-3 rounded-lg font-normal hover:bg-blue-700">
                    Apply
                </button>
            </div>
            <span v-if="couponSuccessMsg" class="text-green-600 text-sm">
                {{ couponSuccessMsg }}
            </span>
            <span v-if="couponError" class="text-red-500 text-sm">
                {{ couponError }}
            </span>
        </section>

        <!-- Another Section -->
        <SectionLabel class="mt-4" title="Step 3: Payment Information" />
        <PaymentInfo />
    </div>
</template>
