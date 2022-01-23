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
    //thisSong.dom.wrapper.form = thisSong.element.querySelector(select.paramSong.form);
  }
  prepareSong() {
    const thisSong = this;
  
    const songSummary = {};
  
    songSummary.id = thisSong.data.songs.id;
    songSummary.authorName = thisSong.data.songs.authorName;
    songSummary.title = thisSong.data.songs.title;
    songSummary.filename= thisSong.data.songs.filename;
    songSummary.category = thisSong.data.songs.category;
  
    songSummary.params = {};
  
    songSummary.params = thisSong.prepareSongParams();
    console.log('songSummary',songSummary);
  
    return songSummary;
  
  }
  prepareSongParams() {
    const thisSong = this;
  
    //const formData = utils.serializeFormToObject(thisSong.form);
    const params = {};
  
    // for every category 
    for(let songId in thisSong.data.songs.params) {
      const param = thisSong.data.songs.params[songId];
      const authorName = this.determineAuthor(thisSong.data.songs,thisSong.data.authors);
      // create category param
      params[songId] = {
        id: param.id,
        title: param.title,
        authorName: authorName,
        filename: param.filename,
        categories: param.categories,
        ranking: param.ranking,
      };
      return params;
    }
  }

  determineAuthor(songs,authors){
    const thisSong = this;
    for(let song in songs){

      let songAuthor = thisSong.data.songs[song].author;

      for(let author in authors){
        const authorName = authors[author].name;
        const authorID = authors[author].id;
      
        if(songAuthor === authorID){
          thisSong.data.songs[song].author = authorName;
          break;
        }
      }
    }
  }
}

export default Song;