import Song from './Song.js';
import { select, classNames, templates } from './../settings.js';
import utils from '../utils.js';
import Player from './Player.js';

class HomePage {
  constructor(wrapper, songs, categories, authors) {
    const thisHomePage = this;
 
    thisHomePage.data={};
    thisHomePage.data.songs= songs;
    thisHomePage.data.categories= categories;
    thisHomePage.data.authors= authors;
  
    thisHomePage.renderInMenu();
    thisHomePage.getElements(wrapper);
    thisHomePage.renderSongs();
    thisHomePage.renderCategories();
    thisHomePage.filterByCategories();
    
    
  }

  renderInMenu() {
    const thisHomePage = this;
    /* generate HTML based on template */
    const generatedHTML = templates.songTemplate(thisHomePage.data.songs);
    /* create element using utils.createElementFromHTML */
    thisHomePage.element = utils.createDOMFromHTML(generatedHTML);
    /* find menu container */
    const menuContainer = document.querySelector(select.containerOf.homePage);
    /* add element to menu */
    menuContainer.appendChild(thisHomePage.element);
  }
  getElements(wrapper) {
    const thisHomePage = this;

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = wrapper;
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
    thisHomePage.dom.songsHome = document.querySelector(select.containerOf.homePage);
   
  }

  renderCategories(){
    const thisHomePage = this;

    for(let category of thisHomePage.data.categories){
      const linkHtmlData = {name: category};
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);


      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
   

      thisHomePage.dom.categoryList.appendChild(categoryListDOM);
     
    }
  }
  renderSongs() {
    const thisHomePage = this;

    for (let song in thisHomePage.data.songs) {
      new Song(thisHomePage.data.authors,thisHomePage.data.songs[song], thisHomePage.dom.wrapper);
    }
    thisHomePage.initWidgets();
  }
  initWidgets() {
    new Player(select.player.homePage) ;
  }

  filterByCategories(){
    const thisHomePage = this;

    let activeCategory = '';

    thisHomePage.dom.categoryList.addEventListener('click', function(event){
      event.preventDefault();

      utils.resetWrapper(thisHomePage.dom.wrapper);

      const category = event.target;

      if(category.classList.contains(classNames.categories.isCategory)){
        const categoryName = category.getAttribute(select.attributesOf.category);
  
        if(!category.classList.contains(classNames.categories.active)){
          thisHomePage.resetCategories();
          category.classList.add(classNames.categories.active);
          activeCategory = categoryName;

          for (let songs in thisHomePage.data.songs){
            const songCategories = thisHomePage.data.songs[songs].categories;
            
            if (songCategories.includes(activeCategory)){
              new Song(thisHomePage.data.authors,thisHomePage.data.songs[songs], thisHomePage.dom.wrapper);
            }
          }
          thisHomePage.initWidgets();
        } else {
          category.classList.remove(classNames.categories.active);
          activeCategory = '';
          thisHomePage.renderSongs();
        }
      }
    });
  }

  resetCategories(){
    const thisHomePage = this;

    const allCategoryLinks = thisHomePage.dom.categoryLinks;

    for(let categoryLink of allCategoryLinks){
      categoryLink.classList.remove(classNames.categories.active);
    }
  }


}

export default HomePage;