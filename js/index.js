
//seed on load
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
    })