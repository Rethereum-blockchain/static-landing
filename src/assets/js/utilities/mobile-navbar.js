/* mobile-navbar.js | https://www.indonez.com | Indonez | MIT License */
class MobileNavbar {
    constructor(settings) {
        this.addonButtons = settings.addonButtons
        this.buttons = settings.buttons

        // required variables
        this.navbar = document.querySelector('.uk-navbar-nav') !== null ? document.querySelector('.uk-navbar-nav') : false
        this.cloneNavbar = this.navbar !== false ? this.navbar.cloneNode(true) : false
        this.cloneNavbarChild = this.cloneNavbar !== false ? this.cloneNavbar.querySelectorAll('ul.uk-nav') : false
        this.optionalNav = document.querySelector('.in-optional-nav')
    }

    init() {        
        if (this.navbar !== false) {
            this.createMobileNav(this.cloneNavbar, this.cloneNavbarChild)
            this.createMobileBtn(this.cloneNavbar, this.navbar)
        }
    }

    createMobileNav(navbar, navbarChild) {
        // Remove the current class in main navigation
        navbar.classList.remove('uk-navbar-nav', 'uk-visible@m');
        navbar.classList.add('uk-nav-default');
        navbar.setAttribute('data-uk-nav', '');

        // Add uk-parent class to li that have children
        Array.from(navbar.children).forEach(function (e) {
            if (e.children.length == 2) {
                e.classList.add('uk-parent');
                e.children[0].lastChild.outerHTML = '<span uk-nav-parent-icon></span>'
            }
        });

        // Remove parent wrapper function
        const unwrap = node => node.replaceWith(...node.childNodes);

        // Remove the parent wrapper if have dropdown
        navbarChild.forEach(function (e) {
            e.classList.remove('uk-nav', 'uk-navbar-dropdown-nav');
            e.classList.add('uk-nav-sub');
            unwrap(e.parentElement);

            if (e.querySelector('a.uk-disabled') !== null) {
                unwrap(e.parentElement.parentElement);
                unwrap(e.parentElement);
                e.querySelector('a.uk-disabled').parentElement.parentElement.remove();
            }
        });
    }

    createMobileBtn(mobileNavbar, navbar) {
        const mobileBtn = document.createElement('div');
        const modalFull = document.createElement('div');

        // Mobile button element
        mobileBtn.classList.add('uk-navbar-item', 'in-mobile-nav', 'uk-hidden@m');
        mobileBtn.innerHTML = '<a class="uk-button" href="#modal-full" data-uk-toggle><i class="fas fa-bars"></i></a>';

        // Modal navigation element
        modalFull.id = 'modal-full';
        modalFull.classList.add('uk-modal-full');
        modalFull.setAttribute('data-uk-modal', '');
        modalFull.innerHTML = `
        <div class="uk-modal-dialog uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport>
            <a class="uk-modal-close-full uk-button"><i class="fas fa-times"></i></a>
            <div class="uk-width-large uk-padding-large">
                ${mobileNavbar.outerHTML}
                ${this.createAddonBtn(this.addonBtnUrl, this.addonBtnName, this.addonBtnIcon)}
            </div>
        </div>`

        // Clean previous mobile button if exist and insert after that 
        if(navbar.closest('.uk-navbar-left').nextElementSibling.querySelector('.in-mobile-nav')) {
            navbar.closest('.uk-navbar-left').nextElementSibling.lastElementChild.remove()
        }
        navbar.closest('.uk-navbar-left').nextElementSibling.appendChild(mobileBtn).appendChild(modalFull);
    }

    createAddonBtn(btnUrl, btnName, btnIcon) {
        const navbar = this.optionalNav;
        let signinBtn = '';
        if (this.addonButtons && navbar !== null && navbar.children.length > 0) {            
            this.buttons.forEach(function (e) {
                signinBtn += `<a href="${btnUrl(e, navbar)}" class="uk-button uk-button-${e.type} uk-border-rounded uk-align-center" style="margin-bottom : -12px">${btnName(e, navbar)}${btnIcon(e)}</a>`;
            })
        }
        return signinBtn;
    }

    addonBtnUrl(data, navbar) {
        let urlValue;
        data.url.length > 0 ?
            urlValue = data.url :
            urlValue = navbar.querySelector('a').href;
        return urlValue;
    }

    addonBtnName(data, navbar) {
        let nameValue;
        data.name.length > 0 ?
            nameValue = data.name :
            nameValue = navbar.querySelector('a').innerText;
        return nameValue;
    }

    addonBtnIcon(data) {
        let iconValue;
        data.icon !== undefined && data.icon.length > 0 ?
            iconValue = `<i class="fas fa-${data.icon} uk-margin-small-left"></i>` :
            iconValue = '';
        return iconValue;
    }
}

new MobileNavbar({
    addonButtons: true,                 // options to use addon buttons, set it "false" if you won't use addon buttons
    buttons: [
        {
            name: 'Sign in',            // button name
            url: '',                    // button url
            type: 'primary',            // button type (default, primary, secondary, danger, text)
            icon: 'right-to-bracket'    // button icon, you can use all icons from here : https://fontawesome.com/icons?d=gallery&s=solid&m=free
        },
    ]
}).init()