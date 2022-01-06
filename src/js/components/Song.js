import {select, templates} from '.././settings.js';
import utils from '.././utils.js';
class Song {
  constructor(id, data){
    const thisSong = this;
  
    thisSong.id = id;
    thisSong.data = data;
  
    console.log(thisSong);
  
    thisSong.getElements();
    thisSong.render();
  }
  
  getElements(){
    const thisSong = this;
  
    thisSong.dom = {};
    thisSong.dom.songList = document.querySelector(select.containerOf.homePage);
  }
  
  render(){
    const thisSong = this;
  
    const generatedHTML = templates.songList(thisSong.data);
  
    const songDOM = utils.createDOMFromHTML(generatedHTML);
  
    console.log(songDOM);
    thisSong.dom.songList.appendChild(songDOM);
  }
}
  
export default Song;