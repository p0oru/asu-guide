'use client';

import { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Lightbulb, GraduationCap } from 'lucide-react';
import { submitSuggestion } from '@/lib/actions';

const categories = [
  { value: 'Class', label: 'Class Suggestion' },
  { value: 'Food', label: 'Food Spot' },
  { value: 'Other', label: 'Other Tip' },
] as const;

export default function CommunityPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'Class' | 'Food' | 'Other'>('Class');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await submitSuggestion(formData);

      if (result.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
        setSelectedType('Class');
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-800 dark:text-green-200">
            Thank You, Sun Devil!
          </h2>
          <p className="mt-2 text-green-700 dark:text-green-300">
            Your suggestion has been submitted and will be reviewed by our team.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-6 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-maroon-100 to-gold-100 dark:from-maroon-900 dark:to-gold-900">
          <MessageSquare className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Community</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Share your tips and suggestions with fellow Sun Devils
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-maroon-50 to-gold-50 p-4 dark:from-maroon-950/30 dark:to-gold-950/30">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 text-gold-600 dark:text-gold-400" />
          <div>
            <h3 className="font-medium text-maroon-900 dark:text-maroon-200">
              What makes a great suggestion?
            </h3>
            <ul className="mt-1 text-sm text-maroon-700 dark:text-maroon-300 space-y-1">
              <li>• Hidden food gems that accept M&G or are budget-friendly</li>
              <li>• Classes with great professors or easy grading</li>
              <li>• Study spots, campus hacks, or survival tips</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Category - Now First */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Category
            </label>
            <select
              id="type"
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'Class' | 'Food' | 'Other')}
              className="mt-2 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional Fields Based on Category */}
          <div className="mt-4">
            {selectedType === 'Class' ? (
              /* Class-specific fields */
              <div className="space-y-4">
                <div className="rounded-lg border border-maroon-200 bg-maroon-50/50 p-4 dark:border-maroon-900 dark:bg-maroon-950/30">
                  <div className="mb-3 flex items-center gap-2 text-maroon-700 dark:text-maroon-300">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm font-medium">Class Details</span>
                  </div>
                  
                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Course Code */}
                    <div>
                      <label
                        htmlFor="courseCode"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Course Code *
                      </label>
                      <input
                        type="text"
                        id="courseCode"
                        name="courseCode"
                        required
                        placeholder="e.g. CSE 110"
                        className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                      />
                    </div>

                    {/* Professor */}
                    <div>
                      <label
                        htmlFor="professor"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Professor *
                      </label>
                      <input
                        type="text"
                        id="professor"
                        name="professor"
                        required
                        placeholder="e.g. Dr. Smith"
                        className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mt-3">
                    <label
                      htmlFor="reason"
                      className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Why is this class good/easy? *
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      required
                      placeholder="e.g. Light workload, interesting lectures, fair grading..."
                      className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Generic content field for Food/Other */
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  What&apos;s your suggestion? *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  required
                  placeholder={
                    selectedType === 'Food'
                      ? 'Tell us about a great food spot, deals, or hidden gems...'
                      : 'Share a tip, study spot, or campus hack...'
                  }
                  className="mt-2 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Username{' '}
              <span className="text-zinc-400 dark:text-zinc-500">(optional)</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Anonymous"
              className="mt-2 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-maroon-600 to-maroon-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-maroon-700 hover:to-maroon-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit Suggestion
            </>
          )}
        </button>
      </form>
    </div>
  );
}
