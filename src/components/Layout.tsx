
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect, Suspense, lazy, useState } from "react";
import React from "react";
import { setupLocalStorage } from "@/lib/storage";
import { useLocation } from "react-router-dom";
import FallbackBackground from "./FallbackBackground";

// Try to dynamically import the 3D background, with error handling
const BackgroundScene = lazy(() => {
  return new Promise((resolve) => {
    import("./BackgroundScene")
      .then(module => {
        resolve(module);
      })
      .catch(error => {
        console.error("Failed to load 3D background:", error);
        // Return the fallback component if the 3D version fails
        import("./FallbackBackground").then(resolve);
      });
  });
});

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
        <Suspense fallback={<FallbackBackground />}>
          <ErrorBoundary fallback={<FallbackBackground />}>
            <BackgroundScene />
          </ErrorBoundary>
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

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Background error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default Layout;
