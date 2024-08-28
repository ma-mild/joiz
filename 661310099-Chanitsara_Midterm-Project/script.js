$(document).ready(function() {

    var playlist = [{
        title:"พบรัก",
        artist:"INK WARUNTORN",
        plays:"การฟัง 38,000 ครั้ง",
        mp3:"http://music/Ink_Waruntorn-พบรัก.mp3",
        oga:"music/Ink_Waruntorn-พบรัก.ogg",
        poster: "music/พบรัก.jpg"
      },{
        title:"Cro Magnon Man",
        artist:"The Stark Palace",
        plays:"การฟัง 22,000 ครั้ง",
        mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
        oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
        poster: "https://i.imgur.com/lXvsuBu.png"
      },{
        title:"Bubble",
        artist:"Miaow",
        plays:"การฟัง 15,000 ครั้ง",
        m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
        oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg",
        poster: "https://i.imgur.com/klJKSVZ.jpg"
    }];
  
    var cssSelector = {
      jPlayer: "#jquery_jplayer",
      cssSelectorAncestor: ".music-player"
    };
  
    var options = {
        swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
        supplied: "ogv, m4v, oga, mp3",
        volumechange: function(event) {
          $(".volume-level").slider("value", event.jPlayer.options.volume);
        },
        timeupdate: function(event) {
          $(".progress").slider("value", event.jPlayer.status.currentPercentAbsolute);
      
          // อัปเดตเวลาปัจจุบัน
          var currentTime = $.jPlayer.convertTime(event.jPlayer.status.currentTime);
          $(".jp-current-time").text(currentTime);
      
          // อัปเดตเวลาที่เหลือ
          var remainingTime = $.jPlayer.convertTime(event.jPlayer.status.duration - event.jPlayer.status.currentTime);
          $(".jp-remaining-time").text("-" + remainingTime);
        },
        playlistOptions: {
          autoPlay: false,
          displayTime: function(index, playlistItem) {
            $('.jp-playlist-current .title').text(playlistItem.title);
            $('.jp-playlist-current .artist').text(playlistItem.artist);
            $('.jp-playlist-current .plays').text(playlistItem.plays);
            $('.jp-playlist-current .poster img').attr('src', playlistItem.poster);
          }
        }
      };
      
  
    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
  
    // สร้างคอนโทรลสำหรับ progress
    $(".progress").slider({
      animate: "fast",
      max: 100,
      range: "min",
      step: 0.1,
      value: 0,
      slide: function(event, ui) {
        var sp = $(cssSelector.jPlayer).data("jPlayer").status.seekPercent;
        if(sp > 0) {
          $(cssSelector.jPlayer).jPlayer("playHead", ui.value * (100 / sp));
        } else {
          setTimeout(function() {
            $(".progress").slider("value", 0);
          }, 0);
        }
      }
    });
  
});
let selectedGenres = [];
let backgroundImages = {
    "POP": "url('https://via.placeholder.com/420x356.png?')",
    "ROCK": "url('https://via.placeholder.com/420x356.png?')",
    "COUNTRY": "url('https://via.placeholder.com/420x356.png?')",
    "HIP-HOP": "url('https://via.placeholder.com/420x356.png?')",
    "ACOUSTIC": "url('https://via.placeholder.com/420x356.png?')",
    "EDM": "url('https://via.placeholder.com/420x356.png?')",
    "R&B": "url('https://via.placeholder.com/420x356.png?')",
    "INDIE": "url('https://via.placeholder.com/420x356.png?')",
    "PUNK": "url('https://via.placeholder.com/420x356.png?')",
    "JAZZ": "url('https://via.placeholder.com/420x356.png?')",
    "CLASSIC": "url('https://via.placeholder.com/420x356.png?')",
    "LATIN": "url('https://via.placeholder.com/420x356.png?')",
    "SOUL": "url('https://via.placeholder.com/420x356.png?')"
};

let genreLinks = {
    "POP": "https://example.com/pop",
    "ROCK": "https://example.com/rock",
    "COUNTRY": "https://example.com/country",
    "HIP-HOP": "https://example.com/hip-hop",
    "ACOUSTIC": "https://example.com/acoustic",
    "EDM": "https://example.com/edm",
    "R&B": "https://example.com/rb",
    "INDIE": "https://example.com/indie",
    "PUNK": "https://example.com/punk",
    "JAZZ": "https://example.com/jazz",
    "CLASSIC": "https://example.com/classic",
    "LATIN": "https://example.com/latin",
    "SOUL": "https://example.com/soul"
};

function selectGenre(element) {
    if (selectedGenres.length < 5 && !selectedGenres.includes(element.textContent)) {
        selectedGenres.push(element.textContent);

        if (selectedGenres.length <= 2) {
            element.classList.add('selected-1');
        } else {
            element.classList.add('selected-2');
        }

        if (selectedGenres.length === 5) {
            displayRecommendations();
        }
    }
}

function displayRecommendations() {
    const recommendationContainer = document.getElementById('recommendationContainer');
    recommendationContainer.innerHTML = '';

    selectedGenres.forEach((genre, index) => {
        const link = document.createElement('a');
        link.href = genreLinks[genre];
        link.className = 'recommendation';
        link.classList.add(index < 3 ? 'small' : 'large');
        link.style.backgroundImage = backgroundImages[genre];
        link.textContent = genre;
        link.target = "_blank"; // เปิดลิงก์ในแท็บใหม่

        // สร้างกล่องที่มีลูกศร
        const arrowBox = document.createElement('div');
        arrowBox.className = 'arrow-box';

        const arrow = document.createElement('i');
        arrow.className = 'fas fa-arrow-up arrow'; // ใช้ไอคอนลูกศรจาก Font Awesome

        arrowBox.appendChild(arrow);
        link.appendChild(arrowBox);

        recommendationContainer.appendChild(link);
    });
}

