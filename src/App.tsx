import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashBoard from "./components/pages/DashBoard";

export default function OrbitingCirclesDemo() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
