import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { getAllJournalEntries, deleteJournalEntry, JournalEntry } from "@/lib/storage";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadEntries = () => {
      const allEntries = getAllJournalEntries();
      // Sort by date descending (newest first)
      allEntries.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(allEntries);
    };
    
    loadEntries();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      deleteJournalEntry(id);
      setEntries(entries.filter(entry => entry.id !== id));
      toast({
        title: "Entry deleted",
        description: "Your journal entry has been deleted.",
      });
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Journal Entries</h1>
        <Button asChild>
          <Link to="/journal/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Entry
          </Link>
        </Button>
      </div>

      {entries.length === 0 ? (
        <Alert>
          <AlertDescription>
            You haven't written any journal entries yet. Start by creating your first entry!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-card">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{entry.title || "Untitled Entry"}</h2>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(entry.date), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/journal/${entry.id}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-muted-foreground text-sm line-clamp-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: entry.content }} />
              </div>
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {entry.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
