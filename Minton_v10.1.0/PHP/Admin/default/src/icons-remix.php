<?php include 'partials/html.php'; ?>

<head>
    <?php
    $title = "Remix Icons";
    include 'partials/title-meta.php'; ?>

    <?php include 'partials/head-css.php'; ?>
</head>

<body>

    <!-- Begin page -->
    <div id="wrapper">

        <?php include 'partials/menu.php'; ?>

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="content-page">
            <div class="content">

                <!-- Start Content-->
                <div class="container-fluid">

                    <?php $page_title = "Remix Icons";
                    $sub_title = "Icons";
                    include 'partials/page-title.php'; ?>

                    <div class="row">
                        <div class="col-12" id="icons">

                        </div> <!-- end col-->
                    </div> <!-- end row-->

                </div> <!-- container -->

            </div> <!-- content -->

            <?php include 'partials/footer.php'; ?>

        </div>

        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->

    </div>
    <!-- END wrapper -->

    <?php include 'partials/right-sidebar.php'; ?>

    <!-- Vendor js -->
    <script src="assets/js/vendor.min.js"></script>

    <!-- Remix icon js-->
    <script src="assets/js/pages/remix-icons.init.js"></script>

    <!-- App js -->
    <script src="assets/js/app.js"></script>

</body>

</html>