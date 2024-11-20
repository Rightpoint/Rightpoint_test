// main function
export const scrollToY = (scrollTargetY, speed, easing, endCallback) => {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    const scrollY = window.scrollY

    scrollTargetY = scrollTargetY || 0
    speed = speed || 2000
    easing = easing || 'easeOutSine'
    let currentTime = 0

    // min time .1, max time .8 seconds
    const time = Math.max(
        0.1,
        Math.min(Math.abs(scrollY - scrollTargetY) / speed, 3)
    )

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    // const PI_D2 = Math.PI / 2
    const easingEquations = {
        easeOutSine: function (pos) {
            return Math.sin(pos * (Math.PI / 2))
        },
        easeInOutSine: function (pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1)
        },
        easeInOutQuint: function (pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5)
            }
            return 0.5 * (Math.pow(pos - 2, 5) + 2)
        },

        easeFromTo: function (pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4)
            return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2)
        },
    }

    // add animation loop
    function tick() {
        currentTime += 1 / 60

        const p = currentTime / time
        const t = easingEquations[easing](p)
        if (p < 1) {
            requestAnimationFrame(tick)
            window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t)
        } else {
            window.scrollTo(0, scrollTargetY)
            endCallback && endCallback()
        }
    }

    // call it once to get started
    tick()
}
