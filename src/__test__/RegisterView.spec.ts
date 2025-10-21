import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Register from "../features/auth/pages/Register.vue";
import { createUser } from "../shared/service/fakestore";
import { toast } from "vue3-toastify";

// Mock das dependências externas
vi.mock("../shared/service/fakestore", () => ({
    createUser: vi.fn(),
}));

vi.mock("vue3-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock do router
const pushMock = vi.fn();
vi.mock("vue-router", async () => {
    const actual = await vi.importActual("vue-router");
    return {
        ...actual,
        useRouter: () => ({ push: pushMock }),
    };
});

describe("Register.vue", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("deve renderizar os campos do formulário", () => {
        const wrapper = mount(Register);
        const inputs = wrapper.findAll("input");
        expect(inputs).toHaveLength(3);

        expect(wrapper.html()).toContain("Username");
        expect(wrapper.html()).toContain("Email");
        expect(wrapper.html()).toContain("Senha");
    });

    it("deve cadastrar o usuário e mostrar toast de sucesso", async () => {
        const wrapper = mount(Register);

        // Preenche os campos
        await wrapper.find('input[type="text"]').setValue("john");
        await wrapper.find('input[type="email"]').setValue("john@email.com");
        await wrapper.find('input[type="password"]').setValue("123456");

        // Mock da resposta do createUser
        (createUser as any).mockResolvedValue({
            id: 1,
            username: "john",
            email: "john@email.com",
            password: "123456",
        });

        // Usa timers falsos para controlar o setTimeout
        vi.useFakeTimers();

        // Submete o formulário
        await wrapper.find("form").trigger("submit.prevent");

        // Avança o timer para disparar o setTimeout do push
        vi.advanceTimersByTime(2000);

        await flushPromises();

        expect(createUser).toHaveBeenCalledWith({
            id: 0,
            username: "john",
            email: "john@email.com",
            password: "123456",
        });

        expect(toast.success).toHaveBeenCalledWith("Usuário cadastrado com sucesso!");
        expect(pushMock).toHaveBeenCalledWith("/auth/login");

        // Restaura timers reais
        vi.useRealTimers();
    });

    it("deve mostrar toast de erro se falhar no cadastro", async () => {
        const wrapper = mount(Register);

        await wrapper.find('input[type="text"]').setValue("john");
        await wrapper.find('input[type="email"]').setValue("john@email.com");
        await wrapper.find('input[type="password"]').setValue("123456");

        (createUser as any).mockRejectedValue(new Error("Erro"));

        await wrapper.find("form").trigger("submit.prevent");
        await flushPromises();

        expect(toast.error).toHaveBeenCalledWith("Erro ao cadastrar usuário.");
    });
});
