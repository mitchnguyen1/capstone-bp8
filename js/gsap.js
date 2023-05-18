
gsap.set(".ball", {xPercent: -50, yPercent: -50});

let xTo = gsap.quickTo(".ball", "x", {duration: 0.6, ease: "power3"}),
    yTo = gsap.quickTo(".ball", "y", {duration: 0.6, ease: "power3"});

window.addEventListener("mousemove", e => {
  // xTo(e.pageX);
  // yTo(e.pageY);
  xTo(e.clientX);
  yTo(e.clientY);
});