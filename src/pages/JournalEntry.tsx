
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  getJournalEntryById, 
  saveJournalEntry, 
  generateId, 
  JournalEntry as JournalEntryType 
} from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const JournalEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewEntry = !id || id === "new";
  
  const [entry, setEntry] = useState<JournalEntryType>({
    id: isNewEntry ? generateId() : id as string,
    date: format(new Date(), "yyyy-MM-dd"),
    title: "",
    content: "",
    tags: []
  });
  
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    if (!isNewEntry) {
      const existingEntry = getJournalEntryById(id as string);
      if (existingEntry) {
        setEntry(existingEntry);
      } else {
        navigate("/journal");
        toast({
          title: "Entry not found",
          description: "The journal entry you're looking for doesn't exist.",
          variant: "destructive"
        });
      }
    }
  }, [id, isNewEntry, navigate, toast]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!entry.content.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something before saving.",
        variant: "destructive"
      });
      return;
    }
    
    saveJournalEntry(entry);
    toast({
      title: isNewEntry ? "Entry created" : "Entry updated",
      description: "Your journal entry has been saved.",
    });
    navigate("/journal");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !entry.tags?.includes(tagInput.trim())) {
      setEntry({
        ...entry,
        tags: [...(entry.tags || []), tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEntry({
      ...entry,
      tags: entry.tags?.filter(t => t !== tag)
    });
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/journal")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {isNewEntry ? "New Journal Entry" : "Edit Journal Entry"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title (optional)"
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          className="text-xl font-medium"
        />
        
        <div className="border rounded-md">
          <Textarea
            placeholder="Write your thoughts here..."
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            className="journal-textarea min-h-[300px]"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a tag (e.g., Gratitude, Goals, Dreams)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddTag}
            >
              Add
            </Button>
          </div>
          
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {entry.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center text-sm px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-4">
          <Button type="submit">Save Entry</Button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntry;
