<?= $this->element('html') ?>

<head>
    <?= $this->element('title-meta', array('title' => 'Flot Charts')) ?>

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

                    <?= $this->element('page-title', array('subTitle' => 'Charts', 'title' => 'Flot Charts')) ?>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Multiple Statistics</h4>

                                    <div id="website-stats" style="height: 350px;" class="flot-chart mt-5" data-colors="#3bafda,#1abc9c"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Line Chart</h4>

                                    <div id="website-stats1" style="height: 350px;" class="flot-chart mt-5" data-colors="#3bafda,#1abc9c"></div>
                                </div>
                            </div>
                            <!-- end card -->
                        </div> <!-- end col -->
                    </div>
                    <!-- end row -->


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Donut Pie</h4>

                                    <div id="donut-chart" class="flot-chart mt-5" data-colors="#3bafda,#f672a7,#f7b84b,#6559cc,#1abc9c" style="height: 350px;"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Realtime Statistics</h4>

                                    <div id="flotRealTime" style="height: 350px;" data-colors="#3bafda" class="flot-chart mt-5"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->
                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Line Chart</h4>

                                    <div id="line-chart-alt" class="mt-5" data-colors="#3bafda,#1abc9c" style="height:350px;"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Combine Chart</h4>

                                    <div id="combine-chart" data-colors="#e3eaef,#f672a7,#3bafda" class="flot-chart mt-5" style="height: 350px;"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->
                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Stacked Bar chart</h4>

                                    <div id="ordered-bars-chart" style="height: 350px;" class="mt-5" data-colors="#e3eaef,#3bafda,#1abc9c"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Pie Chart</h4>

                                    <div id="pie-chart" class="flot-chart mt-5" data-colors="#3bafda,#f672a7,#f7b84b,#6559cc,#1abc9c" style="height: 350px;"></div>

                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col -->
                    </div>
                    <!-- end row -->

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

    <!-- flot-charts js -->
    <script src="/libs/flot-charts/jquery.flot.js"></script>
    <script src="/libs/flot-charts/jquery.flot.time.js"></script>
    <script src="/libs/jquery.flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
    <script src="/libs/flot-charts/jquery.flot.resize.js"></script>
    <script src="/libs/flot-charts/jquery.flot.pie.js"></script>
    <script src="/libs/flot-charts/jquery.flot.selection.js"></script>
    <script src="/libs/flot-charts/jquery.flot.stack.js"></script>
    <script src="/libs/flot-orderbars/js/jquery.flot.orderBars.js"></script>
    <script src="/libs/flot-charts/jquery.flot.crosshair.js"></script>

    <!-- init js -->
    <script src="/js/pages/flot.init.js"></script>

    <?= $this->element('footer-scripts') ?>

</body>

</html>