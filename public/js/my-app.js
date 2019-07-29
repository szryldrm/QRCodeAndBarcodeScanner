var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    swipeBackPage: false,
    swipePanelOnlyClose: true,
    pushState: true,
    template7Pages: true
});

function openThePopup(element) {
    var $el = $(element);
    myApp.popup($el);
}