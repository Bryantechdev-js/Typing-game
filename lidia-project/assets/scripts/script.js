  function copyLink() {
      const text = document.getElementById("ref-link").innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("Link copied to clipboard!");
      });
    }