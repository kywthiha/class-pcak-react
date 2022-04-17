

import {
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Login from "./pages/Login";
import Page404 from "./pages/404";
import PackList from "./pages/PackList";
import ProtectedRoute from "./protected.route";
import { getToken } from "./helper";
import { useEffect, useState } from "react";
import ClassPackPurchase from "./pages/ClassPackPurchase";
import OrderSuccess from "./pages/OrderSuccess";

function App() {


  return (
    <div className='h-full'>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<PackList />} />
          <Route path="/class-purchase/:packId" element={<ClassPackPurchase />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        <Route path="404" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
