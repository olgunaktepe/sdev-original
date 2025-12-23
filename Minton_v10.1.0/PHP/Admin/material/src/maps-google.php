<?php include 'partials/html.php'; ?>

<head>
    <?php
    $title = "Google Maps";
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

                    <?php $page_title = "Google Maps";
                    $sub_title = "Maps";
                    include 'partials/page-title.php'; ?>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Basic</h4>

                                    <div id="gmaps-basic" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Markers</h4>

                                    <div id="gmaps-markers" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->
                    </div> <!-- end row -->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Ultra Light</h4>

                                    <div id="ultra-light" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Dark</h4>

                                    <div id="dark" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->
                    </div> <!-- end row -->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Polygons</h4>

                                    <div id="gmaps-polygons" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Overlays</h4>

                                    <div id="gmaps-overlay" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->
                    </div> <!-- end row-->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Street View Panoramas</h4>

                                    <div id="panorama" class="gmaps-panaroma"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Routes</h4>

                                    <div id="gmaps-route" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->
                    </div> <!-- end row-->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Map Types</h4>

                                    <div id="gmaps-types" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Context menu (right click on map)</h4>

                                    <div id="gmaps-menu" class="gmaps"></div>
                                </div>
                            </div> <!-- end card -->
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

    <!-- google maps api -->
    <script src="https://maps.google.com/maps/api/js?key=AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA"></script>

    <!-- gmap js-->
    <script src="assets/libs/gmaps/gmaps.min.js"></script>

    <!-- Init js-->
    <script src="assets/js/pages/google-maps.init.js"></script>

    <!-- App js -->
    <script src="assets/js/app.js"></script>

</body>

</html>