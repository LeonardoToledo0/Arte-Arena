import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../features/auth/pages/Login.vue';
import { userLogin } from '../shared/service/fakestore';
import { toast } from 'vue3-toastify';

vi.mock('../shared/service/fakestore', () => ({
    userLogin: vi.fn(),
}));

vi.mock('vue3-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('../features/auth/store/useAuthStore', () => ({
    useAuthStore: () => ({
        setAuthData: vi.fn(),
    }),
}));

vi.stubGlobal('atob', (str: string) => {
    return JSON.stringify({ user: 'mor_2314' });
});

describe('Login.vue', () => {
    let wrapper: ReturnType<typeof mount>;
    const router = createRouter({
        history: createWebHistory(),
        routes: [],
    });

    beforeEach(() => {
        wrapper = mount(Login, {
            global: {
                plugins: [createPinia(), router],
            },
        });
    });

    it('deve renderizar os campos de login', () => {
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
        expect(wrapper.find('input[type="password"]').exists()).toBe(true);
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it('deve chamar userLogin ao enviar o formulário', async () => {
        (userLogin as any).mockResolvedValue({
            data: { token: 'aaaa.' + btoa(JSON.stringify({ user: 'mor_2314' })) + '.bbbb' },
        });

        await wrapper.find('input[type="text"]').setValue('mor_2314');
        await wrapper.find('input[type="password"]').setValue('83r5^_');

        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();

        expect(userLogin).toHaveBeenCalledWith({
            username: 'mor_2314',
            password: '83r5^_',
        });

        expect(toast.success).toHaveBeenCalledWith('Usuário logado com sucesso!');
    });
});
