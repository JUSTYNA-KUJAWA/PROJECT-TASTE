class Player {
  constructor(selector) {
    const thisPlayer = this;
  
    thisPlayer.initPlayer(selector);
  }
  
  initPlayer(selector) {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: selector,
      stopOthersOnPlay: true
    });
  }
}
  
export default Player;