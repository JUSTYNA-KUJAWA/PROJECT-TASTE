import { templates } from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(authors, song, wrapper) {
    const thisSong = this;
    const authorName = this.determineAuthor(authors);

    thisSong.data = {};
    thisSong.data.song = data;
    let data = {
      id: song.id,
      title: song.title,
      authorName: authorName,
      filename: song.filename,
      categories: song.categories,
      ranking: song.ranking
    };

    

    thisSong.getElements(wrapper);
    thisSong.render();
  }

  getElements(wrapper) {
    const thisSong = this;

    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
  }

  render() {
    const thisSong = this;
    
    const generatedHTML = templates.songTemplate(thisSong.data.song);
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    thisSong.dom.wrapper.appendChild(songDOM);
  }
  determineAuthor(songs,authors){
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
  }
}

export default Song;