import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { PrivateRoute } from "../components/privateRoute/PrivateRoute";
import { HomeRoutes } from "../home/routes/";

const ProductsRoutes = lazy(() => import("../products/routes/").then((m) => ({ default: m.ProductsRoutes })));
const SearchRoutes = lazy(() => import("../search/routes").then((m) => ({ default: m.SearchRoutes })));
const AdminRoutes = lazy(() => import("../admin/routes").then((m) => ({ default: m.AdminRoutes })));
const UserRoutes = lazy(() => import("../userPanel/routes").then((m) => ({ default: m.UserRoutes })));
const DetailsProductsPage = lazy(() => import("../products/pages").then((m) => ({ default: m.DetailsProductsPage })));
const CartShoppingRoutes = lazy(() => import("../cartShooping/routes/").then((m) => ({ default: m.CartShoppingRoutes })));
const ShippingInfoRoutes = lazy(() => import("../shippingInfo/routes").then((m) => ({ default: m.ShippingInfoRoutes })));
const AuthRoutes = lazy(() => import("../auth/routes/").then((m) => ({ default: m.AuthRoutes })));
const ContactFormRoutes = lazy(() => import("../contactForm/routes").then((m) => ({ default: m.ContactFormRoutes })));
const RepetanceRoutes = lazy(() => import("../repetance/routes").then((m) => ({ default: m.RepetanceRoutes })));
const NotFoundRoutes = lazy(() => import("../notFound/routes").then((m) => ({ default: m.NotFoundRoutes })));

export const AppRouter = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomeRoutes />} />
          <Route path="/products/*" element={<ProductsRoutes />} />
          <Route path="/search/*" element={<SearchRoutes />} />
          <Route path="/contact/*" element={<ContactFormRoutes />} />
          <Route path="/arrepentimiento/*" element={<RepetanceRoutes />} />
          <Route path="/cartShopping" element={<CartShoppingRoutes />} />
          <Route path="/shippingInfo" element={<PrivateRoute><ShippingInfoRoutes /></PrivateRoute>} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/admin/*" element={<PrivateRoute requireEmailVerified={true}><AdminRoutes /></PrivateRoute>} />
          <Route path="/user/*" element={<PrivateRoute><UserRoutes /></PrivateRoute>} />
          <Route path="/products/details/:id" element={<DetailsProductsPage />} />
          <Route path="*" element={<NotFoundRoutes />} />
        </Routes>
      </Suspense>
    </div>
  );
};
