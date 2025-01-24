class Sound {
  constructor() {
    this.sfxIcon = document.getElementById("sfx");
    this.defuseAudio = new Audio("audio/defuse.mp3");
    this.explosionTimerAudio = new Audio("audio/explosion-timer.mp3");
    this.startAudio = new Audio("audio/start.mp3");
    this.playerDieAudio = new Audio("audio/player-die.mp3");
    this.sfxVolume = 0; // Default to max volume
    this.audioVolumeMax();
    this.sfxToggle(); // Initialize sfxToggle
  }

  audioVolumeMax() {
    this.sfxIcon.style.textDecoration = "none";
    this.defuseAudio.volume = 1;
    this.explosionTimerAudio.volume = 1;
    this.startAudio.volume = 1;
    this.playerDieAudio.volume = 1;
  }

  audioVolumeZero() {
    this.sfxIcon.style.textDecoration = "line-through";
    this.defuseAudio.volume = 0;
    this.explosionTimerAudio.volume = 0;
    this.startAudio.volume = 0;
    this.playerDieAudio.volume = 0;
  }

  sfxToggle() {
    this.sfxIcon.onclick = () => {
      if (this.sfxVolume === 0) {
        this.audioVolumeMax();
        this.sfxVolume = 1;
      } else {
        this.audioVolumeZero();
        this.sfxVolume = 0;
      }
    };
  }
}

window.sound = new Sound();
