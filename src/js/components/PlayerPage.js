class PlayerPage {
  constructor(selector) {
    const thisPlayerPage = this;
  
    thisPlayerPage.initPlayer(selector);
  }
  
  initPlayer(selector) {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: selector,
      stopOthersOnPlay: true
    });
  }
}
  
export default PlayerPage;