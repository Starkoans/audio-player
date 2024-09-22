const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const clipsBtn = document.querySelector('.clips');
const clipsBtnText = document.querySelector('.btn-clips-text');
const volumeBtn = document.querySelector('#volume-btn');

const timer = document.querySelector('#timer');
const timerBar = document.querySelector('#timer-bar');
const durationBar = document.querySelector('#duration-bar');

const volumeBarContainer = document.querySelector('#volume-bar-container');
const volumeBar = document.querySelector('#volume-bar');
const volumeThumb = document.querySelector('#volume-thumb');

const durationDisplay = document.querySelector('#duration');
const cover = document.querySelector('#cover');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const authorWrapper = document.querySelector('.track-info');
const back = document.querySelector('.back');

const playIcon = `<svg
				id="play"
				xmlns="http://www.w3.org/2000/svg"
				width="34"
				height="34"
				fill="currentColor"
				class="bi bi-play-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
				/></svg>`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`;
const volumeIcon = `<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				fill="currentColor"
				class="bi bi-volume-down-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm3.025 4a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8"
				/></svg>`;
const muteIcon = `<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				fill="currentColor"
				class="bi bi-volume-mute-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"
				/>
			</svg>`;

playBtn.innerHTML = playIcon;
const tracks = [
	{
		title: 'Break My Heart',
		cover: './assets/dua.gif',
		album: './assets/album-dua.jpg',
		author: 'Dua Lipa',
		src: './assets/DuaLipaBreakMyHeart.mp3',
	},
	{
		title: 'Too Cool To Be Careless',
		cover: './assets/kid-dancing.gif',
		album: './assets/pawsa.jpg',
		author: 'PAWSA',
		src: './assets/PAWSA_TooCoolToBeCareless.mp3',
	},
	{
		title: "Cleanin' Out My Closet",
		cover: './assets/eminem.gif',
		album: './assets/album-eminem.jpg',
		author: 'Eminem',
		src: './assets/Eminem_CleaninOutMyCloset.mp3',
	},
	{
		title: 'Pedro (Techno Extended Remix)',
		cover: './assets/pedro-racoon.gif',
		album: './assets/album-pedro.jpg',
		author: 'Raffaella Carra x Jaxomy & Agatino Romero',
		src: './assets/pedro.mp3',
	},
];
let currentTrackIndex = 0;

let isPlay = false;
let currentTime = 0;
let currentVolume = 0.75;
let isMute = false;
let isClipsPlay = true;
let duration = 0;

function loadTrack(index) {
	audio.src = tracks[index].src;
	isPlay = false;
	playBtn.innerHTML = playIcon;
	cover.src = tracks[index].album;
	timerBar.style.width = '0%';
	title.innerHTML = tracks[index].title;
	author.innerHTML = tracks[index].author;

	if (isClipsPlay) {
		let img = new Image();
		img.src = tracks[index].cover;
		img.onload = () => {
			console.log('img');
			back.style.backgroundImage = `url(${img.src})`;
		};
	}

	const containerWidth = authorWrapper.offsetWidth;
	const textWidth = author.scrollWidth;
	if (textWidth > containerWidth) {
		author.classList.add('animated-textscroll');
	} else {
		author.classList.remove('animated-textscroll');
	}
}

document.addEventListener('DOMContentLoaded', function () {
	clipsBtnText.textContent = 'Stop clips';
	loadTrack(currentTrackIndex);
	audio.volume = currentVolume;
	volumeBtn.innerHTML = volumeIcon;
});

function handlePlayPause() {
	if (!isPlay) {
		isPlay = true;
		playBtn.innerHTML = pauseIcon;
		cover.classList.add('rotated');
		audio.play();
	} else {
		isPlay = false;
		playBtn.innerHTML = playIcon;
		cover.classList.remove('rotated');
		audio.pause();
	}
}

function handlePrevTrack() {
	if (currentTrackIndex > 0) {
		currentTrackIndex--;
		loadTrack(currentTrackIndex);
		handlePlayPause(); // Автовоспроизведение при переключении
	} else {
		currentTrackIndex = tracks.length - 1;
		loadTrack(currentTrackIndex);
		handlePlayPause();
	}
}
function handleNextTrack() {
	if (currentTrackIndex < tracks.length - 1) {
		currentTrackIndex++;
		loadTrack(currentTrackIndex);
		handlePlayPause(); // Автовоспроизведение при переключении
	} else {
		currentTrackIndex = 0;
		loadTrack(currentTrackIndex);
		handlePlayPause();
	}
}

function handlePlayClips() {
	if (isClipsPlay) {
		back.style.backgroundImage = `url()`;
		clipsBtnText.innerHTML = 'Play clips';
		isClipsPlay = false;
	} else {
		back.style.backgroundImage = `url(${tracks[currentTrackIndex].cover})`;
		clipsBtnText.innerHTML = 'Stop clips';
		isClipsPlay = true;
	}
}

clipsBtn.addEventListener('click', handlePlayClips);

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('loadedmetadata', function () {
	duration = Math.floor(audio.duration);
	durationDisplay.textContent = formatTime(duration);
});

durationBar.addEventListener('click', function (event) {
	const rect = durationBar.getBoundingClientRect(); // Получаем координаты контейнера
	const clickX = event.clientX - rect.left; // Координата клика внутри контейнера
	const progressWidth = rect.width; // Ширина всего контейнера
	const newTime = (clickX / progressWidth) * audio.duration;
	audio.currentTime = newTime;
});
function setNewTimer() {
	currentTime = Math.floor(audio.currentTime);
	timerBar.style.width = `${(currentTime / duration) * 100}%`;
	timer.textContent = formatTime(currentTime);
	if (currentTime === duration) {
		handleNextTrack();
	}
}

audio.addEventListener('timeupdate', setNewTimer);

function mute() {
	isMute = true;
	volumeBtn.innerHTML = muteIcon;
	audio.volume = 0;
}
function unmute(newVolume) {
	isMute = false;
	volumeBtn.innerHTML = volumeIcon;
	audio.volume = currentVolume;
}

function handleVolume() {
	if (!isMute) {
		mute();
	} else {
		unmute(currentVolume);
	}
}

let isDragging = false;

function setNewVolume(clientX) {
	const rect = volumeBarContainer.getBoundingClientRect(); // Получаем координаты контейнера
	const offsetX = clientX - rect.left; // Координата клика внутри контейнера
	const progressWidth = rect.width; // Ширина всего контейнера
	currentVolume = Math.max(0, Math.min(1, offsetX / progressWidth)); // Ограничиваем значение громкости от 0 до 1

	volumeBar.style.width = `${currentVolume * 100}%`;

	audio.volume = currentVolume;
	if (currentVolume < 0.01) {
		mute();
	} else {
		unmute();
	}
}

// Обработчики для мыши и сенсорных событий
volumeThumb.addEventListener('mousedown', function () {
	isDragging = true;
});
volumeThumb.addEventListener('touchstart', function () {
	isDragging = true;
});

document.addEventListener('mousemove', function (event) {
	if (isDragging) {
		const clientX = event.touches ? event.touches[0].clientX : event.clientX;
		setNewVolume(clientX);
	}
});

document.addEventListener('touchmove', function (event) {
	if (isDragging) {
		const clientX = event.touches ? event.touches[0].clientX : event.clientX;
		setNewVolume(clientX);
	}
});

document.addEventListener('mouseup', function () {
	isDragging = false;
});
document.addEventListener('touchend', function () {
	isDragging = false;
});

// Обработчик клика по контейнеру громкости
volumeBarContainer.addEventListener('click', function (event) {
	const clientX = event.touches ? event.touches[0].clientX : event.clientX;
	setNewVolume(clientX);
});

playBtn.addEventListener('click', handlePlayPause);
prevBtn.addEventListener('click', handlePrevTrack);
nextBtn.addEventListener('click', handleNextTrack);
volumeBtn.addEventListener('click', handleVolume);
