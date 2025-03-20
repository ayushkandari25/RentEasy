import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
// import { ThemeProvider } from "./Context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <ThemeProvider> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    {/* </ThemeProvider> */}
  </BrowserRouter>
);
