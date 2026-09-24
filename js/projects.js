
const projectInfo = [
  {
    id: "nerd",
    title: "NerdVerse",
    p1: "Basic trivia game about sci-fi shows and movies.",
    p2: "Timed quiz using dynamic HTML, CSS and JavaScript.",
    img: "./images/nerd.png",
    lang: ['html','css','js'],
    demo: "https://geertza.github.io/NerdVerse/",
    git: "https://github.com/geertza/NerdVerse"
  },
    {
    id: "oldSite",
    title: "1st Semesters Portfolio",
    p1: "Site I made for intro to web development. Showcases my work and skills at the time.",
    p2: "Built with HTML and CSS, it was a great relearning experience and a stepping stone in my web development journey.",
    img: "./images/oldSite.png",
    lang: ['html','css','js'],
    demo: "http://andyg.csci.fun/1stSemester/",
    git: "https://github.com/geertza"
  },
   {
    id: "money",
    title: "moneyPenny",
    p1: "site made from a node program I wrote years ago, used to create readme files in markup. I wanted to make it more user friendly and interactive.",
    p2: "Built with HTML and CSS, it was a great relearning experience and a stepping stone in my web development journey.",
    img: "./images/money.png",
    lang: ['html','css','js'],
    demo: "http://andyg.csci.fun/moneyPenny/",
    git: "https://github.com/geertza/MoneyPenny-write-a-readme.md"
  }

];

const iconMap = {
  html: "HTML",
  css: "CSS",
  js: "Js",
};

function renderProjects() {
  const container = document.getElementById("projects");

  if (!container) {
    console.error("Target container #projects not found!");
    return;
  }

  // Clear previous content to prevent duplicates
  container.innerHTML = "";

  projectInfo.forEach(project => {
    const card = document.createElement("div");
    card.className = "pro-card";

    card.innerHTML = `
    <h3>${project.title}</h3>
    <img src="${project.img}" class="pro-image">
    <div class="article">${project.p1}</div>
    <div class="article">${project.p2}</div>

    <ul class="lang-list">
      ${project.lang.map(lang => `
        <li title="${lang}">
          <span style="font-size:28px">${iconMap[lang] || "💻"}</span>
        </li>
      `).join("")}
    </ul>

    <div>
      <a class="button" href="${project.git}" target="_blank">See The Code</a>
      <a class="button" href="${project.demo}" target="_blank">See It In Action</a>
    </div>
  `;

    container.appendChild(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjects);
} else {
  // If the script is injected after DOMContentLoaded (dynamic routing), run immediately
  renderProjects();
}


