
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect, Suspense, lazy, useState } from "react";
import React from "react";
import { setupLocalStorage } from "@/lib/storage";
import { useLocation } from "react-router-dom";
import FallbackBackground from "./FallbackBackground";

// Try to dynamically import the 3D background, with error handling
const BackgroundScene = lazy(() => {
  return new Promise<{ default: React.ComponentType<any> }>((resolve) => {
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
      <footer className="border-t bg-background/80 backdrop-blur-sm relative z-10">
        {/* Footer Bar with Bio, Legal Links, and Social Media */}
        <div className={isHomePage ? "container px-4 md:px-6" : "journal-container"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8 md:justify-between">
            {/* Website Title and Bio */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-lg sm:text-xl">Lumen</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your private space for reflection and emotional well-being. 
                Journal your thoughts and track your moods with complete privacy.
              </p>
            </div>
            
            {/* Legal Pages */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Legal</h3>
              <nav className="flex flex-col space-y-1 sm:space-y-2">
                <Link to="/privacy" className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors">Terms of Use</Link>
                <Link to="/cookies" className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors">Cookie Policy</Link>
              </nav>
            </div>
            
            {/* Social Media Links */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright and Main Navigation */}
        <div className="border-t">
          <div className={isHomePage ? "container px-4 md:px-6" : "journal-container"}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 py-4 sm:py-6">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Lumen. All rights reserved.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/journal/new" className="text-foreground hover:text-primary transition-colors">New Journal</Link>
                <Link to="/journal" className="text-foreground hover:text-primary transition-colors">All Entries</Link>
                <Link to="/mood" className="text-foreground hover:text-primary transition-colors">Mood Tracker</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
