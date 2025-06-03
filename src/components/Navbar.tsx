
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, BookOpen, Calendar, ChartLine } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const navigation = [
    { name: "Journal", href: "/journal", icon: BookOpen },
    { name: "Mood", href: "/mood", icon: Calendar },
    { name: "Stats", href: "/stats", icon: ChartLine }
  ];

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="journal-container flex items-center justify-between py-2 sm:py-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-semibold text-lg sm:text-xl">Lumen</span>
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  location.pathname.startsWith(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <nav className="border-t md:hidden">
        <div className="journal-container py-0">
          <div className="flex justify-between items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center py-2 text-xs sm:text-sm font-medium",
                  location.pathname.startsWith(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
