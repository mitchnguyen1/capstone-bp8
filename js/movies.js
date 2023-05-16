gsap.set(".card", { opacity: 0, y: 100 });
ScrollTrigger.batch(".card", {
  onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15}),
  onLeave: (batch) => gsap.to(batch, { opacity: 0, y: 100 }),
  onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15}),
  onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 100 }),

  start: "top 88%",
  end: "bottom 20%",
});
