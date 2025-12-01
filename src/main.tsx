import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import FrmPerson2 from "./component/FrmPerson2.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FrmPerson2 />
  </StrictMode>
);
