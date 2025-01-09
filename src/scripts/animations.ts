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

export function initializeAnimations(d: Document): void {
  d.querySelectorAll(".anim").forEach(el => observerScrollAnim.observe(el));
}