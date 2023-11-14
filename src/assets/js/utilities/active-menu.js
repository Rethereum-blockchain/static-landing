/* active-menu.js | https://www.indonez.com | Indonez | MIT License */
class ActiveMenu {
    constructor() {
        this.activeClass = 'uk-active',                   // active class css name
        this.navbarClass = 'uk-navbar-nav',               // navbar class name in your HTML
        this.dropdownClass = 'uk-navbar-dropdown'         // dropdown class name in your HTML

        // required variables
        this.path = location.pathname.slice(location.pathname.lastIndexOf('/') + 1)
        this.navbar = document.querySelector(`.${this.navbarClass}`) !== null ? document.querySelector(`.${this.navbarClass}`).querySelectorAll('li') : false
        this.dropdown = document.querySelectorAll(`.${this.dropdownClass}`)
        this.blogPath = 'blog.html'
    }

    init() {
        if(document.querySelector(`.${this.navbarClass}`) !== null) {
            this.addActive(this.navbar)
            this.addActiveParent(this.dropdown)
            this.addActiveBlog(this.navbar, this.blogPath)
        }
    }

    addActive(navbarParam) {
        location.pathname[location.pathname.length - 1] == '/' 
        ? navbarParam[0].classList.add(this.activeClass) 
        : navbarParam.forEach(e => {
            if (e.children[0].attributes[0].value.includes('../') && e.children[0].attributes[0].value.slice(3) === this.path) e.classList.add(this.activeClass)
            if (e.children[0].attributes[0].value === this.path) e.classList.add(this.activeClass)
            if (this.path.includes(`${this.blogPath.split('.')[0]}-page`) && e.children[0].attributes[0].value === this.blogPath) e.classList.add(this.activeClass)
        })
    }

    addActiveParent(dropdownParam) {
        dropdownParam.forEach(e => {
            if(e.querySelector(`.${this.activeClass}`) !== null) {
                e.parentElement.classList.add(this.activeClass)
            }
        })
    }

    addActiveBlog(navbarPath, blogPath) {
        const urlParams = window.location.href.split( '/' )

        if(urlParams.includes(blogPath.split('.')[0]) || document.querySelector('[data-title="blog-find"]')) {
            navbarPath.forEach(e => {
                if(e.children[0].pathname.split('/').at(-1) == blogPath) {
                    e.classList.add(this.activeClass)
                    if(e.closest('.uk-navbar-dropdown') !== null) {
                        e.closest('.uk-navbar-dropdown').parentElement.classList.add(this.activeClass)
                    }
                }
            })
        }
    }
}

new ActiveMenu().init()