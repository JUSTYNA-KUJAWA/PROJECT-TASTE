import SongPage from './SongPage.js';
import { select } from './../settings.js';
import utils from '../utils.js';
import PlayerPage from './PlayerPage.js';

class DiscoverPage {
  constructor(songsData, categories) {
    const thisDiscoverPage = this;

    thisDiscoverPage.data = {};
    thisDiscoverPage.data.songs = songsData;
    thisDiscoverPage.data.categories = categories;
    thisDiscoverPage.data.favoriteCategories = {};

    thisDiscoverPage.getElements();
    thisDiscoverPage.updateFavoriteCategories();
    thisDiscoverPage.renderSongs();
  }

  getElements() {
    const thisDiscoverPage = this;

    thisDiscoverPage.dom = {};
    thisDiscoverPage.dom.wrapper = document.querySelector(select.containerOf.discoverPage);
  }

  updateFavoriteCategories(){
    const thisDiscoverPage = this;

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

    utils.resetWrapper(thisDiscoverPage.dom.wrapper);

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

      new SongPage(songsOfFavoriteCategories[utils.randomize(songsOfFavoriteCategories)], thisDiscoverPage.dom.wrapper);
    } else {
      new SongPage(thisDiscoverPage.data.songs[utils.randomize(thisDiscoverPage.data.songs)], thisDiscoverPage.dom.wrapper);
    }
    thisDiscoverPage.initWidgets();
  }

  initWidgets() {
    new PlayerPage (select.player.discoverPage) ;
  }
}

export default DiscoverPage;