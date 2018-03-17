$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', 'nav a, .welcome-btn, .menu-mobile-nav a', function(e) {
        $('html').removeClass('menu-mobile-open');
        var curItem = $($(this).attr('href'));
        if (curItem.length > 0) {
            $.scrollTo(curItem, {duration: 500});
        }
        e.preventDefault();
    });

    $('body').on('click', '.menu-mobile-link', function(e) {
        $('html').toggleClass('menu-mobile-open');
        e.preventDefault();
    });

    $('body').on('click', '.control-text h3', function(e) {
        $(this).toggleClass('open');
        e.preventDefault();
    });

    $('.boiler-list-page-count').html($('.boiler-list-item').length);
    $('.boiler-list-inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.boiler-list-page-current').html(nextSlide + 1);
    });

    $('body').on('click', '.prefs-item-link', function() {
        var curItem = $(this).parent();
        if (curItem.hasClass('active')) {
            curItem.removeClass('active');
        } else {
            $('.prefs-item.active').removeClass('active');
            curItem.addClass('active');
        }
    });

    $('body').on('click', '.prefs-item-text-close', function(e) {
        $('.prefs-item.active').removeClass('active');
        e.preventDefault();
    });

    $('body').on('click', '.compare-mobile-item-header', function() {
        $(this).parent().toggleClass('open');
    });

    $('.extension-list-inner').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.reviews-list-inner').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.video-list-inner').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1149,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.video-item a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть',
                NEXT    : 'Вперед',
                PREV    : 'Назад'
            }
        }
    });

});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.validate();
}


function windowOpen(linkWindow) {
    if ($('.window.visible').length > 0) {
        $('.window').removeClass('visible');
    }

    var curWindow = $(linkWindow);
    if (curWindow.length > 0) {
        curWindow.addClass('visible');
        windowPosition();
    }
}

function windowPosition() {
    if ($('.window.visible').length > 0) {
        var curWindow = $('.window.visible');
        curWindow.find('.window-container').css({'left': '50%', 'margin-left': -curWindow.find('.window-container').width() / 2, 'padding-right': 0});
        if (curWindow.find('.window-container').width() > $('.window').width() - 40) {
            curWindow.find('.window-container').css({'left': 20, 'margin-left': 0, 'padding-right': 20});
        }

        curWindow.find('.window-container').css({'top': '50%', 'margin-top': -curWindow.find('.window-container').height() / 2, 'padding-bottom': 0});
        if (curWindow.find('.window-container').height() > $('.window').height() - 40) {
            curWindow.find('.window-container').css({'top': 20, 'margin-top': 0, 'padding-bottom': 20});
        }
    }
}

function windowClose() {
    if ($('.window.visible').length > 0) {
        $('.window').removeClass('visible');
    }
}