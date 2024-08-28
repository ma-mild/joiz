$(document).ready(function () {
    $('#jquery_jplayer').jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", { //use "setMedia". "setFile" doesn't in DevGuide
                mp3: "./music/Ink_Waruntorn-พบรัก.mp3", //set mp3 media path, also can use url
                oga: "./music/Ink_Waruntorn-พบรัก.ogg", // set ogg media path, pay attention to use "oga" not "ogg"
            });
        },
        preload: "none",
        supplied: "oga, mp3", //test set the order of media you want to use
        cssSelectorAncestor: "#jpContainer", // in order to add the controller
        volumechange: function (event) {
            $(".volume-level").slider("value", event.jPlayer.options.volume);
        },
        timeupdate: function (event) {
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
            displayTime: function (_, playlistItem) {
                $('.jp-playlist-current .title').text(playlistItem.title);
                $('.jp-playlist-current .artist').text(playlistItem.artist);
                $('.jp-playlist-current .plays').text(playlistItem.plays);
                $('.jp-playlist-current .poster img').attr('src', playlistItem.poster);
            }
        }
    });

    var cssSelector = { jPlayer: "#jquery_jplayer", cssSelectorAncestor: "#jpContainer" };
    var playlist = [
        {
            title: "พบรัก",
            artist: "INK WARUNTORN", // Optional
            mp3: "./music/Ink_Waruntorn-พบรัก.mp3", // Dependant on supplied option
            oga: "./music/Ink_Waruntorn-พบรัก.ogg", // Dependant on supplied option
            poster: "./music/พบรัก.jpg" // Optional
        },
        {
            title: "Cro Magnon Man",
            artist: "The Stark Palace",
            plays: "การฟัง 22,000 ครั้ง",
            mp3: "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
            oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
            poster: "https://i.imgur.com/lXvsuBu.png"
        }, {
            title: "Bubble",
            artist: "Miaow",
            plays: "การฟัง 15,000 ครั้ง",
            m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg",
            poster: "https://i.imgur.com/klJKSVZ.jpg"
        }
    ];
    var options = {
        swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
        supplied: "oga, mp3", //test set the order of media you want to use
        cssSelectorAncestor: "#jpContainer",
        volumechange: function (event) {
            $(".volume-level").slider("value", event.jPlayer.options.volume);
        },
        timeupdate: function (event) {
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
            displayTime: function (_, playlistItem) {
                $('.jp-playlist-current .title').text(playlistItem.title);
                $('.jp-playlist-current .artist').text(playlistItem.artist);
                $('.jp-playlist-current .plays').text(playlistItem.plays);
                $('.jp-playlist-current .poster img').attr('src', playlistItem.poster);
            }
        }
    };
    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);

    $("#play-btn").click(function () {
        myPlaylist.setPlaylist(playlist);
    });

    // สร้างคอนโทรลสำหรับ progress
    $(".progress").slider({
        animate: "fast",
        max: 100,
        range: "min",
        step: 0.1,
        value: 0,
        slide: function (event, ui) {
            var sp = $(cssSelector.jPlayer).data("jPlayer").status.seekPercent;
            if (sp > 0) {
                $(cssSelector.jPlayer).jPlayer("playHead", ui.value * (100 / sp));
            } else {
                setTimeout(function () {
                    $(".progress").slider("value", 0);
                }, 0);
            }
        }
    });
});