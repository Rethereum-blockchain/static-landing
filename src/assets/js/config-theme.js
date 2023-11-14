/* --------------------------------------------------------------------------
 * File        : config-theme.js
 * Author      : indonez
 * Author URI  : http://www.indonez.com
 *
 * Indonez Copyright 2020 All Rights Reserved.
 * -------------------------------------------------------------------------- 
 * javascript handle initialization
    1. Slideshow
    2. Mobile nav button
    3. Tradingview widget
 * -------------------------------------------------------------------------- */

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
                addonButtons: true,                 // options to use addon buttons, set it "false" if you won't use addon buttons
                buttons: [
                    {
                        name: 'Log in',             // custom button name
                        url: 'signin.html',         // custom button url
                        type: 'primary',            // button type (default, primary, secondary, danger, text)
                        icon: 'sign-in-alt'         // button icon, you can use all icons from here : https://fontawesome.com/icons?d=gallery&s=solid&m=free
                    },
                ]
            }).init();
        },
        //---------- 3. Tradingview widget -----------
        theme_tradingview: function() {
            if(window.hasOwnProperty('TradingviewWidget')) {
                new TradingviewWidget({
                    element: "#tradingview-widget",
                    height: 318,
                    type: "market-overview",
                    theme: "light",
                    symbol: [                       // array of instruments symbol based on Tradingview
                        {s: "FX:EURUSD"},
                        {s: "FX:GBPUSD"},
                        {s: "FX:USDJPY"},
                        {s: "FX:USDCHF"},
                        {s: "FX:USDCAD"}
                    ]
                }).init()
            }
        },
        theme_init: function() {
            HomepageApp.theme_slideshow();
            HomepageApp.theme_mobilenav();
            HomepageApp.theme_tradingview();
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        HomepageApp.theme_init();
    });