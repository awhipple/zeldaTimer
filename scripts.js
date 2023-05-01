document.addEventListener('DOMContentLoaded', () => {
    const backgroundImage = document.getElementById('background-image');
    const canvas = document.getElementById('timer-canvas');
    const ctx = canvas.getContext('2d');

    let countdownDate = new Date("2023-05-11T21:00:00").getTime();

    let circleRadius = 350;
    let arcDegrees = 300;
    let fontSize = 100;
    let circleX = canvas.width / 2;
    let circleY = canvas.height / 2;

    const customFont = new FontFace('ZFont', 'url(zfont.woff)');

    customFont.load().then(font => {
        document.fonts.add(font);
    });

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

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        circleX = canvas.width / 2;
        circleY = canvas.height / 2;
    };
    
    const initialize = () => {
        resizeCanvas();
        setInterval(updateTimer, 1000);
    };
    
    window.addEventListener('resize', resizeCanvas);
    initialize();
});