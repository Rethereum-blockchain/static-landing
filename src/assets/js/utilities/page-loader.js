/* page-loader.js | https://www.indonez.com | Indonez | MIT License */
class PageLoader {
    constructor() {
        this.class = 'loaded'
        this.wrapper = '.page-loader'
    }

    init() {
        if(document.querySelector(this.wrapper) !== null) {
            window.addEventListener('load', () => document.querySelector('body').classList.add(this.class))
        }
    }
}

new PageLoader().init()