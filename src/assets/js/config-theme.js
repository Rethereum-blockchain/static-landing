'use strict';
const HomepageApp = {
    //----------- 1. Slideshow -----------
    theme_slideshow: function() {
        UIkit.slideshow('.in-slideshow', {
            autoplay: true,
            autoplayInterval: 8000,
            pauseOnHover: false,
            animation: 'slide',
            minHeight: 480,
            maxHeight: 700
        });
    },
    //---------- 2. Mobile nav button -----------
    theme_mobilenav: function() {
        new MobileNavbar({
            addonButtons: false,
            buttons: []
        }).init();
    },
    theme_init: function() {
        HomepageApp.theme_slideshow();
        HomepageApp.theme_mobilenav();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    HomepageApp.theme_init();
});
