/* ── Init ── */
AOS.init({ duration: 750, once: true, offset: 40 });

/* FIX 2: correct ID — was 'yr', you use 'year' in footer */
document.getElementById("year").textContent = new Date().getFullYear();

/* ── Cursor ── */
const cDot = document.getElementById("cDot");
const cRing = document.getElementById("cRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function loop() {
  cDot.style.left = mx + "px";
  cDot.style.top = my + "px";
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cRing.style.left = rx + "px";
  cRing.style.top = ry + "px";
  requestAnimationFrame(loop);
})();

/* ── Navbar scroll ── */
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => navbar.classList.toggle("scrolled", window.scrollY > 50),
  { passive: true },
);

/* ── Mobile menu ── */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open ? "&#10005;" : "&#9776;";
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = "&#9776;";
  }),
);

/* ── GSAP ── */
gsap.registerPlugin(ScrollTrigger);
gsap.from(".page-hero", {
  opacity: 0,
  y: 36,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.2,
});
gsap.from(".filter-bar", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
  delay: 0.45,
});

/* FIX 1: Cards must NOT use GSAP opacity:0 entrance — AOS handles them.
           GSAP from opacity:0 was leaving cards invisible when filter toggled.
           Instead we just animate the ones that are already visible via AOS. */
gsap.from(".cta-strip", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: { trigger: ".cta-strip", start: "top 88%", once: true },
});

/* ── Counter ── */
const totalEl = document.getElementById("totalStat");
gsap.fromTo(
  totalEl,
  { textContent: 0 },
  {
    textContent: 6,
    duration: 1.4,
    ease: "power1.out",
    delay: 0.6,
    snap: { textContent: 1 },
    onUpdate() {
      totalEl.textContent = Math.round(+totalEl.textContent);
    },
  },
);

/* ── Filter — FIX: set data-hidden properly and don't rely on GSAP opacity ── */
const cards = [...document.querySelectorAll(".proj-card")];
const countEl = document.getElementById("showCount");

/* Mark all cards as visible on load */
cards.forEach((c) => c.setAttribute("data-hidden", "false"));

function applyFilter(cat) {
  let visible = 0;
  cards.forEach((c) => {
    const cats = (c.dataset.cat || "").split(",");
    const show = cat === "all" || cats.includes(cat);
    if (show) {
      c.setAttribute("data-hidden", "false");
      visible++;
      /* Animate back in with GSAP */
      gsap.fromTo(
        c,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          delay: visible * 0.05,
        },
      );
    } else {
      c.setAttribute("data-hidden", "true");
    }
  });
  countEl.textContent = visible;
}

document.querySelectorAll(".fb").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".fb")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.cat);
  });
});

/* ── Cursor scale on hover ── */
document.querySelectorAll("a, button, .proj-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cRing.style.width = "44px";
    cRing.style.height = "44px";
    cRing.style.opacity = ".8";
  });
  el.addEventListener("mouseleave", () => {
    cRing.style.width = "32px";
    cRing.style.height = "32px";
    cRing.style.opacity = ".5";
  });
});
