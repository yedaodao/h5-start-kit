var lib = require('../lib');

var $ = lib.$,
    Swiper = lib.Swiper;

(function (window) {
    var $window = $(window);
    $(function () {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        })
    });
}(window));
