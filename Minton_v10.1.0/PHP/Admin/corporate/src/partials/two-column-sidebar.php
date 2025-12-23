<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">

    <div class="h-100">

        <div class="sidebar-content">
            <div class="sidebar-icon-menu h-100" data-simplebar>
                <!-- LOGO -->
                <a href="index.php" class="logo">
                    <span>
                        <img src="assets/images/logo-sm.png" alt="" height="28">
                    </span>
                </a>
                <nav class="nav flex-column" id="two-col-sidenav-main">
                    <a class="nav-link active" href="#dashboard" title="Dashboard">
                        <i class="ri-dashboard-line"></i>
                    </a>
                    <a class="nav-link" href="#apps" title="Apps">
                        <i class="ri-apps-2-line"></i>
                    </a>
                    <a class="nav-link" href="#pages" title="Pages">
                        <i class="ri-pages-line"></i>
                    </a>
                    <a class="nav-link" href="#layouts" title="Layouts">
                        <i class="ri-layout-line"></i>
                    </a>
                    <a class="nav-link" href="#uielements" title="UI Elements">
                        <i class="ri-pencil-ruler-2-line"></i>
                    </a>
                    <a class="nav-link" href="#components" title="Components">
                        <i class="ri-stack-line"></i>
                    </a>
                    <a class="nav-link" href="widgets.php" title="Widgets">
                        <i class="ri-honour-line align-middle"></i>
                    </a>
                </nav>
            </div>
            <!--- Sidemenu -->
            <div class="sidebar-main-menu">
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

                
                <div id="two-col-menu" class="h-100" data-simplebar>
                    <!-- User box -->
                    <div class="user-box text-center">
                        <img src="assets/images/users/avatar-1.jpg" alt="user-img" title="Mat Helme" class="rounded-circle avatar-md">
                        <div class="dropdown">
                            <a href="#" class="text-reset dropdown-toggle h5 mt-2 mb-1 d-block" data-bs-toggle="dropdown">Nik Patel</a>
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

                    <div class="twocolumn-menu-item d-block" id="dashboard">
                        <div class="title-box">
                            <h5 class="menu-title">Dashboards</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="index.php">Sales</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="dashboard-crm.php">CRM</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="dashboard-analytics.php">Analytics</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="twocolumn-menu-item" id="apps">
                        <h5 class="menu-title">Apps</h5>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="apps-calendar.php">Calendar</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="apps-chat.php">Chat</a>
                            </li>
                            <li class="nav-item">
                                <a href="#sidebarEcommerce" data-bs-toggle="collapse" class="nav-link">
                                    <span> Ecommerce </span>
                                    <span class="menu-arrow"></span>
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

                            <li class="nav-item">
                                <a href="#sidebarEmail" data-bs-toggle="collapse" class="nav-link">
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
                            <li class="nav-item">
                                <a class="nav-link" href="apps-companies.php">Companies</a>
                            </li>
                            <li class="nav-item">
                                <a href="#sidebarTasks" data-bs-toggle="collapse" class="nav-link">
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
                            <li class="nav-item">
                                <a href="#sidebarContacts" data-bs-toggle="collapse" class="nav-link">
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

                            <li class="nav-item">
                                <a class="nav-link" href="apps-file-manager.php">File Manager</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="apps-tickets.php">Tickets</a>
                            </li>
                        </ul>
                    </div>

                    <div class="twocolumn-menu-item" id="pages">
                        <div class="title-box">
                            <h5 class="menu-title">Pages</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-starter.php">Starter</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-timeline.php">Timeline</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-sitemap.php">Sitemap</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-invoice.php">Invoice</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-faqs.php">FAQs</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-search-results.php">Search Results</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-pricing.php">Pricing</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-maintenance.php">Maintenance</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-coming-soon.php">Coming Soon</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="pages-gallery.php">Gallery</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#sidebarAuth" data-bs-toggle="collapse" class="nav-link">
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
                                <li class="nav-item">
                                    <a href="#sidebarErrors" data-bs-toggle="collapse" class="nav-link">
                                        Error Pages <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarErrors">
                                        <ul class="nav-second-level">
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

                            </ul>
                        </div>
                    </div>

                    <div class="twocolumn-menu-item" id="layouts">
                        <div class="title-box">
                            <h5 class="menu-title">Layouts</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="index.php" target="_blank">Vertical</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="layouts-horizontal.php" target="_blank">Horizontal</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="layouts-detached.php" target="_blank">Detached</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="layouts-two-column.php" target="_blank">Two Column Menu</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="layouts-preloader.php" target="_blank">Preloader</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="twocolumn-menu-item" id="uielements">
                        <div class="title-box">
                            <h5 class="menu-title">UI Elements</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-avatars.php">Avatars</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-buttons.php">Buttons</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-cards.php">Cards</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-carousel.php">Carousel</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-dropdowns.php">Dropdowns</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-video.php">Embed Video</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-general.php">General UI</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-grid.php">Grid</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-images.php">Images</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-list-group.php">List Group</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-modals.php">Modals</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-notifications.php">Notifications</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-offcanvas.php">Offcanvas</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-placeholders.php">Placeholders</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-portlets.php">Portlets</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-progress.php">Progress</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-ribbons.php">Ribbons</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-spinners.php">Spinners</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-tabs-accordions.php">Tabs & Accordions</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-tooltips-popovers.php">Tooltips & Popovers</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ui-typography.php">Typography</a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div class="twocolumn-menu-item" id="components">
                        <div class="title-box">
                            <h5 class="menu-title">Components</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a href="#sidebarExtendedui" data-bs-toggle="collapse" class="nav-link">
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
                                <li class="nav-item">
                                    <a href="#sidebarIcons" data-bs-toggle="collapse" class="nav-link">
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
                                <li class="nav-item">
                                    <a href="#sidebarForms" data-bs-toggle="collapse" class="nav-link">
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
                                <li class="nav-item">
                                    <a href="#sidebarTables" data-bs-toggle="collapse" class="nav-link">
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
                                <li class="nav-item">
                                    <a href="#sidebarCharts" data-bs-toggle="collapse" class="nav-link">
                                        <span> Charts </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarCharts">
                                        <ul class="nav-second-level">
                                            <li>
                                                <a href="charts-flot.php">Flot Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-apex.php">Apex Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-morris.php">Morris Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-chartjs.php">Chartjs Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-c3.php">C3 Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-peity.php">Peity Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-chartist.php">Chartist Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-sparklines.php">Sparklines Charts</a>
                                            </li>
                                            <li>
                                                <a href="charts-knob.php">Jquery Knob Charts</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a href="#sidebarMaps" data-bs-toggle="collapse" class="nav-link">
                                        <span> Maps </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarMaps">
                                        <ul class="nav-second-level">
                                            <li>
                                                <a href="maps-google.php">Google Maps</a>
                                            </li>
                                            <li>
                                                <a href="maps-vector.php">Vector Maps</a>
                                            </li>
                                            <li>
                                                <a href="maps-mapael.php">Mapael Maps</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a href="#sidebarMultilevel" data-bs-toggle="collapse" class="nav-link">
                                        <span> Multi Level </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarMultilevel">
                                        <ul class="nav-second-level">
                                            <li>
                                                <a href="#sidebarMultilevel2" data-bs-toggle="collapse">
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
                                                <a href="#sidebarMultilevel3" data-bs-toggle="collapse">
                                                    Second Level 1
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
            <div class="clearfix"></div>
        </div>
        <!-- End Sidebar -->

    </div>
    <!-- Sidebar -left -->

</div>
<!-- Left Sidebar End -->
