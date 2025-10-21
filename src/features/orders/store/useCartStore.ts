// stores/cartStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
    const selectedCart = ref<any>(null);

    const totalAmount = computed(() => {
        if (!selectedCart.value?.products) return 0;
        return selectedCart.value.products.reduce((acc: number, item: any) => {
            const price = item.price ?? 0;
            const quantity = item.quantity ?? 0;
            return acc + price * quantity;
        }, 0);
    });

    const setCart = (cart: any) => {
        selectedCart.value = cart;
    };

    return { selectedCart, totalAmount, setCart };
});
