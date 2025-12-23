<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Remix Icons")) ?>

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
                        
                        <?php echo view("partials/page-title", array("subTitle" => "Icons","title" => "Remix Icons")) ?>

                        <div class="row">
                            <div class="col-12" id="icons">
                                
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

        <!-- Remix icon js-->
        <script src="/js/pages/remix-icons.init.js"></script>

        <?= $this->include("partials/footer-scripts") ?>
        
    </body>
</html>