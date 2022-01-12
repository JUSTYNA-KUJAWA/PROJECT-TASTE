import {select, templates} from '../settings.js';
import utils from '../utils.js';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import DiscoverPage from './DiscoverPage.js';

class MusicPage {
  constructor(songs){
    const thisMusicPage = this;

    thisMusicPage.data = {};
    thisMusicPage.data.songs = songs;
    thisMusicPage.data.categories = [];
    thisMusicPage.pages = {};

    thisMusicPage.getElements();
    thisMusicPage.generateCategories();
    thisMusicPage.renderCategories();

    thisMusicPage.pages.HomePage = new HomePage(thisMusicPage.data.songs, thisMusicPage.data.categories);
    thisMusicPage.pages.SearchPage = new SearchPage(thisMusicPage.data.songs);
    thisMusicPage.pages.DiscoverPage = new DiscoverPage(thisMusicPage.data.songs, thisMusicPage.data.categories);
  }

  getElements(){
    const thisMusicPage = this;

    thisMusicPage.dom = {};

    thisMusicPage.dom.categoryList = document.querySelector(select.listOf.categories);
    thisMusicPage.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);
  }

  generateCategories(){
    const thisMusicPage = this;

    for(let song of thisMusicPage.data.songs){
      const songCategories = song.categories;

      for(let item of songCategories){
        if(!thisMusicPage.data.categories.includes(item)){
          thisMusicPage.data.categories.push(item);
        }
      }
    }
  }

  renderCategories(){
    const thisMusicPage = this;

    for(let category of thisMusicPage.data.categories){
      const linkHtmlData = {name: category};
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      thisMusicPage.dom.categoryList.appendChild(categoryListDOM);
      thisMusicPage.dom.categorySelect.appendChild(categorySelectDOM);
    }
  }
}

export default MusicPage;