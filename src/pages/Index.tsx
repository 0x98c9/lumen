import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  CalendarCheck, 
  Shield, 
  Heart, 
  Pencil, 
  Search, 
  Lock,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="py-8 md:py-12 text-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shadow Self Journal</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Your private space for reflection and emotional well-being, with no accounts or cloud storage.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link to="/journal/new">Start Writing</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/mood">Track Mood</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="container px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Core Features</h2>
          <p className="text-muted-foreground">Everything you need for personal reflection and growth</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Journal
              </CardTitle>
              <CardDescription>Write about your day's experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Record your thoughts, experiences, and reflections in a private space that stays on your device.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/journal/new">Write New Entry</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5" />
                Mood Tracker
              </CardTitle>
              <CardDescription>Track your emotional journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Record your daily mood and see patterns over time to better understand your emotional well-being.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/mood">Track Today's Mood</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container px-4 md:px-6 py-8 bg-accent/50 rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Powerful Tools</h2>
          <p className="text-muted-foreground">Simple yet effective tools for self-reflection</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Pencil className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Daily Writing</h3>
            <p className="text-sm text-muted-foreground">Capture your thoughts and feelings with our distraction-free writing interface.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Emotional Tracking</h3>
            <p className="text-sm text-muted-foreground">Monitor your moods and identify patterns to improve emotional awareness.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Self Discovery</h3>
            <p className="text-sm text-muted-foreground">Gain insights from your journal entries and mood patterns over time.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Complete Privacy</h3>
            <p className="text-sm text-muted-foreground">All your data stays on your device. No servers, no sharing.</p>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="container px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Who Is This For?</h2>
          <p className="text-muted-foreground">Perfect for anyone looking to improve self-awareness</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-lg">Self-Growth Enthusiasts</h3>
            </div>
            <p className="text-muted-foreground">
              People who actively work on personal development and emotional intelligence through regular reflection.
            </p>
          </div>
          
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-lg">Privacy-Conscious Users</h3>
            </div>
            <p className="text-muted-foreground">
              Those who want to journal but are concerned about the privacy implications of cloud-based services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Privacy Promise Section (keeping the existing one) */}
      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Privacy Promise</h3>
        <p className="text-sm text-muted-foreground">
          Everything you write stays private — only on your device. No accounts, no cloud storage, just your thoughts.
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Shadow Self Journal. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <Link to="/journal" className="hover:text-foreground">Journal</Link>
              <Link to="/mood" className="hover:text-foreground">Mood</Link>
              <Link to="/stats" className="hover:text-foreground">Stats</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
