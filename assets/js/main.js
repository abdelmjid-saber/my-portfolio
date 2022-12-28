// Start Mouse
const mouseCircle = document.querySelector('.mouse-circle')
const mouseDot = document.querySelector('.mouse-dot')

let mouseCircleBool = true

const mouseCircleFn = (x, y) => {
    mouseCircleBool && (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1;`)
    mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1;`
}

let = hoverdElPosition = []

// Start Sticky Element
const stickyElement = (x, y, hoverdEl) => {
    if (hoverdEl.classList.contains("sticky")) {
        if (hoverdElPosition.length < 1) {
            hoverdElPosition = [hoverdEl.offsetTop, hoverdEl.offsetLeft]
        }

        hoverdEl.style.cssText = `top: ${y}px; left:${x}px`

        if (
            hoverdEl.offsetTop <= hoverdElPosition[0] - 100 ||
            hoverdEl.offsetTop >= hoverdElPosition[0] + 100 ||
            hoverdEl.offsetLeft <= hoverdElPosition[1] - 100 ||
            hoverdEl.offsetLeft >= hoverdElPosition[1] + 100
        ) {
            hoverdEl.style.cssText = ""
            hoverdElPosition = []
        }

        hoverdEl.onmouseleave = () => {
            hoverdEl.style.cssText = ""
            hoverdElPosition = []
        }
    }
}
// End Sticky Element

// Start Mouse Circle Transform
const mouseCircleTransform = (hoverdEl) => {
    if(hoverdEl.classList.contains("pointer-enter")) {
        mouseCircleBool = false;
        mouseCircle.style.cssText = `
        width: ${hoverdEl.getBoundingClientRect().width}px;
        height: ${hoverdEl.getBoundingClientRect().height}px;
        top: ${hoverdEl.getBoundingClientRect().top}px;
        left: ${hoverdEl.getBoundingClientRect().left}px;
        opacity: 1;
        transform: translate(0, 0);
        animation: none;
        border-radius: ${getComputedStyle(hoverdEl).borderRadius};
        transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s; 
        `
    }

    hoverdEl.onmouseleave = () => {
        mouseCircleBool = true
    }

    document.onscroll = () => {
        if(!mouseCircleBool) {
            mouseCircle.style.top = `${hoverdEl.getBoundingClientRect().top}px`
        }
    }
}
// End Mouse Circle Transform

document.body.addEventListener("mousemove", (e) => {
    let x = e.clientX
    let y = e.clientY

    mouseCircleFn(x, y)
    animationCircles(e, x, y)

    const hoverdEl = document.elementFromPoint(x, y)

    stickyElement(x, y, hoverdEl)
    mouseCircleTransform(hoverdEl)
})

document.body.addEventListener("mouseleave", () => {
    mouseCircle.style.opacity = "0"
    mouseDot.style.opacity = "0"
})
// End Mouse

// Start Animation Circles
const circles = document.querySelectorAll('.circle')
const mainImg = document.querySelector('.main-circle img')

let mX = 0
let mY = 0

const animationCircles = (e, x, y) => {
    if (x < mX) {
        circles.forEach(circle => {
            circle.style.left = "100px"
        })
        mainImg.style.left = "100px"
    } else if (x > mX) {
        circles.forEach(circle => {
            circle.style.left = "-100px"
        })
        mainImg.style.left = "-100px"
    }

    if (y < mY) {
        circles.forEach(circle => {
            circle.style.top = "100px"
        })
        mainImg.style.top = "100px"
    } else if (y > mY) {
        circles.forEach(circle => {
            circle.style.top = "-100px"
        })
        mainImg.style.top = "-100px"
    }

    mX = e.clientX
    mY = e.clientY
}
// End Animation Circles

// Start Progress Bar
const sections = document.querySelectorAll('.section')
const progressBar = document.querySelector('.progress-bar')
const halfCircles = document.querySelectorAll('.half-circle')
const halfCirclesTop = document.querySelector('.half-circle-top')
const progressBarCircle = document.querySelector('.progress-bar-circle')

const progressBarCircleFn = () => {
    const pageViewproHeight = window.innerHeight
    const pageHeight = document.documentElement.scrollHeight
    const scrolledPortion = window.pageYOffset

    const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewproHeight)) * 360

    halfCircles.forEach(el => {
        el.style.transform = `rotate(${scrolledPortionDegree}deg)`

        if (scrolledPortionDegree >= 180) {
            halfCircles[0].style.transform = "rotate(180deg)"
            halfCirclesTop.style.opacity = "0"
        } else {
            halfCirclesTop.style.opacity = "1"
        }
    })

    const scrollBool = scrolledPortion + pageViewproHeight === pageHeight

    // Start Progress Bar Click
    progressBar.onclick = (e) => {
        e.preventDefault()

        const sectionPositions = Array.from(sections).map(
            (section) => scrolledPortion + section.getBoundingClientRect().top
        )

        const position = sectionPositions.find(
            (sectionPosition) => {
                return sectionPosition > scrolledPortion
            }
        )
        scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position)
    }
    // Emd Progress Bar Click
    // Start Arrow Rotation
    if (scrollBool) {
        progressBarCircle.style.transform = "rotate(180deg)"
    } else {
        progressBarCircle.style.transform = "rotate(0)"
    }
    // End Arrow Rotation
}
progressBarCircleFn()
// End Progress Bar

// Start Navigation
const menuIcon = document.querySelector(".menu-icon")
const navbar = document.querySelector(".navbar")

document.addEventListener("scroll", () => {
    menuIcon.classList.add("show-menu-icon")
    navbar.classList.add("hide-navbar")

    if (scrollY === 0) {
        menuIcon.classList.remove("show-menu-icon")
        navbar.classList.remove("hide-navbar")
    }

    progressBarCircleFn()
})

menuIcon.addEventListener("click", () => {
    menuIcon.classList.remove("show-menu-icon")
    navbar.classList.remove("hide-navbar")
})
// End Navigation

// Start Main Btn
const mainBtns = document.querySelectorAll('.main-btn')

mainBtns.forEach(btn => {
    let ripple

    btn.addEventListener("mouseenter", e => {
        const left = e.clientX - e.target.getBoundingClientRect().left
        const top = e.clientY - e.target.getBoundingClientRect().top

        ripple = document.createElement("div")
        ripple.classList.add('ripple')
        ripple.style.left = `${left}px`
        ripple.style.top = `${top}px`

        btn.prepend(ripple)
    })

    btn.addEventListener("mouseleave", () => {
        btn.removeChild(ripple)
    })

})
// End Main Btn

// Start About Me Text
const aboutMeText = document.querySelector('.about-me-text')

const aboutMeTextContent = "Hi 👋,My name is Abdelmjid Saber Full Stack Web Developer From Egypt"

Array.from(aboutMeTextContent).forEach(char => {
    const span = document.createElement("span")
    span.textContent = char
    aboutMeText.appendChild(span)

    span.addEventListener("mouseenter", (e) => {
        e.target.style.animation = "aboutMeTextAnim 5s infinite"
    })
})
// End About Me Text

// Start Projects
const container = document.querySelector('.container')
const projects = document.querySelectorAll('.project')
const projectHideBtn = document.querySelector('.project-hide-btn')

projects.forEach((project, i) => {
    project.addEventListener("mouseenter", () => {
        project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`
    })

    project.addEventListener("mouseleave", () => {
        project.firstElementChild.style.top = "2rem"
    })

    // Start Big Projec Image
    project.addEventListener("click", () => {
        const bigImgWrapper = document.createElement("div")
        bigImgWrapper.className = "project-img-wrapper"
        container.appendChild(bigImgWrapper)

        const bigImg = document.createElement('img')
        bigImg.className = 'project-img'
        const imgPath = project.firstElementChild.getAttribute('src')
        bigImg.setAttribute('src', imgPath)
        bigImgWrapper.appendChild(bigImg)
        document.body.style.overflowY = "hidden"

        mouseCircle.style.opacity = "0"

        projectHideBtn.classList.add('change')
        projectHideBtn.onclick = () => {
            projectHideBtn.classList.remove('change')
            bigImgWrapper.remove()
            document.body.style.overflowY = "scroll"
        }
    })
    // End Big Projec Image
    i >= 6 && (project.style.cssText = "display: none; opacity: 0;")

    // Project Button
    const projectsSection = document.querySelector('.projects-section')
    const projectBtn = document.querySelector('.projects-section .main-btn')
    const projectBtnText = document.querySelector('.projects-section .main-btn span')
    let showHideBool = true

    const showProjects = (project, i) => {
        setTimeout(() => {
            project.style.display = "flex"
            projectsSection.scrollIntoView({ block: "end" })
        }, 600)

        setTimeout(() => {
            project.style.opacity = "1"
        }, i * 200)
    }

    const hideProjects = (project, i) => {
        setTimeout(() => {
            project.style.display = "none"
            projectsSection.scrollIntoView({ block: "end" })
        }, 1200)

        project.style.opacity = "0"
    }

    projectBtn.addEventListener("click", (e) => {
        e.preventDefault()

        projectBtn.firstElementChild.nextElementSibling.classList.toggle("change")

        showHideBool ? projectBtnText.textContent = "Show Less" : projectBtnText.textContent = "Show More"
        projects.forEach((project, i) => {
            i >= 6 && (showHideBool ? showProjects(project, i) : hideProjects(project, i))
        })

        showHideBool = !showHideBool
    })
})
// End Projects

// Start Contact Form
const formHeading = document.querySelector('.form-heading')
const formInputs = document.querySelectorAll('.contact-form-input')

formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        formHeading.style.opacity = "0"
        setTimeout(() => {
            formHeading.textContent = `Your ${input.placeholder}`
            formHeading.style.opacity = "1"
        }, 300)
    })

    input.addEventListener("blur", () => {
        formHeading.style.opacity = "0"
        setTimeout(() => {
            formHeading.textContent = "Let's Talk"
            formHeading.style.opacity = "1"
        }, 300)
    })
})

// End Contact Form

// Start SlideShow
const slideShow = document.querySelector(".slideshow")

setInterval(() => {
    const firstIcon = slideShow.firstElementChild

    firstIcon.classList.add("faded-out")

    const thirdIcon = slideShow.children[3]

    thirdIcon.classList.add("light")
    thirdIcon.previousElementSibling.classList.remove("light")
    setTimeout(() => {
        slideShow.removeChild(firstIcon)
        slideShow.appendChild(firstIcon)
        setTimeout(() => {
            firstIcon.classList.remove("faded-out")
        }, 500);
    }, 500)
}, 3000)
// End SlideShow