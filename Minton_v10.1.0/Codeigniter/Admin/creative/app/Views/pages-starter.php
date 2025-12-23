<?= $this->include("partials/html") ?>
    <head>
        <?php echo view("partials/title-meta", array("title" => "Starter")) ?>

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

                        <?php echo view("partials/page-title", array("subTitle" => "Extras","title" => "Starter")) ?>
                        
                        
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