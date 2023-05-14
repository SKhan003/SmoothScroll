function smoothScrolling() {
    var progressBar = document.querySelector("#progress-bar");
    var main = document.querySelector("#main");
    var bounds = main.getBoundingClientRect();

    var scroller = {

        wheelMultiplier: 0.2, // lower values will decrease how far it moves on scroll
        ease: 0.005, // lower values will make the animation longer

        speed: 0,
        minY: 0,
        maxY: bounds.height - window.innerHeight,
        y: 0
    };

    window.scrollTo(0, 0);

    window.addEventListener("wheel", onWheel);
    onFrame();

    function onFrame() {

        scroller.speed += -scroller.speed * scroller.ease;
        scroller.y -= scroller.speed;
        scroller.y -= Math.round(scroller.speed * 1000) / 1000;

        if (scroller.y < scroller.minY) {
            scroller.y = scroller.minY;
            scroller.speed = 0;
        } else if (scroller.y > scroller.maxY) {
            scroller.y = scroller.maxY;
            scroller.speed = 0;
        }

        var progress = scroller.y / scroller.maxY;

        main.style.transform = "translate3d(0px," + -scroller.y + "px, 1px)";
        progressBar.style.transform = "translate3d(0px,0px,0px) scaleY(" + progress + ")";

        requestAnimationFrame(onFrame);
    }

    function onWheel(event) {
        event.preventDefault();

        var normalized;
        var delta = event.wheelDelta;

        if (delta) {
            normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
        } else {
            delta = event.deltaY || event.detail || 0;
            normalized = -(delta % 3 ? delta * 10 : delta / 3);
        }

        scroller.speed += normalized * scroller.wheelMultiplier;
    }



}
smoothScrolling();  
