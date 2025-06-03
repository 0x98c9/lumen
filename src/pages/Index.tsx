
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
  Users,
  Sparkles,
  ArrowRight,
  Star,
  Lightbulb
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MotionSection from "@/components/MotionSection";
import StaggeredContainer, { StaggeredItem } from "@/components/StaggeredContainer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="space-y-12 py-6 overflow-hidden">
      {/* Hero Section */}
      <MotionSection>
        <section className="py-16 md:py-24 text-center relative hero-gradient">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute top-20 left-[15%] h-12 w-12 rounded-full bg-primary/20 backdrop-blur-md pulse-slow"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-[20%] h-16 w-16 rounded-full bg-accent/20 backdrop-blur-md pulse-slow"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut"
            }}
          />
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-10 text-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Your personal reflection space</span>
                </div>
                
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-white md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-accent-foreground">Lumen</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                  Your private space for reflection and emotional well-being, with no accounts or cloud storage.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-base px-6">
                  <Link to="/journal/new" className="flex items-center gap-2">
                    Start Writing
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-background/80 border border-border/50 shadow-md hover:shadow-lg text-base px-6">
                  <Link to="/mood" className="flex items-center gap-2">
                    Track Mood
                    <Heart className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
              
              {/* Stats/highlights */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm bg-card/30 border border-border/30">
                  <h3 className="text-3xl font-bold text-primary">100%</h3>
                  <p className="text-sm text-muted-foreground">Private & Secure</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm bg-card/30 border border-border/30">
                  <h3 className="text-3xl font-bold text-primary">Local</h3>
                  <p className="text-sm text-muted-foreground">Data Storage</p>
                </div>
                <div className="hidden md:flex flex-col items-center p-4 rounded-xl backdrop-blur-sm bg-card/30 border border-border/30">
                  <h3 className="text-3xl font-bold text-primary">Free</h3>
                  <p className="text-sm text-muted-foreground">Forever</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </MotionSection>

      {/* Feature Cards Section */}
      <MotionSection delay={0.1}>
        <section className="container px-4 md:px-6 relative">
          {/* Background accent */}
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl pointer-events-none"></div>
          
          <div className="mb-10 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 mb-4">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Designed for you</span>
            </div>
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Core Features</h2>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
              Everything you need for personal reflection and growth, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-md bg-card/90 border border-border/50 shadow-lg hover:shadow-xl transition-all overflow-hidden relative">
                {/* Accent border */}
                <div className="absolute inset-0 border-t-4 border-primary/50 rounded-t-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    Journal
                  </CardTitle>
                  <CardDescription className="text-base">Write about your day's experiences</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-base">Record your thoughts, experiences, and reflections in a private space that stays on your device. Organize with tags and search through your entries with ease.</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-accent-foreground/80">Rich Text Editor</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-accent-foreground/80">Tag Support</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-accent-foreground/80">Search</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full sm:w-auto">
                    <Link to="/journal/new" className="flex items-center justify-center gap-2">
                      Write New Entry
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-md bg-card/90 border border-border/50 shadow-lg hover:shadow-xl transition-all overflow-hidden relative">
                {/* Accent border */}
                <div className="absolute inset-0 border-t-4 border-accent/50 rounded-t-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <CalendarCheck className="h-6 w-6 text-accent" />
                    </div>
                    Mood Tracker
                  </CardTitle>
                  <CardDescription className="text-base">Track your emotional journey</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-base">Record your daily mood and see patterns over time to better understand your emotional well-being. Add notes to provide context for your feelings.</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent-foreground/80">Daily Tracking</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent-foreground/80">Mood Patterns</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent-foreground/80">Insights</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground transition-all w-full sm:w-auto">
                    <Link to="/mood" className="flex items-center justify-center gap-2">
                      Track Today's Mood
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>
      </MotionSection>

      {/* Tools Section */}
      <MotionSection delay={0.2}>
        <section className="container px-4 md:px-6 py-16 my-8 rounded-3xl bg-gradient-to-br from-accent/20 via-background to-primary/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <motion.div 
            className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="mb-10 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Powerful yet simple</span>
            </div>
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Thoughtful Tools</h2>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
              Simple yet effective tools designed to enhance your self-reflection journey
            </p>
          </div>

          <StaggeredContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StaggeredItem>
              <motion.div 
                className="flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Pencil className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-medium mb-3 text-xl">Daily Writing</h3>
                <p className="text-muted-foreground">Capture your thoughts and feelings with our distraction-free writing interface.</p>
                <div className="mt-4 pt-4 border-t border-border/30 w-full">
                  <Link to="/journal" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center gap-1">
                    Try it now <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </StaggeredItem>
            
            <StaggeredItem>
              <motion.div 
                className="flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Heart className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-medium mb-3 text-xl">Emotional Tracking</h3>
                <p className="text-muted-foreground">Monitor your moods and identify patterns to improve emotional awareness.</p>
                <div className="mt-4 pt-4 border-t border-border/30 w-full">
                  <Link to="/mood" className="text-white hover:text-white/80 text-sm font-medium flex items-center justify-center gap-1">
                    Track now <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </StaggeredItem>
            
            <StaggeredItem>
              <motion.div 
                className="flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Search className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-medium mb-3 text-xl">Self Discovery</h3>
                <p className="text-muted-foreground">Gain insights from your journal entries and mood patterns over time.</p>
                <div className="mt-4 pt-4 border-t border-border/30 w-full">
                  <Link to="/stats" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center gap-1">
                    View insights <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </StaggeredItem>
            
            <StaggeredItem>
              <motion.div 
                className="flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 shadow-md hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Lock className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-medium mb-3 text-xl">Complete Privacy</h3>
                <p className="text-muted-foreground">All your data stays on your device. No servers, no sharing, no tracking.</p>
                <div className="mt-4 pt-4 border-t border-border/30 w-full">
                  <span className="text-white hover:text-white/80 text-sm font-medium flex items-center justify-center gap-1">
                    Built-in by design
                  </span>
                </div>
              </motion.div>
            </StaggeredItem>
          </StaggeredContainer>
        </section>
      </MotionSection>

      {/* Testimonial Section */}
      <MotionSection delay={0.3}>
        <section className="container px-4 md:px-6 py-16">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 mb-4">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">What people are saying</span>
            </div>
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Testimonials</h2>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
              Hear from people who have transformed their self-reflection practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-8 shadow-lg hover:shadow-xl transition-all h-full relative"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl text-primary">"</span>
              </div>
              <p className="text-lg mb-6 pt-4 italic">
                Lumen has helped me become more mindful of my emotions and thought patterns. The privacy-first approach means I can be completely honest.
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold">AJ</span>
                </div>
                <div>
                  <h4 className="font-medium">Alex Johnson</h4>
                  <p className="text-sm text-muted-foreground">Mindfulness Practitioner</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-8 shadow-lg hover:shadow-xl transition-all h-full relative"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl text-accent">"</span>
              </div>
              <p className="text-lg mb-6 pt-4 italic">
                I've tried many journaling apps, but this is the first one that truly respects my privacy while offering all the features I need for meaningful reflection.
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-bold">SR</span>
                </div>
                <div>
                  <h4 className="font-medium">Sarah Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Privacy Advocate</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-8 shadow-lg hover:shadow-xl transition-all h-full relative"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl text-primary">"</span>
              </div>
              <p className="text-lg mb-6 pt-4 italic">
                The mood tracking feature has been eye-opening. I can now see patterns in my emotional state that I never noticed before. Game-changer!
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold">MT</span>
                </div>
                <div>
                  <h4 className="font-medium">Michael Torres</h4>
                  <p className="text-sm text-muted-foreground">Mental Health Advocate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </MotionSection>

      {/* Who Is This For Section */}
      <MotionSection delay={0.4}>
        <section className="container px-4 md:px-6 py-16 relative">
          {/* Background accent */}
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl pointer-events-none"></div>
          
          <div className="mb-10 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Made for you</span>
            </div>
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Who Is This For?</h2>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
              Perfect for anyone looking to improve self-awareness and emotional intelligence
            </p>
          </div>

          <StaggeredContainer className="grid md:grid-cols-3 gap-8 relative z-10">
            <StaggeredItem>
              <motion.div 
                className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-8 shadow-lg hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex flex-col items-center text-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-2xl">Self-Growth Enthusiasts</h3>
                </div>
                <p className="text-muted-foreground text-center">
                  People who actively work on personal development and emotional intelligence through regular reflection and introspection.
                </p>
                <div className="mt-6 pt-6 border-t border-border/30 flex justify-center">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to="/journal" className="flex items-center gap-2">
                      Start your journey
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </StaggeredItem>
            
            <StaggeredItem>
              <motion.div 
                className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-8 shadow-lg hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex flex-col items-center text-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-medium text-2xl">Privacy-Conscious Users</h3>
                </div>
                <p className="text-muted-foreground text-center">
                  Those who want to journal but are concerned about the privacy implications of cloud-based services and data collection.
                </p>
                <div className="mt-6 pt-6 border-t border-border/30 flex justify-center">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to="/journal/new" className="flex items-center gap-2">
                      Experience privacy
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </StaggeredItem>
            
            <StaggeredItem>
              <motion.div 
                className="rounded-xl backdrop-blur-sm bg-card/80 border border-border/30 p-8 shadow-lg hover:shadow-xl transition-all h-full"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex flex-col items-center text-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/5 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-2xl">Mental Wellness Seekers</h3>
                </div>
                <p className="text-muted-foreground text-center">
                  Individuals looking to improve their mental well-being through consistent journaling and mood tracking practices.
                </p>
                <div className="mt-6 pt-6 border-t border-border/30 flex justify-center">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to="/mood" className="flex items-center gap-2">
                      Track your mood
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </StaggeredItem>
          </StaggeredContainer>
        </section>
      </MotionSection>
      
      {/* Privacy Promise Section */}
      <MotionSection delay={0.5}>
        <div className="container px-4 md:px-6 py-12">
          <div className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-card/90 via-card/70 to-card/90 p-8 md:p-12 border border-border/30 shadow-xl relative overflow-hidden card-highlight">
            {/* Background elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl pulse-slow"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl pulse-slow"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:max-w-[60%]">
                <h3 className="font-bold text-2xl md:text-3xl mb-4">Our Privacy Promise</h3>
                <p className="text-muted-foreground text-lg">
                  Everything you write stays private — only on your device. No accounts, no cloud storage, no tracking, just your thoughts in a secure space.
                </p>
              </div>
              <div>
                <Button asChild size="default" className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-xl px-6">
                  <Link to="/journal" className="flex items-center gap-2">
                    Start Writing Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
      
      {/* Final CTA Section */}
      <MotionSection delay={0.6}>
        <section className="container px-4 md:px-6 py-20 md:py-32 text-center relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
          
          <motion.div 
            className="max-w-3xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Begin Your Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Take the first step toward better self-understanding and emotional well-being with Lumen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-base px-6">
                <Link to="/journal" className="flex items-center gap-2">
                  Start Journaling
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-background/80 border border-border/50 shadow-md hover:shadow-lg text-base px-6">
                <Link to="/mood" className="flex items-center gap-2">
                  Track Your Mood
                  <Heart className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </MotionSection>
    </div>
  );
};

export default Index;
