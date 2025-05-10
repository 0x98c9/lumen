
import { format } from "date-fns";

export type Mood = "angry" | "sad" | "neutral" | "happy" | "excited";

export type MoodEntry = {
  id: string;
  date: string;
  mood: Mood;
  notes?: string;
  tags?: string[];
};

export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  tags?: string[];
};

// Initialize localStorage with default data if none exists
export function setupLocalStorage() {
  if (!localStorage.getItem("journal-entries")) {
    localStorage.setItem("journal-entries", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("mood-entries")) {
    localStorage.setItem("mood-entries", JSON.stringify([]));
  }
}

// Journal Entries
export function getAllJournalEntries(): JournalEntry[] {
  const entries = localStorage.getItem("journal-entries");
  return entries ? JSON.parse(entries) : [];
}

export function getJournalEntryById(id: string): JournalEntry | undefined {
  const entries = getAllJournalEntries();
  return entries.find(entry => entry.id === id);
}

export function saveJournalEntry(entry: JournalEntry): void {
  const entries = getAllJournalEntries();
  const existingEntryIndex = entries.findIndex(e => e.id === entry.id);
  
  if (existingEntryIndex >= 0) {
    // Update existing entry
    entries[existingEntryIndex] = entry;
  } else {
    // Add new entry
    entries.push(entry);
  }
  
  localStorage.setItem("journal-entries", JSON.stringify(entries));
}

export function deleteJournalEntry(id: string): void {
  const entries = getAllJournalEntries();
  const updatedEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
}

// Mood Entries
export function getAllMoodEntries(): MoodEntry[] {
  const entries = localStorage.getItem("mood-entries");
  return entries ? JSON.parse(entries) : [];
}

export function getMoodEntryById(id: string): MoodEntry | undefined {
  const entries = getAllMoodEntries();
  return entries.find(entry => entry.id === id);
}

export function getMoodEntryByDate(date: Date): MoodEntry | undefined {
  const dateStr = format(date, 'yyyy-MM-dd');
  const entries = getAllMoodEntries();
  return entries.find(entry => entry.date === dateStr);
}

export function saveMoodEntry(entry: MoodEntry): void {
  const entries = getAllMoodEntries();
  const existingEntryIndex = entries.findIndex(e => e.id === entry.id);
  
  if (existingEntryIndex >= 0) {
    // Update existing entry
    entries[existingEntryIndex] = entry;
  } else {
    // Add new entry
    entries.push(entry);
  }
  
  localStorage.setItem("mood-entries", JSON.stringify(entries));
}

export function deleteMoodEntry(id: string): void {
  const entries = getAllMoodEntries();
  const updatedEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem("mood-entries", JSON.stringify(updatedEntries));
}

// Helper functions
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
