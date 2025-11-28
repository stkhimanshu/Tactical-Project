import { defineStore } from "pinia";
// export const useCartStore = defineStore('cartStore', () => {

    
//     const productDetails = (productName: string, pro) => {
//         console.log("product", productDetails)
//     }

//     return {
//         productDetails
//     };
// });


export const useCartStore = defineStore("cartStore", {
  state: () => ({
    selectedProduct: null as any,
     totalAmount: 0 
  }),

  actions: {
    saveProduct(product: any) {
      this.selectedProduct = product;
      this.totalAmount = Number(product.price); 
    }
  }
});
