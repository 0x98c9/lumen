import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getMoodEntries, saveMoodEntry } from "@/lib/storage";
import { useIsMobile } from "@/hooks/use-mobile";

// Mood types and their corresponding colors
const moods = [
  { name: "Joyful", color: "bg-green-500", textColor: "text-white" },
  { name: "Happy", color: "bg-green-400", textColor: "text-white" },
  { name: "Content", color: "bg-green-300", textColor: "text-black" },
  { name: "Neutral", color: "bg-gray-300", textColor: "text-black" },
  { name: "Sad", color: "bg-blue-300", textColor: "text-black" },
  { name: "Anxious", color: "bg-yellow-300", textColor: "text-black" },
  { name: "Angry", color: "bg-red-400", textColor: "text-white" },
  { name: "Overwhelmed", color: "bg-purple-400", textColor: "text-white" },
];

// Activities that might affect mood
const activities = [
  { id: "exercise", label: "Exercise" },
  { id: "meditation", label: "Meditation" },
  { id: "goodSleep", label: "Good Sleep" },
  { id: "poorSleep", label: "Poor Sleep" },
  { id: "socializing", label: "Socializing" },
  { id: "nature", label: "Time in Nature" },
  { id: "work", label: "Work Stress" },
  { id: "reading", label: "Reading" },
];

const MoodTracker = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [moodEntries, setMoodEntries] = useState(() => getMoodEntries());
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Function to handle activity selection
  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Function to save the mood entry
  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Mood Required",
        description: "Please select a mood before saving.",
        variant: "destructive",
      });
      return;
    }

    const entry = {
      id: `mood-${Date.now()}`,
      date: date.toISOString(),
      mood: selectedMood,
      activities: selectedActivities,
      notes,
    };

    // Save to local storage
    const updatedEntries = saveMoodEntry(entry);
    setMoodEntries(updatedEntries);

    // Reset form
    setSelectedMood(null);
    setSelectedActivities([]);
    setNotes("");

    toast({
      title: "Mood Saved",
      description: `Your mood for ${format(date, "MMMM d, yyyy")} has been saved.`,
    });
  };

  // Function to check if a date has a mood entry
  const hasMoodEntry = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return moodEntries.some((entry) => {
      const entryDate = new Date(entry.date);
      return format(entryDate, "yyyy-MM-dd") === dateStr;
    });
  };

  // Function to get the mood for a specific date
  const getMoodForDate = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const entry = moodEntries.find((entry) => {
      const entryDate = new Date(entry.date);
      return format(entryDate, "yyyy-MM-dd") === dateStr;
    });
    return entry ? entry.mood : null;
  };

  // Custom day rendering for the calendar
  const renderDay = (day: Date) => {
    const mood = getMoodForDate(day);
    const moodInfo = moods.find((m) => m.name === mood);

    if (!mood) return null;

    return (
      <div
        className={`h-2 w-2 rounded-full ${moodInfo?.color || "bg-gray-300"}`}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mood Tracker</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsInfoOpen(!isInfoOpen)}
        >
          <Info className="h-4 w-4 mr-1" />
          <span className="sr-only md:not-sr-only">About Mood Tracking</span>
        </Button>
      </div>

      <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <CollapsibleContent className="bg-muted/50 p-4 rounded-lg text-sm space-y-2 mb-4">
          <p>
            <strong>Why track your mood?</strong> Regular mood tracking can help
            you identify patterns in your emotional well-being and understand
            what factors might be influencing how you feel.
          </p>
          <p>
            <strong>How to use:</strong> Select a date, choose your mood, check
            any relevant activities, add optional notes, and save. Your entries
            are stored only on your device.
          </p>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-2">
              {isInfoOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Hide Info
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> Show More
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </CollapsibleContent>
      </Collapsible>

      <Tabs defaultValue="record">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="record">Record Mood</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>
                Select the date and mood you want to record
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  components={{
                    DayContent: (props) => (
                      <div className="relative flex h-full w-full items-center justify-center p-0">
                        <div>{props.day}</div>
                        {renderDay(props.date)}
                      </div>
                    ),
                  }}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Select your mood:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.name}
                      className={`${mood.color} ${
                        mood.textColor
                      } p-3 rounded-md text-center transition-all ${
                        selectedMood === mood.name
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      }`}
                      onClick={() => setSelectedMood(mood.name)}
                    >
                      {mood.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Activities today:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={activity.id}
                        checked={selectedActivities.includes(activity.id)}
                        onCheckedChange={() => toggleActivity(activity.id)}
                      />
                      <label
                        htmlFor={activity.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {activity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Notes (optional):</h3>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Add any additional thoughts about your day..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveMood} className="w-full">
                Save Mood Entry
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Mood Calendar</CardTitle>
              <CardDescription>
                View your mood patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  components={{
                    DayContent: (props) => (
                      <div className="relative flex h-full w-full items-center justify-center p-0">
                        <div>{props.day}</div>
                        {renderDay(props.date)}
                      </div>
                    ),
                  }}
                />
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Mood Legend:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {moods.map((mood) => (
                    <div
                      key={mood.name}
                      className="flex items-center space-x-2"
                    >
                      <div
                        className={`h-3 w-3 rounded-full ${mood.color}`}
                      ></div>
                      <span className="text-sm">{mood.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodTracker;
