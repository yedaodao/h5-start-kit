var zepto = require('zepto-loader!zepto/zepto.min'),
    Swiper = require('swiper/dist/js/swiper.jquery.umd'),
    TweenLite = require('gsap/src/uncompressed/TweenLite');

module.exports = {
    $: zepto,
    Swiper: Swiper,
    TweenLite: TweenLite
};