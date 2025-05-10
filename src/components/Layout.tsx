
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { setupLocalStorage } from "@/lib/storage";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Initialize local storage on first load
  useEffect(() => {
    setupLocalStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className={isHomePage ? "" : "journal-container"}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
