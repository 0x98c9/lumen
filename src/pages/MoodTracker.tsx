
import { useState, useEffect } from "react";
import { format, parseISO, startOfToday, isToday, isThisWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  saveMoodEntry, 
  getAllMoodEntries, 
  generateId, 
  MoodEntry,
  Mood
} from "@/lib/storage";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const moods: Record<Mood, { emoji: string, label: string }> = {
  angry: { emoji: "😡", label: "Angry" },
  sad: { emoji: "😢", label: "Sad" },
  neutral: { emoji: "😐", label: "Neutral" },
  happy: { emoji: "😊", label: "Happy" },
  excited: { emoji: "🤩", label: "Excited" }
};

const tags = [
  "Work", "Health", "Family", "Friends", "Exercise", 
  "Food", "Sleep", "Social", "Learning", "Relaxation"
];

const MoodTracker = () => {
  const { toast } = useToast();
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  
  const [currentEntry, setCurrentEntry] = useState<MoodEntry>({
    id: generateId(),
    date: format(selectedDate, "yyyy-MM-dd"),
    mood: "neutral",
    notes: "",
    tags: []
  });

  // Load all entries on component mount
  useEffect(() => {
    const loadEntries = () => {
      const allEntries = getAllMoodEntries();
      setEntries(allEntries);
      
      // Find entry for selected date if it exists
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const existingEntry = allEntries.find(entry => entry.date === dateStr);
      
      if (existingEntry) {
        setCurrentEntry(existingEntry);
      } else {
        // Initialize new entry for selected date
        setCurrentEntry({
          id: generateId(),
          date: dateStr,
          mood: "neutral",
          notes: "",
          tags: []
        });
      }
    };
    
    loadEntries();
  }, [selectedDate]);

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setCurrentEntry({ ...currentEntry, mood });
  };

  const handleTagToggle = (tag: string) => {
    if (currentEntry.tags?.includes(tag)) {
      setCurrentEntry({
        ...currentEntry,
        tags: currentEntry.tags.filter(t => t !== tag)
      });
    } else {
      setCurrentEntry({
        ...currentEntry,
        tags: [...(currentEntry.tags || []), tag]
      });
    }
  };

  const handleSave = () => {
    saveMoodEntry(currentEntry);
    
    // Update local entries list
    const updatedEntries = entries.filter(e => e.id !== currentEntry.id);
    updatedEntries.push(currentEntry);
    setEntries(updatedEntries);
    
    toast({
      title: "Mood saved",
      description: `Your ${moods[currentEntry.mood].label} mood has been recorded.`,
    });
  };

  // Generate dots for the calendar
  const getDayClassNames = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const entry = entries.find(entry => entry.date === dateStr);
    
    if (!entry) return "";
    
    const moodColors: Record<Mood, string> = {
      angry: "bg-red-500",
      sad: "bg-blue-500",
      neutral: "bg-gray-500",
      happy: "bg-green-500",
      excited: "bg-purple-500"
    };
    
    return `after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full ${moodColors[entry.mood]}`;
  };

  // Get week summary
  const weekEntries = entries.filter(entry => {
    const date = parseISO(entry.date);
    return isThisWeek(date);
  });

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-bold">Mood Tracker</h1>

      <Tabs defaultValue="today">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today's Mood</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-4 pt-4">
          <div className="text-center mb-6">
            <p className="text-lg font-medium">
              {isToday(selectedDate) 
                ? "How are you feeling today?" 
                : `Mood for ${format(selectedDate, "MMMM d, yyyy")}`}
            </p>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(moods).map(([key, { emoji, label }]) => (
              <button
                key={key}
                onClick={() => handleMoodSelect(key as Mood)}
                className={`p-4 rounded-lg text-center transition-all ${
                  currentEntry.mood === key 
                    ? "bg-primary/10 ring-2 ring-primary" 
                    : "bg-card hover:bg-primary/5"
                }`}
              >
                <span className="text-4xl block mb-2">{emoji}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (optional)</label>
            <Textarea
              placeholder="What influenced your mood today?"
              value={currentEntry.notes || ""}
              onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (optional)</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    currentEntry.tags?.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <Button onClick={handleSave} className="w-full">Save Mood</Button>
        </TabsContent>
        
        <TabsContent value="calendar" className="pt-4">
          <div className="mx-auto max-w-sm">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
              className="rounded-md border"
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
              }}
              modifiers={{
                today: today,
              }}
              classNames={{
                day_today: "font-bold border border-primary",
                day: (date) => getDayClassNames(date),
              }}
            />
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">This Week's Moods</h3>
            {weekEntries.length === 0 ? (
              <p className="text-center text-muted-foreground">No mood entries recorded this week</p>
            ) : (
              <div className="space-y-2">
                {weekEntries.map(entry => (
                  <div 
                    key={entry.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDate(parseISO(entry.date))}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{moods[entry.mood].emoji}</span>
                      <div>
                        <div className="font-medium">{format(parseISO(entry.date), "EEEE")}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(parseISO(entry.date), "MMMM d")}
                        </div>
                      </div>
                    </div>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex gap-1">
                        {entry.tags.slice(0, 2).map((tag, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-0.5 rounded-full bg-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                        {entry.tags.length > 2 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                            +{entry.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodTracker;
