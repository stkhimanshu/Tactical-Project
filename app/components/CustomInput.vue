<template>
    <div class="w-full">
        <input :id="id" :type="type" :placeholder="placeholder" :class="[baseClass, width]">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFormStore } from "../../stores/index";
const fromStore = useFormStore();

const props = defineProps({
    placeholder: String,
    type: {
        type: String,
        default: "text"
    },
    baseClass: {
        type: String,
        default: "border rounded-md border-gray-300 py-[6px] px-[12px] mt-2 xl:text-sm text-xs h-[42px]",
    },
    width: {
        type: String,
        default: "w-full",
    },
})
</script>