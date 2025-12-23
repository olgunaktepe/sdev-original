/*
Template Name: Minton - Admin & Dashboard Template
Author: CoderThemes
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Ecommerce checkout
*/

import select2 from 'select2';
select2(window, jQuery);

import '../plugins/bootstrap-wizard.js';
import { Tab } from "bootstrap";


$(document).ready(function () {
    // wizard
    $('#checkout-nav-pills-wizard').bootstrapWizard({
        'tabClass': 'nav nav-pills nav-justified'
    });

    $('[data-toggle="select2"]').select2();
});