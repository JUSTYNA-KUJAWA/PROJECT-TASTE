import {select, settings, classNames} from './settings.js';
import HomePage from './components/HomePage.js';
import SearchPage from './components/SearchPage.js';
import DiscoverPage from './components/DiscoverPage.js';

const app = {
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

  parseData(songs, authors){
    const thisApp = this;
    thisApp.data.songs = songs;
    thisApp.data.authors = authors;
    //thisApp.songs.params = {;
      let data = {
        id: songs.id,
        title: songs.title,
        author: songs.author,
        filename: songs.filename,
        categories: songs.categories,
        ranking: songs.ranking
      };
      return data;
    },
  

  initHomePage: function() {
    const thisApp = this;

    const homeElem = document.querySelector(select.containerOf.homePage);

    thisApp.HomePage = new HomePage(homeElem);
  },
  initDiscoverPage: function() {
    const thisApp = this;
    const discoverElem = document.querySelector(select.containerOf.discoverPage);
    thisApp.DiscoverPage = new DiscoverPage(discoverElem);
  },
  initSearchPage: function() {
    const thisApp = this;
    const searchElem = document.querySelector(select.containerOf.searchPage);
    thisApp.SearchPage = new SearchPage(searchElem);
  },

  init: function(){
    const thisApp = this;

    thisApp.data = {};

    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('settings:', settings);
    console.log('classNames:', classNames);

    thisApp.initData();
    thisApp.initHomePage();
    thisApp.initDiscoverPage();
    thisApp.initSearchPage();
    thisApp.initPages();

    //console.log('data', thisApp.data);
    //console.log('songs', thisApp.data.songs);
  }
};

app.init();