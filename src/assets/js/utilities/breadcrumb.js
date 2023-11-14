/* breadcrumb.js | https://www.indonez.com | Indonez | MIT License */
class Breadcrumb {
    constructor() {
        this.homeTitle = 'Home'                          // home or root of your breadcrumb title
        this.breadcrumbElement = 'uk-breadcrumb'         // breadcrumb element that use in HTML
        this.articleElement = 'in-article'               // article element wrapper that use in HTML
        this.titleElement = 'h2'                         // heading element that used for main title of article
        this.truncate = true                             // truncate option in breadcrumb article if you think to long
        this.truncateWords = 40                          // the number of words you want to truncate

        // required variables
        this.breadcrumb = document.querySelector(`.${this.breadcrumbElement}`)
        this.navbar = document.querySelector('.uk-navbar-nav') !== null ? document.querySelector('.uk-navbar-nav') : false
        this.breadcrumbHome = this.navbar !== false ? this.navbar.children[0].getElementsByTagName('a')[0].pathname : false
        this.breadcrumbTitle = this.navbar !== false ? this.navbar.querySelectorAll('li.uk-active') : false
        this.blogPath = 'blog.html'
    }

    init() {
        if(document.querySelector(`.${this.breadcrumbElement}`) !== null) {
            this.createBreadcrumb(this.breadcrumb)
            this.createBreadcrumbLast()
            this.createBreadcrumbBlog(this.breadcrumbHome, this.blogPath)
        }
    }

    createBreadcrumb(element) {
        let createLiElement

        this.breadcrumb.innerHTML = `<li><a href="${this.breadcrumbHome.slice(location.pathname.lastIndexOf('/') + 1)}">${this.homeTitle}</a></li>`
        this.breadcrumbTitle.forEach(e => {
            if(this.breadcrumbHome !== e.pathname) {
                createLiElement = document.createElement('li')
                createLiElement.innerHTML =`<a href="${e.querySelector('a').attributes[0].textContent}">${e.querySelector('a').innerText}</a>`
                element.appendChild(createLiElement)
            }
        })
    }

    createBreadcrumbLast() {
        const lastLiElement = this.breadcrumb.children[this.breadcrumb.childNodes.length-1]

        this.createLiElement = document.createElement('li')

        if(lastLiElement) {
            lastLiElement.remove()
            this.createLiElement.innerHTML = `<span>${lastLiElement.textContent}</span>`
            this.breadcrumb.appendChild(this.createLiElement)
        }
    }

    createBreadcrumbBlog(pathParam, blogPath) {
        if(document.querySelector('[data-title="blog-single"]') || document.querySelector('[data-title="blog-find"]')) {
            const breadcrumbEl = this.breadcrumb
            const articleEl = this.articleElement
            const createLiArticle = document.createElement('li')
            const breadcrumbCurrent = this.navbar.querySelectorAll('li a')

            this.breadcrumb.innerHTML = `<li><a href="${pathParam}">${this.homeTitle}</a></li>`

            breadcrumbCurrent.forEach(e => {
                if(e.pathname.split('/').at(-1) == blogPath) {
                    const urlParams = window.location.href.split( '/' )
                    const currentPage = urlParams.pop()
                    const levelOne = document.createElement('li')
                    const levelTwo = document.createElement('li')

                    levelOne.innerHTML = e.textContent

                    // if blog inside child on nav
                    if(e.closest('.uk-navbar-dropdown') !== null) {
                        levelOne.innerHTML = `<span>${e.textContent}</span>`
                        levelTwo.innerHTML = `<a href="${e.closest('.uk-navbar-dropdown').previousElementSibling.getAttribute('href')}">${e.closest('.uk-navbar-dropdown').previousElementSibling.textContent}</a>`
                        breadcrumbEl.appendChild(levelTwo)
                    }

                    if(!currentPage.includes('page') && !currentPage.includes('find')) {
                        levelOne.innerHTML = `<a href="${e.getAttribute('href')}">${e.textContent}</a>`
                    }

                    breadcrumbEl.appendChild(levelOne)
                }
            })

            // condition for single post
            if(document.querySelector(`.${articleEl}`) !== null) {
                let articleTitle = document.querySelector(`.${articleEl}`).querySelector(this.titleElement).textContent

                articleTitle = this.truncate ? this.truncateBreadcrumb(articleTitle, this.truncateWords) : articleTitle
                createLiArticle.innerHTML = `<span>${articleTitle}</span>`
                breadcrumbEl.appendChild(createLiArticle)
            }
        }
    }

    truncateBreadcrumb(string, number) {
        let cut = string.indexOf(' ', number)
        if(cut == -1) return string
        return string.substring(0, cut) + ' ...'
    }
}

new Breadcrumb().init()