/*
Template Name: Minton - Admin & Dashboard Template
Author: CoderThemes
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Ecommerce cart init js
*/

// import 'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js';
import t from 'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js'
t(window, jQuery);

var defaultOptions = {
};

// touchspin
$('[data-toggle="touchspin"]').each(function (idx, obj) {
    var objOptions = $.extend({}, defaultOptions, $(obj).data());
    $(obj).TouchSpin(objOptions);
});