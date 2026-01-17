"use client";

import React, { useState } from "react";
import { usePlayerData } from "./player-data-context";
import skillsData from "@/utils/skills.json";

interface LevelRange {
  start: number;
  end: number;
  desc: string;
  link?: string;
}

const allSkills = [
  "attack", "strength", "defence", "constitution", "ranged", "prayer", "magic",
  "cooking", "woodcutting", "fletching", "fishing", "firemaking", "crafting",
  "smithing", "mining", "herblore", "agility", "thieving", "slayer", "farming",
  "runecrafting", "hunter", "construction", "summoning", "dungeoneering",
  "divination", "invention", "archaeology", "necromancy"
];

const SkillButton: React.FC<{
  skill: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ skill, isSelected, onClick }) => {
  const { playerData, getSkillLevel } = usePlayerData();
  const playerLevel = getSkillLevel(skill);
  const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

  return (
    <button
      onClick={onClick}
      title={`${capitalizedSkill}${playerLevel ? ` (${playerLevel})` : ""}`}
      className={`w-7 h-7 flex items-center justify-center rounded border transition-all ${
        isSelected
          ? "border-fd-primary bg-fd-primary/20"
          : "border-transparent hover:border-fd-border hover:bg-fd-muted/50"
      }`}
    >
      <img
        src={`/skills/${skill.toLowerCase()}.png`}
        alt={capitalizedSkill}
        className="w-5 h-5 block"
      />
    </button>
  );
};

const SkillContent: React.FC<{ skill: string }> = ({ skill }) => {
  const { playerData, getSkillLevel } = usePlayerData();
  const playerLevel = getSkillLevel(skill);
  const skillInfo = (skillsData as Record<string, LevelRange[]>)[skill.toLowerCase()] || [];
  const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

  if (skillInfo.length === 0) {
    return (
      <div className="text-center py-8 text-fd-muted-foreground">
        No leveling guide available for {capitalizedSkill} yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-fd-border">
        <img
          src={`/skills/${skill.toLowerCase()}.png`}
          alt={capitalizedSkill}
          className="w-8 h-8"
        />
        <div>
          <h3 className="font-semibold text-lg">{capitalizedSkill}</h3>
          {playerData && playerLevel !== null && (
            <p className="text-sm text-fd-muted-foreground">Current Level: {playerLevel}</p>
          )}
        </div>
      </div>

      {/* Level Brackets */}
      <div className="space-y-3">
        {skillInfo.map((range, idx) => {
          const isCompleted = playerLevel !== null && playerLevel >= range.end;
          const isCurrent = playerLevel !== null && playerLevel >= range.start && playerLevel < range.end;

          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                isCompleted
                  ? "border-green-500/50 bg-green-500/10"
                  : isCurrent
                  ? "border-fd-primary/50 bg-fd-primary/10"
                  : "border-fd-border bg-fd-muted/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    Levels {range.start} - {range.end}
                  </span>
                  {isCompleted && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/20 text-green-600 dark:text-green-400">
                      Completed
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-fd-primary/20 text-fd-primary">
                      Current
                    </span>
                  )}
                </div>
                {range.link && (
                  <a
                    href={range.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-fd-primary hover:underline flex items-center gap-1"
                  >
                    Wiki
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              <p className="text-sm text-fd-muted-foreground">{range.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SkillTrainingLookup: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Skill Icon Grid */}
      <div className="flex flex-wrap justify-between items-start gap-y-1 p-2 border border-fd-border rounded-lg bg-fd-card h-fit">
        {allSkills.map((skill) => (
          <SkillButton
            key={skill}
            skill={skill}
            isSelected={selectedSkill === skill}
            onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
          />
        ))}
      </div>

      {/* Selected Skill Content */}
      {selectedSkill && (
        <div className="p-4 border border-fd-border rounded-lg bg-fd-card">
          <SkillContent skill={selectedSkill} />
        </div>
      )}

      {!selectedSkill && (
        <p className="text-center text-sm text-fd-muted-foreground py-4">
          Select a skill above to view training recommendations.
        </p>
      )}
    </div>
  );
};
