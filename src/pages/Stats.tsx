
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
import MotionSection from "@/components/MotionSection";
import { motion } from "framer-motion";

const moods: Record<Mood, { emoji: string, label: string }> = {
  angry: { emoji: "😡", label: "Angry" },
  sad: { emoji: "😢", label: "Sad" },
  neutral: { emoji: "😐", label: "Neutral" },
  happy: { emoji: "😊", label: "Happy" },
  excited: { emoji: "🤩", label: "Excited" },
  joyful: { emoji: "😄", label: "Joyful" },
  content: { emoji: "😌", label: "Content" },
  anxious: { emoji: "😰", label: "Anxious" },
  overwhelmed: { emoji: "😵", label: "Overwhelmed" }
};

const moodColors: Record<Mood, string> = {
  angry: "#ef4444",
  sad: "#3b82f6", 
  neutral: "#9ca3af",
  happy: "#22c55e",
  excited: "#a855f7",
  joyful: "#f59e0b",
  content: "#06b6d4",
  anxious: "#7c3aed", 
  overwhelmed: "#e11d48"
};

const moodScore: Record<Mood, number> = {
  angry: 1,
  sad: 2,
  neutral: 3,
  happy: 4,
  excited: 5,
  joyful: 5,
  content: 4,
  anxious: 2,
  overwhelmed: 1
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
    const distribution = Object.keys(moods).reduce((acc, mood) => {
      acc[mood as Mood] = 0;
      return acc;
    }, {} as Record<Mood, number>);
    
    currentMonthEntries.forEach(entry => {
      distribution[entry.mood]++;
    });
    
    return Object.entries(distribution).map(([mood, count]) => ({
      name: moods[mood as Mood].label,
      value: count,
      mood
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
    <div className="space-y-10 py-10">
      <MotionSection>
        <h1 className="text-3xl font-bold text-center mb-6">Your Stats</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-lg border backdrop-blur-sm bg-card/80 p-4 text-center shadow-md"
          >
            <h3 className="text-lg font-medium mb-1">Journal Entries</h3>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">{journalEntryCount}</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-lg border backdrop-blur-sm bg-card/80 p-4 text-center shadow-md"
          >
            <h3 className="text-lg font-medium mb-1">Mood Entries</h3>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">{moodEntries.length}</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-lg border backdrop-blur-sm bg-card/80 p-4 text-center shadow-md"
          >
            <h3 className="text-lg font-medium mb-1">Current Streak</h3>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">{currentStreak} days</p>
          </motion.div>
        </div>
      </MotionSection>

      <MotionSection delay={0.1}>
        <div className="border rounded-lg p-6 backdrop-blur-sm bg-card/80 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium">Monthly Mood Trend</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={previousMonth} className="backdrop-blur-sm bg-background/80">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-24 text-center font-medium">
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
                className="backdrop-blur-sm bg-background/80"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodTrendData}
                margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  style={{ fontSize: '0.8rem' }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  tickFormatter={(value) => {
                    const moodKeys = Object.keys(moodScore) as Mood[];
                    const mood = moodKeys.find(key => moodScore[key] === value);
                    const moodObj = mood ? moods[mood] : null;
                    return moodObj ? moodObj.emoji : '';
                  }}
                  style={{ fontSize: '1rem' }}
                />
                <Tooltip
                  formatter={(value, name, props) => {
                    const { mood } = props.payload;
                    return mood ? [`${moods[mood as Mood].label} (${value})`, 'Mood'] : ['No entry', 'Mood'];
                  }}
                  labelFormatter={(label) => `Day ${label}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
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
                        r={5} 
                        fill={moodColors[payload.mood as Mood]}
                        stroke="white"
                        strokeWidth={1}
                      />
                    );
                  }}
                  activeDot={{ r: 8, fill: "#8884d8", stroke: "white", strokeWidth: 2 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MotionSection>

      <div className="grid md:grid-cols-2 gap-8">
        <MotionSection delay={0.2}>
          <div className="border rounded-lg p-6 backdrop-blur-sm bg-card/80 shadow-lg h-full">
            <h3 className="text-xl font-medium mb-6">Mood Distribution</h3>
            {moodDistribution.every(item => item.value === 0) ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-center text-muted-foreground py-8">
                  No mood data for {format(currentMonth, "MMMM")}
                </p>
              </div>
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
                      innerRadius={30}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => 
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      animationBegin={400}
                      animationDuration={800}
                    >
                      {moodDistribution.map((entry) => (
                        <Cell 
                          key={entry.mood} 
                          fill={moodColors[entry.mood as Mood]} 
                          stroke="white"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip 
                      formatter={(value) => [`${value} entries`, 'Count']}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </MotionSection>

        <MotionSection delay={0.3}>
          <div className="border rounded-lg p-6 backdrop-blur-sm bg-card/80 shadow-lg h-full">
            <h3 className="text-xl font-medium mb-6">Trending Tags</h3>
            {trendingTags.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-center text-muted-foreground py-8">
                  No tags for {format(currentMonth, "MMMM")}
                </p>
              </div>
            ) : (
              <ul className="space-y-4 mt-6">
                {trendingTags.map(({ tag, count }, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-center justify-between p-3 border-b last:border-0"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="font-medium">{tag}</span>
                    <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                      {count} entries
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </MotionSection>
      </div>
    </div>
  );
};

export default Stats;
