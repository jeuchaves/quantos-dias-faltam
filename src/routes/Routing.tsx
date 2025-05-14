import { Route, Routes } from "react-router-dom";
import {
  AdminPage,
  CheckoutPage,
  CreateCountdownPage,
  HomePage,
  NotFoundPage,
  ViewCountdownPage,
} from "../pages";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/criar" element={<CreateCountdownPage />} />
      <Route path="/contador/:slug" element={<ViewCountdownPage />} />
      <Route path="/checkout/:slug" element={<CheckoutPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
