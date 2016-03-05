var lib = require('../lib'),
    PageManager = require('./modules/core/PageManager');

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
            onInit: function (swiper) {
                loadPageBySwiper(swiper);
            },
            onSlideChangeEnd: function (swiper) {
                loadPageBySwiper(swiper);
                inactivePrevPage(swiper);
            }
        });

        function loadPageBySwiper(swiper) {
            var $el = $(swiper.slides[swiper.activeIndex]),
                id = $el.attr('id');
            PageManager.renderPage(id, $el);
        }

        function inactivePrevPage(swiper) {
            var $el = $(swiper.slides[swiper.previousIndex]),
                id = $el.attr('id');
            PageManager.inactivePage(id);
        }
    });
}(window));