import {templates} from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(id, data){
    const thisSong = this;
  
    thisSong.id = id;
    thisSong.data = data;
  
    console.log(thisSong);
  
    thisSong.getElements();
    thisSong.render();
    thisSong.generateCategories();
  
  }
  
  getElements(){
    const thisSong = this;
  
    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
    thisSong.dom.categoryList = document.querySelector(select.listOf.categories);
    thisSong.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);
  }
  
  render(){
    const thisSong = this;
    const linkHtmlData = {name: category};
  
    const generatedHTML = templates.songTemplate(thisSong.data.song);
    const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
    const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);
  
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
    const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);
    
    thisSong.dom.wrapper.appendChild(songDOM);
    thisSong.dom.categoryList.appendChild(categoryListDOM);
    thisSong.dom.categorySelect.appendChild(categorySelectDOM);

  }
  generateCategories(){
    const thisSong = this;

    for(let song of thisSong.data.songs){
      const songCategories = song.categories;

      for(let item of songCategories){
        if(!thisSong.data.categories.includes(item)){
          thisSong.data.categories.push(item);
        }
      }
    }
  }

}
  
export default Song;