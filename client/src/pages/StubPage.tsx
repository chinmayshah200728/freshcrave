import { ArrowLeft, ArrowUpRight, Instagram } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { menuItems } from "@/lib/menu";

const pageCopy: Record<string, { eyebrow: string; title: string; body: string; cta: string }> = {
  "/menu": {
    eyebrow: "The counter is open",
    title: "A menu for the mood you’re in.",
    body: "Browse a fresh-first selection of open toasts, nourishing bowls, coffee and desserts. This is an editable menu preview while final availability and prices are confirmed.",
    cta: "Order from the homepage",
  },
  "/our-story": {
    eyebrow: "The TFC point of view",
    title: "Food made with intention.",
    body: "The Fresh Crave brings together fresh ingredients, considered flavours and a love for the everyday rituals that make eating well feel generous.",
    cta: "Meet the kitchen",
  },
  "/weekend-cravings": {
    eyebrow: "For plans worth lingering over",
    title: "Your weekend starts here.",
    body: "Brunches, family-table menus, dessert boxes and seasonal plates are built to be shared, gifted and remembered.",
    cta: "See featured dishes",
  },
  "/coffee-desserts": {
    eyebrow: "A little sweet. A little bold.",
    title: "Stay for the last pour.",
    body: "Cold coffee, espresso rituals and creamy desserts for the part of the meal where no one is ready to leave.",
    cta: "Explore the menu",
  },
  "/catering-gifting": {
    eyebrow: "Made for more than one",
    title: "Bring The Fresh Crave to the table.",
    body: "Corporate spreads, private gatherings, festive gifting and custom menus are available as the business grows. Tell us what you are planning.",
    cta: "Start an enquiry",
  },
  "/contact": {
    eyebrow: "Come say hello",
    title: "The kitchen is in Mumbai.",
    body: "Official address, hours, delivery areas and contact details will be added here once they are confirmed by The Fresh Crave team.",
    cta: "Follow on Instagram",
  },
  "/privacy": {
    eyebrow: "A quick read",
    title: "Privacy policy.",
    body: "This placeholder page is ready for the final privacy policy and customer-data language before launch.",
    cta: "Back to home",
  },
  "/terms": {
    eyebrow: "Before you order",
    title: "Terms & conditions.",
    body: "This placeholder page is ready for the final ordering, delivery and cancellation terms before launch.",
    cta: "Back to home",
  },
  "/refunds": {
    eyebrow: "We keep it clear",
    title: "Refund & cancellation policy.",
    body: "This placeholder page is ready for the final policy covering order changes, cancellations, refunds and delivery issues.",
    cta: "Back to home",
  },
  "/cart": {
    eyebrow: "Your takeaway tag",
    title: "Your cart lives on the homepage for now.",
    body: "This first build keeps your cart interactions close to the menu so the ordering journey feels immediate. Head back to the kitchen to add something good.",
    cta: "Return to kitchen",
  },
  "/checkout": {
    eyebrow: "Nearly there",
    title: "Checkout is integration-ready.",
    body: "Connect the confirmed delivery zones, payment provider and WhatsApp number here when the operational details are ready.",
    cta: "Return to kitchen",
  },
  "/order-confirmation": {
    eyebrow: "The good part",
    title: "Your order story starts here.",
    body: "This confirmation screen is ready to connect to the final order system once payment and fulfilment are configured.",
    cta: "Back to home",
  },
};

function CheckoutForm() {
  const [fulfilment, setFulfilment] = useState<"delivery" | "pickup">("delivery");
  const [submitted, setSubmitted] = useState(false);
  const [cartTotal] = useState(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem("freshcrave-cart") ?? "{}") as Record<string, number>;
      return Object.entries(stored).reduce((total, [id, quantity]) => total + (menuItems.find((item) => item.id === id)?.price ?? 0) * quantity, 0);
    } catch {
      return 0;
    }
  });

  if (submitted) {
    return (
      <div className="checkout-card checkout-card--success">
        <div className="checkout-card__tick">✓</div>
        <span className="eyebrow">Preview order received</span>
        <h2>That’s the good stuff.</h2>
        <p>Your order flow is connected. Add the final payment, fulfilment and WhatsApp details before going live.</p>
        <Link href="/" className="button button--dark">Back to the kitchen <ArrowUpRight size={16} /></Link>
      </div>
    );
  }

  return (
    <form className="checkout-card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <div className="checkout-card__header"><div><span className="eyebrow">Nearly there</span><h2>Make it yours.</h2></div><span className="checkout-card__amount">Cart total<br /><strong>₹{cartTotal.toLocaleString("en-IN")}</strong></span></div>
      <div className="checkout-toggle" role="group" aria-label="Choose fulfilment method">
        <button type="button" className={fulfilment === "delivery" ? "checkout-toggle__option checkout-toggle__option--active" : "checkout-toggle__option"} onClick={() => setFulfilment("delivery")}>Delivery</button>
        <button type="button" className={fulfilment === "pickup" ? "checkout-toggle__option checkout-toggle__option--active" : "checkout-toggle__option"} onClick={() => setFulfilment("pickup")}>Pickup</button>
      </div>
      <div className="checkout-form-grid">
        <label>Name<input required placeholder="Your name" /></label>
        <label>Phone<input required placeholder="+91" /></label>
        {fulfilment === "delivery" && <label className="checkout-form-grid__full">Delivery location<input required placeholder="Area, building and flat number" /></label>}
        <label className="checkout-form-grid__full">Special instructions<textarea placeholder="A note for the kitchen (optional)" rows={3} /></label>
      </div>
      <div className="checkout-card__foot"><span>Final payment and service areas will be connected after confirmation.</span><button className="button button--terracotta" type="submit">Place preview order <ArrowUpRight size={16} /></button></div>
    </form>
  );
}

export default function StubPage() {
  const [location] = useLocation();
  const content = pageCopy[location] ?? pageCopy["/menu"];
  const isInstagram = location === "/contact";

  if (location === "/checkout") {
    return <main className="stub-page"><div className="stub-page__grain" aria-hidden="true" /><div className="container stub-page__inner"><Link href="/" className="back-link"><ArrowLeft size={16} /> Back to the kitchen</Link><CheckoutForm /></div></main>;
  }

  return (
    <main className="stub-page">
      <div className="stub-page__grain" aria-hidden="true" />
      <div className="container stub-page__inner">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to the kitchen</Link>
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
        <div className="stub-page__actions">
          <Link href={isInstagram ? "https://www.instagram.com/thefreshcrave/" : "/"} className="button button--dark" target={isInstagram ? "_blank" : undefined}>
            {isInstagram ? <Instagram size={17} /> : <ArrowUpRight size={17} />}
            {content.cta}
          </Link>
          <span className="stub-page__note">Content is editable before launch.</span>
        </div>
      </div>
    </main>
  );
}
