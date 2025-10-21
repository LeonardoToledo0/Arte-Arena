import {
    ArrowLeftStartOnRectangleIcon,
    ClipboardDocumentListIcon,
    HomeIcon,
    ShoppingCartIcon,
    UsersIcon,
    ListBulletIcon,
    PlusCircleIcon
} from "@heroicons/vue/24/outline";

export const MenuGroup = [
    { title: "Dashboard", path: "/dashboard", icon: HomeIcon },
    {
        title: "Products",
        path: "#",
        icon: ShoppingCartIcon,
        children: [
            { title: "Listar Produtos", path: "/products/list", icon: ListBulletIcon },
            { title: "Adicionar Produto", path: "/products/add", icon: PlusCircleIcon },
        ],
    },
    { title: "Orders", path: "/orders", icon: ClipboardDocumentListIcon },
    {
        title: "Users",
        path: "#",
        icon: UsersIcon,
        children: [
            { title: "Listar Usuários", path: "/users/list", icon: ListBulletIcon },
            { title: "Adicionar Usuário", path: "/users/add", icon: PlusCircleIcon },
        ],
    },
];

export const MenuGroupBottom = [
    {
        title: "Logout",
        path: "/auth/login",
        icon: ArrowLeftStartOnRectangleIcon,
        actionName: "logout",
    },
];
