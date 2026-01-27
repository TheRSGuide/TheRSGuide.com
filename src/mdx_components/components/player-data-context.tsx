"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

// Types for API responses
interface SkillLevel {
  name: string;
  level: number;
  xp: number;
  rank: number;
}

interface PlayerLevels {
  username: string;
  skills: SkillLevel[];
}

interface QuestStatus {
  id?: string;
  title?: string;
  name?: string;
  status: "Completed" | "Started" | "Not Started" | string;
  difficulty?: string;
  members?: boolean;
  questPoints?: number;
  userEligible?: boolean;
}

interface QuestsResponse {
  username: string;
  quests: QuestStatus[];
}

interface PlayerData {
  username: string;
  levels: PlayerLevels | null;
  quests: QuestsResponse | null;
}

interface PlayerDataContextType {
  playerData: PlayerData | null;
  loading: boolean;
  error: string | null;
  lastSearch: string;
  searchPlayer: (username: string) => Promise<void>;
  getSkillLevel: (skillName: string) => number | null;
  isQuestComplete: (questName: string) => boolean | null;
}

const PlayerDataContext = createContext<PlayerDataContextType | undefined>(undefined);

const STORAGE_KEY = "rs3_player_search";

// Skill name normalization map
const SKILL_NAME_MAP: { [key: string]: string } = {
  attack: "Attack",
  defence: "Defence",
  strength: "Strength",
  constitution: "Constitution",
  ranged: "Ranged",
  prayer: "Prayer",
  magic: "Magic",
  cooking: "Cooking",
  woodcutting: "Woodcutting",
  fletching: "Fletching",
  fishing: "Fishing",
  firemaking: "Firemaking",
  crafting: "Crafting",
  smithing: "Smithing",
  mining: "Mining",
  herblore: "Herblore",
  agility: "Agility",
  thieving: "Thieving",
  slayer: "Slayer",
  farming: "Farming",
  runecrafting: "Runecrafting",
  hunter: "Hunter",
  construction: "Construction",
  summoning: "Summoning",
  dungeoneering: "Dungeoneering",
  divination: "Divination",
  invention: "Invention",
  archaeology: "Archaeology",
  necromancy: "Necromancy",
};

export function PlayerDataProvider({ children }: { children: ReactNode }) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState("");

  // Load last search from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLastSearch(saved);
      }
    }
  }, []);

  const searchPlayer = useCallback(async (username: string) => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Use internal API route to avoid CORS issues
      const res = await fetch(`/api/player/${encodeURIComponent(username)}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("User not found");
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch player data");
      }

      const data = await res.json();

      setPlayerData({
        username,
        levels: data.levels,
        quests: data.quests,
      });

      setLastSearch(username);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, username);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSkillLevel = useCallback((skillName: string): number | null => {
    if (!playerData?.levels?.skills) return null;

    const normalizedName = SKILL_NAME_MAP[skillName.toLowerCase()] || skillName;
    const skill = playerData.levels.skills.find(
      (s) => s.name.toLowerCase() === normalizedName.toLowerCase()
    );
    return skill?.level ?? null;
  }, [playerData]);

  const isQuestComplete = useCallback((questName: string): boolean | null => {
    if (!playerData?.quests?.quests) return null;

    const quest = playerData.quests.quests.find((q) => {
      // API may use 'title' or 'name' for quest name
      const qName = q.title || q.name;
      if (!qName) return false;
      return qName.toLowerCase() === questName.toLowerCase();
    });
    if (!quest) return null;
    return quest.status === "Completed";
  }, [playerData]);

  return (
    <PlayerDataContext.Provider
      value={{
        playerData,
        loading,
        error,
        lastSearch,
        searchPlayer,
        getSkillLevel,
        isQuestComplete,
      }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
}

export function usePlayerData() {
  const context = useContext(PlayerDataContext);
  if (context === undefined) {
    throw new Error("usePlayerData must be used within a PlayerDataProvider");
  }
  return context;
}
