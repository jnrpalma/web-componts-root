//estrutura do web component
class StarRate extends HTMLElement {
  constructor() {
    super();
    this.build()
  }

  //responsavel pela junção de todos os elementos
  build() {
    const shadow = this.attachShadow({ mode: "open" });

    //    adicona filhos
    shadow.appendChild(this.style());
    const rater = this.createRater()
    const stars = this.createStars()

    //coloca os span dentro da div 
    stars.forEach(star => rater.appendChild(star))


    shadow.appendChild(rater)
  }

  createRater(){
      const rater = document.createElement('div')
      rater.classList.add('star-rate')
      return rater
  }

  createStars(){
      const createStar = (_,id) => {
          const star = document.createElement('span')
          star.classList.add('star')
          star.setAttribute('data-value', Number(id) + 1)
          star.innerHTML = '&#9733;'
          return star
      }
      return Array.from({length:5}, createStar)
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `
    .star{
        font-size:5rem;
        color:grey;
        cursor:pointer;
    }
    `
    return style;
  }
}

// recebe 2 argumentos, 1º como string
// que vai dar o nome ao elemento que vai ser criado para uso no html
// 2º como nome da classe que foi criada
customElements.define("star-rate", StarRate);
