class Api {
     //data = null;
    async getData() {
        await fetch("../data/data.json").then(response => {
            return response.json();
        }).then(newData => {
            this.data = newData.episodes; 
        }); 
    }
}

class Header {
    headerElement;
    profileElement;
    placeToRenderHeader;
    logoElement;
    logoHeadingElement;

   constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.logoElement = document.createElement("i");
        this.logoElement.classList = "fa-solid fa-microphone";

       this.logoHeadingElement = document.createElement("h1");
        this.logoHeadingElement.classList = "header__happiness";
        this.logoHeadingElement.innerText = "Collection Of Happiness";
   }

    render() {
        this.headerElement.appendChild(this.logoElement);
        this.logoElement.appendChild(this.logoHeadingElement);
        this.placeToRenderHeader.appendChild(this.headerElement);
    }

}

class Main{
    placeToRenderMain;
    leftSection;
    mainElement;
    rightSection;
    getDataFromApi;

    constructor(placeToRenderMain) {
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
         this.mainElement = document.createElement("main");
         this.mainElement.classList = "main";
         this.leftSection = new LeftSection(this.mainElement);
        this.rightSection = new RightSection(this.mainElement, this);
        this.getDataFromApi = new Api().getData();
    }

   //  makeButtonsFrom(data) {
   //      this.rightSection.makeButtonsFrom(data);
   //  }


     render() {
         this.placeToRenderMain.appendChild(this.mainElement);
         this.leftSection = new LeftSection(this.mainElement);
         this.leftSection.generateImages();
         this.rightSection.render();
   }
}

class LeftSection{
    mainElement;
    leftSectionElement;
    cardsElement;
    getDataFromApi;
    
    
    constructor(mainElement, getDataFromApi) {
        this.mainElement = document.getElementsByTagName(mainElement)[0];
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "section Left__section";

        this.cardsElement = document.createElement("ul");
        this.cardsElement.classList = "left__cards";

     
        this.cardsElement = document.createElement("li");
        this.cardsElement.classList = "left__card";
        

        this.leftSectionElement.appendChild(this.cardsElement);
      
         this.cardsElement = document.createElement("p");
         this.cardsElement.classList = "date";

         this.cardsElement = document.createElement("p");
         this.cardsElement.classList = "title";

        this.cardsElement = document.createElement("img");
        this.cardsElement.classList = "img__sizes";
        console.log(this.getDataFromApi);
 
    }
    
    generateImages(mainElement, data) {
       
       const ul = document.createElement("ul");
       
      for (let i = 1; i <= 4; i++) {
          const random = Math.random() * 7;
         const cardsElement = document.createElement("li");
         const img = document.createElement("img");
         const pText = document.createElement("p");
         const pDate = document.createElement("p");
          
          cardsElement.classList = "left__card";
          img.classList = "img__sizes";
          pDate.classList = "date";
          pText.classList = "title";


          this.img.src = data[Math.floor(random)].img;
          this.pText.innerText = data[Math.floor(random)].title;
          this.pDate.innerText = data[Math.floor(random)].date;        


          this.cardsElement.appendChild(img);
          this.cardsElement.appendChild(pDate);
          this.cardsElement.appendChild(pText);

          this.cardsElement.addEventListener('click', function (event) { 
              // hier roep je een functie aan die de right section beinvloed.
              
              //RightSection aanroepen met mainElement en data
          const rightSection = new RightSection("main", data);
          rightSection.render();
          });
          ul.appendChild(cardsElement); 
          
      }
      this.cardsElement.appendChild(ul);

    }

   
}

class RightSection{
   mainElement;
   data;
   
   constructor(mainElement, data) {
       this.mainElement = document.getElementsByTagName(mainElement)[0];
      
       this.rightSectionElement = document.createElement("section");
       this.rightSectionElement.classList = "section Right__section";

       this.descriptionElement = document.createElement("div");
       this.descriptionElement.classList = "description__header";

       this.dateElement = document.createElement("h3");
       this.dateElement.classList = "description__date";

       this.titleElement = document.createElement("h3");
       this.titleElement.classList = "description__title";

       this.textElement = document.createElement("p");
       this.textElement.classList = "description__text";

       this.buttonElement = document.createElement("div");
       this.buttonElement.classList = "buttonWrapper";

       this.buttonAudioElement = document.createElement("button");
       this.buttonAudioElement.classList = "Audio__button";

       this.buttonSourceElement = document.createElement("a");
       this.buttonSourceElement.classList = "source__button";
       

       this.descriptionElement.style.backgroundImage = "url(" + data.img + ")";
       //this.textElement.innerText = data[Math.floor(random)].summary;
   }



   render() {

       this.rightSectionElement.appendChild(this.headerElement);
       this.headerElement.appendChild(this.dateElement);
       this.dateElement.appendChild(this.titleElement);
       this.titleElement.appendChild(this.textElement);
       this.textElement.appendChild(this.buttonElement);
       this.buttonElement.appendChild(this.buttonAudioElement);
       this.buttonAudioElement.appendChild(this.buttonSourceElement);
       this.mainElement.appendChild(this.rightSectionElement);
   }

   
   
}

class App {
    HappyHeader;
    getDataFromApi;
    leftSection;
    rightSection;
    main;
  
    

    constructor(data) {
        this.header = new Header("body");
        this.main = new Main("body");
        this.mainElement = document.getElementsByTagName("main")[0];
        this.leftsection = new LeftSection("main");

        this.getDataFromApi = new Api("../data/data.json");
        this.getDataFromApi.getData().then(
            () => {
                console.log(this.getDataFromApi);
               this.header.render();
               this.main.render();
               this.leftsection.generateImages(this.main, this.getDataFromApi.data);
               this.rightSection.generateImages( this.getDataFromApi.data);
           }
        );
       
        
    }
}

const app = new App();
