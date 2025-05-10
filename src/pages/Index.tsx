
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to Your Journal</h1>
        <p className="text-muted-foreground">
          Your private space for reflection and emotional growth
        </p>
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

      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Privacy Promise</h3>
        <p className="text-sm text-muted-foreground">
          Everything you write stays private — only on your device. No accounts, no cloud storage, just your thoughts.
        </p>
      </div>
    </div>
  );
};

export default Index;
