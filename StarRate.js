//estrutura do web component
class StarRate extends HTMLElement {
  constructor() {
    super();
    this.build();
  }

  //responsavel pela junção de todos os elementos
  build() {
    const shadow = this.attachShadow({ mode: 'open' });

    //    adicona filhos
    shadow.appendChild(this.style());
    const rater = this.createRater();
    this.stars = this.createStars();
    //coloca os span dentro da div
    this.stars.forEach(star => rater.appendChild(star));

    this.resetRating();

    shadow.appendChild(rater);
  }

  createRater() {
    const rater = document.createElement("div");
    rater.classList.add("star-rater");
    rater.addEventListener("mouseout", this.resetRating.bind(this));
    return rater;
  }

  createStars() {
    const createStar = (_, id) => {
      const star = document.createElement("span");
      star.classList.add("star");
      star.setAttribute("data-value", Number(id) + 1);
      star.innerHTML = "&#9733;";

      //bind é a junção dos 2 "this" o da classe e o da função criada
      star.addEventListener("click", this.setRating.bind(this));
      star.addEventListener("mouseover", this.ratingHover.bind(this));
      return star;
    };
    return Array.from({ length: 5 }, createStar);
  }

  resetRating() {
    this.currentRatingValue = this.getAttribute("data-rating") || 0;
    this.hightLightRating();
  }

  setRating(event) {
    this.setAttribute(
      "data-rating",
      event.currentTarget.getAttribute("data-value")
    );
  }

  ratingHover(event) {
    this.currentRatingValue = event.currentTarget.getAttribute("data-value");
    this.hightLightRating();
    console.log(this);
  }

  hightLightRating() {
    this.stars.forEach((star) => {
      star.style.color =
        this.currentRatingValue >= star.getAttribute("data-value")
          ? "yellow"
          : "gray";
    });
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `
    .star{
        font-size:5rem;
        cursor:pointer;
        color: gray
    }`;
    return style;
  }
}

// recebe 2 argumentos, 1º como string
// que vai dar o nome ao elemento que vai ser criado para uso no html
// 2º como nome da classe que foi criada
customElements.define("star-rater", StarRate);
