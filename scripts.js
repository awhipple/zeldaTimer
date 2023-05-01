document.addEventListener('DOMContentLoaded', () => {
    const backgroundImage = document.getElementById('background-image');
    const canvas = document.getElementById('timer-canvas');
    const ctx = canvas.getContext('2d');

    let countdownDate = new Date("2023-05-11T21:00:00").getTime();

    let circleRadius, arcDegrees, fontSize;


    const setResponsiveValues = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
      
        if (screenWidth <= 767) { // Mobile screen size
          circleRadius = 150;
          arcDegrees = 300;
          fontSize = 50;
      
          const aspectRatio = 0.6;
          const newWidth = screenWidth + 300;
          canvas.style.backgroundSize = `${newWidth}px ${newWidth*aspectRatio}px`;
        } else { // Laptop/desktop screen size
          circleRadius = 350;
          arcDegrees = 300;
          fontSize = 100;
          canvas.style.backgroundSize = "cover";
        }
      };

    let circleX = canvas.width / 2;
    let circleY = canvas.height / 2;

    const customFont = new FontFace('ZFont', 'url(zfont.woff)');

    customFont.load().then(font => {
        document.fonts.add(font);
    });

    const playAudio = () => {
        const customAudio = document.getElementById("custom-audio");
        customAudio.play();
    };

    const hideVideo = () => {
        const videoContainer = document.getElementById("video-container");
        const youtubeVideo = document.getElementById("youtube-video");
        
        videoContainer.style.display = "none";
        youtubeVideo.src = ""; // Stop the video and remove the source

        videoShown = false;
    };

    const showVideo = () => {
        videoShown = true;

        const videoContainer = document.getElementById("video-container");
        const youtubeVideo = document.getElementById("youtube-video");
        const videoId = "A0Jeez1gdZI";

        videoContainer.style.display = "block";
        youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=1`;
        
        setTimeout(playAudio, 1000);
        setTimeout(hideVideo, 20000);
    };

    const updateTimer = () => {
        let now = new Date().getTime();
        let timeLeft = countdownDate - now;

        if (timeLeft <= 0) {
            timeLeft = 0;
            backgroundImage.style.backgroundImage = "url('bg2.png')";
        }

        let seconds = Math.floor((timeLeft / 1000) % 60);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        if (minutes === 0 && seconds === 0 && !videoShown) {
            showVideo();
        }

        let timerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px 'ZFont'`;
        ctx.fillStyle = 'rgb(221,164,23)';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.save();

        for (let i = 0; i < timerText.length; i++) {
            ctx.save();
            let charAngle = (i * arcDegrees / (timerText.length - 1)) - arcDegrees / 2;
            let radians = (Math.PI / 180) * charAngle;
            ctx.translate(circleX, circleY);
            ctx.rotate(radians);
            ctx.translate(-circleX, -circleY);
            ctx.fillText(timerText[i], circleX, circleY - circleRadius);
            ctx.restore();
        }

        ctx.restore();
    };

    let videoShown = false;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        circleX = canvas.width / 2;
        circleY = canvas.height / 2;
    };
    
    const initialize = () => {
        setResponsiveValues();
        resizeCanvas();
        setInterval(updateTimer, 1000);
    };
    
    window.addEventListener('resize', () => {
        setResponsiveValues();
        resizeCanvas();
    });

    // Show video when the spacebar is pressed
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !videoShown) {
            showVideo();
        }
    });  

    initialize();
});
