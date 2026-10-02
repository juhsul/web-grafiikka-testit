window.addEventListener("load", function () {

    // Animaation lähtötilanne
    document.body.style.transition = "none";
    document.body.style.transform = "scale(0)";
    document.body.style.opacity = "0";

    document.body.offsetHeight; // reflow

    // Lopputilanne
    document.body.style.transition = "transform 0.25s ease-in, opacity 0.25s linear";
    document.body.style.transform = "scale(1)";
    document.body.style.opacity = "1";
});

document.addEventListener("click", function () {

    document.body.style.transform = "scale(10)";
    document.body.style.opacity = "0";

    setTimeout(function () {
        location.href = "../2";
    }, 250);

});