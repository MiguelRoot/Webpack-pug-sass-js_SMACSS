
const getElementById = id => document.getElementById(id)
const clickcolor = getElementById('clickcolor')
const logoma = getElementById('logo-ma')

const addEventbg = (clickcolor, logoma) => {
    if (clickcolor) {
        clickcolor.addEventListener('click', function () {
            if (logoma) {
                logoma.classList.toggle('logo-color-white')
            }
        })
    }
}

addEventbg(clickcolor, logoma)