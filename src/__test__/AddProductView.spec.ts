import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import * as fakestoreService from "../shared/service/fakestore";
import AddProductForm from "../features/products/pages/AddProductForm.vue";
import { toast } from "vue3-toastify";
import DefaultInitialForm from "../shared/components/DefaultInitialForm.vue";
import DefaultLoading from "../shared/components/DefaultLoading.vue";

// Mocks
vi.mock("vue3-toastify", () => ({
    toast: { success: vi.fn(), error: vi.fn() },
}));

describe("AddProductForm.vue", () => {
    beforeEach(() => vi.clearAllMocks());

    it("deve renderizar DefaultLoading quando loading for true", () => {
        const wrapper = shallowMount(AddProductForm, {
            data: () => ({ loading: true }),
            global: { mocks: { $router: { push: vi.fn() } } },
        });

        expect(wrapper.findComponent(DefaultLoading).exists()).toBe(true);
        expect(wrapper.findComponent(DefaultInitialForm).exists()).toBe(false);
    });

    it("deve renderizar DefaultInitialForm quando loading for false", () => {
        const wrapper = shallowMount(AddProductForm, {
            data: () => ({ loading: false }),
            global: { mocks: { $router: { push: vi.fn() } } },
        });

        expect(wrapper.findComponent(DefaultInitialForm).exists()).toBe(true);
        expect(wrapper.findComponent(DefaultLoading).exists()).toBe(false);
    });

    it("deve chamar createProduct e toast.success ao submeter", async () => {
        const createProductMock = vi
            .spyOn(fakestoreService, "createProduct")
            .mockResolvedValue({ data: { id: 1, title: "Produto Teste" } });

        const wrapper = shallowMount(AddProductForm, {
            global: { mocks: { $router: { push: vi.fn() } } },
        });

        const productData = {
            title: "Produto Teste",
            price: 10,
            description: "Descrição teste",
            category: "Categoria",
            image: "imagem.png",
        };

        await wrapper.vm.handleProductSubmit(productData as any);

        expect(createProductMock).toHaveBeenCalledWith(productData);
        expect(toast.success).toHaveBeenCalledWith("Produto cadastrado com sucesso!");
        expect(wrapper.vm.loading).toBe(false);
    });

    it("deve chamar toast.error em caso de erro", async () => {
        vi.spyOn(fakestoreService, "createProduct").mockRejectedValue(new Error("Erro teste"));

        const wrapper = shallowMount(AddProductForm, {
            global: { mocks: { $router: { push: vi.fn() } } },
        });

        const productData = {
            title: "Produto Teste",
            price: 10,
            description: "Descrição teste",
            category: "Categoria",
            image: "imagem.png",
        };

        await wrapper.vm.handleProductSubmit(productData as any);

        expect(toast.error).toHaveBeenCalledWith("Erro ao cadastrar produto.");
        expect(wrapper.vm.loading).toBe(false);
    });
});
