import {select, settings, classNames} from './settings.js';


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
    const thisApp = this;

    thisApp.data={};
    thisApp.data.songs= songs;
    thisApp.data.authors= authors;
    console.log('thisApp.data.songs', thisApp.data.songs);
    console.log(' thisApp.data.authors',  thisApp.data.authors);
    const formData = utils.serializeFormToObject(thisApp.data.songs);
    thisApp.id={};

    // for every id (param)
    for(let songsId in thisApp.data.songs) {
      const id = thisApp.data.songs[songsId];
    
        // create category param 
        songsId[songsId] = {
          label: id.label,
          options: {}
        };
          for(let optionId in id.options) {
            const option = id.options[optionId];
            const optionSelected = formData[songsId] && formData[songsId].includes(optionId);

        if(optionSelected) {
          thisApp.id[songsId].options[optionId] = option.label;
        }
      }
      return thisApp.id;
    }
    console.log('thisApp.id', thisApp.id);
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