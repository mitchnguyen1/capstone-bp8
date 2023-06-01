let logo = document.querySelector("#X")
let baseUrl = "https://capstone-0a2c.onrender.com"
const seed = () => {
  console.log(1)
  axios
    .post(`${baseUrl}/api/seed`)
    .then(function (response) {
      alert("Seed successful", response);
    })
    .catch(function (error) {
      console.error("POST request failed", error);
    });
};

logo.addEventListener("click",seed)

//logo
gsap.set("text.circles__text", { transformOrigin: "50% 50%" });
gsap.to("text.circles__text--1", {
  duration: 50,
  ease: "none",
  rotation: "+=360",
  repeat: -1,
});
gsap.to("text.circles__text--2", {
  duration: 50,
  ease: "none",
  rotation: "-=360",
  repeat: -1,
});


// Function to run the animation once the page loads
function animation() {
  let buttons = document.querySelector(".buttons")
  gsap.set("#submit", { y: "100%", opacity: 0 });
  gsap.set("#pick", { y: "100%", opacity: 0 });
  gsap.set("#edit", { y: "100%", opacity: 0 });
  gsap.set("#list", { y: "100%", opacity: 0 });

  // Animation timeline
  var tl = gsap.timeline();
  buttons.style.display = "flex"
  // buttons
  tl.from("#submit", { opacity: 0});
  tl.to("#submit", { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
  tl.to("#pick", { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
  tl.to("#edit", { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
  tl.to("#list", { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
  // Set initial positions
  gsap.set("#X", { x: "200%", opacity: 0 });
  gsap.set("#arrow", { y: "100%", opacity: 0, rotation: -180 });
  gsap.set("#smallX", { y: "-100%", opacity: 0 });

  tl.to("#X", { x: 25, opacity: 1, duration: 1, rotation: 400 }, "-=1");
  tl.to("#arrow", { y: 0, opacity: 1, rotation: 0, duration: 1 }, "-=1");
  tl.to("#smallX", { y: 0, opacity: 1, rotation: 140, duration: 1 }, "-=1");
}


const fadeOutPage = () => {
  if (!window.AnimationEvent) { return; }
  fader.classList.add('fade-out');
}

// Run the animation once the page finishes loading
window.addEventListener("load", function () {
  animation();
  fadeOutPage();
});
