const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getGsap = () => {
  if (window.gsap) {
    return Promise.resolve(window.gsap);
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    script.onload = () => resolve(window.gsap || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
};

const applyTilt = (card, gsap, intensity = 10) => {
  if (!card || prefersReducedMotion) {
    return;
  }

  const xTo = gsap.quickTo(card, "rotationY", { duration: 0.25, ease: "power2.out" });
  const yTo = gsap.quickTo(card, "rotationX", { duration: 0.25, ease: "power2.out" });
  const zTo = gsap.quickTo(card, "y", { duration: 0.25, ease: "power2.out" });

  card.style.transformPerspective = "1300px";
  card.style.transformStyle = "preserve-3d";

  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    xTo((x - 0.5) * intensity);
    yTo((0.5 - y) * intensity);
    zTo(-2);
  });

  card.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
    zTo(0);
  });
};

const magneticButtons = (gsap) => {
  if (prefersReducedMotion) {
    return;
  }

  const buttons = document.querySelectorAll(".nav-btn, .cta-btn, .google-btn, .social-icon, .signup-btn, .back-home-btn, .btn, .pay-btn");

  buttons.forEach((button) => {
    const xTo = gsap.quickTo(button, "x", { duration: 0.22, ease: "power2.out" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.22, ease: "power2.out" });
    const scaleTo = gsap.quickTo(button, "scale", { duration: 0.22, ease: "power2.out" });

    button.addEventListener("mousemove", (event) => {
      const bounds = button.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      xTo(x * 0.08);
      yTo(y * 0.08);
      scaleTo(1.03);
    });

    button.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    });
  });
};

const floatDots = (gsap) => {
  const dots = [...document.querySelectorAll(".dot")];
  if (!dots.length || prefersReducedMotion) {
    return;
  }

  gsap.to(dots, {
    y: 6,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    stagger: 0.12
  });
};

const pageEntrance = (gsap) => {
  if (prefersReducedMotion) {
    return;
  }

  gsap.fromTo(
    document.body,
    { autoAlpha: 0, y: 10, scale: 0.995 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out", clearProps: "transform" }
  );
};

const revealOnScroll = (gsap) => {
  const targets = document.querySelectorAll(
    ".product-card, .latest-desc, .latest-img, .option, .cart-item, .info-box, .method-box, .qr-box, .total, .box, .title, .product-title, .cards, .actions"
  );

  if (!targets.length || prefersReducedMotion || !window.IntersectionObserver) {
    return;
  }

  gsap.set(targets, { autoAlpha: 0, y: 18 });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        gsap.to(entry.target, {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          ease: "power3.out"
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  targets.forEach((target) => observer.observe(target));
};

const interactiveCards = (gsap) => {
  if (prefersReducedMotion) {
    return;
  }

  const cards = document.querySelectorAll(
    ".product-card, .option, .cart-item, .method-box, .info-box, .qr-box, .latest-desc, .latest-img"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -4,
        boxShadow: "0 12px 22px rgba(0,0,0,0.18)",
        duration: 0.24,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.24,
        ease: "power2.out"
      });
    });
  });
};

const clickFeedback = (gsap) => {
  if (prefersReducedMotion) {
    return;
  }

  const clickables = document.querySelectorAll("button, .option, .product-link, .remove, .back, .cart-link");

  clickables.forEach((node) => {
    node.addEventListener("mousedown", () => {
      gsap.fromTo(node, { scale: 1 }, { scale: 0.97, yoyo: true, repeat: 1, duration: 0.09, ease: "power1.out" });
    });
  });
};

const heroAndAuthTimeline = (gsap) => {
  const homeCard = document.querySelector(".hero-card");
  const signupCard = document.querySelector(".signup-card");

  if (homeCard) {
    const items = [
      document.querySelector(".top-nav"),
      homeCard,
      homeCard.querySelector("h1"),
      homeCard.querySelector("h2"),
      homeCard.querySelector(".hero-row"),
      homeCard.querySelector(".cta-btn")
    ].filter(Boolean);

    gsap.from(items, {
      autoAlpha: 0,
      y: 24,
      scale: 0.985,
      duration: 0.72,
      ease: "power3.out",
      stagger: 0.1
    });

    applyTilt(homeCard, gsap, 8);
  }

  if (signupCard) {
    const items = [
      signupCard,
      signupCard.querySelector(".back-home-btn"),
      signupCard.querySelector(".auth-header"),
      signupCard.querySelector(".welcome"),
      signupCard.querySelector("h3"),
      signupCard.querySelector(".social-row"),
      signupCard.querySelector(".or-label"),
      signupCard.querySelector(".input-grid"),
      signupCard.querySelector(".form-footer")
    ].filter(Boolean);

    gsap.from(items, {
      autoAlpha: 0,
      y: 20,
      duration: 0.68,
      ease: "power2.out",
      stagger: 0.09
    });

    applyTilt(signupCard, gsap, 12);
  }
};

const initWithGsap = (gsap) => {
  pageEntrance(gsap);
  heroAndAuthTimeline(gsap);
  magneticButtons(gsap);
  floatDots(gsap);
  revealOnScroll(gsap);
  interactiveCards(gsap);
  clickFeedback(gsap);
};

window.addEventListener("DOMContentLoaded", async () => {
  const gsap = await getGsap();
  if (!gsap || prefersReducedMotion) {
    return;
  }

  initWithGsap(gsap);
});