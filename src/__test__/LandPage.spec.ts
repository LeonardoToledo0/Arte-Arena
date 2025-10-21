import { describe, it, expect, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import LandingPage from "../features/Home/pages/LandingPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/", component: LandingPage }],
});

describe("LandingPage.vue", () => {
    beforeEach(() => {

    });

    it("deve renderizar a landing page com todos os componentes", async () => {
        const wrapper = shallowMount(LandingPage, {
            global: {
                plugins: [router],
                stubs: {
                    LandHeader: { template: "<div class='mock-header' />" },
                    LandHero: { template: "<div class='mock-hero' />" },
                    LandFeatures: { template: "<div class='mock-features' />" },
                    LandPreview: { template: "<div class='mock-preview' />" },
                    LandFaq: { template: "<div class='mock-faq' />" },
                    LandFooter: { template: "<div class='mock-footer' />" },
                    "router-link": true,
                    "router-view": true,
                },
            },
        });

        await router.isReady();

        expect(wrapper.find(".mock-header").exists()).toBe(true);
        expect(wrapper.find(".mock-hero").exists()).toBe(true);
        expect(wrapper.find(".mock-features").exists()).toBe(true);
        expect(wrapper.find(".mock-preview").exists()).toBe(true);
        expect(wrapper.find(".mock-faq").exists()).toBe(true);
        expect(wrapper.find(".mock-footer").exists()).toBe(true);

        expect(wrapper.classes()).toContain("min-h-screen");
    });
});
