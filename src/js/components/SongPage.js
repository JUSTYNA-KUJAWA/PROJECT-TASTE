import {templates} from '../settings.js';
import utils from '../utils.js';

class SongPage {
  constructor(id, data){
    const thisSongPage = this;
  
    thisSongPage.id = id;
    thisSongPage.data = data;
  
    console.log(thisSongPage);
  
    thisSongPage.getElements();
    thisSongPage.render();
  }
  
  getElements(wrapper){
    const thisSongPage = this;
  
    thisSongPage.dom = {};
    thisSongPage.dom.wrapper = wrapper;
  }
  
  render(){
    const thisSongPage = this;
  
    const generatedHTML = templates.songTemplate(thisSongPage.data.song);
  
    const songDOM = utils.createDOMFromHTML(generatedHTML);
  
    console.log(songDOM);
    thisSongPage.dom.wrapper.appendChild(songDOM);
  }
}
  
export default SongPage;