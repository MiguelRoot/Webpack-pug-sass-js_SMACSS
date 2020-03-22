
const getElementById = id => document.getElementById(id)
const clickcolor = getElementById('js-clickcolor')
const logoma = getElementById('js-logo-ma')

const addEventbg = (clickcolor, logoma) => {
    if (clickcolor) {
        clickcolor.addEventListener('click', function () {
            if (logoma) {
                logoma.classList.toggle('c-logo-color-white')
            }
        })
    }
}

addEventbg(clickcolor, logoma)