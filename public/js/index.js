function scrollActions() {
    if (window.innerWidth < 768) {
        return;
    }

    var controller = new ScrollMagic.Controller();

    var pinLogoSection = new ScrollMagic.Scene({
        triggerElement: "#navbar",
        triggerHook: 0,
    })
        .setClassToggle("#logoSection #logoBox", "visible")
        .addTo(controller);
}

scrollActions();