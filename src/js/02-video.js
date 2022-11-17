import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const playerTime = 'videoplayer-current-time';

if (localStorage.getItem(playerTime)) {
  player.setCurrentTime(localStorage.getItem(playerTime));
}

player.on('timeupdate', throttle(updateTime, 1000));

function updateTime(data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
}
