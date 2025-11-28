<script setup lang="ts">
import {ref} from 'vue';
import { useCartStore } from "../../../stores/index";

const cartStore = useCartStore();
// const selectedProducts = ref(null);

// 🌟 Default value = first product's ID
const selectedProduct = ref(productDetails[1]?.campaignProductId)

onMounted(() => {
  cartStore.saveProduct(productDetails[1]);
});

const handleSelect = (productItem: any) => {
  selectedProduct.value = productItem.campaignProductId;
  cartStore.saveProduct(productItem);  
};
</script>

<template>
    <div class="products">
        <div v-for="(productItem, index) in productDetails" :key="productItem.campaignProductId">
            <label class="flex items-start gap-4 p-4 rounded-lg border mb-4 cursor-pointer transition-all">
                <input type="radio" :value="productItem.campaignProductId" v-model="selectedProduct" @change="handleSelect(productItem)">

                <!-- Display product info -->
                <div class="w-full flex gap-5">

                    <!-- Product Image -->
                    <img :src="productItem.image" alt="" class="w-20 h-20 rounded object-cover" />

                    <!-- Product Info Section -->
                    <div class="flex flex-row gap-3 flex-1">

                        <!-- Product Name -->
                        <div class="font-semibold text-xs sm:text-sm mt-1 w-4/5">
                            {{ productItem.productName }}
                        </div>

                        <!-- Price Section -->
                        <div class="flex flex-col items-center gap-1">

                            <!-- Compare at price -->
                            <span class="text-gray-500 line-through text-sm">
                                ${{ productItem.compareAtPrice }}
                            </span>

                            <!-- Main Price -->
                            <span class="text-xl font-bold text-[#3AB34A]">
                                ${{ productItem.price }}
                            </span>

                        </div>

                    </div>

                </div>
            </label>
        </div>

        <!-- Display currently selected -->
        <p><strong>Selected Product ID:</strong> {{ selectedProduct }}</p>
    </div>
</template>