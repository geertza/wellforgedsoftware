const startUrl = "homePage";

async function fetchPage(page) {
  url = `./views/${page}/index.html`;
  try {
    const response = await fetch(url); // First await: waits for the network request to complete and get the Response object
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text(); // Use .text() to get the raw HTML string

    document.getElementById("pageBody").innerHTML = htmlContent;
    return htmlContent;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function fetchFunny() {
  fetchPage("funny").then(() => {
    chuckUp();
    techUp();
    jokeUp();
  });
}
fetchPage(startUrl);
