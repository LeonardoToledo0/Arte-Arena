import { ref, watch } from "vue";

export function useTheme() {
    const savedTheme = localStorage.getItem("theme");
    const theme = ref(savedTheme === "dark" ? "dark" : "light");

    const applyTheme = (value: string) => {
        document.documentElement.classList[value === "dark" ? "add" : "remove"]("dark");
        localStorage.setItem("theme", value);
    };

    watch(
        theme,
        (newTheme) => {
            applyTheme(newTheme);
        },
        { immediate: true }
    );

    const toggleTheme = () => {
        theme.value = theme.value === "dark" ? "light" : "dark";
    };

    return { theme, toggleTheme };
}
