interface ExactMarkerConfig {
  matchType: "exact";
  markerName: string;
  kind: "character" | "furniture";
  slotType?: 'desk' | 'chair' | 'clock' | 'computer' | 'window'; 
  defaultOccupantId: string | null;
}

interface PrefixMarkerConfig {
  matchType: "prefix";
  prefix: string;
  kind: "furniture";
  slotType: 'shelf';
  defaultOccupantId: string | null;
}

type SlotMarkerConfig = ExactMarkerConfig | PrefixMarkerConfig;

const slotMarkerConfig: SlotMarkerConfig[] = [
  { matchType: "exact", markerName:"MikuSlot", kind: "character", defaultOccupantId: null },
  { matchType: "exact", markerName: "DeskSlot", kind: "furniture", slotType: 'desk', defaultOccupantId: null },
  { matchType: "exact", markerName: "ChairSlot", kind: "furniture", slotType: 'chair', defaultOccupantId: null },
  { matchType: "exact", markerName: "ClockSlot", kind: "furniture", slotType: 'clock', defaultOccupantId: null },
  { matchType: "exact", markerName: "ComputerSlot", kind: "furniture", slotType: 'computer', defaultOccupantId: null },
  { matchType: "exact", markerName: "WindowSlot", kind: "furniture", slotType: 'window', defaultOccupantId: null },
  { matchType: "prefix", prefix:"Shelf", kind: "furniture", slotType: "shelf", defaultOccupantId: null }
]

function findMarkerConfig(nodeName: string): SlotMarkerConfig | undefined {
  return slotMarkerConfig.find((config) => {
    if (config.matchType === "exact") {
      return config;
    } else {
      // config.matchType === "prefix" — what's the condition here?
    }
  });
}