export function initializeAnimations(d: Document): void {
  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const observerScrollAnim = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("on", entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    d.querySelectorAll(".anim").forEach(el => observerScrollAnim.observe(el));
  };
}