<?php include 'partials/html.php'; ?>

<head>
    <?php
    $title = "Products Grid";
    include 'partials/title-meta.php'; ?>

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

                    <?php $page_title = "Products Grid";
                    $sub_title = "eCommerce";
                    include 'partials/page-title.php'; ?>

                    <div class="row mb-2">
                        <div class="col-sm-4">
                            <a href="ecommerce-product-create.php" class="btn btn-danger mb-2"><i class="mdi mdi-plus-circle me-1"></i> Add Products</a>
                        </div>
                        <div class="col-sm-8">
                            <div class="float-sm-end">
                                <form class="d-flex align-items-center flex-wrap">
                                    <div class="me-2">
                                        <label for="productssearch-input" class="visually-hidden">Search</label>
                                        <input type="search" class="form-control border-light" id="productssearch-input" placeholder="Search...">
                                    </div>
                                    <button type="button" class="btn btn-success mb-2 mb-sm-0"><i class="mdi mdi-cog"></i></button>
                                </form>
                            </div>
                        </div><!-- end col-->
                    </div>
                    <!-- end row -->


                    <div class="row">
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-1.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Blue color T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 41</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-2.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Half sleeve maroon T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 37</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-3.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Cream color T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 38</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-4.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Blue color T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 37</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>

                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-5.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Half sleeve T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 37</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-6.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Blue Hoodie for men</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 45</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-7.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Vneck green T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 38</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card product-box">

                                <div class="product-img">
                                    <div class="p-3">
                                        <img src="assets/images/products/product-8.png" alt="product-pic" class="img-fluid" />
                                    </div>
                                    <div class="product-action">
                                        <div class="d-flex">
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-edit-2-fill align-middle"></i> Edit</a>
                                            <a href="javascript: void(0);" class="btn btn-white d-block w-100 action-btn m-2"><i class="ri-delete-bin-fill align-middle"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-info border-top p-3">

                                    <div>
                                        <h5 class="font-16 mt-0 mb-1"><a href="ecommerce-product-detail.php" class="text-dark">Full sleeve Pink T-shirt</a> </h5>
                                        <p class="text-muted">
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                            <i class="mdi mdi-star text-warning"></i>
                                        </p>
                                        <h4 class="m-0"> <span class="text-muted"> Price : $ 45</span></h4>
                                    </div>

                                </div> <!-- end product info-->

                            </div>
                        </div>

                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-12">
                            <ul class="pagination pagination-rounded justify-content-end mb-3">
                                <li class="page-item">
                                    <a class="page-link" href="javascript: void(0);" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li class="page-item active"><a class="page-link" href="javascript: void(0);">1</a></li>
                                <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a></li>
                                <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a></li>
                                <li class="page-item"><a class="page-link" href="javascript: void(0);">4</a></li>
                                <li class="page-item"><a class="page-link" href="javascript: void(0);">5</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="javascript: void(0);" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div> <!-- end col-->
                    </div>
                    <!-- end row-->

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

    <!-- App js -->
    <script src="assets/js/app.js"></script>

</body>

</html>