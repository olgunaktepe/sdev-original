<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Email Templates")) ?>

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
                        
                        <?php echo view("partials/page-title", array("subTitle" => "Email","title" => "Email Templates")) ?>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <h4 class="header-title mb-3">Basic action email</h4>
                                                <a href="email-templates-action" target="_blank"> <img src="/images/email/1.png" class="img-fluid" alt=""> </a>
                                            </div>
                                            <div class="col-md-4">
                                                <h4 class="header-title my-3 mt-md-0">Email alert</h4>
                                                <a href="email-templates-alert" target="_blank"> <img src="/images/email/2.png" class="img-fluid" alt=""> </a>
                                            </div>
                                            <div class="col-md-4">
                                                <h4 class="header-title my-3 mt-md-0">Billing email</h4>
                                                <a href="email-templates-billing" target="_blank"> <img src="/images/email/3.png" class="img-fluid" alt=""> </a>
                                            </div>
                                        </div> <!-- end row-->
                                    </div>
                                </div> <!-- end card -->
                            </div> <!-- end col-->
                        </div>    
                        <!-- end row-->
                        
                    </div> <!-- container-fluid -->

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