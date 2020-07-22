const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const replay = document.querySelector(".replay");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    //time display
    const timeDisplay = document.querySelector(".time-display");
    const outlineLength = outline.getTotalLength();
    const timeSelect = document.querySelectorAll(".time-select button");
    
    //duration for which the song will play in loop
    const fakeDuration = 600;

    //get the length of outline
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    //pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
          song.src = this.getAttribute("data-sound");
          video.src = this.getAttribute("data-video");
          checkPlaying(song);
        });
      });


    //play sound
    play.addEventListener("click", ()=>{
        checkPlaying(song);
    });

    //select time
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
          fakeDuration = this.getAttribute("data-time");
          timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
            fakeDuration % 60
          )}`;
        });
      });


    //create a function to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    //we can animate the circle as the song plays
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);


        //Animate the circle
        let progress = outlineLength - (currentTime/fakeDuration)*outlineLength;
        outline.style.strokeDashoffset = progress;
        
        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };

};

app();