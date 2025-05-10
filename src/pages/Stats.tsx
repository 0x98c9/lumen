
import { useState, useEffect, useMemo } from "react";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameMonth,
  getMonth,
  getYear,
  isSameDay
} from "date-fns";
import { 
  getAllMoodEntries, 
  getAllJournalEntries,
  MoodEntry,
  Mood
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const moods: Record<Mood, { emoji: string, label: string }> = {
  angry: { emoji: "😡", label: "Angry" },
  sad: { emoji: "😢", label: "Sad" },
  neutral: { emoji: "😐", label: "Neutral" },
  happy: { emoji: "😊", label: "Happy" },
  excited: { emoji: "🤩", label: "Excited" }
};

const moodColors: Record<Mood, string> = {
  angry: "#ef4444",
  sad: "#3b82f6", 
  neutral: "#9ca3af",
  happy: "#22c55e",
  excited: "#a855f7"
};

const moodScore: Record<Mood, number> = {
  angry: 1,
  sad: 2,
  neutral: 3,
  happy: 4,
  excited: 5
};

const Stats = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  useEffect(() => {
    setMoodEntries(getAllMoodEntries());
  }, []);
  
  const journalEntryCount = useMemo(() => {
    return getAllJournalEntries().length;
  }, []);

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Filter entries for the current month
  const currentMonthEntries = useMemo(() => {
    return moodEntries.filter(entry => {
      const date = parseISO(entry.date);
      return isSameMonth(date, currentMonth);
    });
  }, [moodEntries, currentMonth]);

  // Calculate mood distribution
  const moodDistribution = useMemo(() => {
    const distribution = {
      angry: 0,
      sad: 0,
      neutral: 0,
      happy: 0,
      excited: 0
    };
    
    currentMonthEntries.forEach(entry => {
      distribution[entry.mood]++;
    });
    
    return Object.entries(distribution).map(([mood, count]) => ({
      name: moods[mood as Mood].label,
      value: count,
      mood: mood
    }));
  }, [currentMonthEntries]);

  // Calculate trending tags
  const trendingTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    currentMonthEntries.forEach(entry => {
      entry.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));
  }, [currentMonthEntries]);

  // Prepare data for line chart
  const moodTrendData = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => {
      const dateStr = format(day, "yyyy-MM-dd");
      const entry = moodEntries.find(e => e.date === dateStr);
      
      return {
        date: format(day, "d"),
        value: entry ? moodScore[entry.mood] : null,
        mood: entry?.mood || null
      };
    });
  }, [moodEntries, currentMonth]);

  // Calculate streak
  const currentStreak = useMemo(() => {
    let streak = 0;
    let date = new Date();
    
    while (true) {
      const dateStr = format(date, "yyyy-MM-dd");
      const hasEntry = moodEntries.some(entry => entry.date === dateStr);
      
      if (!hasEntry) break;
      
      streak++;
      date.setDate(date.getDate() - 1);
    }
    
    return streak;
  }, [moodEntries]);

  return (
    <div className="space-y-8 py-6">
      <h1 className="text-2xl font-bold">Your Stats</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 text-center">
          <h3 className="text-lg font-medium">Journal Entries</h3>
          <p className="text-3xl font-bold">{journalEntryCount}</p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 text-center">
          <h3 className="text-lg font-medium">Mood Entries</h3>
          <p className="text-3xl font-bold">{moodEntries.length}</p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 text-center">
          <h3 className="text-lg font-medium">Current Streak</h3>
          <p className="text-3xl font-bold">{currentStreak} days</p>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Monthly Mood Trend</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextMonth}
              disabled={
                getMonth(currentMonth) === getMonth(new Date()) &&
                getYear(currentMonth) === getYear(new Date())
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={moodTrendData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
              />
              <YAxis 
                domain={[1, 5]} 
                ticks={[1, 2, 3, 4, 5]} 
                tickFormatter={(value) => {
                  const moodKeys = Object.keys(moodScore) as Mood[];
                  const mood = moodKeys.find(key => moodScore[key] === value);
                  return mood ? moods[mood].emoji : '';
                }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const { mood } = props.payload;
                  return mood ? [`${moods[mood].label} (${value})`, 'Mood'] : ['No entry', 'Mood'];
                }}
                labelFormatter={(label) => `Day ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (!payload.mood) return null;
                  
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill={moodColors[payload.mood]}
                      stroke="none"
                    />
                  );
                }}
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Mood Distribution</h3>
          {moodDistribution.every(item => item.value === 0) ? (
            <p className="text-center text-muted-foreground py-8">
              No mood data for {format(currentMonth, "MMMM")}
            </p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodDistribution.filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {moodDistribution.map((entry) => (
                      <Cell 
                        key={entry.mood} 
                        fill={moodColors[entry.mood as Mood]} 
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Trending Tags</h3>
          {trendingTags.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tags for {format(currentMonth, "MMMM")}
            </p>
          ) : (
            <ul className="space-y-2">
              {trendingTags.map(({ tag, count }, idx) => (
                <li key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <span>{tag}</span>
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                    {count} entries
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
