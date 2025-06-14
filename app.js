// DOM Elements
const audio = new Audio();
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songCover = document.getElementById('songCover');
const songInfo = document.getElementById('songInfo');
const songsContainer = document.getElementById('songsContainer');
const fileInput = document.getElementById('fileInput');
const notification = document.getElementById('notification');

// State
let isPlaying = false;
let currentSongIndex = 0;
let songs = [];

// Sample songs with diverse genres and reliable audio sources
const sampleSongs = [
    {
        title: 'Acoustic Breeze',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/acousticbreeze.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3'
    },
    {
        title: 'Sunny',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/sunny.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3'
    },
    {
        title: 'Tenderness',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/tenderness.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-tenderness.mp3'
    },
    {
        title: 'Creative Minds',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/creativeminds.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3'
    },
    {
        title: 'Inspire',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/inspire.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-inspire.mp3'
    },
    {
        title: 'Summer',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/summer.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-summer.mp3'
    },
    {
        title: 'Ukulele',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/ukulele.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3'
    },
    {
        title: 'Little Idea',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/littleidea.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-littleidea.mp3'
    },
    {
        title: 'Happy Rock',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/happyrock.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3'
    },
    {
        title: 'Jazz Piano',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/jazzpiano.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-jazzpiano.mp3'
    },
    {
        title: 'All That',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/allthat.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-allthat.mp3'
    },
    {
        title: 'Better Days',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/betterdays.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-betterdays.mp3'
    },
    {
        title: 'Memories',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/memories.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-memories.mp3'
    },
    {
        title: 'Tenderness (Full Version)',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/tenderness.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-tenderness-full.mp3'
    },
    {
        title: 'New Dawn',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/newdawn.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-newdawn.mp3'
    },
    {
        title: 'Sweet',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/sweet.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-sweet.mp3'
    },
    {
        title: 'Love',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/love.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-love.mp3'
    },
    {
        title: 'Dreams',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/dreams.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-dreams.mp3'
    },
    {
        title: 'A Day to Remember',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/adaytoremember.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-adaytoremember.mp3'
    },
    {
        title: 'Little Plan',
        artist: 'Bensound',
        cover: 'https://www.bensound.com/bensound-img/littleplan.jpg',
        audio: 'https://www.bensound.com/bensound-music/bensound-littleplan.mp3'
    }
];

// Show notification
function showNotification(message, duration = 3000) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Format time in seconds to MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play song
function playSong() {
    if (songs.length === 0) {
        showNotification('No songs available');
        return;
    }
    
    const song = songs[currentSongIndex];
    
    // If no audio source is set, try to set it
    if (!audio.src) {
        if (!song.audio) {
            showNotification('No audio source available');
            return;
        }
        audio.src = song.audio;
    }
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                showNotification(`Playing: ${song.title || 'Unknown song'}`);
            })
            .catch(error => {
                console.error('Playback failed:', error);
                showNotification('Playback failed. Please try again.');
            });
    }
}

// Pause song
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    showNotification('Paused');
}

// Toggle play/pause
function togglePlay() {
    if (songs.length === 0) return;
    isPlaying ? pauseSong() : playSong();
}

// Previous song
function prevSong() {
    if (songs.length === 0) return;
    
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    
    loadSong(currentSongIndex);
    if (isPlaying) {
        // Small delay to ensure audio is loaded before playing
        setTimeout(playSong, 100);
    }
}

// Next song
function nextSong() {
    if (songs.length === 0) return;
    
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    
    loadSong(currentSongIndex);
    if (isPlaying) {
        // Small delay to ensure audio is loaded before playing
        setTimeout(playSong, 100);
    }
}

// Load song
function loadSong(index) {
    if (songs.length === 0 || index < 0 || index >= songs.length) {
        console.error('Invalid song index:', index);
        return;
    }
    
    const song = songs[index];
    currentSongIndex = index;
    
    // Update UI
    songInfo.innerHTML = `
        <h2>${song.title || 'Unknown Title'}</h2>
        <p>${song.artist || 'Unknown Artist'}</p>
    `;
    
    // Set cover image or default icon
    if (song.cover) {
        songCover.innerHTML = `<img src="${song.cover}" alt="${song.title || 'Song cover'}">`;
    } else {
        songCover.innerHTML = '<i class="fas fa-music" style="font-size: 40px; color: #9ca3af;"></i>';
    }
    
    // Set audio source
    audio.src = song.audio || '';
    
    // Update active song in the list
    updateActiveSong();
}

// Update active song in the list
function updateActiveSong() {
    document.querySelectorAll('.song-item').forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('playing');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('playing');
        }
    });
}

// Update progress bar
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Update duration if it's available
        if (duration) {
            durationEl.textContent = formatTime(duration);
        }
    }
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Create song element for the list
function createSongElement(song, index) {
    const songEl = document.createElement('div');
    songEl.className = 'song-item';
    songEl.innerHTML = `
        <img src="${song.cover || 'https://via.placeholder.com/50'}" alt="${song.title || 'Song cover'}">
        <div class="song-details">
            <h3>${song.title || 'Unknown Title'}</h3>
            <p>${song.artist || 'Unknown Artist'}</p>
        </div>
    `;
    
    songEl.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
    });
    
    return songEl;
}

// Render songs list
function renderSongs() {
    // Clear existing songs
    songsContainer.innerHTML = '';
    
    if (songs.length === 0) {
        songsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-music"></i>
                <p>No songs added yet</p>
                <p class="hint">Click "Add Songs" to add your music</p>
            </div>`;
        return;
    }
    
    // Add each song to the list
    songs.forEach((song, index) => {
        const songEl = createSongElement(song, index);
        songsContainer.appendChild(songEl);
    });
    
    // Update active song highlight
    updateActiveSong();
}

// Handle file selection
function handleFileSelect(event) {
    const files = event.target.files;
    
    if (files.length === 0) return;
    
    // Add new songs to the beginning of the array
    const newSongs = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Only process audio files
        if (!file.type.startsWith('audio/')) continue;
        
        const song = {
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            artist: 'Unknown Artist',
            audio: URL.createObjectURL(file),
            cover: 'https://via.placeholder.com/150',
            isUserAdded: true // Mark as user-added for future reference
        };
        
        newSongs.unshift(song); // Add to beginning of newSongs array
    }
    
    // Add all new songs to the beginning of the main songs array
    songs.unshift(...newSongs);
    
    // Update UI
    renderSongs();
    
    // If this was the first song added, load it
    if (songs.length > 0 && songs.length <= files.length) {
        loadSong(0);
    }
    
    showNotification(`Added ${files.length} song(s)`);
    
    // Reset file input to allow selecting the same file again
    event.target.value = '';
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
fileInput.addEventListener('change', handleFileSelect);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowLeft') {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    } else if (e.code === 'ArrowRight') {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    } else if (e.code === 'ArrowUp') {
        audio.volume = Math.min(1, audio.volume + 0.1);
    } else if (e.code === 'ArrowDown') {
        audio.volume = Math.max(0, audio.volume - 0.1);
    }
});

// Initialize player
function initPlayer() {
    // Start with sample songs
    songs = [...sampleSongs];
    renderSongs();
    
    // Set initial volume
    audio.volume = 0.7;
}

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
} else {
    initPlayer();
}
