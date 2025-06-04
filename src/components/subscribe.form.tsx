

import React, { useState, type FormEvent } from 'react';
import { type Store } from '../markket/index.d';
import { markketplace } from '../config';
import { IconRefreshAlert, IconMailbox, IconSquareRoundedX } from '@tabler/icons-react';

interface SubscribeFormProps {
  store: Store;
}

export function SubscribeForm({ store }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^\S+@\S+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Make sure the URL is properly formatted
      const apiUrl = `${markketplace.api}/api/subscribers`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          data: {
            Email: email,
            stores: store?.documentId ? [store.documentId] : [],
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <IconRefreshAlert size={16} />
                Subscribing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <IconMailbox size={16} />
                Subscribe
              </span>
            )}
          </button>
        </div>
      </form>

      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(5, 0, 80, 0.5)' }} onClick={() => setIsSuccess(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Thank you!</h3>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <IconSquareRoundedX size={24} />
              </button>
            </div>
            <p className="text-gray-600">
              You've been successfully subscribed to our newsletter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscribeForm;
