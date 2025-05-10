
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
import MotionSection from "@/components/MotionSection";
import StaggeredContainer, { StaggeredItem } from "@/components/StaggeredContainer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="space-y-16 py-8 overflow-hidden">
      {/* Hero Section */}
      <MotionSection>
        <section className="py-16 md:py-24 text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">Shadow Self Journal</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your private space for reflection and emotional well-being, with no accounts or cloud storage.
                </p>
              </motion.div>
              <motion.div 
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
                  <Link to="/journal/new">Start Writing</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-background/80 border border-border/50 shadow-md hover:shadow-lg">
                  <Link to="/mood">Track Mood</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </MotionSection>

      {/* Feature Cards Section */}
      <MotionSection delay={0.1}>
        <section className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Core Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need for personal reflection and growth</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-md bg-card/90 border border-border/50 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    Journal
                  </CardTitle>
                  <CardDescription className="text-base">Write about your day's experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Record your thoughts, experiences, and reflections in a private space that stays on your device.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Link to="/journal/new">Write New Entry</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-md bg-card/90 border border-border/50 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CalendarCheck className="h-5 w-5 text-primary" />
                    </div>
                    Mood Tracker
                  </CardTitle>
                  <CardDescription className="text-base">Track your emotional journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Record your daily mood and see patterns over time to better understand your emotional well-being.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Link to="/mood">Track Today's Mood</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>
      </MotionSection>

      {/* Tools Section */}
      <MotionSection delay={0.2}>
        <section className="container px-4 md:px-6 py-12 rounded-2xl bg-gradient-to-br from-accent/70 to-background">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Powerful Tools</h2>
            <p className="text-muted-foreground mt-2">Simple yet effective tools for self-reflection</p>
          </div>

          <StaggeredContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggeredItem>
              <div className="flex flex-col items-center text-center p-4 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-lg transition-all h-full">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Pencil className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2 text-xl">Daily Writing</h3>
                <p className="text-muted-foreground">Capture your thoughts and feelings with our distraction-free writing interface.</p>
              </div>
            </StaggeredItem>
            
            <StaggeredItem>
              <div className="flex flex-col items-center text-center p-4 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-lg transition-all h-full">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2 text-xl">Emotional Tracking</h3>
                <p className="text-muted-foreground">Monitor your moods and identify patterns to improve emotional awareness.</p>
              </div>
            </StaggeredItem>
            
            <StaggeredItem>
              <div className="flex flex-col items-center text-center p-4 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-lg transition-all h-full">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2 text-xl">Self Discovery</h3>
                <p className="text-muted-foreground">Gain insights from your journal entries and mood patterns over time.</p>
              </div>
            </StaggeredItem>
            
            <StaggeredItem>
              <div className="flex flex-col items-center text-center p-4 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-lg transition-all h-full">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2 text-xl">Complete Privacy</h3>
                <p className="text-muted-foreground">All your data stays on your device. No servers, no sharing.</p>
              </div>
            </StaggeredItem>
          </StaggeredContainer>
        </section>
      </MotionSection>

      {/* Who Is This For Section */}
      <MotionSection delay={0.3}>
        <section className="container px-4 md:px-6 py-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Who Is This For?</h2>
            <p className="text-muted-foreground mt-2">Perfect for anyone looking to improve self-awareness</p>
          </div>

          <StaggeredContainer className="grid md:grid-cols-2 gap-8">
            <StaggeredItem>
              <div className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-6 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-xl">Self-Growth Enthusiasts</h3>
                </div>
                <p className="text-muted-foreground">
                  People who actively work on personal development and emotional intelligence through regular reflection.
                </p>
              </div>
            </StaggeredItem>
            
            <StaggeredItem>
              <div className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-6 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-xl">Privacy-Conscious Users</h3>
                </div>
                <p className="text-muted-foreground">
                  Those who want to journal but are concerned about the privacy implications of cloud-based services.
                </p>
              </div>
            </StaggeredItem>
          </StaggeredContainer>
        </section>
      </MotionSection>
      
      {/* Privacy Promise Section */}
      <MotionSection delay={0.4}>
        <div className="container px-4 md:px-6 py-8">
          <div className="rounded-xl backdrop-blur-lg bg-card/70 p-6 border border-border/30 shadow-lg">
            <h3 className="font-medium text-xl mb-3">Privacy Promise</h3>
            <p className="text-muted-foreground">
              Everything you write stays private — only on your device. No accounts, no cloud storage, just your thoughts.
            </p>
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <MotionSection delay={0.5}>
        <footer className="border-t py-8 md:py-12 bg-background/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Shadow Self Journal. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/journal" className="text-foreground hover:text-primary transition-colors">Journal</Link>
                <Link to="/mood" className="text-foreground hover:text-primary transition-colors">Mood</Link>
                <Link to="/stats" className="text-foreground hover:text-primary transition-colors">Stats</Link>
              </div>
            </div>
          </div>
        </footer>
      </MotionSection>
    </div>
  );
};

export default Index;
