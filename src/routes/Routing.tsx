import { Route, Routes } from "react-router-dom";
import {
  Admin,
  Checkout,
  CreateCountdown,
  Home,
  NotFound,
  ViewCountdown,
} from "../pages";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar" element={<CreateCountdown />} />
      <Route path="/contador/:slug" element={<ViewCountdown />} />
      <Route path="/checkout/:slug" element={<Checkout />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
