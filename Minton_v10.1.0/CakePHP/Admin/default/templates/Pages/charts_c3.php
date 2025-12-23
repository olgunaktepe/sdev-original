<?= $this->element('html') ?>

<head>
    <?= $this->element('title-meta', array('title' => 'C3 Charts')) ?>

    <!-- C3 Chart css -->
    <link href="/libs/c3/c3.min.css" rel="stylesheet" type="text/css" />

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

                    <?= $this->element('page-title', array('subTitle' => 'Charts', 'title' => 'C3 Charts')) ?>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Bar Chart</h4>

                                    <div id="chart" style="height: 300px;" data-colors="#e3eaef,#1abc9c,#3bafda" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Stacked Area Chart</h4>

                                    <div id="chart-stacked" style="height: 300px;" data-colors="#1abc9c,#3bafda" dir="ltr"></div>
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

                                    <div id="combine-chart" style="height: 300px;" data-colors="#e3eaef,#3bafda,#f672a7,#6559cc,#1abc9c" dir="ltr"></div>
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

                                    <div id="donut-chart" style="height: 300px;" data-colors="#e3eaef,#3bafda,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Pie Chart</h4>

                                    <div id="pie-chart" style="height: 300px;" data-colors="#3bafda,#e3eaef,#1abc9c" dir="ltr"></div>
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

                                    <div id="scatter-plot" style="height: 300px;" data-colors="#3bafda,#1abc9c,#3bafda,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Line Chart with Regions</h4>

                                    <div id="line-regions" style="height: 300px;" data-colors="#3bafda,#1abc9c" dir="ltr"></div>
                                </div>
                            </div> <!-- end card-->
                        </div> <!-- end col-->
                    </div>
                    <!-- End row -->

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

    <!--C3 Chart-->
    <script src="/libs/d3/d3.min.js"></script>
    <script src="/libs/c3/c3.min.js"></script>

    <!-- Init js -->
    <script src="/js/pages/c3.init.js"></script>

    <?= $this->element('footer-scripts') ?>

</body>

</html>