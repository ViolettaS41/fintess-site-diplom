(() => {
  function getScrollAmount(container) {
    // Scroll roughly by one viewport of cards
    return Math.max(240, Math.floor(container.clientWidth * 0.9));
  }

  document.addEventListener("click", (e) => {
    const prevBtn = e.target.closest(".carousel-btn-prev");
    const nextBtn = e.target.closest(".carousel-btn-next");
    if (!prevBtn && !nextBtn) return;

    const wrapper = (prevBtn || nextBtn).closest(".main-content-trainers-carousel");
    const container = wrapper?.querySelector("[data-carousel]");
    if (!container) return;

    const delta = getScrollAmount(container) * (prevBtn ? -1 : 1);
    container.scrollBy({ left: delta, behavior: "smooth" });
  });
})();
