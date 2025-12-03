<script setup>
import { useCartStore } from "../../../stores/index";
const cartStore = useCartStore();
import {PaymentInfo} from '../form/export';
</script>

<template>
    <div class="p-2 lg:p-3">
        <section class="border shadow-sm rounded-md p-4">
            <div class="flex items-center justify-between w-full p-4 bg-[#fafafa]">
                <div class="flex items-center space-x-2 ">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="flex items-center space-x-1">
                        <span>Hide order summary</span>
                        <i class="fas fa-angle-down"></i>
                    </span>
                </div>
                <div class="font-semibold">
                    ${{ cartStore.totalAmount }}
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
                <input type="text" placeholder="Discount Code"
                    class="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-normal hover:bg-blue-700">
                    Apply
                </button>

            </div>

        </section>

        <!-- Another Section -->
         <SectionLabel class="mt-4" title="Step 3: Payment Information"/>
         <PaymentInfo/>
    </div>
</template>
