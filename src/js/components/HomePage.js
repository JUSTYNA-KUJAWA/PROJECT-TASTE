import Song from './Song.js';
import { select, classNames, templates } from './../settings.js';
import utils from '../utils.js';
import Player from './Player.js';

class HomePage {
  constructor(songs,categories) {
    const thisHomePage = this;

    thisHomePage.data= {};
    thisHomePage.data.songs= songs;
    thisHomePage.data.songs.categories = categories;

    thisHomePage.getElements();
    thisHomePage.generateCategories();
    thisHomePage.renderCategories();
    thisHomePage.renderSongs();
    thisHomePage.filterByCategories();
  }

  getElements() {
    const thisHomePage = this;

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
  }
  generateCategories(){
    const thisHomePage = this;

    for(let song of thisHomePage.data.songs){
      const songCategories = song.categories;

      for(let item of songCategories){
        if(!thisHomePage.data.categories.includes(item)){
          thisHomePage.data.categories.push(item);
        }
      }
    }
  }
  renderCategories(){
    const thisHomePage = this;

    for(let category of thisHomePage.data.categories){
      const linkHtmlData = {name: category};
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      thisHomePage.dom.categoryList.appendChild(categoryListDOM);
      thisHomePage.dom.categorySelect.appendChild(categorySelectDOM);
    }
  }
  renderSongs() {
    const thisHomePage = this;

    for (let songs in thisHomePage.data.songs) {
      new Song(thisHomePage.data.songs[songs], thisHomePage.dom.wrapper);
    }
    thisHomePage.initWidgets();
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
              new Song(thisHomePage.data.songs[songs], thisHomePage.dom.wrapper);
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

  initWidgets() {
    new Player(select.player.homePage) ;
  }
}

export default HomePage;