# The Fresh Crave — Implementation Plan

## Scope

Continue the existing responsive website for The Fresh Crave with a kitchen-first, scroll-driven experience. The first scroll pushes the camera into the kitchen, where a single 3D Chef Crave guides visitors through six photo-based dishes. Preserve the editable menu, client-side cart and checkout experience, mobile usability, and warm editorial visual system. Use food images from the public @thefreshcrave Instagram account; do not render any food as 3D. Official business details that are not verified remain clearly labeled placeholders.

## Implementation approach

- Use the existing React + Vite + Tailwind starter in `client/` and keep the app static-first because ordering is a client-side prototype at this stage and no user accounts, payments, or database persistence were requested.
- Keep the primary route at `/` and add route placeholders for the requested internal pages through the existing Wouter router, with the same shell and focused page copy where helpful. The homepage is the main deliverable.
- Store the menu as typed local data in `client/src/lib/menu.ts`; use React state for filters, search, cart quantities, checkout steps, and modal/drawer interactions.
- Keep Three.js for one lazy-loaded Chef Crave GLB in the pinned tour; remove the 3D food component, its dish-model references, and the three food GLBs.
- Replace prototype food images with selected public food photos from the official `@thefreshcrave` Instagram account. Download images into the existing local asset tree and use local relative URLs rather than expiring Instagram CDN links.
- Add `public/manus-routes.json` before starting the dev server and keep it in sync with route declarations.
- Keep the kitchen interior as the entry backdrop and continuous kitchen atmosphere, plus the existing mascot artwork as the identity reference for the 3D chef. Use accessible alt text and lazy loading for below-the-fold imagery.

## Design system

### Style options considered

- **Mediterranean editorial kitchen** — warm natural light, premium food magazine composition, tactile materials. Probability 0.07.
- **Modern neon food lab** — sharp contrast, saturated accent lighting, experimental plating. Probability 0.04.
- **Minimal Scandinavian deli** — airy neutrals, restrained typography, quiet product-led layouts. Probability 0.06.

Chosen style: **Mediterranean editorial kitchen**.

### Design movement

Contemporary food editorial meets a sunlit home kitchen: tactile materials, slow camera-like transitions, and calm confidence rather than loud restaurant marketing.

### Core principles

1. Make Chef Crave the 3D focal point of the kitchen tour; authentic food photography supports the story.
2. Use warm, human details to make a cloud kitchen feel personal.
3. Keep ordering frictionless: every menu card has a clear action.
4. Make scrolling itself drive the camera and chef while Chef Crave narrates each dish, without blocking content or accessibility.

### Color philosophy

Use warm ivory as the canvas, espresso as the grounding ink, sage as the freshness signal, and terracotta as a restrained appetite cue. The palette should feel sun-warmed and ingredient-led rather than synthetic.

### Layout paradigm

Move directly from the kitchen entry into one pinned, full-viewport tour stage. The first scroll pushes the camera into the kitchen. Chef Crave invites the visitor along, then the long scroll track introduces all six actual menu products in order—Sourdough Avocado Toast, Emerald Harvest Bowl, Emerald Arborio, Roasted Carrot & Ginger Velouté, Coconut Espresso Cooler, and Pistachio Affogato—through camera movement, the 3D chef's path, and cross-fading photo panels. Continue into the brand story, curated menu, and ordering sections after the sequence.

### Signature elements

- A slim terracotta “fresh today” eyebrow and index markers that echo a kitchen ticket.
- Large rounded food photography paired with small handwritten-style metadata and serif headlines.
- A persistent cart pill that behaves like a takeaway bag tag.

### Interaction philosophy

Interactions should feel like being shown around a kitchen: scroll progress continuously pushes the camera into the kitchen and drives the 3D chef's position and gentle turns as dishes appear in sequence. The speech bubble and station marker follow the same progress. “Next station” advances to the corresponding scroll point. Menus filter instantly, cart feedback is visible but quiet, and all motion respects reduced-motion preferences.

### Animation

Use `framer-motion` `useScroll`/`useTransform` on a tall tour track to scrub the camera push-in/pan/scale, chef position/scale/turn, progress indicator, photo-scene opacity, and speech bubble with scroll position. Each of the six scenes is generated from the corresponding menu item and includes its Instagram-sourced food photo, description, price, Add to Cart action, and a short Chef Crave line; do not render food as 3D models. Generate one textured 3D chef from the existing mascot illustration and animate its position, scale, and gentle rotation through Three.js scroll-linked transforms; no skeletal rigging is in scope. Keep the stage pinned at the viewport while its track scrolls; on mobile simplify travel distances but retain the pinned sequence. With `prefers-reduced-motion`, hold the camera and chef steady and use gentle cross-fades only. Keep ordering actions immediate.

### Typography system

Use a refined serif display face for headlines and a clean sans-serif for navigation, labels, and product information. Establish strong type contrast: oversized hero headline, compact eyebrow, readable body copy, and mono-like small metadata for menu prices and availability.

### Brand essence

The Fresh Crave is fresh, thoughtful food for Mumbai cravings — **fresh, generous, considered**.

### Brand voice

Use warm, concise, sensory language with no inflated claims. Example lines: “Fresh Food. Thoughtfully Craved.” and “A little sweet. A little bold.”

### Wordmark & logo

Use a text wordmark treatment with “THE FRESH” in spaced uppercase sans-serif above a larger serif “CRAVE,” paired with a small terracotta leaf/plate mark. Keep it as HTML text so the owner can replace it with the official logo later.

### Signature brand color

Terracotta `#C96543` — a warm, ownable appetite cue used sparingly in CTAs, tags, and micro-details.

## Page structure

- `/`: kitchen-first homepage with an immediate pinned invitation and six-product, scroll-scrubbed camera/3D-chef/photo sequence followed by the brand story, editable menu, cart/order actions, contact, and footer.
- `/menu`, `/our-story`, `/weekend-cravings`, `/coffee-desserts`, `/catering-gifting`, `/contact`, `/cart`, `/checkout`, `/order-confirmation`, `/privacy`, `/terms`, `/refunds`: lightweight route-ready pages that share the navigation and direct users back to the main experience or cart where relevant.
- `public/manus-routes.json`: route manifest for all declared routes.

## Project structure

- `client/src/pages/Home.tsx`: main experience and local interaction orchestration.
- `client/src/components/KitchenChef3D.tsx`: lazy Three.js viewer for the single Chef Crave GLB, integrated as the tour's scroll-linked character.
- `client/src/pages/StubPage.tsx`: reusable internal page shell for route-ready pages.
- `client/src/lib/menu.ts`: typed menu data, categories, featured dishes, and placeholder business details.
- `client/src/index.css`: palette, typography, layout utilities, animation helpers, and responsive styling.
- `client/src/App.tsx`: router, global providers, route declarations.
- `client/public/assets/freshcrave/`: kitchen and mascot imagery, selected Instagram food photography, and `models/chef-crave.glb` served by Vite; no food GLBs are used.
- `public/manus-routes.json`: route manifest.

## Constraints and material choices

- Do not claim verified address, phone number, opening hours, delivery areas, reviews, or live Instagram content. The first menu uses clearly editable prototype prices and a focused set of stocked categories; the remaining catering, gifting, family-table, and seasonal paths are route-ready placeholders.
- Use public food photos from the official `@thefreshcrave` Instagram account as local website assets. Keep foods photo-based; only Chef Crave is a 3D model. Continue using the existing kitchen interior for the scroll-driven camera push-in.
- Use a client-side cart with localStorage handoff into an integration-ready delivery/pickup checkout form and confirmation state; no payment or server-side order persistence is wired in this version.
- Keep the first version publishable as a static frontend and avoid unnecessary server/database configuration.