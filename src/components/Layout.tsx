
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
        resolve({ default: module.default });
      })
      .catch(error => {
        console.error("Failed to load 3D background:", error);
        // Return the fallback component if the 3D version fails
        import("./FallbackBackground").then(module => resolve({ default: module.default }));
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
          <CustomErrorBoundary fallback={<FallbackBackground />}>
            <BackgroundScene />
          </CustomErrorBoundary>
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

// Simple error boundary component with TypeScript interface
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CustomErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
