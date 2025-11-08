"use client";

import { useState } from "react";
import { FileText, Plus, Trash2, Edit2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export default function NotesApp() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title, content }
          : note
      ));
      setEditingId(null);
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title,
          content,
          createdAt: new Date(),
        },
      ]);
    }

    setTitle("");
    setContent("");
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <FileText className="w-10 h-10 text-yellow-500" />
        {t("apps.notes.title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {editingId ? t("apps.notes.editNote") : t("apps.notes.newNote")}
          </h2>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("apps.notes.titlePlaceholder")}
            className="w-full px-4 py-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("apps.notes.contentPlaceholder")}
            rows={10}
            className="w-full px-4 py-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white resize-none"
          />

          <div className="flex gap-2">
            <button
              onClick={saveNote}
              className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {editingId ? t("apps.notes.updateButton") : t("apps.notes.addButton")}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                {t("apps.notes.cancel")}
              </button>
            )}
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("apps.notes.yourNotes")} ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center text-gray-500 dark:text-gray-400">
              {t("apps.notes.noNotes")}
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {note.title}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editNote(note)}
                        className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-3">
                    {note.content}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
