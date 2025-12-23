<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Mapeal Maps")) ?>

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
                        
                        <?php echo view("partials/page-title", array("subTitle" => "Maps","title" => "Mapeal Maps")) ?>

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-3">Map with a legend where slices are specified with a fixed value instead of min and max values</h4>
                                        <div class="row justify-content-center" dir="ltr">
                                            <div class="col-md-6">
                                                <div class="map-usa">
                                                    <div class="map">
                                                        <span>Alternative content for the map</span>
                                                    </div>
                                                    <div class="plotLegend">
                                                        <span>Alternative content for the legend</span>
                                                    </div>
                                                </div>
                                            </div> <!-- end col-->
                                        </div> <!-- end row-->
                                    </div>
                                </div> <!-- end card-box-->
                            </div> <!-- end col-->
                        </div>
                        <!-- end row-->

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-3">Map with links between the plotted cities</h4>
                                        <div class="mapcontainer">
                                            <div class="map">
                                                <span>Alternative content for the map</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> <!-- end card -->
                            </div> <!-- end col-->
                        </div>
                        <!-- end row-->
                        
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

        <!-- Plugins js-->
        <script src="/libs/raphael/raphael.min.js"></script>
        <script src="/libs/jquery-mapael/js/jquery.mapael.min.js"></script>
        <script src="/libs/jquery-mapael/js/maps/world_countries.min.js"></script>
        <script src="/libs/jquery-mapael/js/maps/usa_states.min.js"></script>

        <!-- Init js-->
        <script src="/js/pages/mapeal-maps.init.js"></script>

        <?= $this->include("partials/footer-scripts") ?>
        
    </body>
</html>