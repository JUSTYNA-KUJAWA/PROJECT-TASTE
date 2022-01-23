import Song from './Song.js';
import { select, templates } from './../settings.js';
import utils from '../utils.js';
import Player from './Player.js';

class DiscoverPage {
  constructor(wrapper, songs, categories, authors) {
    const thisDiscoverPage = this;

    thisDiscoverPage.data = {};
    thisDiscoverPage.data.songs = songs;
    thisDiscoverPage.data.categories = categories;
    thisDiscoverPage.data.authors = authors;
    console.log('thisDiscoverPage.data.songs', thisDiscoverPage.data.songs)
 
    
    thisDiscoverPage.renderInMenu();
    thisDiscoverPage.getElements(wrapper);
    thisDiscoverPage.updateFavoriteCategories();
    thisDiscoverPage.renderSongs();
  }
  renderInMenu() {
    const thisDiscoverPage = this;
    /* generate HTML based on template */
    const generatedHTML = templates.songTemplate(thisDiscoverPage.data.songs);
    /* create element using utils.createElementFromHTML */
    thisDiscoverPage.element = utils.createDOMFromHTML(generatedHTML);
    /* find menu container */
    const wrapper = document.querySelector(select.containerOf.discoverPage);
    /* add element to menu */
    wrapper.appendChild( thisDiscoverPage.element);
  }

  getElements(wrapper) {
    const thisDiscoverPage = this;

    thisDiscoverPage.dom = {};
    thisDiscoverPage.dom.wrapper = wrapper;
    thisDiscoverPage.dom.songsDiscover = document.querySelector(select.containerOf.discoverPage);
  }

  updateFavoriteCategories(){
    const thisDiscoverPage = this;
    thisDiscoverPage.data.favoriteCategories = {};
    for (let category of thisDiscoverPage.data.categories){
      thisDiscoverPage.data.favoriteCategories[category] = 0;
    }

    const audioFiles = document.querySelectorAll('audio');

    for(let audioFile of audioFiles){
      audioFile.addEventListener('ended', function(){

        const source = audioFile.querySelector('source');
        const sourceName = source.getAttribute('src');
        const fileName = sourceName.replace('assets/songs/', '');

        for (let songData in thisDiscoverPage.data.songs){
          const song = thisDiscoverPage.data.songs[songData];

          if(song.filename === fileName){
            for (let category of song.categories){
              thisDiscoverPage.data.favoriteCategories[category] +=1;
            }
          }
        }
        thisDiscoverPage.renderSongs();
      });
    }
  }

  renderSongs() {
    const thisDiscoverPage = this;

    utils.resetWrapper(thisDiscoverPage.dom.songsDiscover);

    const favoriteCategoryMax = utils.calculateMaxValue(thisDiscoverPage.data.favoriteCategories);

    if(favoriteCategoryMax > 0 ){
      const userFavoriteCategories = [];
      const songsOfFavoriteCategories = [];

      for (let category in thisDiscoverPage.data.favoriteCategories){
        if(thisDiscoverPage.data.favoriteCategories[category] === favoriteCategoryMax){
          userFavoriteCategories.push(category);
        }
      }

      const discoverCategory = userFavoriteCategories[utils.randomize(userFavoriteCategories)];

      for (let song of thisDiscoverPage.data.songs){
        if(song.categories.includes(discoverCategory)){
          songsOfFavoriteCategories.push(song);
        }
      }

      new Song(thisDiscoverPage.data.authors,thisDiscoverPage.data.songs,thisDiscoverPage.dom.wrapper,songsOfFavoriteCategories[utils.randomize(songsOfFavoriteCategories)]);
    } else {
      new Song(thisDiscoverPage.data.authors,thisDiscoverPage.data.songs,thisDiscoverPage.dom.wrapper,thisDiscoverPage.data.songs[utils.randomize(thisDiscoverPage.data.songs)]);
    }
    thisDiscoverPage.initWidgets();
  }

  initWidgets() {
    new Player(select.player.discoverPage) ;
  }
}

export default DiscoverPage;