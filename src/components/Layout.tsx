
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect, Suspense, lazy } from "react";
import { setupLocalStorage } from "@/lib/storage";
import { useLocation } from "react-router-dom";

// Lazy-load the BackgroundScene component to handle potential import errors gracefully
const BackgroundScene = lazy(() => import("./BackgroundScene"));

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Initialize local storage on first load
  useEffect(() => {
    setupLocalStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isHomePage && (
        <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-br from-accent/30 to-background"></div>}>
          <BackgroundScene />
        </Suspense>
      )}
      <Navbar />
      <main className="flex-1 relative z-10">
        <div className={isHomePage ? "" : "journal-container"}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
