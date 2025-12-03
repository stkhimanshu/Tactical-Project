<template>
    <div class="w-full">
        <input :id="id" :type="type" :placeholder="placeholder" :class="[baseClass, width]" :value="modelValue"
            @input="updateValue">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFormStore } from "~~/stores/formStore";
const formStore = useFormStore();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: String,
    placeholder: String,
    type: {
        type: String,
        default: "text"
    },
    field: {
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
const updateValue = (event) => {
    // formStore.formSchema.cardNumber = event.target.value;
    // formStore.formSchema.cardMonth = event.target.value;
    // formStore.formSchema.cardYear = event.target.value;
    // formStore.formSchema.cardCvv = event.target.value;
    formStore.formSchema[props.field] = event.target.value;
    emit("update:modelValue", event.target.value);
}
</script>