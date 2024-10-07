const nav = document.querySelector('nav') as HTMLElement;
const hideLogo = nav.querySelector('.logo') as HTMLLIElement;
const site = document.querySelector('.site-wrap') as HTMLDivElement;

const dis = nav.offsetTop;

function showLogo() {
    console.log(window.scrollY, dis);
    if (window.scrollY >= dis) {
        // hideLogo.style.display = 'block'
        // hideLogo.style.transform = 'scale(1)'
        hideLogo.style.maxWidth = '100%';
        nav.style.boxShadow = '0 1px 2px 2px grey';
        site.style.transform = 'scale(1)'
    } else {
        // hideLogo.style.display = 'none'
        // hideLogo.style.transform = 'scale(0)'
        hideLogo.style.maxWidth = '0%';
        nav.style.boxShadow = 'none';
        site.style.transform = 'scale(0.98)';
    }
}

function throttle(fn: () => void) {
    let timer: ReturnType<typeof setTimeout>
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, 0)
    }
}

const throttleShowLogo = throttle(showLogo);

document.addEventListener('scroll', (e) => {
    // throttleShowLogo()
    showLogo()
})