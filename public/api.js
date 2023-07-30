const createURL = async () => {
  try {
    let url = document.getElementById("url_input").value;
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/shorturl",
      data: { url },
    });
    console.log(res);
    if (res.data.status === "success") {
      alert(`GET http://127.0.0.1:5000/api/shorturl/${res.data.short_url}`);
    } else alert("Invalid URL");
  } catch (err) {
    alert("service not available");
  }
};
