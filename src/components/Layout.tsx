
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { setupLocalStorage } from "@/lib/storage";

const Layout = () => {
  // Initialize local storage on first load
  useEffect(() => {
    setupLocalStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="journal-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
