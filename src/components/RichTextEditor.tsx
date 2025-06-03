import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

const RichTextEditor = ({ content, onChange, className }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
            ['undo', 'redo'], // Custom, will be handled below
          ],
          history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true,
          },
        }
      });
      quillRef.current.on('text-change', () => {
        onChange(quillRef.current!.root.innerHTML);
      });
      // Set initial content
      quillRef.current.root.innerHTML = content;
    }
    // Update content if prop changes
    if (quillRef.current && quillRef.current.root.innerHTML !== content) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content, onChange]);

  // Add undo/redo handlers
  useEffect(() => {
    if (!quillRef.current) return;
    const quill = quillRef.current;
    // Quill's toolbar module type is not known, so we cast it
    const toolbar = quill.getModule('toolbar') as any;
    if (toolbar && typeof toolbar.addHandler === 'function') {
      toolbar.addHandler('undo', () => {
        quill.history.undo();
      });
      toolbar.addHandler('redo', () => {
        quill.history.redo();
      });
    }
  }, []);

  return (
    <div className={`border rounded-md flex flex-col ${className}`}>
      <div
        ref={editorRef}
        style={{ minHeight: 250, background: 'white', fontFamily: 'inherit', fontSize: '1rem' }}
      />
    </div>
  );
};

export default RichTextEditor;
