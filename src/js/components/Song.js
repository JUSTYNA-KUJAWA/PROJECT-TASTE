import { templates } from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(authors, songs, wrapper) {
    const thisSong = this;

    thisSong.data = {};
    thisSong.data.songs= songs;
    thisSong.data.authors= authors;

    thisSong.renderInMenu(wrapper);
    thisSong.getElements(wrapper); 
  }
  renderInMenu(wrapper) {
    const thisSong = this;
      
    const generatedHTML = templates.songTemplate(thisSong.data.songs);
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    wrapper.appendChild(songDOM);
  }
  getElements(wrapper) {
    const thisSong = this;
  
    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
  }
}

export default Song;