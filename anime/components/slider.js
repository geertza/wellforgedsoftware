import { getTopAnime } from "../routes.js";
// this is the basic component structure from swiper Docs, modified to my needs.
class AnimeSlider extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode:"open"});
  }

  connectedCallback(){
    this.render();
    this.loadData();
  }

  render(){
    const slides = this.getAttribute("slides-per-view") || 4;
    const height = this.getAttribute("height") || "200px";
    const style = document.createElement("style");
     // Handle breakpoints 
    const breakpointAttr = this.getAttribute("breakpoints");
    const defaultBreakpoints = {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
      1200: { slidesPerView: slides } 
    };
    const breakpoints = breakpointAttr ? JSON.parse(breakpointAttr) : defaultBreakpoints;
    style.textContent = `
      swiper-container {
        width: 95%;
        height: ${height}; 
        margin: 0 auto;
      }

      .card {
        position: relative; /* Required for absolute positioning of title */
        width: 100%;
        height: 100%;
        background: #1b1b1b;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
      }

      img {
        width: 100%;
        height: 100%; 
        object-fit: cover;
        display: block;
      }

      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px 10px 10px; 
        text-align: center;
        font-size: 14px;
        color: white;
        
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
        
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .card:hover .title {
        background: linear-gradient(transparent, rgba(0, 0, 0, 1));
      }
    `;


    const slider = document.createElement("swiper-container");

    Object.assign(slider,{
      slidesPerView:slides,
      spaceBetween: 10,
      navigation:true,
      pagination:{clickable:true},
      breakpoints: breakpoints
    });

    this.shadowRoot.append(style, slider);

    this.slider = slider;
  }

  async loadData(){

    const format = this.getAttribute("format") || "TV";
    const limit = Number(this.getAttribute("limit")) || 10;

    const animeList = await getTopAnime(format, limit);

    animeList.forEach(anime=>{

      const slide = document.createElement("swiper-slide");

      const card = document.createElement("div");
      card.className="card";
      card.setAttribute("title", anime.title.english || anime.title.romaji);

      const img = document.createElement("img");
      img.src = anime.coverImage.large;

      const title = document.createElement("div");
      title.className="title";
      title.textContent =
        anime.title.english ||
        anime.title.romaji;

      card.addEventListener("click", () => {
        const selectEvent = new CustomEvent("anime-select", {
          detail: { anime },
          bubbles: true,
          composed: true 
          });
          this.dispatchEvent(selectEvent);
        });
        card.append(img,title);
        slide.appendChild(card);
        this.slider.appendChild(slide);
      });

    requestAnimationFrame(()=>this.slider.initialize());
  }
}

customElements.define("anime-slider", AnimeSlider);

//tester
//<anime-slider limit="15" slides-per-view="5" height="500px"></anime-slider>
