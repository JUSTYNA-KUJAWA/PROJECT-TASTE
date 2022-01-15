import Song from './Song.js';
import { select, classNames } from '../settings.js';
import utils from '../utils.js';
import Player from './Player.js';

class HomePage {
  constructor(homeElem,songsData, categories) {
    const thisHomePage = this;
    const homeElem = document.querySelector('.songs-home')

    thisHomePage.data = {};
    thisHomePage.data.songs = songsData;
    thisHomePage.data.categories = categories;
    console.log('thisHomePage.data.categories', thisHomePage.data.categories);
    thisHomePage.getElements();
    thisHomePage.renderSongs(homeElem);
    thisHomePage.filterByCategories();
  }

  getElements() {
    const thisHomePage = this;
    

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
  }

  renderSongs() {
    const thisHomePage = this;

    for (let songData in thisHomePage.data.songs) {
      new Song(homeElem, thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
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

          for (let songData in thisHomePage.data.songs){
            const songCategories = thisHomePage.data.songs[songData].categories;
            
            if (songCategories.includes(activeCategory)){
              new Song(homeElem, thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
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