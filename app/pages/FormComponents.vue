<template>
    <div class="grid grid-cols-2 gap-8 container mx-auto mt-5">
        <section class="border-2 border-[#dde4df] rounded-md">
            <div class="py-2 lg:px-3 px-2">
                <h3 class="text-base sm:text-lg font-semibold sm:font-bold ">Step1: Order Quantity</h3>
                <OrderQuantitySelector />
                <ShippingInfo ref="shippingRef" />
            </div>
        </section>
        <section class="border-2 border-[#dde4df] rounded-md">
            <SectionLabel title="Order Summary" />
            <Cart />
        </section>
    </div>


</template>

<script setup lang="ts">
import OrderQuantitySelector from '~/components/form/OrderQuantitySelector.vue';
import ShippingInfo from '~/components/form/ShippingInfo.vue';
import Cart from '~/components/orderSummary/Cart.vue'
</script>