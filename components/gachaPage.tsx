import { characterRegistry } from "@/app/data/characterRegistry";
import { furnitureRegistry } from "@/app/data/furnitureRegistry";
import { PullPoolEntry } from "@/types";


const rarityWeights: Record<'common' | 'rare' | 'epic', number> = {
  common: 70,
  rare: 25,
  epic: 5,
};

function pickRarityTier(): 'common' | 'rare' | 'epic' {
  let roll = Math.random() * 100; // random number in [0, 100)

  for (const tier of Object.keys(rarityWeights) as ('common' | 'rare' | 'epic')[]) {
    if (roll < rarityWeights[tier]) {
      return tier;
    }
    roll -= rarityWeights[tier];
  }
  return 'epic';
}

function poolBuilder(set: string): PullPoolEntry[] {
  const characterPool: PullPoolEntry[] = Object.keys(characterRegistry)
    .filter((key) => characterRegistry[key].set === set)
    .map((key) => ({
      id: key,
      kind: "character",
      rarity: characterRegistry[key].rarity,
    }));

  const furniturePool: PullPoolEntry[] = Object.keys(furnitureRegistry)
    .filter((key) => furnitureRegistry[key].set === set)
    .map((key) => ({
      id: key,
      kind: "furniture",
      rarity: furnitureRegistry[key].rarity,
    }));

  return [...characterPool,...furniturePool] 
}

export function pull(set: string): PullPoolEntry | undefined {
  const pool = poolBuilder(set);
  const tier = pickRarityTier();

  const tierPool: PullPoolEntry[] = pool.filter((item) => item.rarity == tier)

  const pulledItem = tierPool[Math.floor(Math.random()*tierPool.length)]
  
  return pulledItem;
}