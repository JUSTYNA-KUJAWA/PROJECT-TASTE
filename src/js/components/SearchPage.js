import Song from './Song.js';
import { select } from './../settings.js';
import utils from '../utils.js';
import Player from './Player.js';

class SearchPage {
  constructor(searchElem, songsData) {
    const thisSearchPage = this;

    thisSearchPage.data = {};
    thisSearchPage.data.songs = songsData;

    thisSearchPage.getElements();
    thisSearchPage.renderSongs(searchElem);
    thisSearchPage.initWidgets();
  }

  getElements() {
    const thisSearchPage = this;

    thisSearchPage.dom = {};
    thisSearchPage.dom.wrapper = document.querySelector(select.containerOf.searchPage);
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
        new Song(song, thisSearchPage.dom.wrapper);
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