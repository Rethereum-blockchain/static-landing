/* to-top.js | https://www.indonez.com | Indonez | MIT License */
class ToTop {
    constructor() {
        this.elementName = 'to-top'
    }

    init() {
        if(document.querySelector(`.${this.elementName}`) !== null) {
            const inTotop = document.querySelector(`.${this.elementName}`)
            window.addEventListener('scroll', function () {
                setTimeout(function () {
                    window.scrollY > 350 ? (inTotop.style.opacity = 1, inTotop.classList.add('uk-animation-slide-top')) : (inTotop.style.opacity -= .1, inTotop.classList.remove('uk-animation-slide-top'))
                }, 400)
            })
        }
    }
}

new ToTop().init()