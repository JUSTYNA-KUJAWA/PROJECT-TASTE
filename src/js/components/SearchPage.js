import Song from './Song.js';
import { select, templates } from './../settings.js';
import utils from '../utils.js';
import Player from './Player.js';

class SearchPage {
  constructor(wrapper, songs, categories, authors) {
    const thisSearchPage = this;

    thisSearchPage.data = {};
    thisSearchPage.data.songs = songs;
    thisSearchPage.data.categories = categories;
    thisSearchPage.data.authors = authors;
    console.log('thisSearchPage.data.songs',thisSearchPage.data.songs)

    thisSearchPage.renderInMenu();
    thisSearchPage.getElements(wrapper);
    thisSearchPage.renderCategories();
    thisSearchPage.renderSongs();
    
  }
  renderInMenu() {
    const thisSearchPage = this;
    /* generate HTML based on template */
    const generatedHTML = templates.categorySelectTemplate(thisSearchPage.data.songs);
    const generatedSongHTML = templates.songTemplate(thisSearchPage.data.songs);
    /* create element using utils.createElementFromHTML */
    thisSearchPage.element = utils.createDOMFromHTML(generatedHTML);
    thisSearchPage.songElem = utils.createDOMFromHTML(generatedSongHTML);
    /* find menu container */
    const menuContainer = document.querySelector(select.containerOf.searchPage);
    /* add element to menu */
    menuContainer.appendChild(thisSearchPage.element,thisSearchPage.songElem);
  }
  getElements(wrapper) {
    const thisSearchPage = this;

    thisSearchPage.dom = {};
    thisSearchPage.dom.wrapper = wrapper;
    thisSearchPage.dom.songsSearch = document.querySelector(select.containerOf.searchPage);
    thisSearchPage.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);
   
  }
  renderCategories(){
    const thisSearchPage = this;

    for(let category of thisSearchPage.data.categories){
      const linkHtmlData = {name: category};
  
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      thisSearchPage.dom.categorySelect.appendChild(categorySelectDOM);
    }
  }
  renderSongs() {
    const thisSearchPage = this;

    const button = document.querySelector(select.searchElements.button);
    const input = document.getElementById(select.searchElements.input);
    const searchMessage = document.querySelector(select.searchElements.text);

    let numberOfSongs = 0;
    let matchedSongs = [];

    const categoriesSelect = document.getElementById('categories__select');

    button.addEventListener('click', function(){
      utils.resetWrapper(thisSearchPage.dom.wrapper);
      searchMessage.innerHTML = '';

      numberOfSongs = 0;
      matchedSongs = [];
  
      let selectedCategory = categoriesSelect.value;

      if(input.value === '' && selectedCategory === 'first'){
        for (let songData in thisSearchPage.data.songs){
          matchedSongs.push(thisSearchPage.data.songs[songData]);
        } 
      } else {
        if(input.value !== ''){
          for (let songData in thisSearchPage.data.songs){
            if (thisSearchPage.data.songs[songData].filename.toString().toUpperCase().includes(input.value.toUpperCase())) {
              matchedSongs.push(thisSearchPage.data.songs[songData]);
            } 
          }
        }
  
        for (let songData in thisSearchPage.data.songs){
          const songCategories = thisSearchPage.data.songs[songData].categories;
          if (songCategories.includes(selectedCategory)){
            if(!matchedSongs.includes(thisSearchPage.data.songs[songData])){
              matchedSongs.push(thisSearchPage.data.songs[songData]);
            }
          }
        }
      }

      for (let song of matchedSongs){
        new Song(thisSearchPage.data.authors,thisSearchPage.data.songs[song], thisSearchPage.dom.wrapper,song);
      }
      
      thisSearchPage.initWidgets();

      numberOfSongs = matchedSongs.length;
      numberOfSongs == 1 ? searchMessage.innerHTML = `We found ${numberOfSongs} song...` : searchMessage.innerHTML = `We found ${numberOfSongs} songs...`;
    });
  }

  initWidgets() {
    new Player(select.player.searchPage) ;
  }
}

export default SearchPage;