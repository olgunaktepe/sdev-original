<?= $this->element('html') ?>

<head>
    <?= $this->element('title-meta', array('title' => 'Coming Soon')) ?>

    <?= $this->element('head-css') ?>
</head>

<body>

    <div class="my-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10">

                    <div class="text-center">

                        <img src="/images/animat-rocket-color.gif" alt="" height="160">

                        <h3 class="mt-4">Stay tunned, we're launching very soon</h3>
                        <p class="text-muted">We're making the system more awesome.</p>

                        <div class="row mt-5 justify-content-center">
                            <div class="col-md-8">
                                <div data-countdown="2022/12/17" class="counter-number"></div>
                            </div> <!-- end col-->
                        </div> <!-- end row-->
                    </div> <!-- end /.text-center-->

                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->

    <footer class="footer footer-alt">
        <script>document.write(new Date().getFullYear())</script> &copy; Minton theme by <a href="">Coderthemes</a>
    </footer>

    <!-- Vendor js -->
    <script src="/js/vendor.min.js"></script>

    <!-- Plugins js-->
    <script src="/libs/jquery-countdown/jquery.countdown.min.js"></script>

    <!-- Countdown js -->
    <script src="/js/pages/coming-soon.init.js"></script>

    <?= $this->element('footer-scripts') ?>

</body>

</html>