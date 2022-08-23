// player
const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover__img'),
      imgSrc = document.querySelector('.img__src')
      
// Название песен
const songs = ['Battlejuice - Dragon Hunt (Berkan Cesur Remix)', 'Amalee - Again (From Fullmetal Alchemist Brotherhood (REMIX))', 'Kanako Itou - Desire Blue Sky', 'Hiroyuki Sawano - Layers']

// Песня по умолчанию
let songIndex = 0

// Init
function loadSong(song) {
  title.innerHTML = song
  audio.src = `audio/${song}.mp3`
}
loadSong(songs[songIndex])

// Play
function playSong() {
  player.classList.add('play')
  imgSrc.src = './images/pause.svg'
  audio.play()
}

// Pause
function pauseSong() {
  player.classList.remove('play')
  imgSrc.src = './images/play.svg'
  audio.pause()
}
playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  }else{
    playSong()
  }
})

// Next song
function nextSong() {
  songIndex++
  
  if(songIndex > songs.length -1){
    songIndex = 0
  }
  
  loadSong(songs[songIndex])
  playSong()
}
nextBtn.addEventListener('click', nextSong)

// Prev song
function prevSong() {
  songIndex--
  
  if(songIndex < 0) {
    songIndex = songs.length -1
  }
  
  loadSong(songs[songIndex])
  playSong()
}
prevBtn.addEventListener('click', prevSong)

// progress bar
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

// set progress
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  
  audio.currentTime = (clickX / width) * duration
  
}
progressContainer.addEventListener('click', setProgress)

// Autoplay
audio.addEventListener('ended', nextSong)