<?= $this->element('html') ?>

<head>
    <?= $this->element('title-meta', array('title' => 'Remix Icons')) ?>

    <?= $this->element('head-css') ?>
</head>

<body>

    <!-- Begin page -->
    <div id="wrapper">

        <?= $this->element('menu') ?>

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="content-page">
            <div class="content">

                <!-- Start Content-->
                <div class="container-fluid">

                    <?= $this->element('page-title', array('subTitle' => 'Icons', 'title' => 'Remix Icons')) ?>

                    <div class="row">
                        <div class="col-12" id="icons">

                        </div> <!-- end col-->
                    </div> <!-- end row-->

                </div> <!-- container -->

            </div> <!-- content -->

            <?= $this->element('footer') ?>

        </div>

        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->

    </div>
    <!-- END wrapper -->

    <?= $this->element('right-sidebar') ?>

    <!-- Vendor js -->
    <script src="/js/vendor.min.js"></script>

    <!-- Remix icon js-->
    <script src="/js/pages/remix-icons.init.js"></script>

    <?= $this->element('footer-scripts') ?>

</body>

</html>