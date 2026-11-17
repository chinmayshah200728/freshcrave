# The Fresh Crave — TODO

## 1. Preserve the existing cinematic homepage shell
- The homepage opens inside the warm modern café kitchen using the supplied kitchen interior; the kitchen atmosphere continues into the scroll experience.
- Keep the existing “Fresh Food. Thoughtfully Craved.” hero copy and the “Explore the Menu” and “Order Now” actions.
- Preserve the sticky navigation and its logo, Menu, Our Story, Weekend Cravings, Coffee & Desserts, Catering & Gifting, Contact, Cart, and Order Now destinations.
- Retain the current warm ivory, olive/sage, terracotta, espresso-brown, and charcoal palette, natural materials, elegant serif headlines, and clean sans-serif UI.

## 2. Deliver the seamless kitchen push-in with a 3D Chef Crave
- Join the opening and kitchen tour into one continuous pinned scene with no gap on the first downward scroll; scrolling pushes the camera into and through the kitchen.
- Keep the tour pinned while scroll progress advances the kitchen camera, moves Chef Crave, and reveals the six dishes in this exact order: Sourdough Avocado Toast, Emerald Harvest Bowl, Emerald Arborio, Roasted Carrot & Ginger Velouté, Coconut Espresso Cooler, and Pistachio Affogato.
- Replace the flat mascot artwork as the tour's main character with one textured 3D Chef Crave GLB generated from the existing mascot illustration. Preserve the mascot's recognizable face, chef hat/uniform, and brand colors.
- Remove all 3D food presentations, dish-model viewers, and food-model loading from the tour and product UI. Use actual food photographs from the official @thefreshcrave Instagram account as local website assets for all six dishes; do not hotlink expiring Instagram CDN URLs or display food as 3D models anywhere on the site.
- Make the first scroll feel like a camera push-in to the kitchen, then use scroll-linked position, scale, and gentle turning of the 3D chef to guide visitors through the kitchen stations. Keep the existing kitchen background and continuous atmosphere.
- Keep the guide's speech bubble, station indicator, highlighted product, animation progress, product name, description, price, photo, and cart action synchronized to the same scroll state.
- “Next station” and the guide's keyboard-accessible action move to the corresponding product in the same sequence; the chef visual must not obstruct scrolling, ordering, or cart actions.
- Keep movement performance-friendly and respect reduced-motion preferences by holding the camera and chef steady and using gentle fades.
- Use a compact pinned scene and shorter movement distances on mobile while preserving the same sequence and interactions.
- Generate only the single chef model for this change; do not generate or rig food models.

## 3. Preserve the editable menu and featured food experience
- Keep the focused stocked menu for Breakfast & Brunch, Bowls & Salads, Soups & Comfort, Coffee & Drinks, and Desserts; retain Weekend Specials, Family Table, Catering, Festive Gifting, Open Toasts, and Main Plates as route-ready placeholders for final menu data.
- Menu items include image, name, description, prototype price, dietary tags, badges, quantity controls, and Add to Cart; final ingredients, allergens, availability, and approved prices remain editable before launch.
- Preserve menu category filtering and search.
- Keep unverified business details and product data as editable placeholders rather than fabricating official information.

## 4. Preserve cart and checkout interactions
- Visitors can add menu products, change quantities, remove items, and see a cart count and subtotal.
- Visitors can select delivery or pickup, add location and special instructions, and view the cart total in an order summary.
- Checkout retains an integration-ready confirmation state and makes no live-payment claim; final WhatsApp ordering and payment can be connected once official business details are supplied.
- Mobile retains a sticky Order Now/cart affordance.

## 5. Preserve supporting brand sections and route-ready pages
- Homepage includes the brand story, weekend cravings, coffee & desserts, how it works, catering/gifting, testimonials as editable placeholders, Instagram link/gallery placeholder, contact/location placeholders, and footer policies.
- Router includes Home, Full Menu, Product Details fallback behavior, Our Story, Weekend Cravings, Coffee & Desserts, Catering & Gifting, Contact, Cart, Checkout, Order Confirmation, Privacy Policy, Terms and Conditions, and Refund/Cancellation Policy route placeholders.

## 6. Preserve responsive, accessible, and SEO-ready frontend behavior
- Layout works on desktop, tablet, and mobile with readable typography, touch-friendly controls, semantic headings, alt text, visible focus states, and accessible contrast.
- Images below the fold are lazy-loaded and nonessential motion responds to `prefers-reduced-motion`.
- Initial HTML metadata and Open Graph description are set for The Fresh Crave and Mumbai fresh food.
- `public/manus-routes.json` lists every declared page route and is served as JSON.

## 7. Deliver a checked, preview-ready build
- Continue from the existing supplied Fresh Crave source bundle, preserving its React/Vite project structure and existing generated assets except for the three food GLBs and viewer being removed.
- The site uses the configured runtime port and remains preview-ready without adding live payments, accounts, or persistent backend storage.
- TypeScript diagnostics and the relevant project check/build complete without actionable errors.
- The managed preview serves the imported and updated website. Publication is separate and is not requested.
