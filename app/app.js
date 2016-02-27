var lib = require('../lib');

var $ = lib.$,
    Swiper = lib.Swiper;

(function (window) {
    var $window = $(window);
    $(function () {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: false,
            // If pagination is needed
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            onSlideChangeEnd: function (swiper) {
                var $el = $(swiper.slides[swiper.activeIndex]);
                console.log($el.attr('id'));
            }
        })
    });
}(window));
