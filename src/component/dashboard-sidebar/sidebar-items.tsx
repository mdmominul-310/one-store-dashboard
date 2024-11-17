import { CategoryOutlined, ColorLens, Dashboard, Facebook, FlashOn, Insights, Inventory, Menu, Settings, ShoppingBag, Straight, ViewCarousel } from "@mui/icons-material";

const sideBarItems = [
    {
        title: "Dashboard",
        route: "/",
        icon: <Dashboard />,
        children: []
    },
    {
        title: "Products",
        route: "/",
        icon: <ShoppingBag />,
        children: [
            {
                title: "Products List",
                route: "/products",
            },
            {
                title: "Add Product",
                route: "/products/add",
            },
            {
                title: "Reviews",
                route: "/products/reviews",
            },

        ],
    },
    {
        title: "Categories",
        route: "/",
        icon: <CategoryOutlined />,
        children: [
            {
                title: "Categories List",
                route: "/category",
            },
            {
                title: "Add Category",
                route: "/category/add",
            },
        ],
    },
    {
        title: "Colors",
        route: "/",
        icon: <ColorLens />,
        children: [
            {
                title: "Colors List",
                route: "/colors",
            },
            {
                title: "Add Color",
                route: "/colors/add",
            },
        ],
    },
    {
        title: "Sizes",
        route: "/",
        icon: <Straight />,
        children: [
            {
                title: "Sizes List",
                route: "/sizes",
            },
            {
                title: "Add Size",
                route: "/sizes/add",
            },
        ],
    },
    {
        title: "Banners",
        route: "/banners",
        icon: <ViewCarousel />,
    },
    {
        title: "Flash Sales",
        route: "/flash-sale",
        icon: <FlashOn />,
        children: [
            {
                title: "Flash Sales List",
                route: "/flash-sale",
            },
            {
                title: "Add Flash Sale",
                route: "/flash-sale/add",
            },
        ]
    },
    {
        title: "Menus",
        route: "/menus",
        icon: <Menu />,
    },
    {
        title: "Manage Orders",
        route: "/orders",
        icon: <Inventory />,
    },
    {
        title: "Promotions",
        route: "/youtube-promotion",
        icon: <Insights />,
    },
    {
        title: "Facebook Pixel",
        route: "/facebook-pixel",
        icon: <Facebook />
    },
    {
        title: "Shop Settings",
        route: "/shop-settings",
        icon: <Settings />
    }

]

export default sideBarItems;