# No. 45 – Double-storey terrace house (three.js)

An interactive 3D model of the house (Type A, 20′ × 70′ lot, 4 bedrooms / 3 bathrooms).
It is built from the architect's plans (`pic/floor-plan/`) and the site photos in `pic/`.

## Run

```bash
pnpm install
pnpm dev          # then open the printed URL (default http://localhost:5173)
pnpm build        # production build into dist/ (static files, open via any web server)
pnpm preview      # serve the production build
```

For the best look, use a desktop browser with a dedicated GPU (Chrome or Edge).

## Controls

| | |
|---|---|
| **Orbit mode** | Drag to orbit, right-drag to pan, scroll to zoom, double-click to focus on a point. `W A S D` fly and `Q`/`E` go down/up. |
| **Walk mode** (`V`) | Click the view to capture the mouse, then `W A S D` / arrows to walk and `Shift` to run. Stairs are climbed automatically and walls block you. `Esc` releases the mouse. |
| **Go to** | About 27 camera presets: street, porch, every room, balcony, rear yard, plan views and cutaways. |
| **Lens** | *Auto* switches automatically: ultra-wide (15 mm) indoors like your phone's 0.5× photos, 18 mm in the yard/porch, 26 mm outside. You can also pick a fixed lens. |
| **Levels** (`1` `2` `3`) | Whole house / remove roof / ground floor only (first floor hidden). |
| **Room sizes & dimensions** (`L`) | Room names, sizes, and dimension lines on each floor. |
| **Measure tool** (`M`) | Click two points to measure. Points snap to corners (orange) and edges (blue); hold `Shift` to lock the measurement to an axis. `Ctrl+Z` undoes. Units can be metres, feet, or both. |
| **Photoreal** (`P`) | GPU path tracing with true global illumination and reflections. Keep the camera still and it refines over time. |
| **Front door** (`O`) | Click the door (in walk mode aim the crosshair and click) or press `O` / the panel button to swing it open or shut. Both leaves open separately; the door starts closed and blocks walking while shut. |
| **Feng shui** (`F`) | The card below the sun clock (top right). Click it to expand the advice; its *Grid* pill (or `F`) turns the floor grid on and off. An Eight Mansions (八宅) reading of the layout. The house sits north and faces south (坎宅). Each floor gets a colour-coded 3 × 3 Lo Shu grid with its stars, and a card lists whole-house and room-by-room advice. Add occupants' birth dates and genders to get each person's Kua (命卦), lucky directions and best bedroom, and to show the grid for that person. The **EN / 中文** switch on the card changes the advice, the floor labels and the chip between English and Chinese. The occupants and the language are saved in the browser only. |
| **Interior design** | The 🛋️ dropdown next to *Structure renovation*. It is disabled until the renovation is applied, because the furniture is laid out for the renovated rooms; turning the renovation off also removes it. Style: **日式简约风 (Japanese minimalist)**: pale oak platform beds, wardrobes and desks, a low linen sofa, a 神台 altar (Guanyin, red 神台灯, incense burner, offerings, 地主 shrine in the base niche) straight ahead of the front door (*Go to → Front door → 神台*), a genkan shoe cabinet, the dining table at the back beside the L-kitchen, a tatami nook in the master bedroom, and appliances (TV, soundbar, router, split air-conditioners, ceiling fan, French-door fridge, microwave, rice cooker, kettle, washing machine, water heaters, air purifier). |
| **Lights** (`💡`) | Shown with an interior design. Washi pendants, ceiling lights, andon, bedside and LED fittings are real lights. *Auto* follows the sun clock: they fade in from sunset (sun below ≈ 6°) and are fully on after dusk; click to cycle *On* / *Off*. The red altar lamps stay lit day and night. |
| **Screenshot** | Saves a PNG of the current view. |
| `H` | Hide or show the panel. |

## Rendering notes

- **Lighting.**
  - Sky and sun come from a CC0 HDRI (Poly Haven). The sun is extracted from the HDRI into a shadow-casting light, and it is positioned from the real solar position for Kuala Lumpur, clocked in Malaysia time (MYT, UTC+8): live by default, or pick any date / time. The house front faces south (north = −Z, east = +X in the scene).
  - Image-based lighting uses a partially white-balanced copy of the sky, which avoids the cold blue cast on shaded walls.
  - Interiors, and the covered porch, use a bounce-light environment instead of the blue sky.
- **Exposure** is metered like a camera: a tiny HDR render of the view is read back several times per second. This lets you walk from the sunny street into the house and your eyes adapt. Photoreal mode meters the path-traced image itself.
- **Photoreal mode.**
  - It is physically correct, so ground-floor rooms deep inside the terrace receive little daylight and take longer to lose their grain.
  - Exteriors, the balcony, and rooms with windows converge quickest.
- **Materials.** The PBR materials match the photos:
  - beige 600×600 polished floor tiles
  - sage-green steel door frames and stair balustrade
  - red-brown bedroom doors, orange main door, and oak-PVC bathroom doors
  - grey bathroom tiles with a darker band
  - grey concrete roof tiles
  - galvanised gate and cement porch

## Modelling assumptions

The plans and photos don't show everything, so a few items are best guesses:

- **Staircase.** Three flights with 21 equal risers of about 171 mm: eight lower treads, two corner winders, three middle treads, a half landing, six upper treads, and the final rise onto the first floor. The eight-tread lower flight is reconstructed from site photos 101157/101200/101312; dimensions remain estimates from the plans and photos.
- **Stair balustrade** (FF plan, photos 101312/101325/101339/101358/101500).
  - **Handrail.** Each flight's rail runs straight at its own pitch. At the foot, the rail runs level over the first post and past it. At each turn, the handrail and second rail wrap around the corner with two short level legs (about 0.1 m each), then meet the upper panel's end upright. The corner post stops under the lower handrail, and the upper upright provides the vertical rise after the elbow (photos 101312 / 101325). The bottom connector rises to clear the turning treads.
  - **Underside.** The first turn has a flat underside adjoining the lower flight and a short sloping transition into the middle flight. The half landing meets the upper flight at the same underside elevation. These joins are reconstructed from photos 101157/101200; their exact thicknesses remain estimates.
- **Stair tiles.** The 600 mm porcelain is laid tread by tread, not carried over from the floor grid. Each tread starts at its nosing with one joint on the flight's centre line, and each riser has its own strip.
  - **Balusters.** They run from a bottom rail up to a second rail just under the handrail. The first flight also has a broad intermediate post mounted on tread five, as seen in photos 101157/101200. Its rails follow the same nosing pitch on both sides of that post.
  - **First-floor guard.** It stands on the slab edge. It runs along the stair well, then beside flight 3 to just past the top riser, where a short return joins it to the stair-top post.
  - **Top of flight 3.** The handrail runs in one straight line from the landing connection to the stair-top post, about 0.1 m in front of the guard, with no bend over the last tread. The post's cap is level with the guard's top rail.
- **Interior doors** (photos 101339/101358/101451). Openings, measured to the outside of the frame, are 0.92 m for bedrooms and 0.84 m for bathrooms, all 2.1 m high. Interior steel frames have a slim 35 mm face.
- **Bathroom windows.** Positions of the small frosted windows on the front bathroom projection are taken from the photos.
- **Party walls.** Only the house itself is modelled. Its two party walls are shown full height; neighbours, the opposite row, and the back-lane buildings were removed on request.
- **Removed clutter.** Rubbish bins, buckets, and the roadside tree/planter are left out. The rear-yard grass is replaced with concrete.
- **Heights.** Floor-to-floor height is 3.6 m. The ceiling is 3.45 m on the ground floor and about 3.05 m on the first floor. The roof pitch is 27°.
- **Two-part roof** (front/rear elevations, section, photos 101057/101103/101540). The main gable with its front eave covers the master side (x < 4.4 m). The strip above the bathrooms has its own lower roof: the rear slope continues the main one, and the front slope sits 0.65 m lower and ends behind the bathroom-box parapet (top 6.5 m). The ensuite ceiling under it is 2.45 m.
- **Front boundary** (photos 101057/101103). From each party wall there is a 1.5 m pier, then a low wall, then a gate pillar. The "45" pillar carries the number and a letter slot; the right pillar has the door-bell. Between the pillars is a 3.25 m double swing gate. All widths were scaled off the photos.
- **Car porch** (photos 101108/102754/102759/102804). Two 150 mm steps lead to the door: a full-width cement step from the west wall to a 0.4 m pillar at the east end of the façade, then the tiled thresholds of the two openings. The porch floor falls 150 mm from the gate to the foot of the steps. The ceiling is flat (3.35 m) with no cross beams: only the front edge beam, a 1.07 m wide dropped strip along the west wall (it also roofs the balcony notch) and a dropped box under the first-floor bathroom projection. Rough-rendered piers stand at the street end of both porch walls. The main door opening is 1.5 m (0.9 m active leaf + 0.5 m narrow leaf).
- **Balcony front.** Three ≈1.1 m glass panels sit between 0.22 m posts, then a ≈1.1 m solid block meets the east wall. The notch has a glass return. The east privacy wall beside the balcony is about 1.7 m high. Sizes were scaled off photos 101103/101556.

## Project layout

```
src/config.ts            all dimensions (single source of truth) + room list
src/builder/*.ts         geometry kit, PBR materials/textures, fixtures, house, site
src/env.ts               HDRI sky + sun extraction, interior bounce environment
src/post.ts              HDR composer: MSAA → GTAO ambient occlusion → tone mapping
src/controls/walk.ts     first-person walking with collisions and stairs
src/tools/measure.ts     snapping tape measure
src/tools/annotations.ts room labels and dimension lines
src/pathtrace.ts         photoreal mode (three-gpu-pathtracer)
src/views.ts             camera presets
src/doors.ts             swinging front-door leaves (open/close)
src/builder/interior.ts  interior design styles (furniture for the renovated layout)
src/tools/fengshui.ts    feng shui (Eight Mansions) grid overlay, advice and personal Kua
```

To change a dimension, edit `src/config.ts`. Everything, including the dimension labels, is derived from it.
