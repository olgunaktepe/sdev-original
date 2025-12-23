<?php include 'partials/html.php'; ?>

<head>
    <?php
    $title = "C3 Charts";
    include 'partials/title-meta.php'; ?>

    <!-- C3 Chart css -->
    <link href="assets/libs/c3/c3.min.css" rel="stylesheet" type="text/css" />

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

                    <?php $page_title = "C3 Charts";
                    $sub_title = "Charts";
                    include 'partials/page-title.php'; ?>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Bar Chart</h4>

                                    <div id="chart" style="height: 300px;" data-colors="#e3eaef,#1abc9c,#6559cc" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Stacked Area Chart</h4>

                                    <div id="chart-stacked" style="height: 300px;" data-colors="#1abc9c,#6559cc" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->
                    </div>
                    <!-- End row -->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Roated Chart</h4>

                                    <div id="roated-chart" style="height: 300px;" data-colors="#1abc9c,#4a81d4" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Combine Chart</h4>

                                    <div id="combine-chart" style="height: 300px;" data-colors="#e3eaef,#6559cc,#f672a7,#6559cc,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->
                    </div>
                    <!-- End row -->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Donut Chart</h4>

                                    <div id="donut-chart" style="height: 300px;" data-colors="#e3eaef,#6559cc,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Pie Chart</h4>

                                    <div id="pie-chart" style="height: 300px;" data-colors="#6559cc,#e3eaef,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->
                    </div>
                    <!-- End row -->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Scatter Plot</h4>

                                    <div id="scatter-plot" style="height: 300px;" data-colors="#6559cc,#1abc9c,#6559cc,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Line Chart with Regions</h4>

                                    <div id="line-regions" style="height: 300px;" data-colors="#6559cc,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->
                    </div>
                    <!-- End row -->

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

    <!--C3 Chart-->
    <script src="assets/libs/d3/d3.min.js"></script>
    <script src="assets/libs/c3/c3.min.js"></script>

    <!-- Init js -->
    <script src="assets/js/pages/c3.init.js"></script>

    <!-- App js -->
    <script src="assets/js/app.js"></script>

</body>

</html>