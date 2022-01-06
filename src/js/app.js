import {select, settings, classNames} from './settings.js';
import Song from './components/Song.js';

const app = {
  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.initSongs();
      });
  },

  initSongs: function(){
    const thisApp = this;

    for (let songData in thisApp.data.songs){
      new Song(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
    }
    thisApp.initPlayer();
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(thisApp.pages[pageMatchingHash].id);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  init: function(){
    const thisApp = this;

    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('settings:', settings);
    console.log('classNames:', classNames);

    thisApp.initData();
    thisApp.initPages();
  }
};

app.init();