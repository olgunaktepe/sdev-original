<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu" id="side-menu">

    <!-- LOGO -->
    <div class="logo-box">
        <a href="{{ route('any', 'index') }}" class="logo logo-dark text-center">
            <span class="logo-sm">
                <img src="/images/logo-sm-dark.png" alt="" height="24">
                <!-- <span class="logo-lg-text-light">Minton</span> -->
            </span>
            <span class="logo-lg">
                <img src="/images/logo-dark.png" alt="" height="20">
                <!-- <span class="logo-lg-text-light">M</span> -->
            </span>
        </a>

        <a href="{{ route('any', 'index') }}" class="logo logo-light text-center">
            <span class="logo-sm">
                <img src="/images/logo-sm.png" alt="" height="24">
            </span>
            <span class="logo-lg">
                <img src="/images/logo-light.png" alt="" height="20">
            </span>
        </a>
    </div>

    <div class="h-100" data-simplebar>

        <!-- User box -->
        <div class="user-box text-center">
            <img src="/images/users/avatar-1.jpg" alt="user-img" title="Mat Helme" class="rounded-circle avatar-md">
            <div class="dropdown">
                <a href="#" class="text-reset dropdown-toggle h5 mt-2 mb-1 d-block fw-medium" data-bs-toggle="dropdown">Nikhil Patel</a>
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
                                <a href="{{ route('any', 'index') }}">Sales</a>
                            </li>
                            <li>
                                <a href="{{ route('any', 'dashboard-crm') }}">CRM</a>
                            </li>
                            <li>
                                <a href="{{ route('any', 'dashboard-analytics') }}">Analytics</a>
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
                                <a href="{{ route('any', 'index') }}">Vertical</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['layouts-eg', 'horizontal']) }}">Horizontal</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['layouts-eg', 'detached']) }}">Detached</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['layouts-eg', 'two-column']) }}">Two Column Menu</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['layouts-eg', 'preloader']) }}">Preloader</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="menu-title mt-2">Apps</li>

                <li>
                    <a href="{{ route('second', ['apps', 'chat']) }}">
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
                                <a href="{{ route('second', ['ecommerce', 'products']) }}">Products List</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'products-grid']) }}">Products Grid</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'product-detail']) }}">Product Detail</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'product-create']) }}">Create Product</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'customers']) }}">Customers</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'orders']) }}">Orders</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'orders-detail']) }}">Order Detail</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'sellers']) }}">Sellers</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'cart']) }}">Shopping Cart</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ecommerce', 'checkout']) }}">Checkout</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="{{ route('second', ['apps', 'calendar']) }}">
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
                                <a href="{{ route('second', ['email', 'inbox']) }}">Inbox</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['email', 'read']) }}">Read Email</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['email', 'templates']) }}">Email Templates</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="{{ route('second', ['apps', 'companies']) }}">
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
                                <a href="{{ route('second', ['task', 'list']) }}">List</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['task', 'details']) }}">Details</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['task', 'kanban-board']) }}">Kanban Board</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="{{ route('second', ['apps', 'tickets']) }}">
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
                                <a href="{{ route('second', ['contacts', 'list']) }}">Members List</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['contacts', 'profile']) }}">Profile</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="{{ route('second', ['apps', 'file-manager']) }}">
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
                                <a href="{{ route('second', ['auth', 'login']) }}">Log In</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'login-2']) }}">Log In 2</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'register']) }}">Register</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'register-2']) }}">Register 2</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'signin-signup']) }}">Signin - Signup</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'signin-signup-2']) }}">Signin - Signup 2</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'recoverpw']) }}">Recover Password</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'recoverpw-2']) }}">Recover Password 2</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'lock-screen']) }}">Lock Screen</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'lock-screen-2']) }}">Lock Screen 2</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'logout']) }}">Logout</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'logout-2']) }}">Logout 2</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'confirm-mail']) }}">Confirm Mail</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['auth', 'confirm-mail-2']) }}">Confirm Mail 2</a>
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
                                <a href="{{ route('second', ['pages', 'starter']) }}">Starter</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'timeline']) }}">Timeline</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'sitemap']) }}">Sitemap</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'invoice']) }}">Invoice</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'faqs']) }}">FAQs</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'search-results']) }}">Search Results</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'pricing']) }}">Pricing</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'maintenance']) }}">Maintenance</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'coming-soon']) }}">Coming Soon</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', 'gallery']) }}">Gallery</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', '404']) }}">Error 404</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', '404-alt']) }}">Error 404-alt</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['pages', '500']) }}">Error 500</a>
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
                                <a href="{{ route('second', ['ui', 'avatars']) }}">Avatars</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'buttons']) }}">Buttons</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'cards']) }}">Cards</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'carousel']) }}">Carousel</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'dropdowns']) }}">Dropdowns</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'video']) }}">Embed Video</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'general']) }}">General UI</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'grid']) }}">Grid</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'images']) }}">Images</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'list-group']) }}">List Group</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'modals']) }}">Modals</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'notifications']) }}">Notifications</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'offcanvas']) }}">Offcanvas</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'placeholders']) }}">Placeholders</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'portlets']) }}">Portlets</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'progress']) }}">Progress</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'ribbons']) }}">Ribbons</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'spinners']) }}">Spinners</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'tabs-accordions']) }}">Tabs & Accordions</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'tooltips-popovers']) }}">Tooltips & Popovers</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['ui', 'typography']) }}">Typography</a>
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
                                <a href="{{ route('second', ['extended', 'nestable']) }}">Nestable List</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['extended', 'range-slider']) }}">Range Slider</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['extended', 'sweet-alert']) }}">Sweet Alert</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['extended', 'tour']) }}">Tour Page</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['extended', 'treeview']) }}">Treeview</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['extended', 'scrollspy']) }}">Scrollspy</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a href="{{ route('any', 'widgets') }}">
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
                                <a href="{{ route('second', ['icons', 'feather']) }}">Feather</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['icons', 'remix']) }}">Remix</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['icons', 'boxicons']) }}">Boxicons</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['icons', 'mdi']) }}">Material Design</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['icons', 'font-awesome']) }}">Font Awesome 5</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['icons', 'weather']) }}">Weather</a>
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
                                <a href="{{ route('second', ['forms', 'elements']) }}">General Elements</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'advanced']) }}">Advanced</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'validation']) }}">Validation</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'pickers']) }}">Pickers</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'wizard']) }}">Wizard</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'masks']) }}">Masks</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'quilljs']) }}">Quilljs Editor</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'file-uploads']) }}">File Uploads</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['forms', 'x-editable']) }}">X Editable</a>
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
                                <a href="{{ route('second', ['tables', 'basic']) }}">Basic Tables</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['tables', 'datatables']) }}">Data Tables</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['tables', 'editable']) }}">Editable Tables</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['tables', 'responsive']) }}">Responsive Tables</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['tables', 'footables']) }}">FooTable</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['tables', 'tablesaw']) }}">Tablesaw Tables</a>
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
                                <a href="{{ route('second', ['charts', 'flot']) }}">Flot</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'apex']) }}">Apex</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'morris']) }}">Morris</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'chartjs']) }}">Chartjs</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'c3']) }}">C3</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'peity']) }}">Peity</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'sparklines']) }}">Sparklines</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['charts', 'knob']) }}">Jquery Knob</a>
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
                                <a href="{{ route('second', ['maps', 'google']) }}">Google</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['maps', 'vector']) }}">Vector</a>
                            </li>
                            <li>
                                <a href="{{ route('second', ['maps', 'mapael']) }}">Mapael</a>
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
