'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Lock,
  BookOpen,
  Utensils,
  MessageSquare,
  Trash2,
  Plus,
  LogOut,
} from 'lucide-react';
import {
  getClasses,
  getPlaces,
  getSuggestions,
  addClass,
  addPlace,
  deleteClass,
  deletePlace,
  deleteSuggestion,
  verifyAdmin,
} from '@/lib/actions';
import ConfirmModal from '@/components/ConfirmModal';

interface Class {
  _id: string;
  code: string;
  name: string;
  professor?: string;
  credits?: number;
  difficulty?: string;
  genEd?: string[];
}

interface Place {
  _id: string;
  name: string;
  category?: string;
  location?: string;
  flags?: {
    acceptsMnG?: boolean;
    isLateNight?: boolean;
    isBudget?: boolean;
  };
  deals?: string;
}

interface Suggestion {
  _id: string;
  content: string;
  type?: string;
  username?: string;
  status?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [classes, setClasses] = useState<Class[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: 'class' | 'place' | 'suggestion';
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadAllData();
    }
  }, [isLoggedIn]);

  async function loadAllData() {
    const [classData, placeData, suggestionData] = await Promise.all([
      getClasses(),
      getPlaces(),
      getSuggestions(),
    ]);
    setClasses(classData);
    setPlaces(placeData);
    setSuggestions(suggestionData);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await verifyAdmin(accessCode);
    
    if (result.success) {
      setIsLoggedIn(true);
    } else {
      setError('Invalid access code');
    }
    setIsLoading(false);
  }

  function openDeleteModal(id: string, type: 'class' | 'place' | 'suggestion') {
    setItemToDelete({ id, type });
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      switch (itemToDelete.type) {
        case 'class':
          await deleteClass(itemToDelete.id);
          break;
        case 'place':
          await deletePlace(itemToDelete.id);
          break;
        case 'suggestion':
          await deleteSuggestion(itemToDelete.id);
          break;
      }
      await loadAllData();
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  }

  function getDeleteModalContent() {
    if (!itemToDelete) return { title: '', message: '' };
    
    switch (itemToDelete.type) {
      case 'class':
        return {
          title: 'Delete Class',
          message: 'Are you sure you want to delete this class? This action cannot be undone.',
        };
      case 'place':
        return {
          title: 'Delete Place',
          message: 'Are you sure you want to delete this place? This action cannot be undone.',
        };
      case 'suggestion':
        return {
          title: 'Dismiss Suggestion',
          message: 'Are you sure you want to dismiss this suggestion? This action cannot be undone.',
        };
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-asu-maroon">
                <Lock className="h-8 w-8 text-asu-gold" />
              </div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Admin Access
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Enter your access code to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="sr-only">
                  Access Code
                </label>
                <input
                  id="accessCode"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter Admin Access Code"
                  required
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-lg tracking-widest focus:border-asu-maroon focus:outline-none focus:ring-2 focus:ring-asu-maroon/20 dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>

              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-asu-maroon py-3 font-semibold text-white transition-colors hover:bg-maroon-700 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/asu_trident.svg"
            alt="ASU"
            width={40}
            height={48}
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Admin Dashboard
            </h1>
            <p className="text-sm text-zinc-500">Manage your ASU Survival Guide content</p>
          </div>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Class Management */}
        <ClassManagement
          classes={classes}
          onRefresh={loadAllData}
          onDelete={(id) => openDeleteModal(id, 'class')}
        />

        {/* Place Management */}
        <PlaceManagement
          places={places}
          onRefresh={loadAllData}
          onDelete={(id) => openDeleteModal(id, 'place')}
        />
      </div>

      {/* Community Inbox - Full Width */}
      <div className="mt-8">
        <SuggestionInbox
          suggestions={suggestions}
          onRefresh={loadAllData}
          onDelete={(id) => openDeleteModal(id, 'suggestion')}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={getDeleteModalContent().title}
        message={getDeleteModalContent().message}
        isLoading={isDeleting}
      />
    </div>
  );
}

// Class Management Component
function ClassManagement({
  classes,
  onRefresh,
  onDelete,
}: {
  classes: Class[];
  onRefresh: () => void;
  onDelete: (id: string) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAdding(true);
    const formData = new FormData(e.currentTarget);
    await addClass(formData);
    (e.target as HTMLFormElement).reset();
    setIsAdding(false);
    onRefresh();
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-asu-maroon" />
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Class Management
        </h2>
      </div>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="code"
            placeholder="Course Code *"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            name="name"
            placeholder="Course Name *"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            name="professor"
            placeholder="Professor"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            name="credits"
            type="number"
            placeholder="Credits"
            min="1"
            max="6"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <select
            name="difficulty"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy A">Easy A</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            name="genEd"
            placeholder="Gen Ed (comma-separated)"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <button
          type="submit"
          disabled={isAdding}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-asu-maroon py-2 text-sm font-medium text-white hover:bg-maroon-700 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {isAdding ? 'Adding...' : 'Add Class'}
        </button>
      </form>

      {/* List */}
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {classes.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-500">No classes yet</p>
        ) : (
          classes.map((cls) => (
            <div
              key={cls._id}
              className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
            >
              <div>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {cls.code}
                </span>
                <span className="ml-2 text-sm text-zinc-500">{cls.name}</span>
                {cls.difficulty && (
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      cls.difficulty === 'Easy A'
                        ? 'bg-green-100 text-green-700'
                        : cls.difficulty === 'Moderate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {cls.difficulty}
                  </span>
                )}
              </div>
              <button
                onClick={() => onDelete(cls._id)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Place Management Component
function PlaceManagement({
  places,
  onRefresh,
  onDelete,
}: {
  places: Place[];
  onRefresh: () => void;
  onDelete: (id: string) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAdding(true);
    const formData = new FormData(e.currentTarget);
    await addPlace(formData);
    (e.target as HTMLFormElement).reset();
    setIsAdding(false);
    onRefresh();
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2">
        <Utensils className="h-5 w-5 text-asu-maroon" />
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Food & Deals Management
        </h2>
      </div>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            placeholder="Place Name *"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <select
            name="category"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Study">Study</option>
            <option value="Cafe">Cafe</option>
          </select>
          <input
            name="location"
            placeholder="Location/Address"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 sm:col-span-2"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="acceptsMnG" className="rounded" />
            M&G Accepted
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isLateNight" className="rounded" />
            Late Night
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isBudget" className="rounded" />
            Budget Friendly
          </label>
        </div>
        <textarea
          name="deals"
          placeholder="Current Deals or Promotions"
          rows={2}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-asu-maroon py-2 text-sm font-medium text-white hover:bg-maroon-700 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {isAdding ? 'Adding...' : 'Add Place'}
        </button>
      </form>

      {/* List */}
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {places.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-500">No places yet</p>
        ) : (
          places.map((place) => (
            <div
              key={place._id}
              className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
            >
              <div>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {place.name}
                </span>
                {place.category && (
                  <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                    {place.category}
                  </span>
                )}
                {place.flags?.acceptsMnG && (
                  <span className="ml-1 text-xs text-asu-gold">M&G</span>
                )}
              </div>
              <button
                onClick={() => onDelete(place._id)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Suggestion Inbox Component
function SuggestionInbox({
  suggestions,
  onDelete,
}: {
  suggestions: Suggestion[];
  onRefresh: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-asu-maroon" />
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Community Inbox
        </h2>
        <span className="rounded-full bg-asu-maroon px-2 py-0.5 text-xs text-white">
          {suggestions.length}
        </span>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto">
        {suggestions.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            No suggestions yet. Community feedback will appear here.
          </p>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-800"
            >
              <div className="mb-2 flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                    {suggestion.type || 'Other'}
                  </span>
                  <span className="text-xs text-zinc-400">
                    by {suggestion.username || 'Anonymous'}
                  </span>
                </div>
                <button
                  onClick={() => onDelete(suggestion._id)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                  title="Dismiss"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {suggestion.content}
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                {new Date(suggestion.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
