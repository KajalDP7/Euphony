var y = document.getElementsByClassName("slider_container");

let curr_track = document.querySelector("#Alone");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let volume_value = document.querySelector(".volume-value");
let updateTimer;

let track_list = [
{
	name: "Alone",
	artist: "Alan Walker",
	image: "../images/AlanWalker-Alone.jpg",
},
{
	name: "It's YOU",
	artist: "Ali Gatie",
	image: "../images/AliGatie-itsyou.jpg",
},
{
	name: "Faded",
	artist: "Alan Walker",
	image: "../images/AlanWalker-Faded.jpg",
},
{
	name: "Dusk till Dawn",
	artist: "DHARIA",
	image: "../images/Dharia-DuskTillDawn.jpg",
},
{
	name: "Friends",
	artist: "Marshmello",
	image: "../images/Marshmello-Friends.jpg",
},
{
	name: "Count on Me",
	artist: "Bruno Mars",
	image: "../images/BrunoMars-CountOnMe.jpg",
},
{
	name: "WOW",
	artist: "Zara Larsson",
	image: "../images/Zara-Larsson-WOW.jpg",
},
];

function playSong(index) {
    curr_track.pause();
		clearInterval(updateTimer);
		resetValues();
    random_bg_color();
		updateTimer = setInterval(seekUpdate, 1000);
    if(index==0)
        curr_track = document.querySelector("#Alone");
    else if(index==1)
        curr_track = document.querySelector("#ItsYou");
    else if(index==2)
        curr_track = document.querySelector("#Faded");
    else if(index==3)
        curr_track = document.querySelector("#DuskTillDawn");
    else if(index==4)
        curr_track = document.querySelector("#Friends");
    else if(index==5)
        curr_track = document.querySelector("#CountOnMe");
    else if(index==6)
        curr_track = document.querySelector("#Wow");
    document.getElementById("songTitle").innerHTML = track_list[index].name;
    document.getElementById("artistName").innerHTML = track_list[index].artist;
    document.getElementsByTagName("img")[0].setAttribute("src",track_list[index].image);
    document.getElementById("pausebut").setAttribute("class","fas fa-pause-circle fa-3x");
		y[0].style.display = "flex";
		y[1].style.display = "flex";
		curr_track.play();
    //x.play();

}

function pauseSong() {
    if((document.getElementById("pausebut").getAttribute("class")).localeCompare("fas fa-pause-circle fa-3x")==0) {
        document.getElementById("pausebut").setAttribute("class","fas fa-play-circle fa-3x");
        curr_track.pause();
    }
    else {
        document.getElementById("pausebut").setAttribute("class","fas fa-pause-circle fa-3x");
        curr_track.play();
    }
}

function random_bg_color() {
// Get a random number between 64 to 256
// (for getting lighter colors)
let red = Math.floor(Math.random() * 256) + 64;
let green = Math.floor(Math.random() * 256) + 64;
let blue = Math.floor(Math.random() * 256) + 64;

// Construct a color withe the given values
let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

// Set the background to the new color
document.body.style.background = bgColor;
}

// Functiom to reset all values to their default
function resetValues() {
curr_time.textContent = "00:00";
total_duration.textContent = "00:00";
seek_slider.value = 0;
}

function seekTo() {
// Calculate the seek position by the
// percentage of the seek slider
// and get the relative duration to the track
seekto = curr_track.duration * (seek_slider.value / 100);

// Set the current track position to the calculated seek position
curr_track.currentTime = seekto;
}

function setVolume() {
// Set the volume according to the
// percentage of the volume slider set
let vol =0;
curr_track.volume = vol = volume_slider.value / 100;
if(vol*100<10)
		volume_value.textContent = "0"+Math.floor(vol*100)+"%";
else {
		volume_value.textContent = Math.floor(vol*100)+"%";
}

}

function seekUpdate() {
let seekPosition = 0;

// Check if the current track duration is a legible number
if (!isNaN(curr_track.duration)) {
	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
	seek_slider.value = seekPosition;

	// Calculate the time left and the total duration
	let currentMinutes = Math.floor(curr_track.currentTime / 60);
	let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
	let durationMinutes = Math.floor(curr_track.duration / 60);
	let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

	// Add a zero to the single digit time values
	if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
	if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
	if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
	if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

	// Display the updated duration
	curr_time.textContent = currentMinutes + ":" + currentSeconds;
	total_duration.textContent = durationMinutes + ":" + durationSeconds;
}
}
