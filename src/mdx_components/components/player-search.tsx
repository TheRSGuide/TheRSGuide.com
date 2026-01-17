"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePlayerData } from "./player-data-context";

export const PlayerSearch: React.FC = () => {
  const { playerData, loading, error, lastSearch, searchPlayer } = usePlayerData();
  const [inputValue, setInputValue] = useState(lastSearch);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Update input value when lastSearch changes
  useEffect(() => {
    setInputValue(lastSearch);
  }, [lastSearch]);

  // Auto-search when lastSearch is loaded from localStorage
  useEffect(() => {
    if (lastSearch && !playerData && !loading) {
      searchPlayer(lastSearch);
    }
  }, [lastSearch, playerData, loading, searchPlayer]);

  // Debounced search function
  const debouncedSearch = useCallback(
    (username: string) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        if (username.trim()) {
          searchPlayer(username.trim());
        }
      }, 1000);

      setDebounceTimer(timer);
    },
    [debounceTimer, searchPlayer]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      searchPlayer(inputValue.trim());
    }
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      searchPlayer(inputValue.trim());
    }
  };

  return (
    <div className="my-4 p-3 border border-fd-border rounded-lg bg-fd-card">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-fd-foreground">
          Enter your username to load your stats:
        </label>
        <div className="max-w-sm">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Username..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={loading}
              maxLength={15}
              className="flex-1 px-3 py-1.5 text-sm border border-fd-border rounded-md bg-fd-background text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring disabled:opacity-50"
            />
            <button
              onClick={handleSearch}
              disabled={!inputValue.trim() || loading}
              className="px-3 py-1.5 text-sm font-medium bg-fd-primary text-fd-primary-foreground rounded-md hover:bg-fd-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              Search
            </button>
          </div>
          {error && (
            <p className="mt-1 text-xs text-red-500">
              {error === "Profile is private" ? "Profile is private" : "User not found"}
            </p>
          )}
          {playerData && !error && !loading && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              Loaded: <span className="font-medium">{playerData.username}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
