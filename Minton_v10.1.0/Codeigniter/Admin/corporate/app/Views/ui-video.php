<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Video")) ?>

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
                           
                        <?php echo view("partials/page-title", array("subTitle" => "Base UI","title" => "Embed Video")) ?>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Ratios video 21:9</h4>
                                        <p class="sub-header">Use class <code>.ratio-21x9</code></p>
                                        <!-- 21:9 aspect ratio -->
                                        <div class="ratio ratio-21x9">
                                            <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div> <!-- end col -->

                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Ratios video 16:9</h4>
                                        <p class="sub-header">Use class <code>.ratio-16x9</code></p>
                                        <!-- 16:9 aspect ratio -->
                                        <div class="ratio ratio-16x9">
                                            <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->


                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Ratios video 4:3</h4>
                                        <p class="sub-header">Use class <code>.ratio-4x3</code></p>
                                        <!-- 4:3 aspect ratio -->
                                        <div class="ratio ratio-4x3">
                                            <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div> <!-- end col -->

                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Ratios video 1:1</h4>
                                        <p class="sub-header">Use class <code>.ratio-1x1</code></p>
                                        <!-- 1:1 aspect ratio -->
                                        <div class="ratio ratio-1x1">
                                            <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                                        </div>
                                    </div>
                                </div>
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

        <?= $this->include("partials/footer-scripts") ?>
        
    </body>
</html>