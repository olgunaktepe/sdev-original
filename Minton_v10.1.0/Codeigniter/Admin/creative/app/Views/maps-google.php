<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Google Maps")) ?>

		<?= $this->include("partials/head-css") ?>

    </head>

    <body>

        <!-- Begin page -->
        <div id="wrapper">

            <?= $this->include("partials/menu") ?>
      
            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->

            <div class="content-page">
                <div class="content">

                    <!-- Start Content-->
                    <div class="container-fluid">

                        <?php echo view("partials/page-title", array("subTitle" => "Maps","title" => "Google Maps")) ?>

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

                <?= $this->include("partials/footer") ?>

            </div>

            <!-- ============================================================== -->
            <!-- End Page content -->
            <!-- ============================================================== -->


        </div>
        <!-- END wrapper -->

        <?= $this->include("partials/right-sidebar") ?>

        <!-- Vendor js -->
        <script src="/js/vendor.min.js"></script>

        <!-- google maps api -->
        <script src="https://maps.google.com/maps/api/js?key=AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA"></script>

        <!-- gmap js-->
        <script src="/libs/gmaps/gmaps.min.js"></script>

        <!-- Init js-->
        <script src="/js/pages/google-maps.init.js"></script>

        <?= $this->include("partials/footer-scripts") ?>
        
    </body>
</html>