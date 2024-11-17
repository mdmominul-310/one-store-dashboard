import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import SignIn from "../pages/sign-in/SignIn";
import Home from "../pages/home/home";
import ProtectedRoute from "./ProtectedRoute";
import ProductList from "../pages/products/product-list";
import AddProducts from "../pages/products/add-product";
import CategoryList from "../pages/categories/category-list";
import AddCategory from "../pages/categories/add-category";
import EditCategory from "../pages/categories/edit-category";
import ColorsList from "../pages/colors/colors-list";
import AddColors from "../pages/colors/add-colors";
import EditColors from "../pages/colors/edit-colors";
import SizeList from "../pages/sizes/size-list";
import AddSize from "../pages/sizes/add-sizes";
import EditSize from "../pages/sizes/edit-size";
import EditProducts from "../pages/products/edit-product";
import Banner from "../pages/banner/Banner";
import ManageOrders from "../pages/orders/manage-orders";
import OrderInvoice from "../pages/orders/order-invoice";
import MenuList from "../pages/menus/menu-list";
import YoutubePromotion from "../pages/youtube-promotion/youtube-promotions";
import FacebookPixel from "../pages/facebook-pixel/facebook-pixel";
import FlashSale from "../pages/flash-sale/flash-salse";
import AddFlashSale from "../pages/flash-sale/add-flash-sale";
import EditFlashSale from "../pages/flash-sale/edit-flash-sale";
import ShowOrdersDetails from "../pages/orders/show-orders-details";
import ShopSettings from "../pages/shop-settings/shop-settings";
const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><DefaultLayout /></ProtectedRoute>,
        //   loader: rootLoader,
        children: [
            {
                path: "",
                element: <Home />,
                //   loader: teamLoader,
            },
            {
                path: "products",
                element: <ProductList />,

            },
            {
                path: "products/add",
                element: <AddProducts />,
            },
            {
                path: "products/edit/:id",
                element: <EditProducts />,
            },
            {
                path: "category",
                element: <CategoryList />
            },
            {
                path: "category/add",
                element: <AddCategory />
            },
            {
                path: "category/edit/:id",
                element: <EditCategory />
            },

            {
                path: "colors",
                element: <ColorsList />
            },
            {
                path: "colors/add",
                element: <AddColors />
            },
            {
                path: "colors/edit/:id",
                element: <EditColors />
            },
            {
                path: "sizes",
                element: <SizeList />
            },
            {
                path: "sizes/add",
                element: <AddSize />
            },
            {
                path: "sizes/edit/:id",
                element: <EditSize />
            },
            {
                path: "banners",
                element: <Banner />
            },
            {
                path: "orders",
                element: <ManageOrders />
            },
            {
                path: '/orders/:id',
                element: <ShowOrdersDetails />
            },
            {
                path: "/orders/invoice/:id",
                element: <OrderInvoice />
            },
            {
                path: "menus",
                element: <MenuList />
            },
            {
                path: "youtube-promotion",
                element: <YoutubePromotion />
            },
            {
                path: 'facebook-pixel',
                element: <FacebookPixel />
            },
            {
                path: 'flash-sale',
                element: <FlashSale />
            },
            {
                path: '/flash-sale/add',
                element: <AddFlashSale />
            },
            {
                path: '/flash-sale/edit/:id',
                element: <EditFlashSale />
            },
            {
                path: 'shop-settings',
                element: <ShopSettings />
            }



        ],
    },
    {
        path: "/login",
        element: <SignIn />
    }
]);


export default router;