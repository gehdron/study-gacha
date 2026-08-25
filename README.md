# Study Gacha

A study-productivity app disguised as a gacha game: study sessions and completed tasks earn currency, which you spend on gacha pulls to unlock anime-girl characters and furniture for a fully customizable 3D room.

## Concept

- Study using a built-in pomodoro-style timer (caps at 50 minutes per session).
- Complete self-created daily/weekly/monthly tasks.
- Both earn **pull currency**, scaled by an exponential curve that rewards longer, more focused sessions/tasks — up to 100 currency at the 50-minute cap.
- Spend pull currency on gacha pulls to unlock characters and furniture.
- Duplicate pulls convert into **furniture currency** instead of stacking.
- Decorate a fully 3D room — built in Blender, rendered with React Three Fiber — by placing owned characters and furniture into named slots.

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript
- **3D rendering**: React Three Fiber, drei, Three.js
- **Backend / persistence**: Supabase (Postgres, Auth, Row Level Security)
- **Styling**: Tailwind CSS

## Core Architecture

### Room & slot system

The room is a single `.glb` file (exported from Blender) containing structural geometry (walls, floor, window) plus named **marker Empties** (`DeskSlot`, `ChairSlot`, `MikuSlot`, `Shelf1Slot`, etc.) with no geometry of their own — just transforms.

At runtime:
1. `useGLTF` loads the shell and exposes its `nodes`.
2. `extractSlotsFromNode(nodes)` walks every node, matches marker names against a config (`slotMarkerConfig`) of exact-name and prefix-based rules, and produces typed `CharacterSlot[]` / `FurnitureSlot[]` — position and rotation come directly from the glb, never duplicated elsewhere.
3. `applySavedOccupancy(slots, savedOccupancy)` overlays a user's saved `room_slots` data on top of those glb-derived defaults.
4. Actual furniture/character models are loaded separately (their own `.glb` files) via small registries (`characterRegistry`, `furnitureRegistry`) keyed by id, and rendered into each slot's transform.

This design means adding a second room is just: export a new shell with the same marker-naming convention — no new code required.

### Data model (Supabase)

| Table | Purpose |
|---|---|
| `profiles` | Per-user `pull_currency` / `furniture_currency` balances. Auto-created via a trigger on signup. |
| `owned_characters` / `owned_furniture` | Permanent ownership records from gacha pulls. |
| `room_slots` | Per-user, per-slot occupancy (`slot_id` → `occupant_id`). Only stores what varies per user — never position/rotation/shape data, which stays derived from the glb. |
| `study_sessions` / `tasks` | Logged study sessions and user-created tasks, each with the currency they awarded. |

All tables use Row Level Security — users can only read/write their own rows. Currency-affecting operations (gacha pulls, session/task rewards) run through `SECURITY DEFINER` Postgres functions (`execute_pull`, `log_study_session`, `complete_task`) called via RPC, so balances can never be manipulated directly from the client.

### Currency curve

Both study sessions and task completion use the same reward shape:

```
reward = round((min(minutes, 50) / 50)² × 100)
```

Back-loaded on purpose — the last few minutes before the 50-minute cap are worth disproportionately more than the first few, to reward sustained focus.

## App Structure

- `/` — landing page
- `/login`, `/signup` — auth
- `/room` — the entire game experience: persistent 3D room with a floating bottom tab bar (Decorate / Gacha / Tasks) and a top pomodoro timer/clock, all layered over a permanently-mounted `<Canvas>`

## Known Limitations (prototype scope)

- Single hardcoded room — multi-room support is architected for but not yet exposed.
- `profiles` currently has a client-facing `UPDATE` policy that isn't fully locked down against balance tampering; safe today only because all currency-changing paths route through the `SECURITY DEFINER` functions instead.
- No email confirmation on signup (disabled for faster prototype testing).
- Blender source scenes need cleanup (separating reference geometry from exported shells) before adding new rooms.
- Currently, art assets are extremely barebones, as well as UI. This will be updated whenever I either get good at art or hire an artist.
