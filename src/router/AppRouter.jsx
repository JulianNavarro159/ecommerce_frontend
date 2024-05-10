import {  Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/";
import { HomeRoutes } from "../home/routes/";
import { ProductsRoutes } from "../products/routes/"

export const AppRouter = () => {
  return (
    <div>
      <Routes>

          {/* Home */}
          <Route path="/*" element={ <HomeRoutes /> }/>

          {/* Products */}        
          <Route path="/products/*" element={ <ProductsRoutes/>}/>

          {/* CartShopping */}
          {/* <Route path="/cartShopping" element={ <CartShopping /> }/> */}

          {/* Login y Registro */}
          <Route path="/auth/*" element={ <AuthRoutes /> }/>

      </Routes>
    </div>
  )
}
