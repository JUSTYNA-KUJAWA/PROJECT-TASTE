import {select, settings, classNames} from './settings.js';
import MusicPage from './components/MusicPage.js';

const app = {
  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const urls = {
      songs: settings.db.url + '/' + settings.db.songs,
      authors: settings.db.url + '/' + settings.db.authors,
    };

    Promise.all([
      fetch(urls.songs),
      fetch(urls.authors),
    ])
      .then(function(allResponses){
        const songsResponse = allResponses[0];
        const authorsResponse = allResponses[1];
        return Promise.all([
          songsResponse.json(),
          authorsResponse.json(),
        ]);
      })
      .then(function([songs, authors]){
        thisApp.parseData(songs, authors);
      });
  },

  parseData: function(songs, authors){
    for(let song in songs){

      let songAuthor = songs[song].author;

      for(let author in authors){
        const authorName = authors[author].name;
        const authorID = authors[author].id;
        
        if(songAuthor === authorID){
          songs[song].author = authorName;
          break;
        }
      }
    }
  
    new MusicPage(songs);
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

    thisApp.activatePage(pageMatchingHash);

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

    thisApp.data = {};

    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('settings:', settings);
    console.log('classNames:', classNames);

    thisApp.initData();
    thisApp.initPages();

    //console.log('data', thisApp.data);
    //console.log('songs', thisApp.data.songs);
  }
};

app.init();