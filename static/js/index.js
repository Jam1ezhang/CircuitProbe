window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function () {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';

            setTimeout(function () {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function () {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function () {
    // Check for click events on the navbar burger icon

    // Generic options for all carousels
    var commonOptions = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        navigation: true,
        pagination: true,
        breakpoints: [
            { changePoint: 480, slidesToShow: 1, slidesToScroll: 1 },
            { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 },
            { changePoint: 1024, slidesToShow: 1, slidesToScroll: 1 }
        ]
    }

    bulmaSlider.attach();

    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();
})

// Results slider
var resultsCurrentSlide = 0;

window.addEventListener('load', function () {
    resultsSliderUpdate();
});

function resultsSliderUpdate() {
    var track = document.getElementById('resultsTrack');
    var wrapper = track.closest('.results-slider-wrapper');
    var slides = document.querySelectorAll('.results-slide');
    var dots = wrapper ? wrapper.querySelector('.results-slider-dots') : null;

    track.style.transform = 'translateX(-' + (resultsCurrentSlide * 100) + '%)';

    if (wrapper && slides[resultsCurrentSlide]) {
        var slideHeight = slides[resultsCurrentSlide].offsetHeight;
        var dotsHeight = dots ? dots.offsetHeight : 0;
        wrapper.style.height = (slideHeight + dotsHeight) + 'px';
    }

    document.querySelectorAll('.results-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === resultsCurrentSlide);
    });
}

function resultsSliderPrev() {
    var total = document.querySelectorAll('.results-slide').length;
    resultsCurrentSlide = (resultsCurrentSlide - 1 + total) % total;
    resultsSliderUpdate();
}

function resultsSliderNext() {
    var total = document.querySelectorAll('.results-slide').length;
    resultsCurrentSlide = (resultsCurrentSlide + 1) % total;
    resultsSliderUpdate();
}

function resultsSliderGo(index) {
    resultsCurrentSlide = index;
    resultsSliderUpdate();
}
