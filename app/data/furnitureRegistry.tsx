import { RegEntry } from "@/types";

export const furnitureRegistry: Record<string, RegEntry> = {
  desk: { url: '/desk_low_poly.glb', slotType:'desk', name:'desk', rarity:"common", set:"default"},
  computer: {url: '/desktop_computer.glb', slotType:'computer', name:'computer', rarity:"common", set:"default"},
  clock: {url: 'digital_alarm_clock.glb', slotType:'clock', name:'clock', rarity:"common", set:"default"},
  shelf: {url: 'kallax_shelf.glb', slotType:'shelf', name:'shelf', rarity:"common", set:"default"},
  chair: {url: 'office_chair.glb', slotType:'chair', name:'chair', rarity:"common", set:"default"},
  window: {url: 'window.glb', slotType:'window', name:'window', rarity:"common", set:"default"},
  alt_computer: {url: 'alt_computer.glb', slotType:'computer', name:'alt_computer', rarity:'common', set:"default"}
};