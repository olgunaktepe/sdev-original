<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Chartjs")) ?>

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

                        <?php echo view("partials/page-title", array("subTitle" => "Charts","title" => "Chartjs")) ?>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Line Chart</h4>
                                        <div class="mt-4 chartjs-chart">
                                            <canvas id="line-chart-example" height="350" data-colors="#3bafda,#f672a7"></canvas>
                                        </div>
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Bar Chart</h4>

                                        <div class="mt-4 chartjs-chart">
                                            <canvas id="bar-chart-example" height="350" data-colors="#1abc9c,#e3eaef"></canvas>
                                        </div>
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Pie Chart</h4>

                                        <div class="mt-4 chartjs-chart">
                                            <canvas id="pie-chart-example" height="350" class="mt-4" data-colors="#3bafda,#1abc9c,#f7b84b,#e3eaef"></canvas>
                                        </div>
    
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Donut Chart</h4>
   
                                        <div class="mt-4 chartjs-chart">
                                            <canvas id="donut-chart-example" height="350" data-colors="#3bafda,#1abc9c,#e3eaef"></canvas>
                                        </div>
    
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->


                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Polar area Chart</h4>

                                        <div class="mt-4 chartjs-chart">
                                            <canvas id="polar-chart-example" height="350" data-colors="#3bafda,#f7b84b,#1abc9c,#e3eaef"> </canvas>
                                        </div>
    
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Radar Chart</h4>

                                        <div class="mt-4 chartjs-chart">
                                            <canvas id="radar-chart-example" height="350" data-colors="#3bafda,#f672a7"></canvas>
                                        </div>
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->    
                        
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

        <!-- Chart JS -->
        <script src="/libs/chart.js/Chart.bundle.min.js"></script>

        <!-- Init js -->
        <script src="/js/pages/chartjs.init.js"></script>

        <?= $this->include("partials/footer-scripts") ?>
        
    </body>
</html>