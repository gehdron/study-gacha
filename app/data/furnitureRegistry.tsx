import { RegEntry } from "@/types";

export const furnitureRegistry: Record<string, RegEntry> = {
  desk: { url: '/desk_low_poly.glb', slotType:'desk', name:'desk'},
  computer: {url: '/desktop_computer.glb', slotType:'computer', name:'computer'},
  clock: {url: 'digital_alarm_clock.glb', slotType:'clock', name:'clock'},
  shelf: {url: 'kallax_shelf.glb', slotType:'shelf', name:'shelf'},
  chair: {url: 'office_chair.glb', slotType:'chair', name:'chair'},
  window: {url: 'window.glb', slotType:'window', name:'window'}
};