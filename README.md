# No. 45 – Double-storey terrace house (three.js)

An interactive 3D model of the house (Type A, 20′ × 70′ lot, 4 bedrooms / 3 bathrooms).
It is built from the architect's plans (`pic/floor-plan/`) and the site photos in `pic/`.

## Run

```bash
pnpm install
pnpm dev          # then open the printed URL (default http://localhost:5173)
pnpm build        # production build into dist/ (static files, open via any web server)
pnpm preview      # serve the production build
pnpm test         # renovation combinations, furniture bounds and room dimensions
```

For the best look, use a desktop browser with a dedicated GPU (Chrome or Edge).

**Reno** starts selected in the top toolbar, showing the family plan with
**Japanese minimal**. Click the button to deselect or select renovation. The plan includes the rear extension, master extension,
living-room picture window with an opening casement, automatic gate and awnings over the exposed car porch and remaining balcony. You can then change the **Interior**, or select
**No furniture**, while keeping the renovated walls, doors, windows and extensions in place.

The automatic gate has four panels: two on each side. Click any panel to open or close both sides
together; each pair folds outward towards the road and stacks beside its pillar, keeping the driveway clear.

| Reno | Structural arrangement |
|---|---|
| Off — Existing house | Original layout, rear yard, balcony and gate; no furniture. |
| On — Open family plan | Keep the original dining-passage wall and opening, leave the rear kitchen open, retain shared bathroom access and keep the extended master as one room. |

| Minimal interior | Finishes and furniture |
|---|---|
| Japanese minimal | Pale oak, cream linen, compact wooden coffee table on timber legs; tatami nook in the extended master. |
| Scandinavian minimal | Light timber, off-white and oatmeal, compact wooden coffee table on timber legs; reading seat in the extended master. |
| Soft grey minimal | White, soft grey and matte grey cabinetry, compact wooden coffee table on timber legs; compact desk in the extended master. |

All three interiors follow the family plan, with simple storage and everyday appliances.
The open master has the style's tatami, reading or desk nook.
The Reno, Interior and Lights controls stay in the top toolbar. The **Layout & finishes** section inside
the **No. 45** info panel describes the choices and shows the palette. Its **Ground-floor plan** and **First-floor plan** buttons
show each level from above, including with **No furniture**.
Room dimensions follow the chosen rooms. **No furniture** removes furniture and its lights, while retaining the porch ceiling lights.
Turning **Reno** off restores the original structure and disables interior selection.

With **Reno** selected, the entire car porch uses its own textured dark grey stone-look
finish with 300 × 600 mm rectangular tiles in a staggered brick layout. The format and finish reference
[Niro Granite's structured Murale range](https://nirogranite.com/product/murale), which lists car porches as a suitable application.
The model uses a 20 mm tile layer and 4 mm grout joints.
The finished surface stays at the first entrance step's height, leaving one step up to the front-door threshold.
Four recessed warm-white downlights illuminate the car porch in two rows under the solid ceiling.
They use the **Lights: Auto / On / Off** control, switching on at dusk in Auto mode.

The car porch and remaining L-shaped balcony both have translucent opal polycarbonate
canopies to admit daylight. Both use slim charcoal frames, a shallow fall
towards the street so rainwater sheds directly from the open front edges. They stay in place with **No furniture**
and are hidden with the other roofs in plan/cutaway views. For construction, consider
[UV-protected solar-control polycarbonate](https://www.palram.com/product/sunlite-polycarbonate-multi-wall/)
to balance light and heat; the model illustrates the canopy rather than simulating a product's thermal performance.

For the Japanese living room, turn **Reno** on, then choose **Go to → Living room**
to face the new porch window and handleless oak TV console. The window is 2.35 m wide and 1.45 m high,
with its sill raised to 1.05 m and its right edge pulled back 25 cm. A large fixed pane and a narrow
65 cm right casement share slim bronze framing. Click the casement's glass or handle to open it
outwards; click again to close it. Both panes use dark smoke-grey solar-control glazing. The design
references [slim flush aluminium casements](https://siegersystems.co.uk/products/slim-aluminium-flush-casement-window/),
which offer solar-control glass. The model illustrates the tint and shade rather than certifying
a glazing product's solar or thermal performance. The lounge has a cream
upholstered 2.1 m L-shaped sofa with a wall-side chaise and 18 cm legs, flush against the right wall to widen the stair passage,
an 80 × 45 cm oak coffee table with a lower shelf and four timber legs, exposed large-format matte flooring, and a plain
plaster ceiling with a fan/light over the seating area and two downlights near the front window. A separate ceiling
downlight sits in front of the altar. The approximately 75-inch TV sits on a handleless oak console
with 22 cm legs; the linen curtains behind it end 12 cm below the window sill.
Drag the coffee table with the mouse or a finger in Orbit mode to move it within
the clear lounge area; its position is kept when changing interior styles. The former gaming and yoga area is now an open passage. The window and flooring
are part of the structure renovation even when furniture is switched off.

The dining ceiling fan sits on the table side, with a 1.1 m blade span and approximately 30 cm
clearance from the side wall. A separate flush ceiling light illuminates the open floor to its left.

## Controls

| | |
|---|---|
| **Orbit mode** | Drag to orbit, right-drag to pan, scroll to zoom, double-click to focus on a point. `W A S D` fly and `Q`/`E` go down/up. |
| **Walk mode** (`V`) | Click the view to capture the mouse, then `W A S D` / arrows to walk and `Shift` to run. Stairs are climbed automatically and walls block you. `Esc` releases the mouse. |
| **Go to** | About 27 camera presets: street, porch, every room, balcony, rear yard, plan views and cutaways. |
| **Lens** | Adapts automatically: ultra-wide (15 mm) indoors like your phone's 0.5× photos, 18 mm in the yard/porch, 26 mm outside. |
| **View scale** | Defaults to **1×**. Click the right-side 1×/2× button to switch scales. Real dimensions, measurement readings and walking distances stay in metres; this magnifies the camera view. |
| **House view** (`1` `2` `3`) | Use the dropdown to show the whole house, remove the roof, or show only the ground floor (first floor hidden). |
| **Room sizes & dimensions** (`L`) | Toggle room names, sizes, and dimension lines with the triangle-ruler button on the right. |
| **Measure tool** (`M`) | Toggle the right-side ruler button, then click two points to measure. Points snap to corners (orange) and edges (blue); hold `Shift` to lock the measurement to an axis. `Ctrl+Z` undoes. Units can be metres, feet, or both. |
| **Photoreal** (`P`) | GPU path tracing with true global illumination and reflections. Keep the camera still and it refines over time. |
| **Front door** (`O`) | Click the door (in walk mode aim the crosshair and click) or press `O` / the panel button to swing it open or shut. Both leaves open separately; the door starts closed and blocks walking while shut. |
| **Reno** | Selected by default. Click to deselect for the existing house or select for the family plan with Japanese minimal. |
| **Interior** | Choose Japanese minimal, Scandinavian minimal, soft grey minimal or no furniture with the family plan. Includes the existing altar, shoe storage, dining area, beds and appliances. |
| **Lights** (`💡`) | Shown with an interior design. Washi pendants, ceiling lights, andon, bedside and LED fittings are real lights. *Auto* follows the sun clock: they fade in from sunset (sun below ≈ 6°) and are fully on after dusk; click to cycle *On* / *Off*. The red altar lamps stay lit day and night. |
| **Screenshot** | Saves a PNG of the current view. |
| `H` | Hide or show the panel. |

## Rendering notes

- **Lighting.**
  - The two most influential interior lamps near the camera cast shadows in real-time mode. Their shadow maps are reused until the scene changes, with a fixed budget to keep navigation responsive.
  - Sky and sun come from a CC0 HDRI (Poly Haven). The sun is extracted from the HDRI into a shadow-casting light, and it is positioned from the real solar position for Kuala Lumpur, clocked in Malaysia time (MYT, UTC+8): live by default, or pick any date / time. The house front faces south (north = −Z, east = +X in the scene).
  - Image-based lighting uses a partially white-balanced copy of the sky, which avoids the cold blue cast on shaded walls.
  - Interiors, and the covered porch, use a bounce-light environment instead of the blue sky.
- **Exposure** is metered like a camera: a tiny HDR render is read back asynchronously when the view or lighting changes. This lets you walk from the sunny street into the house and your eyes adapt. Photoreal mode meters the path-traced image itself.
- **Photoreal mode.**
  - Clear glass and lamp shades let direct light through in both rendering modes. The living window's
    smoke-grey glass casts shade in real-time mode; Photoreal mode transmits tinted light through it.
  - Uses 10 light bounces, 12 transmissive bounces, and 1024-pixel texture layers for more detailed surfaces and deeper indoor light transport. This mode requires more GPU memory than the real-time view.
  - Edge-aware denoising softens grain as samples accumulate, then reduces filtering to retain surface detail. Navigation shows the real-time view until eight samples have accumulated.
  - It is physically correct, so ground-floor rooms deep inside the terrace receive little daylight and take longer to lose their grain.
  - Exteriors, the balcony, and rooms with windows converge quickest.
- **Materials.** The PBR materials match the photos:
  - woven linen normal and roughness maps, fabric sheen, mineral detail in honed stone, and timber pore roughness
  - rounded mattresses, pillows and bedding that catch highlights naturally
  - beige 600×600 polished floor tiles
  - sage-green steel door frames and stair balustrade
  - red-brown bedroom doors, orange main door, and oak-PVC bathroom doors
  - grey bathroom tiles with a darker band
  - grey concrete roof tiles
  - galvanised gate and cement porch

- **Image quality.** AgX tone mapping is the default, with softer sun shadows, contact shading at half resolution and final-pass SMAA. Render scale defaults to **Auto**, adapting resolution during navigation; the scene stops redrawing when still. Manual scales support device pixel ratios up to 2 and offer 125% and 150% for extra detail; Render scale is separate from View scale. Photoreal loads when first selected.

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
- **Bathroom windows.** Existing house retains its original fixed corner window and separate openable frosted window. Renovation layouts move the corner window beside the other window on the outside wall and make it openable; the former return is closed and painted to match the master bedroom.
- **Party walls.** Only the house itself is modelled. Its two party walls are shown full height; neighbours, the opposite row, and the back-lane buildings were removed on request.
- **Surroundings.** One continuous square land base, approximately 25.8 m per side, is centered on the property. It retains front and rear road strips with open drains and crossings aligned to the active gate and rear entrance.
- **Removed clutter.** Rubbish bins, buckets, and the roadside tree/planter are left out. The rear-yard grass is replaced with concrete.
- **Heights.** Floor-to-floor height is 3.6 m. The ceiling is 3.45 m on the ground floor and about 3.05 m on the first floor. The roof pitch is 27°.
- **Two-part roof** (front/rear elevations, section, photos 101057/101103/101540). The main gable with its front eave covers the master side (x < 4.4 m). The strip above the bathrooms has its own lower roof: the rear slope continues the main one, and the front slope sits 0.65 m lower and ends behind the bathroom-box parapet (top 6.5 m). The ensuite ceiling under it is 2.45 m.
- **Front boundary** (photos 101057/101103). From each party wall there is a 1.5 m pier, then a low wall, then a gate pillar. The "45" pillar carries the number and a letter slot; the right pillar has the door-bell. Between the pillars is a 3.25 m double swing gate. All widths were scaled off the photos.
- **Car porch** (photos 101108/102754/102759/102804). Two 150 mm steps lead to the door: a full-width cement step from the west wall to a 0.4 m pillar at the east end of the façade, then the tiled thresholds of the two openings. The porch floor falls 150 mm from the gate to the foot of the steps. The ceiling is flat (3.35 m) with no cross beams: only the front edge beam, a 1.07 m wide dropped strip along the west wall (it also roofs the balcony notch) and a dropped box under the first-floor bathroom projection. Rough-rendered piers stand at the street end of both porch walls. The main door opening is 1.5 m (0.9 m active leaf + 0.5 m narrow leaf).
- **Balcony front.** Three ≈1.1 m glass panels sit between 0.22 m posts, then a ≈1.1 m solid block meets the east wall. The notch has a glass return. The east privacy wall beside the balcony is about 1.7 m high. Sizes were scaled off photos 101103/101556.

## Project layout

```
src/config.ts            all dimensions (single source of truth) + room list
src/designs.ts           structural layout concepts, minimal interior palettes and furniture choices
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
```

To change a dimension, edit `src/config.ts`. Everything, including the dimension labels, is derived from it.
