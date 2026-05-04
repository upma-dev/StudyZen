"use client";

import { useState } from 'react';
import type { Note } from '@/lib/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { NoteList } from '@/components/notes/NoteList';
import { NoteEditor } from '@/components/notes/NoteEditor';

export default function NotesPage() {
  const { user, loading } = useAuth();
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleCreateNewNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleSaveNote = (noteToSave: Pick<Note, 'title' | 'content'>) => {
    if (selectedNote) {
      // Update existing note
      setNotes(
        notes.map((n) =>
          n.id === selectedNote.id
            ? { ...selectedNote, ...noteToSave, updatedAt: new Date() }
            : n
        )
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteToSave,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]); // Add new note to the beginning
    }
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((n) => n.id !== noteId));
    if (selectedNote?.id === noteId) {
      setIsEditorOpen(false);
      setSelectedNote(null);
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedNote(null);
  }

return (
    <div className="flex flex-1 flex-col gap-6 min-h-0 w-full min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary">Your Study Notes</h2>
        <Button onClick={handleCreateNewNote} className="bg-primary hover:bg-primary/80 text-primary-foreground w-full sm:w-auto shrink-0">
          <PlusCircle className="mr-2 h-5 w-5" /> <span className="sm:sr-only">Create New Note</span>
        </Button>
      </div>

      <div className="flex-1 min-h-0 w-full min-w-0 overflow-hidden">
        {isEditorOpen ? (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onClose={handleCloseEditor}
            onDelete={selectedNote ? handleDeleteNote : undefined}
          />
        ) : (
          <NoteList
            notes={notes}
            onSelectNote={handleSelectNote}
            onDeleteNote={handleDeleteNote}
          />
        )}
      </div>
    </div>
  );
}
