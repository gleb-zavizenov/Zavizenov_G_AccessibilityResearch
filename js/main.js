const vm = new Vue({

    el: "#app",

    data: {
      content: [
          {name: 'Friends',image: 'friends.jpg', video: 'friends.mp4', subtitles:'sub-friends.mp4', transcript: 'friends.pdf'},
          {name: 'Once Upon A Time In Hollywod',image: 'once.jpg', video: 'once.mp4', subtitles:'sub-once.mp4', transcript: 'once.pdf'},
          {name: 'Never Gona Give You Up',image: 'never-give-up.jpg', video: 'never-give-up.mp4', subtitles:'sub-never-give-up.mp4', transcript: 'never-give-up.pdf'}
      ],
      selectedIndex : 0
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
        },

        unmuteVideo(){
            document.querySelector(".video-lightbox-container video").muted = false;
            document.querySelector(".sound-on").style.display = "block";
            document.querySelector(".sound-off").style.display = "none";
        },

        showSubs(){
            let video = document.querySelector(".video-lightbox-container video");
            let captionsBtn = document.querySelector(".captions-btn");
            if(video.src = `./video/subs-${this.content[this.selectedIndex]['video']}`){
                video.src = `./video/${this.content[this.selectedIndex]['video']}`;
                captionsBtn.style.backgroundColor = "white";
                captionsBtn.style.color = "black";
            } else {
                video.src = `./video/subs-${this.content[this.selectedIndex]['video']}`;
                captionsBtn.style.backgroundColor = "green";
                captionsBtn.style.color = "white";
            }
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
        }
    }
});