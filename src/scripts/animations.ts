export function initializeAnimations(d: Document): void {
  const intersectionObserverOptions: IntersectionObserverInit = {
    root: null,
    threshold: 0,
  };

  if (d.defaultView?.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const observerScrollAnim = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("on", entry.isIntersecting);

          if (entry.isIntersecting && entry.target.classList.contains("once")) {
            observerScrollAnim.unobserve(entry.target);          }
        });
      },
      intersectionObserverOptions,
    );

    d.querySelectorAll(".anim").forEach(el => observerScrollAnim.observe(el));
  }
}