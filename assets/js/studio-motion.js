// Progressive enhancement: a subtle pointer-responsive glow, without blocking scrolling.
(() => {
  const hero = document.querySelector(".studio-hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const box = hero.getBoundingClientRect();
    hero.style.setProperty("--pointer-x", ((event.clientX - box.left) / box.width * 100).toFixed(1) + "%");
    hero.style.setProperty("--pointer-y", ((event.clientY - box.top) / box.height * 100).toFixed(1) + "%");
  }, {passive:true});
})();
