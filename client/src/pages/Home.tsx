import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, useLocation } from "wouter";
import {
  businessPlaceholders,
  menuCategories,
  menuItems,
  type MenuCategory,
  type MenuItem,
  weekendSpecials,
} from "@/lib/menu";

type CartState = Record<string, number>;
type KitchenSceneId = "avocado-toast" | "harvest-bowl" | "emerald-arborio" | "carrot-veloute" | "coconut-espresso" | "pistachio-affogato";
type KitchenStop = "welcome" | "story" | KitchenSceneId | "menu" | "weekend" | "coffee" | "ordering" | "contact";
const kitchenIntroProgress = 0.14;

const kitchenGuideStops: Array<{ id: KitchenStop; label: string; message: string }> = [
  { id: "welcome", label: "At the kitchen door", message: "Hi, I’m Chef Crave. Come with me—there’s something good on every counter." },
  { id: "avocado-toast", label: "The breakfast window", message: "Come with me! First on the pass: our Sourdough Avocado Toast—creamy avocado, a soft egg and a little chilli." },
  { id: "harvest-bowl", label: "The greens counter", message: "Lovely start. Let’s see some other yummy stuff—this bright Emerald Harvest Bowl is up next." },
  { id: "emerald-arborio", label: "The risotto stove", message: "Keep following me. Here’s Emerald Arborio: creamy rice folded with greens, herbs and parmesan." },
  { id: "carrot-veloute", label: "By the soup pot", message: "Next stop, the stove. Roasted carrot and fresh ginger, warmed into a silky, comforting bowl." },
  { id: "coconut-espresso", label: "The coffee counter", message: "Now for a cool-down: Coconut Espresso Cooler, smooth coffee with a little coconut cream." },
  { id: "pistachio-affogato", label: "The sweet finish", message: "And one sweet last stop—pistachio gelato, a hot espresso pour, and just enough crunch." },
  { id: "story", label: "The kitchen", message: "That’s the tour! Thanks for coming along—now the full counter is yours to explore." },
  { id: "menu", label: "Today’s counter", message: "Everything on today’s counter is below. Filter by craving, then add your pick to the cart." },
  { id: "weekend", label: "The weekend table", message: "Brunch, family tables and little sweet gifts—this station is made for sharing at your own pace." },
  { id: "coffee", label: "Coffee & something sweet", message: "A little sweet, a little bold: coffee, pistachio and dessert to finish the tour." },
  { id: "ordering", label: "Ready when you are", message: "Found your craving? Add it to your bag, adjust quantities, and keep exploring." },
  { id: "contact", label: "That’s our kitchen", message: "Thanks for stopping by. Check below for the latest ways to connect with The Fresh Crave." },
];

const storageImages = {
  hero: "/assets/freshcrave/kitchen-background.webp",
  ingredients: "/assets/freshcrave/ingredients.webp",
  toast: "/assets/freshcrave/toast.webp",
  bowl: "/assets/freshcrave/bowl.webp",
  soup: "/assets/freshcrave/carrot-soup.webp",
  coffee: "/assets/freshcrave/coffee.webp",
  chefFront: "/assets/freshcrave/chef-mascot.webp",
  chefPointing: "/assets/freshcrave/chef-mascot.webp",
  chefPresenting: "/assets/freshcrave/chef-mascot.webp",
};

type KitchenScene = {
  id: KitchenSceneId;
  number: string;
  station: string;
  item: MenuItem;
};

const kitchenSceneStations: Array<{ id: KitchenSceneId; station: string }> = [
  { id: "avocado-toast", station: "THE BREAKFAST WINDOW" },
  { id: "harvest-bowl", station: "THE GREENS COUNTER" },
  { id: "emerald-arborio", station: "THE RISOTTO STOVE" },
  { id: "carrot-veloute", station: "BY THE SOUP POT" },
  { id: "coconut-espresso", station: "THE COFFEE COUNTER" },
  { id: "pistachio-affogato", station: "THE SWEET FINISH" },
];

const kitchenScenes: KitchenScene[] = kitchenSceneStations.map((station, index) => ({
  ...station,
  number: String(index + 1).padStart(2, "0"),
  item: menuItems.find((item) => item.id === station.id)!,
}));

function KitchenScrollScene({
  scene,
  index,
  progress,
  active,
  reducedMotion,
  message,
  onAdd,
}: {
  scene: KitchenScene;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  reducedMotion: boolean;
  message: string;
  onAdd: (item: MenuItem) => void;
}) {
  const sceneSize = (1 - kitchenIntroProgress) / kitchenScenes.length;
  const start = kitchenIntroProgress + index * sceneSize;
  const end = start + sceneSize;
  const blend = sceneSize * 0.18;
  const inputRange = [Math.max(0, start - blend), Math.min(1, start + blend), Math.max(0, end - blend), Math.min(1, end + blend)];
  const outputRange = index === kitchenScenes.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, inputRange, outputRange);
  const y = useTransform(progress, inputRange, reducedMotion ? [0, 0, 0, 0] : [26, 0, 0, -18]);

  return (
    <motion.article className="kitchen-scroll__scene" style={{ opacity, y, pointerEvents: active ? "auto" : "none" }} aria-hidden={!active}>
      <div className="kitchen-scroll__scene-copy">
        <span className="kitchen-scroll__station">{scene.number} / 06 <i /> {scene.station}</span>
        <h2>{scene.item.name}</h2>
        <p className="kitchen-scroll__description">{scene.item.description}</p>
        <div className="kitchen-scroll__voice-mobile"><span>CHEF CRAVE SAYS</span><p>{message}</p></div>
      </div>
      <figure className="kitchen-scroll__dish">
        <img src={scene.item.image} alt={scene.item.name} loading="lazy" />
        <figcaption><span>{scene.item.category.toUpperCase()} · {money(scene.item.price)}</span><strong>{scene.item.name}</strong></figcaption>
        <button className="kitchen-scroll__add" onClick={() => onAdd(scene.item)}><Plus size={15} /> Add to bag</button>
      </figure>
    </motion.article>
  );
}

const navItems = [
  { label: "Menu", href: "#menu" },
  { label: "Our story", href: "#story" },
  { label: "Weekend", href: "#weekend" },
  { label: "Coffee + sweets", href: "#coffee" },
  { label: "Catering + gifting", href: "/catering-gifting" },
  { label: "Contact", href: "#contact" },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`wordmark ${light ? "wordmark--light" : ""}`} aria-label="The Fresh Crave home">
      <span>THE FRESH</span>
      <strong>CRAVE</strong>
      <i aria-hidden="true">•</i>
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</span>;
}

function AddButton({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <button className="product-card__add" onClick={() => onAdd(item)} aria-label={`Add ${item.name} to cart`}>
      <Plus size={17} strokeWidth={2.5} />
      <span>Add to cart</span>
    </button>
  );
}

function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <motion.article className="product-card" layout whileHover={{ y: -7 }} transition={{ duration: 0.22 }}>
      <div className="product-card__media" style={{ background: item.accent }}>
        <img src={item.image} alt={item.name} loading="lazy" />
        {item.badge && <span className="product-card__badge">{item.badge}</span>}
        <span className="product-card__index">{item.category.split(" ")[0]}</span>
      </div>
      <div className="product-card__body">
        <div className="product-card__heading">
          <h3>{item.name}</h3>
          <span className="product-card__price">{money(item.price)}</span>
        </div>
        <p>{item.description}</p>
        <div className="product-card__meta">
          <span>{item.tags[0]}</span>
          <span>{item.tags[1]}</span>
        </div>
        <AddButton item={item} onAdd={onAdd} />
      </div>
    </motion.article>
  );
}

function CartDrawer({
  cart,
  onClose,
  onUpdate,
  onClear,
  onCheckout,
}: {
  cart: CartState;
  onClose: () => void;
  onUpdate: (id: string, quantity: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}) {
  const cartProducts = menuItems.filter((item) => cart[item.id]);
  const total = cartProducts.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <>
      <motion.button className="drawer-backdrop" aria-label="Close cart" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.aside className="cart-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} aria-label="Shopping cart">
        <div className="cart-drawer__top">
          <div>
            <Eyebrow>Your takeaway tag</Eyebrow>
            <h2>Good things, this way.</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart"><X size={20} /></button>
        </div>
        {cartProducts.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__mark"><ShoppingBag size={24} /></div>
            <h3>Your cart is still thinking.</h3>
            <p>Add a craving from the menu and it will show up here.</p>
            <button className="button button--dark" onClick={onClose}>Browse the menu <ArrowDown size={16} /></button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartProducts.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item__copy">
                    <div className="cart-item__line"><h3>{item.name}</h3><span>{money(item.price * (cart[item.id] ?? 0))}</span></div>
                    <span className="cart-item__tag">{item.tags[0]}</span>
                    <div className="quantity-control">
                      <button onClick={() => onUpdate(item.id, (cart[item.id] ?? 0) - 1)} aria-label={`Remove one ${item.name}`}><Minus size={14} /></button>
                      <span>{cart[item.id]}</span>
                      <button onClick={() => onUpdate(item.id, (cart[item.id] ?? 0) + 1)} aria-label={`Add one ${item.name}`}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-drawer__bottom">
              <div className="cart-total"><span>{count} {count === 1 ? "item" : "items"}</span><strong>{money(total)}</strong></div>
              <button className="button button--terracotta button--wide" onClick={onCheckout}>Continue to checkout <ArrowRight size={16} /></button>
              <button className="cart-clear" onClick={onClear}>Clear cart</button>
            </div>
          </>
        )}
      </motion.aside>
    </>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const reducedMotion = Boolean(reduceMotion);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [, navigate] = useLocation();
  const kitchenTourRef = useRef<HTMLElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress: kitchenProgress } = useScroll({ target: kitchenTourRef, offset: ["start start", "end end"] });
  const cameraStops = [0, kitchenIntroProgress, ...kitchenScenes.map((_, index) => kitchenIntroProgress + ((index + 0.5) / kitchenScenes.length) * (1 - kitchenIntroProgress)), 1];
  const cameraScale = useTransform(kitchenProgress, cameraStops, reducedMotion ? [1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08] : [1.02, 1.32, 1.25, 1.15, 1.28, 1.14, 1.3, 1.13, 1.08]);
  const cameraX = useTransform(kitchenProgress, cameraStops, reducedMotion ? ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%"] : ["0%", "-5%", "-4%", "4%", "-5%", "5%", "-5%", "4%", "0%"]);
  const mascotTravel = Math.min(112, Math.max(24, viewportWidth * 0.065));
  const mascotX = useTransform(kitchenProgress, cameraStops, reducedMotion ? [0, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 0, -mascotTravel * 0.35, -mascotTravel, mascotTravel * 0.28, -mascotTravel, mascotTravel * 0.25, -mascotTravel * 0.82, 0]);
  const mascotY = useTransform(kitchenProgress, cameraStops, reducedMotion ? [0, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 0, -18, -8, 8, -15, 6, -18, 0]);
  const mascotTurn = useTransform(kitchenProgress, cameraStops, reducedMotion ? [0, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 0, 4, -4, 4, -3, 3, -3, 0]);
  const welcomeOpacity = useTransform(kitchenProgress, [0, 0.08, kitchenIntroProgress], [1, 1, 0]);
  const mascotTiltX = useTransform(pointerY, [-0.5, 0.5], [5, -5]);
  const mascotTiltY = useTransform(pointerX, [-0.5, 0.5], [-9, 9]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartState>({});
  const [activeCategory, setActiveCategory] = useState<"All" | MenuCategory>("All");
  const [query, setQuery] = useState("");
  const [activeGuideStop, setActiveGuideStop] = useState<KitchenStop>("welcome");
  const [showStoryPanel, setShowStoryPanel] = useState(false);
  const [kitchenTourVisible, setKitchenTourVisible] = useState(false);
  const [welcomePassed, setWelcomePassed] = useState(false);

  useMotionValueEvent(kitchenProgress, "change", (progress) => {
    const hasPassedWelcome = progress >= kitchenIntroProgress;
    setWelcomePassed((current) => current === hasPassedWelcome ? current : hasPassedWelcome);
    if (!hasPassedWelcome) {
      setActiveGuideStop((current) => current === "welcome" ? current : "welcome");
      return;
    }
    const productProgress = (progress - kitchenIntroProgress) / (1 - kitchenIntroProgress);
    const sceneIndex = Math.min(kitchenScenes.length - 1, Math.floor(productProgress * kitchenScenes.length));
    const sceneId = kitchenScenes[sceneIndex]?.id;
    if (sceneId) setActiveGuideStop((current) => current === sceneId ? current : sceneId);
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onResize = () => setViewportWidth(window.innerWidth);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-kitchen-stop]");
    const tourTarget = kitchenTourRef.current;
    if (!targets.length && !tourTarget) return;
    const observer = new IntersectionObserver((entries) => {
      const tourEntry = entries.find((entry) => entry.target === tourTarget);
      if (tourEntry) setKitchenTourVisible(tourEntry.isIntersecting);
      const visible = entries
        .filter((entry) => entry.isIntersecting && entry.target !== tourTarget)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const stop = (visible?.target as HTMLElement | undefined)?.dataset.kitchenStop as KitchenStop | undefined;
      if (stop) setActiveGuideStop(stop);
    }, { rootMargin: "-32% 0px -42% 0px", threshold: [0, 0.2, 0.45] });
    targets.forEach((target) => observer.observe(target));
    if (tourTarget) observer.observe(tourTarget);
    return () => observer.disconnect();
  }, []);

  const handleTourPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTourPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const filteredItems = useMemo(() => menuItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const needle = query.trim().toLowerCase();
    const matchesSearch = !needle || `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(needle);
    return matchesCategory && matchesSearch;
  }), [activeCategory, query]);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const activeGuide = kitchenGuideStops.find((stop) => stop.id === activeGuideStop) ?? kitchenGuideStops[0];
  const activeSceneIndex = Math.max(0, kitchenScenes.findIndex((scene) => scene.id === activeGuideStop));
  const activeScene = kitchenScenes[activeSceneIndex] ?? kitchenScenes[0];
  const isInAnimatedTour = kitchenTourVisible || kitchenScenes.some((scene) => scene.id === activeGuideStop);

  const scrollToKitchenScene = (sceneIndex: number) => {
    if (!kitchenTourRef.current) return;
    const tourTop = window.scrollY + kitchenTourRef.current.getBoundingClientRect().top;
    const scrollableLength = Math.max(0, kitchenTourRef.current.offsetHeight - window.innerHeight);
    const sceneProgress = kitchenIntroProgress + ((sceneIndex + 0.5) / kitchenScenes.length) * (1 - kitchenIntroProgress);
    window.scrollTo({ top: tourTop + scrollableLength * sceneProgress, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const continueKitchenTour = () => {
    const currentIndex = kitchenGuideStops.findIndex((stop) => stop.id === activeGuideStop);
    const nextStop = kitchenGuideStops[(currentIndex + 1) % kitchenGuideStops.length];
    const nextSceneIndex = kitchenScenes.findIndex((scene) => scene.id === nextStop.id);
    if (nextSceneIndex >= 0) {
      scrollToKitchenScene(nextSceneIndex);
      return;
    }
    document.querySelector(`[data-kitchen-stop="${nextStop.id}"]`)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const addToCart = (item: MenuItem) => {
    setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
    setCartOpen(true);
  };

  const updateCart = (id: string, quantity: number) => {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  };

  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner container">
          <Wordmark light={!scrolled} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="site-header__actions">
            <button className="cart-pill" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
              <ShoppingBag size={17} />
              <span>Cart</span>
              <b>{String(cartCount).padStart(2, "0")}</b>
            </button>
            <button className="button button--dark header-order" onClick={scrollToMenu}>Order now <ArrowUpRight size={15} /></button>
            <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}<ArrowUpRight size={15} /></a>)}
              <button className="button button--terracotta button--wide" onClick={() => { setMobileMenuOpen(false); scrollToMenu(); }}>Order now <ArrowRight size={16} /></button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          className="kitchen-scroll"
          id="kitchen-tour"
          ref={kitchenTourRef}
          aria-label="Scroll-guided tour of all six Fresh Crave menu products"
        >
          <div className="kitchen-scroll__stage" onPointerMove={handleTourPointerMove} onPointerLeave={resetTourPointer}>
            <motion.div className="kitchen-scroll__background" style={{ backgroundImage: `url(${storageImages.hero})`, scale: cameraScale, x: cameraX }} aria-hidden="true" />
            <div className="kitchen-scroll__wash" />
            <motion.div
              className="hero kitchen-scroll__welcome"
              style={{ opacity: welcomeOpacity, pointerEvents: welcomePassed ? "none" : "auto" }}
              data-kitchen-stop="welcome"
              aria-hidden={welcomePassed}
            >
              <div className="container hero__inner">
                <motion.div className="hero__copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7 }}>
                  <Eyebrow><Sparkles size={13} /> Mumbai · made fresh</Eyebrow>
                  <h1 id="hero-heading">Fresh food.<br /><em>Thoughtfully</em> craved.</h1>
                  <p>Come through our kitchen with Chef Crave — meet the ingredients, plates and little rituals behind every craving.</p>
                  <div className="hero__buttons">
                    <button className="button button--terracotta" onClick={scrollToMenu}>Explore the menu <ArrowRight size={16} /></button>
                    <button className="text-link" onClick={() => scrollToKitchenScene(0)}>Meet the kitchen <ArrowDown size={15} /></button>
                  </div>
                  <div className="hero__stamp"><span>01</span><span>Step inside</span><i /></div>
                </motion.div>
              </div>
              <div className="hero__foot container"><span>Scroll to step into the kitchen</span><ArrowDown size={16} /><span className="hero__foot-line" /></div>
            </motion.div>
            <div className="kitchen-scroll__topline"><span><i /> CHEF CRAVE’S KITCHEN</span><span>Scroll to travel with me</span></div>
            <div className="kitchen-scroll__progress"><div><motion.span style={{ scaleX: kitchenProgress }} /></div><b>{activeScene.number} / 06</b></div>
            <div className="kitchen-scroll__title"><span>ONE KITCHEN · SIX CRAVINGS</span><p>Follow the chef, find your next favourite.</p></div>

            {kitchenScenes.map((scene, index) => {
              const message = kitchenGuideStops.find((stop) => stop.id === scene.id)?.message ?? "";
              return <KitchenScrollScene key={scene.id} scene={scene} index={index} progress={kitchenProgress} active={activeGuideStop === scene.id} reducedMotion={reducedMotion} message={message} onAdd={addToCart} />;
            })}

            <motion.button
              type="button"
              className="kitchen-scroll__mascot"
              style={{ x: mascotX, y: mascotY, rotate: mascotTurn, rotateX: mascotTiltX, rotateY: mascotTiltY }}
              onClick={continueKitchenTour}
              whileHover={reducedMotion ? undefined : { scale: 1.025 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              aria-label={activeGuideStop === "welcome" ? "Join Chef Crave for the kitchen tour" : `Follow Chef Crave to the next product after ${activeScene.item.name}`}
              aria-live="polite"
            >
              <img src={storageImages.chefPresenting} alt="" />
              <span className="kitchen-scroll__mascot-note"><b>CHEF CRAVE · {activeGuide.label}</b><span>{activeGuide.message}</span><i /></span>
            </motion.button>

            <div className="kitchen-scroll__instruction"><ArrowDown size={15} /> Keep scrolling to meet the next dish</div>
            <div className="kitchen-scroll__stepper" aria-label="Kitchen tour products">
              {kitchenScenes.map((scene, index) => (
                <button key={scene.id} type="button" className={index === activeSceneIndex ? "is-active" : ""} onClick={() => scrollToKitchenScene(index)} aria-label={`Go to ${scene.item.name}`} aria-current={index === activeSceneIndex ? "step" : undefined}>
                  <b>{scene.number}</b><span>{scene.item.name}</span>
                </button>
              ))}
            </div>
            <button className="kitchen-scroll__advance" type="button" onClick={continueKitchenTour}>Next dish <ArrowDown size={15} /></button>
            <div className="kitchen-scroll__bottom-progress"><motion.span style={{ scaleX: kitchenProgress }} /></div>
          </div>
        </section>

        <section className="intro-strip container" id="story" data-kitchen-stop="story">
          <div className="intro-strip__mark"><Leaf size={18} /><span>Freshly<br />considered</span></div>
          <p>Not a restaurant you have to dress up for. Not a meal you’ll forget five minutes later. <strong>The Fresh Crave is food with a point of view — generous, bright and made for the way you actually live.</strong></p>
          <button className="round-arrow" onClick={() => setShowStoryPanel((open) => !open)} aria-label="Read more about The Fresh Crave"><ArrowDown size={18} /></button>
        </section>

        <AnimatePresence>
          {showStoryPanel && (
            <motion.div className="story-reveal container" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <div><Eyebrow>The TFC point of view</Eyebrow><h2>A little more care in every bite.</h2></div>
              <p>We believe fresh food can be everyday food. Our kitchen is built around ingredients that feel alive, combinations that surprise you in the best way, and plates that leave you feeling looked after.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="menu-section container" id="menu" aria-labelledby="menu-heading" data-kitchen-stop="menu">
          <div className="section-heading">
            <div><Eyebrow>What are you craving today?</Eyebrow><h2 id="menu-heading">A menu with <em>good energy.</em></h2></div>
            <p>Small-batch plates, bright bowls and coffee worth building a day around. Final availability and pricing are editable before launch.</p>
          </div>
          <div className="menu-toolbar">
            <div className="category-tabs" role="tablist" aria-label="Menu categories">
              {menuCategories.map((category) => <button key={category} className={activeCategory === category ? "category-tab category-tab--active" : "category-tab"} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
            </div>
            <label className="search-field"><Search size={16} /><span className="sr-only">Search menu</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the menu" /></label>
          </div>
          <motion.div className="product-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => <MenuCard item={item} onAdd={addToCart} key={item.id} />)}
            </AnimatePresence>
          </motion.div>
          {filteredItems.length === 0 && <div className="empty-menu"><Search size={20} /><p>Nothing matched that craving yet. Try another word.</p></div>}
          <div className="menu-foot"><span><span className="status-dot" /> Menu is editable · official details coming soon</span><Link href="/menu" className="text-link">View full menu <ArrowUpRight size={15} /></Link></div>
        </section>

        <section className="quote-section container">
          <div className="quote-section__image"><img src={storageImages.toast} alt="Open sourdough avocado toast with greens" loading="lazy" /><span className="quote-section__image-note">Sourdough · avocado · good morning</span></div>
          <div className="quote-section__copy"><Eyebrow>Our kind of healthy</Eyebrow><blockquote>“The best kind of food is the kind you <em>look forward to</em>.”</blockquote><p>Balanced doesn’t have to mean boring. It can mean a soft egg, crispy edges, a bright dressing and one more bite than you planned.</p><a href="#menu" className="button button--outline">Find your plate <ArrowRight size={16} /></a></div>
        </section>

        <section className="weekend-section" id="weekend" aria-labelledby="weekend-heading" data-kitchen-stop="weekend">
          <div className="container">
            <div className="section-heading section-heading--light"><div><Eyebrow light>Made for the days with nowhere to rush</Eyebrow><h2 id="weekend-heading">Weekend <em>cravings.</em></h2></div><p>Brunch, family tables, little gifts and seasonal plates — planned for sharing, or not. We won’t judge.</p></div>
            <div className="specials-grid">
              {weekendSpecials.map((special, index) => <motion.article key={special.title} className="special-card" whileHover={{ y: -5 }}><span className="special-card__number">0{index + 1}</span><div className="special-card__icon">{index === 0 ? <Heart size={19} /> : index === 1 ? <Sparkles size={19} /> : <Leaf size={19} />}</div><Eyebrow light>{special.label}</Eyebrow><h3>{special.title}</h3><p>{special.copy}</p><a href="#contact" className="text-link text-link--light">Make a plan <ArrowUpRight size={15} /></a></motion.article>)}
            </div>
          </div>
        </section>

        <section className="coffee-section container" id="coffee" data-kitchen-stop="coffee">
          <div className="coffee-section__copy"><Eyebrow>For the last pour</Eyebrow><h2>A little sweet.<br /><em>A little bold.</em></h2><p>Cold coffee, pistachio, cream and the kind of dessert that makes you check if anyone else is really going to finish it.</p><div className="coffee-section__buttons"><a href="#menu" className="button button--dark">Explore coffee + sweets <ArrowRight size={16} /></a><a href="https://www.instagram.com/thefreshcrave/" target="_blank" rel="noreferrer" className="text-link">See the latest on Instagram <Instagram size={15} /></a></div></div>
          <div className="coffee-section__visual"><img src={storageImages.coffee} alt="Coconut espresso cooler and pistachio affogato" loading="lazy" /><div className="coffee-section__caption"><span>Today’s pairing</span><strong>Coconut espresso<br />+ pistachio affogato</strong></div></div>
        </section>

        <section className="steps-section container" id="how-it-works" data-kitchen-stop="ordering">
          <div className="steps-section__header"><Eyebrow>How the good stuff gets to you</Eyebrow><h2>Choose. We cook.<br /><em>You enjoy.</em></h2></div>
          <div className="steps-grid">
            {[{ n: "01", t: "Choose your craving", d: "Browse the counter and save room for something sweet." }, { n: "02", t: "We prepare it fresh", d: "Your order gets a little kitchen attention, not a conveyor belt." }, { n: "03", t: "Enjoy it your way", d: "Delivery, pickup or a shared table — final options coming soon." }].map((step) => <div className="step-card" key={step.n}><span>{step.n}</span><div><h3>{step.t}</h3><p>{step.d}</p></div></div>)}
          </div>
        </section>

        <section className="contact-section container" id="contact" data-kitchen-stop="contact">
          <div className="contact-card"><div className="contact-card__content"><Eyebrow light>Come say hello</Eyebrow><h2>The kitchen is in<br /><em>{businessPlaceholders.city}.</em></h2><p>Official address, hours and delivery areas will be added when confirmed. For now, follow along for what’s fresh.</p><div className="contact-card__details"><span><MapPin size={16} /> {businessPlaceholders.city}</span><span><Clock3 size={16} /> {businessPlaceholders.hours}</span></div><a href="https://www.instagram.com/thefreshcrave/" target="_blank" rel="noreferrer" className="button button--cream"><Instagram size={16} /> Follow @thefreshcrave</a></div><div className="contact-card__mascot"><img src={storageImages.chefPresenting} alt="Cartoon chef mascot illustration presenting the kitchen" /></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__top"><div><Wordmark light /><p>Fresh food, thoughtful flavours<br />and something worth craving.</p></div><div className="footer-links"><div><span>Explore</span><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#weekend">Weekend cravings</a></div><div><span>More</span><Link href="/catering-gifting">Catering + gifting</Link><Link href="/contact">Contact</Link><a href="https://www.instagram.com/thefreshcrave/" target="_blank" rel="noreferrer">Instagram</a></div></div><div className="footer-note"><span>Made for Mumbai</span><strong>Good food<br />travels.</strong><Send size={18} /></div></div>
        <div className="container site-footer__bottom"><span>© 2026 The Fresh Crave</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refunds">Refunds</Link></div><span>Built with a little extra care</span></div>
      </footer>

      <AnimatePresence>{cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onUpdate={updateCart} onClear={() => setCart({})} onCheckout={() => { try { window.localStorage.setItem("freshcrave-cart", JSON.stringify(cart)); } catch { /* storage is optional */ } setCartOpen(false); navigate("/checkout"); }} />}</AnimatePresence>
      {cartCount > 0 && <button className="mobile-cart-bar" onClick={() => setCartOpen(true)}><span><ShoppingBag size={17} /> {cartCount} {cartCount === 1 ? "item" : "items"}</span><strong>Review cart <ArrowRight size={15} /></strong></button>}
      <aside className={`kitchen-guide ${scrolled ? "kitchen-guide--visible" : ""} ${isInAnimatedTour ? "kitchen-guide--in-tour" : ""}`} aria-label="Chef Crave kitchen guide" aria-live="polite">
        <div className="kitchen-guide__mascot"><img src={storageImages.chefPointing} alt="" /></div>
        <div className="kitchen-guide__copy">
          <span>Chef Crave · {activeGuide.label}</span>
          <p>{activeGuide.message}</p>
          <button onClick={continueKitchenTour}>Next stop <ArrowRight size={14} /></button>
        </div>
      </aside>
    </div>
  );
}
