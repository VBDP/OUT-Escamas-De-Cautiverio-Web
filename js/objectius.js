$(document).ready(function() {
    const $slider = $('.slider ul');
    const $slides = $('.slider li');
    const $dotsContainer = $('.slider-dots');
    let currentIndex = 0;

    // Create dots
    $slides.each(function(i) {
        $dotsContainer.append(`<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`);
    });

    const $dots = $('.dot');

    function updateSlider(index) {
        if (window.innerWidth <= 768) return; // Don't slide on mobile

        currentIndex = index;
        
        // Calculate offset to center the active slide
        const slideWidth = $slides.outerWidth(true);
        const containerWidth = $('.slider').width();
        const offset = (containerWidth / 2) - (slideWidth / 2) - (index * slideWidth);

        $slider.css('transform', `translateX(${offset}px)`);
        
        $slides.removeClass('active').eq(index).addClass('active');
        $dots.removeClass('active').eq(index).addClass('active');
    }

    // Nav Click
    $('.next-btn').click(() => {
        currentIndex = (currentIndex + 1) % $slides.length;
        updateSlider(currentIndex);
    });

    $('.prev-btn').click(() => {
        currentIndex = (currentIndex - 1 + $slides.length) % $slides.length;
        updateSlider(currentIndex);
    });

    // Dot Click
    $dots.click(function() {
        updateSlider($(this).data('index'));
    });

    // Initial positioning
    $(window).resize(() => updateSlider(currentIndex));
    setTimeout(() => updateSlider(0), 100);
});