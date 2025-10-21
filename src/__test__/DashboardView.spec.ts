import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Dashboard from "../features/dashboard/pages/Dashboard.vue";
import { getAll } from "../shared/service/getAll";
import { toast } from "vue3-toastify";

// Mock do serviço getAll
vi.mock("../shared/service/getAll", () => ({
    getAll: vi.fn(),
}));

// Mock do toast
vi.mock("vue3-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock do apexchart
vi.mock("vue3-apexcharts", () => ({
    default: {
        name: "apexchart",
        template: "<div class='mock-apexchart'></div>",
    },
}));

describe("Dashboard.vue", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("deve renderizar o componente e mostrar KPIs e gráficos", async () => {
        (getAll as any).mockResolvedValue({
            products: [
                { id: 1, category: "Eletrônicos", price: 100 },
                { id: 2, category: "Roupas", price: 50 },
            ],
            users: [{ id: 1 }, { id: 2 }],
            carts: [
                { date: "2025-10-01", products: [{ productId: 1, quantity: 2 }] },
            ],
        });

        const wrapper = mount(Dashboard);
        await flushPromises();

        expect(wrapper.find(".mock-apexchart").exists()).toBe(true);
        expect(toast.success).toHaveBeenCalledWith("Dashboard carregado com sucesso!");
    });

    it("deve mostrar toast de erro se getAll falhar", async () => {
        (getAll as any).mockRejectedValue(new Error("Erro"));
        const wrapper = mount(Dashboard);
        await flushPromises();
        expect(toast.error).toHaveBeenCalledWith("Erro ao carregar dashboard.");
    });
});
