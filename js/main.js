const vm = new Vue({

    el: "#app",

    data: {
      content: [
          {name: 'Friends',image: 'friends.jpg', video: 'friends.mp4', subtitles:'sub-friends.mp4', transcript: 'friends.pdf'},
          {name: 'Once Upon A Time In Hollywod',image: 'once.jpg', video: 'once.mp4', subtitles:'sub-once.mp4', transcript: 'once.pdf'},
          {name: 'Never Gona Give You Up',image: 'never-give-up.jpg', video: 'never-give-up.mp4', subtitles:'sub-never-give-up.mp4', transcript: 'never-give-up.pdf'}
      ],
      selectedIndex : 0,
      captions: false
    },

    mounted(){
        window.addEventListener("keypress", function(e) {
            if(e.keyCode == 32 && document.querySelector(".video-lightbox").classList.contains('video-lightbox-show')){
                if(document.querySelector(".video-lightbox-container video").paused){
                    this.playVideo();
                } else {
                    this.pauseVideo();
                }
            }
        }.bind(this));
    },

    methods:{
        openLightbox(index){
            this.selectedIndex = parseInt(index);
            document.querySelector(".video-lightbox").classList.add('video-lightbox-show');
            document.querySelector(".video-lightbox-container video").src = `./video/${this.content[index]['video']}`;
        },

        closeLightbox(){
            document.querySelector(".video-lightbox").classList.remove('video-lightbox-show');
            let video = document.querySelector(".video-lightbox-container video");
            this.pauseVideo();
            this.unmuteVideo();
            this.captions = false;
            document.querySelector(".captions-btn").style.backgroundColor = "white";
            document.querySelector(".captions-btn").style.color = "black";
            video.currentTime = 0;
            video.muted = false;
        },

        playVideo(){
            document.querySelector(".video-lightbox-container video").play();
            document.querySelector(".play-btn").style.display = "none";
            document.querySelector(".stop-btn").style.display = "flex";
        },

        pauseVideo(){
            document.querySelector(".video-lightbox-container video").pause();
            document.querySelector(".play-btn").style.display = "flex";
            document.querySelector(".stop-btn").style.display = "none";
        },

        muteVideo(){
            document.querySelector(".video-lightbox-container video").muted = true;
            document.querySelector(".sound-on").style.display = "none";
            document.querySelector(".sound-off").style.display = "block";
            document.querySelector(".sound-range").value = 0;
        },

        unmuteVideo(){
            document.querySelector(".video-lightbox-container video").muted = false;
            document.querySelector(".sound-on").style.display = "block";
            document.querySelector(".sound-off").style.display = "none";
            document.querySelector(".sound-range").value = 1;
        },

        showSubs(){
            let video = document.querySelector(".video-lightbox-container video");
            this.pauseVideo();
            let currentTime = video.currentTime;
            let captionsBtn = document.querySelector(".captions-btn");
            if(this.captions){
                video.src = `./video/${this.content[this.selectedIndex]['video']}`;
                this.captions = false;
                video.currentTime = currentTime;
                captionsBtn.style.backgroundColor = "white";
                captionsBtn.style.color = "black";
            }else{
                video.src = `./video/${this.content[this.selectedIndex]['subtitles']}`;
                this.captions = true;
                video.currentTime = currentTime;
                captionsBtn.style.backgroundColor = "green";
                captionsBtn.style.color = "white";
            }
            this.playVideo();
        },

        displayTime(){
            let video = document.querySelector(".video-lightbox-container video");
            let percent = (video.currentTime/video.duration) * 100;
            document.querySelector(".red-line").style.width = `${percent}%`;
        },

        moveTime(e){
            let progressBar = document.querySelector(".white-line");
            let video = document.querySelector(".video-lightbox-container video");
            let newTime = (e.offsetX/progressBar.offsetWidth) * video.duration;
            video.currentTime = newTime;
        },

        changeVolume(e){
            document.querySelector(".video-lightbox-container video").volume = e;
        }
    }
});