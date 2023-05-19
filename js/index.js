
const seed = () => {
  const data = {
    key: "value", // Replace "key" and "value" with your actual data
  };
  
  axios
    .post("http://localhost:4000/api/seed", data)
    .then(function (response) {
      console.log("POST request successful", response);
    })
    .catch(function (error) {
      console.error("POST request failed", error);
    });
  
}


gsap.set("text.circles__text", { transformOrigin: "50% 50%" });
gsap.to("text.circles__text--1", {
  duration: 30,
  ease: "none",
  rotation: "+=360",
  repeat: -1
});
gsap.to("text.circles__text--2", {
  duration: 30,
  ease: "none",
  rotation: "-=360",
  repeat: -1
});

