<?= $this->element('html') ?>

<head>
    <?= $this->element('title-meta', array('title' => 'Treeview')) ?>

    <!-- Treeview css -->
    <link href="/libs/jstree/themes/default/style.min.css" rel="stylesheet" type="text/css" />

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

                    <?= $this->element('page-title', array('subTitle' => 'Extended UI', 'title' => 'Treeview')) ?>

                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Basic Tree</h4>

                                    <div id="basicTree">
                                        <ul>
                                            <li><b>MINTON</b>
                                                <ul>
                                                    <li data-jstree='{"opened":true}'>Assets
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Css</li>
                                                            <li data-jstree='{"opened":true}'>Plugins
                                                                <ul>
                                                                    <li data-jstree='{"selected":true,"type":"file"}'>Plugin one</li>
                                                                    <li data-jstree='{"type":"file"}'>Plugin two</li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"opened":true}'>Email Template
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Email one</li>
                                                            <li data-jstree='{"type":"file"}'>Email two</li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"icon":"mdi mdi-view-dashboard"}'>Dashboard</li>
                                                    <li data-jstree='{"icon":"mdi mdi-format-font"}'>Typography</li>
                                                    <li data-jstree='{"opened":true}'>User Interface
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Buttons</li>
                                                            <li data-jstree='{"type":"file"}'>Cards</li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"icon":"mdi mdi-texture"}'>Forms</li>
                                                    <li data-jstree='{"icon":"mdi mdi-view-list"}'>Tables</li>
                                                </ul>
                                            </li>
                                            <li data-jstree='{"type":"file"}'>Frontend</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Checkbox Tree</h4>

                                    <div id="checkTree">
                                        <ul>
                                            <li><b>MINTON</b>
                                                <ul>
                                                    <li data-jstree='{"opened":true}'>Assets
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Css</li>
                                                            <li data-jstree='{"opened":true}'>Plugins
                                                                <ul>
                                                                    <li data-jstree='{"selected":true,"type":"file"}'>Plugin one</li>
                                                                    <li data-jstree='{"type":"file"}'>Plugin two</li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"opened":true}'>Email Template
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Email one</li>
                                                            <li data-jstree='{"type":"file"}'>Email two</li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"icon":"mdi mdi-view-dashboard"}'>Dashboard</li>
                                                    <li data-jstree='{"icon":"mdi mdi-format-font"}'>Typography</li>
                                                    <li data-jstree='{"opened":true}'>User Interface
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Buttons</li>
                                                            <li data-jstree='{"type":"file"}'>Cards</li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"icon":"mdi mdi-texture"}'>Forms</li>
                                                    <li data-jstree='{"icon":"mdi mdi-view-list"}'>Tables</li>
                                                </ul>
                                            </li>
                                            <li data-jstree='{"type":"file"}'>Frontend</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->
                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Drag & Drop Tree</h4>

                                    <div id="dragTree">
                                        <ul>
                                            <li><b>MINTON</b>
                                                <ul>
                                                    <li data-jstree='{"opened":true}'>Assets
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Css</li>
                                                            <li data-jstree='{"opened":true}'>Plugins
                                                                <ul>
                                                                    <li data-jstree='{"selected":true,"type":"file"}'>Plugin one</li>
                                                                    <li data-jstree='{"type":"file"}'>Plugin two</li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"opened":true}'>Email Template
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Email one</li>
                                                            <li data-jstree='{"type":"file"}'>Email two</li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"icon":"mdi mdi-view-dashboard"}'>Dashboard</li>
                                                    <li data-jstree='{"icon":"mdi mdi-format-font"}'>Typography</li>
                                                    <li data-jstree='{"opened":true}'>User Interface
                                                        <ul>
                                                            <li data-jstree='{"type":"file"}'>Buttons</li>
                                                            <li data-jstree='{"type":"file"}'>Cards</li>
                                                        </ul>
                                                    </li>
                                                    <li data-jstree='{"icon":"mdi mdi-texture"}'>Forms</li>
                                                    <li data-jstree='{"icon":"mdi mdi-view-list"}'>Tables</li>
                                                </ul>
                                            </li>
                                            <li data-jstree='{"type":"file"}'>Frontend</li>
                                        </ul>
                                    </div>
                                </div>

                            </div> <!-- end card -->
                        </div> <!-- end col-->

                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title mb-3">Ajax Tree</h4>

                                    <div id="ajaxTree"></div>
                                </div>
                            </div> <!-- end card -->
                        </div> <!-- end col-->
                    </div>
                    <!-- end row-->

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

    <!-- Tree view js -->
    <script src="/libs/jstree/jstree.min.js"></script>

    <script src="/js/pages/treeview.init.js"></script>

    <?= $this->element('footer-scripts') ?>

</body>

</html>