"use client";

import React, { useMemo } from "react";
import { usePlayerData } from "./player-data-context";
import { resolveAllRequirements, QuestTreeNode } from "@/utils/quest-requirements";

interface SkillRequirement {
  skill: string;
  level: number;
}

interface QuestRequirementsProps {
  skills?: SkillRequirement[];
  quests?: string[];
  other?: string[];
}

const SkillRequirementItem: React.FC<{ skill: string; level: number }> = ({ skill, level }) => {
  const { playerData, getSkillLevel } = usePlayerData();

  const playerLevel = getSkillLevel(skill);
  const hasRequirement = playerLevel !== null && playerLevel >= level;
  const showStatus = playerData !== null;

  const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
  const skillLower = skill.toLowerCase();

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-left text-sm w-full ${
        !showStatus
          ? "border-fd-border bg-fd-muted/30"
          : hasRequirement
          ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
          : "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400"
      }`}
    >
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
        <image href={`/skills/${skillLower}.png`} width="16" height="16" />
      </svg>
      <span className="flex-1">{level} {capitalizedSkill}</span>
      {showStatus && (
        hasRequirement ? (
          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-xs text-fd-muted-foreground flex-shrink-0">({playerLevel ?? 1})</span>
        )
      )}
    </div>
  );
};

const QuestRequirementItem: React.FC<{ quest: string; depth?: number }> = ({ quest, depth = 0 }) => {
  const { playerData, isQuestComplete } = usePlayerData();

  const completed = isQuestComplete(quest);
  const showStatus = playerData !== null && completed !== null;

  const handleClick = () => {
    const formattedName = quest.replace(/ /g, "_");
    window.open(`https://runescape.wiki/w/${formattedName}/Quick_guide`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-left text-sm transition-colors w-full ${
        !showStatus
          ? "border-fd-border bg-fd-muted/30 hover:bg-fd-muted/50"
          : completed
          ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20"
          : "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20"
      }`}
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span className="flex-1">{quest}</span>
      {showStatus && completed && (
        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <svg className="w-3 h-3 opacity-50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </button>
  );
};

const QuestTreeItem: React.FC<{ node: QuestTreeNode; depth?: number }> = ({ node, depth = 0 }) => {
  return (
    <div>
      <div style={{ marginLeft: `${depth * 20}px` }}>
        <QuestRequirementItem quest={node.name} depth={depth} />
      </div>
      {node.children.length > 0 && (
        <div className="mt-1 space-y-1">
          {node.children.map((child, idx) => (
            <QuestTreeItem key={`${child.name}-${idx}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const QuestRequirements: React.FC<QuestRequirementsProps> = ({
  skills = [],
  quests = [],
  other = [],
}) => {
  const { playerData } = usePlayerData();

  // Recursively resolve all requirements
  const resolved = useMemo(() => {
    return resolveAllRequirements(quests, skills, other);
  }, [quests, skills, other]);

  const hasSkills = resolved.skills.length > 0;
  const hasQuests = resolved.questTree.length > 0;
  const hasOther = resolved.other.length > 0;

  if (!hasSkills && !hasQuests && !hasOther) {
    return (
      <div className="my-4 p-4 border border-fd-border rounded-lg bg-fd-muted/20">
        <p className="text-fd-muted-foreground">No requirements for this content.</p>
      </div>
    );
  }

  return (
    <div className="my-4 p-4 border border-fd-border rounded-lg bg-fd-card">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Skills Column */}
        {hasSkills && (
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-fd-foreground mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Skill Requirements
            </h4>
            <div className="space-y-1">
              {resolved.skills.map((req, idx) => (
                <SkillRequirementItem key={idx} skill={req.skill} level={req.level} />
              ))}
            </div>
          </div>
        )}

        {/* Quests Column */}
        {hasQuests && (
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-fd-foreground mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Quest Requirements ({resolved.quests.length})
            </h4>
            <div className="space-y-1">
              {resolved.questTree.map((tree, idx) => (
                <QuestTreeItem key={`${tree.name}-${idx}`} node={tree} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Other Requirements */}
      {hasOther && (
        <div className="mt-4 pt-4 border-t border-fd-border">
          <h4 className="text-sm font-semibold text-fd-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Other Requirements
          </h4>
          <ul className="list-disc list-inside text-sm text-fd-muted-foreground space-y-1">
            {resolved.other.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {!playerData && (
        <p className="mt-4 text-xs text-fd-muted-foreground">
          Search for your username above to see which requirements you&apos;ve completed.
        </p>
      )}
    </div>
  );
};
