<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">

    <!-- LOGO -->
    <div class="logo-box">
        <a href="index.php" class="logo logo-dark text-center">
            <span class="logo-sm">
                <img src="assets/images/logo-sm-dark.png" alt="" height="24">
                <!-- <span class="logo-lg-text-light">Minton</span> -->
            </span>
            <span class="logo-lg">
                <img src="assets/images/logo-dark.png" alt="" height="20">
                <!-- <span class="logo-lg-text-light">M</span> -->
            </span>
        </a>

        <a href="index.php" class="logo logo-light text-center">
            <span class="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="24">
            </span>
            <span class="logo-lg">
                <img src="assets/images/logo-light.png" alt="" height="20">
            </span>
        </a>
    </div>

    <div class="h-100" data-simplebar>

        <!-- User box -->
        <div class="user-box text-center">
            <img src="assets/images/users/avatar-1.jpg" alt="user-img" title="Mat Helme"
                class="rounded-circle avatar-md">
            <div class="dropdown">
                <a href="#" class="text-reset dropdown-toggle h5 mt-2 mb-1 d-block"
                    data-bs-toggle="dropdown">Nik Patel</a>
                <div class="dropdown-menu user-pro-dropdown">

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-user me-1"></i>
                        <span>My Account</span>
                    </a>

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-settings me-1"></i>
                        <span>Settings</span>
                    </a>

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-lock me-1"></i>
                        <span>Lock Screen</span>
                    </a>

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-log-out me-1"></i>
                        <span>Logout</span>
                    </a>

                </div>
            </div>
            <p class="text-reset">Admin Head</p>
        </div>

        <!--- Sidemenu -->
        <div id="sidebar-menu">

            <ul id="side-menu">

                <li class="menu-title">Navigation</li>
                
                <li>
                    <a href="#sidebarDashboards" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarDashboards" class="waves-effect">
                        <i class="ri-dashboard-line"></i>
                        <span class="badge bg-success rounded-pill float-end">3</span>
                        <span> Dashboards </span>
                    </a>
                    <div class="collapse" id="sidebarDashboards">
                        <ul class="nav-second-level">
                            <li>
                                <a href="index.php">Sales</a>
                            </li>
                            <li>
                                <a href="dashboard-crm.php">CRM</a>
                            </li>
                            <li>
                                <a href="dashboard-analytics.php">Analytics</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarLayouts" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarLayouts">
                        <i class="ri-layout-line"></i>
                        <span> Layouts </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarLayouts">
                        <ul class="nav-second-level">
                            <li>
                                <a href="layouts-horizontal.php" target="_blank">Horizontal</a>
                            </li>
                            <li>
                                <a href="layouts-detached.php" target="_blank">Detached</a>
                            </li>
                            <li>
                                <a href="layouts-two-column.php" target="_blank">Two Column Menu</a>
                            </li>
                            <li>
                                <a href="layouts-preloader.php" target="_blank">Preloader</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="menu-title mt-2">Apps</li>

                <li>
                    <a href="apps-chat.php">
                        <i class="ri-message-2-line"></i>
                        <span> Chat </span>
                    </a>
                </li>

                <li>
                    <a href="#sidebarEcommerce" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarEcommerce">
                        <i class="ri-shopping-cart-2-line"></i>
                        <span class="badge bg-danger float-end">New</span>
                        <span> Ecommerce </span>
                    </a>
                    <div class="collapse" id="sidebarEcommerce">
                        <ul class="nav-second-level">
                            <li>
                                <a href="ecommerce-products.php">Products List</a>
                            </li>
                            <li>
                                <a href="ecommerce-products-grid.php">Products Grid</a>
                            </li>
                            <li>
                                <a href="ecommerce-product-detail.php">Product Detail</a>
                            </li>
                            <li>
                                <a href="ecommerce-product-create.php">Create Product</a>
                            </li>
                            <li>
                                <a href="ecommerce-customers.php">Customers</a>
                            </li>
                            <li>
                                <a href="ecommerce-orders.php">Orders</a>
                            </li>
                            <li>
                                <a href="ecommerce-orders-detail.php">Order Detail</a>
                            </li>
                            <li>
                                <a href="ecommerce-sellers.php">Sellers</a>
                            </li>
                            <li>
                                <a href="ecommerce-cart.php">Shopping Cart</a>
                            </li>
                            <li>
                                <a href="ecommerce-checkout.php">Checkout</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="apps-calendar.php">
                        <i class="ri-calendar-2-line"></i>
                        <span> Calendar </span>
                    </a>
                </li>

                <li>
                    <a href="#sidebarEmail" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarEmail">
                        <i class="ri-mail-line"></i>
                        <span> Email </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarEmail">
                        <ul class="nav-second-level">
                            <li>
                                <a href="email-inbox.php">Inbox</a>
                            </li>
                            <li>
                                <a href="email-read.php">Read Email</a>
                            </li>
                            <li>
                                <a href="email-templates.php">Email Templates</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="apps-companies.php">
                        <i class="ri-building-4-line"></i>
                        <span> Companies </span>
                    </a>
                </li>

                <li>
                    <a href="#sidebarTasks" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarTasks">
                        <i class="ri-task-line"></i>
                        <span> Tasks </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarTasks">
                        <ul class="nav-second-level">
                            <li>
                                <a href="task-list.php">List</a>
                            </li>
                            <li>
                                <a href="task-details.php">Details</a>
                            </li>
                            <li>
                                <a href="task-kanban-board.php">Kanban Board</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="apps-tickets.php">
                        <i class="ri-customer-service-2-line"></i>
                        <span> Tickets </span>
                    </a>
                </li>

                <li>
                    <a href="#sidebarContacts" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarContacts">
                        <i class="ri-profile-line"></i>
                        <span> Contacts </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarContacts">
                        <ul class="nav-second-level">
                            <li>
                                <a href="contacts-list.php">Members List</a>
                            </li>
                            <li>
                                <a href="contacts-profile.php">Profile</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="apps-file-manager.php">
                        <i class="ri-folders-line"></i>
                        <span> File Manager </span>
                    </a>
                </li>

                <li class="menu-title mt-2">Custom</li>

                <li>
                    <a href="#sidebarAuth" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarAuth">
                        <i class="ri-shield-user-line"></i>
                        <span> Auth Pages </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarAuth">
                        <ul class="nav-second-level">
                            <li>
                                <a href="auth-login.php">Log In</a>
                            </li>
                            <li>
                                <a href="auth-login-2.php">Log In 2</a>
                            </li>
                            <li>
                                <a href="auth-register.php">Register</a>
                            </li>
                            <li>
                                <a href="auth-register-2.php">Register 2</a>
                            </li>
                            <li>
                                <a href="auth-signin-signup.php">Signin - Signup</a>
                            </li>
                            <li>
                                <a href="auth-signin-signup-2.php">Signin - Signup 2</a>
                            </li>
                            <li>
                                <a href="auth-recoverpw.php">Recover Password</a>
                            </li>
                            <li>
                                <a href="auth-recoverpw-2.php">Recover Password 2</a>
                            </li>
                            <li>
                                <a href="auth-lock-screen.php">Lock Screen</a>
                            </li>
                            <li>
                                <a href="auth-lock-screen-2.php">Lock Screen 2</a>
                            </li>
                            <li>
                                <a href="auth-logout.php">Logout</a>
                            </li>
                            <li>
                                <a href="auth-logout-2.php">Logout 2</a>
                            </li>
                            <li>
                                <a href="auth-confirm-mail.php">Confirm Mail</a>
                            </li>
                            <li>
                                <a href="auth-confirm-mail-2.php">Confirm Mail 2</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarExpages" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarExpages">
                        <i class="ri-pages-line"></i>
                        <span> Extra Pages </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarExpages">
                        <ul class="nav-second-level">
                            <li>
                                <a href="pages-starter.php">Starter</a>
                            </li>
                            <li>
                                <a href="pages-timeline.php">Timeline</a>
                            </li>
                            <li>
                                <a href="pages-sitemap.php">Sitemap</a>
                            </li>
                            <li>
                                <a href="pages-invoice.php">Invoice</a>
                            </li>
                            <li>
                                <a href="pages-faqs.php">FAQs</a>
                            </li>
                            <li>
                                <a href="pages-search-results.php">Search Results</a>
                            </li>
                            <li>
                                <a href="pages-pricing.php">Pricing</a>
                            </li>
                            <li>
                                <a href="pages-maintenance.php">Maintenance</a>
                            </li>
                            <li>
                                <a href="pages-coming-soon.php">Coming Soon</a>
                            </li>
                            <li>
                                <a href="pages-gallery.php">Gallery</a>
                            </li>
                            <li>
                                <a href="pages-404.php">Error 404</a>
                            </li>
                            <li>
                                <a href="pages-404-alt.php">Error 404-alt</a>
                            </li>
                            <li>
                                <a href="pages-500.php">Error 500</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="menu-title mt-2">Components</li>

                <li>
                    <a href="#sidebarBaseui" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarBaseui">
                        <i class="ri-pencil-ruler-2-line"></i>
                        <span> Base UI </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarBaseui">
                        <ul class="nav-second-level">
                            <li>
                                <a href="ui-avatars.php">Avatars</a>
                            </li>
                            <li>
                                <a href="ui-buttons.php">Buttons</a>
                            </li>
                            <li>
                                <a href="ui-cards.php">Cards</a>
                            </li>
                            <li>
                                <a href="ui-carousel.php">Carousel</a>
                            </li>
                            <li>
                                <a href="ui-dropdowns.php">Dropdowns</a>
                            </li>
                            <li>
                                <a href="ui-video.php">Embed Video</a>
                            </li>
                            <li>
                                <a href="ui-general.php">General UI</a>
                            </li>
                            <li>
                                <a href="ui-grid.php">Grid</a>
                            </li>
                            <li>
                                <a href="ui-images.php">Images</a>
                            </li>
                            <li>
                                <a href="ui-list-group.php">List Group</a>
                            </li>
                            <li>
                                <a href="ui-modals.php">Modals</a>
                            </li>
                            <li>
                                <a href="ui-notifications.php">Notifications</a>
                            </li>
                            <li>
                                <a href="ui-offcanvas.php">Offcanvas</a>
                            </li>
                            <li>
                                <a href="ui-placeholders.php">Placeholders</a>
                            </li>
                            <li>
                                <a href="ui-portlets.php">Portlets</a>
                            </li>
                            <li>
                                <a href="ui-progress.php">Progress</a>
                            </li>
                            <li>
                                <a href="ui-ribbons.php">Ribbons</a>
                            </li>
                            <li>
                                <a href="ui-spinners.php">Spinners</a>
                            </li>
                            <li>
                                <a href="ui-tabs-accordions.php">Tabs & Accordions</a>
                            </li>
                            <li>
                                <a href="ui-tooltips-popovers.php">Tooltips & Popovers</a>
                            </li>
                            <li>
                                <a href="ui-typography.php">Typography</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarExtendedui" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarExtendedui">
                        <i class="ri-stack-line"></i>
                        <span class="badge bg-info float-end">Hot</span>
                        <span> Extended UI </span>
                    </a>
                    <div class="collapse" id="sidebarExtendedui">
                        <ul class="nav-second-level">
                            <li>
                                <a href="extended-nestable.php">Nestable List</a>
                            </li>
                            <li>
                                <a href="extended-range-slider.php">Range Slider</a>
                            </li>
                            <li>
                                <a href="extended-sweet-alert.php">Sweet Alert</a>
                            </li>
                            <li>
                                <a href="extended-tour.php">Tour Page</a>
                            </li>
                            <li>
                                <a href="extended-treeview.php">Treeview</a>
                            </li>
                            <li>
                                <a href="extended-scrollspy.php">Scrollspy</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="widgets.php">
                        <i class="ri-honour-line"></i>
                        <span> Widgets </span>
                    </a>
                </li>

                <li>
                    <a href="#sidebarIcons" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarIcons">
                        <i class="ri-markup-line"></i>
                        <span> Icons </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarIcons">
                        <ul class="nav-second-level">
                            <li>
                                <a href="icons-feather.php">Feather</a>
                            </li>
                            <li>
                                <a href="icons-remix.php">Remix</a>
                            </li>
                            <li>
                                <a href="icons-boxicons.php">Boxicons</a>
                            </li>
                            <li>
                                <a href="icons-mdi.php">Material Design</a>
                            </li>
                            <li>
                                <a href="icons-font-awesome.php">Font Awesome 5</a>
                            </li>
                            <li>
                                <a href="icons-weather.php">Weather</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarForms" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarForms">
                        <i class="ri-eraser-line"></i>
                        <span> Forms </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarForms">
                        <ul class="nav-second-level">
                            <li>
                                <a href="forms-elements.php">General Elements</a>
                            </li>
                            <li>
                                <a href="forms-advanced.php">Advanced</a>
                            </li>
                            <li>
                                <a href="forms-validation.php">Validation</a>
                            </li>
                            <li>
                                <a href="forms-pickers.php">Pickers</a>
                            </li>
                            <li>
                                <a href="forms-wizard.php">Wizard</a>
                            </li>
                            <li>
                                <a href="forms-masks.php">Masks</a>
                            </li>
                            <li>
                                <a href="forms-quilljs.php">Quilljs Editor</a>
                            </li>
                            <li>
                                <a href="forms-file-uploads.php">File Uploads</a>
                            </li>
                            <li>
                                <a href="forms-x-editable.php">X Editable</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarTables" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarTables">
                        <i class="ri-table-line"></i>
                        <span> Tables </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarTables">
                        <ul class="nav-second-level">
                            <li>
                                <a href="tables-basic.php">Basic Tables</a>
                            </li>
                            <li>
                                <a href="tables-datatables.php">Data Tables</a>
                            </li>
                            <li>
                                <a href="tables-editable.php">Editable Tables</a>
                            </li>
                            <li>
                                <a href="tables-responsive.php">Responsive Tables</a>
                            </li>
                            <li>
                                <a href="tables-footables.php">FooTable</a>
                            </li>
                            <li>
                                <a href="tables-tablesaw.php">Tablesaw Tables</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarCharts" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarCharts">
                        <i class="ri-bar-chart-line"></i>
                        <span> Charts </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarCharts">
                        <ul class="nav-second-level">
                            <li>
                                <a href="charts-flot.php">Flot</a>
                            </li>
                            <li>
                                <a href="charts-apex.php">Apex</a>
                            </li>
                            <li>
                                <a href="charts-morris.php">Morris</a>
                            </li>
                            <li>
                                <a href="charts-chartjs.php">Chartjs</a>
                            </li>
                            <li>
                                <a href="charts-c3.php">C3</a>
                            </li>
                            <li>
                                <a href="charts-peity.php">Peity</a>
                            </li>
                            <li>
                                <a href="charts-chartist.php">Chartist</a>
                            </li>
                            <li>
                                <a href="charts-sparklines.php">Sparklines</a>
                            </li>
                            <li>
                                <a href="charts-knob.php">Jquery Knob</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarMaps" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMaps">
                        <i class="ri-map-pin-line"></i>
                        <span> Maps </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarMaps">
                        <ul class="nav-second-level">
                            <li>
                                <a href="maps-google.php">Google</a>
                            </li>
                            <li>
                                <a href="maps-vector.php">Vector</a>
                            </li>
                            <li>
                                <a href="maps-mapael.php">Mapael</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="#sidebarMultilevel" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel">
                        <i class="ri-share-line"></i>
                        <span> Multi Level </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarMultilevel">
                        <ul class="nav-second-level">
                            <li>
                                <a href="#sidebarMultilevel2" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel2">
                                    Second Level <span class="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="sidebarMultilevel2">
                                    <ul class="nav-second-level">
                                        <li>
                                            <a href="javascript: void(0);">Item 1</a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">Item 2</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <a href="#sidebarMultilevel3" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel3">
                                    Third Level <span class="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="sidebarMultilevel3">
                                    <ul class="nav-second-level">
                                        <li>
                                            <a href="javascript: void(0);">Item 1</a>
                                        </li>
                                        <li>
                                            <a href="#sidebarMultilevel4" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel4">
                                                Item 2 <span class="menu-arrow"></span>
                                            </a>
                                            <div class="collapse" id="sidebarMultilevel4">
                                                <ul class="nav-second-level">
                                                    <li>
                                                        <a href="javascript: void(0);">Item 1</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript: void(0);">Item 2</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

        </div>
        <!-- End Sidebar -->

        <div class="clearfix"></div>

    </div>
    <!-- Sidebar -left -->

</div>
<!-- Left Sidebar End -->