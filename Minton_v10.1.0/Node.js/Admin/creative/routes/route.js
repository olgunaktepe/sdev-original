const express = require('express');
const route = express.Router();

// Dashboard
route.get('/', (req, res, next) => {
    res.render('index', { title: 'Dashboard', page_title: 'Sales', sub_title: 'Dashboards' });
})
route.get('/index', (req, res, next) => {
    res.render('index', { title: 'Dashboard', page_title: 'Sales', sub_title: 'Dashboards' });
})
route.get('/dashboard-crm', (req, res, next) => {
    res.render('dashboard-crm', { title: 'CRM', page_title: 'CRM', sub_title: 'Dashboards' });
})
route.get('/dashboard-analytics', (req, res, next) => {
    res.render('dashboard-analytics', { title: 'Analytics', page_title: 'Analytics', sub_title: 'Dashboards' });
})

// Layouts
route.get('/layouts-vertical', (req, res, next) => {
    res.render('layouts-vertical', { title: 'Vertical Layout', page_title: 'Vertical', sub_title: 'Layouts', layout: 'partials/layout-vertical' })
})
route.get('/layouts-detached', (req, res, next) => {
    res.render('layouts-detached', { title: 'Detached Layout', page_title: 'Detached', sub_title: 'Layouts', layout: 'partials/layout-detached' })
})
route.get('/layouts-two-column', (req, res, next) => {
    res.render('layouts-two-column', { title: 'Two Column Layout', page_title: 'Two Column', sub_title: 'Layouts', layout: 'partials/layout-two-column' })
})
route.get('/layouts-preloader', (req, res, next) => {
    res.render('layouts-preloader', { title: 'Preloader', page_title: 'Preloader', sub_title: 'Layouts', layout: 'partials/layout-preloader' })
})

// Apps
route.get('/apps-calendar', (req, res, next) => {
    res.render('apps-calendar', { title: 'Calendar', page_title: 'Calendar', sub_title: 'Apps' });
})
route.get('/apps-chat', (req, res, next) => {
    res.render('apps-chat', { title: 'Chat', page_title: 'Chat', sub_title: 'Apps' });
})
route.get('/apps-companies', (req, res, next) => {
    res.render('apps-companies', { title: 'Companies', page_title: 'Companies', sub_title: 'Apps' });
})
route.get('/apps-file-manager', (req, res, next) => {
    res.render('apps-file-manager', { title: 'File Manager', page_title: 'File Manager', sub_title: 'Apps' });
})
route.get('/apps-tickets', (req, res, next) => {
    res.render('apps-tickets', { title: 'Tickets', page_title: 'Tickets', sub_title: 'Apps' });
})

// Ecommerce
route.get('/ecommerce-cart', (req, res, next) => {
    res.render('ecommerce-cart', { title: 'Shopping Cart', page_title: 'Shopping Cart', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-checkout', (req, res, next) => {
    res.render('ecommerce-checkout', { title: 'Checkout', page_title: 'Checkout', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-customers', (req, res, next) => {
    res.render('ecommerce-customers', { title: 'Customers', page_title: 'Customers', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-orders-detail', (req, res, next) => {
    res.render('ecommerce-orders-detail', { title: 'Order Detail', page_title: 'Order Detail', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-sellers', (req, res, next) => {
    res.render('ecommerce-sellers', { title: 'Sellers', page_title: 'Sellers', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-products', (req, res, next) => {
    res.render('ecommerce-products', { title: 'Products List', page_title: 'Products List', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-products-grid', (req, res, next) => {
    res.render('ecommerce-products-grid', { title: 'Products Grid', page_title: 'Products Grid', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-product-detail', (req, res, next) => {
    res.render('ecommerce-product-detail', { title: 'Product Detail', page_title: 'Product Detail', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-product-create', (req, res, next) => {
    res.render('ecommerce-product-create', { title: 'Create Product', page_title: 'Create Product', sub_title: 'Ecommerce' });
})
route.get('/ecommerce-orders', (req, res, next) => {
    res.render('ecommerce-orders', { title: 'Orders', page_title: 'Orders', sub_title: 'Ecommerce' });
})

// Email
route.get('/email-inbox', (req, res, next) => {
    res.render('email-inbox', { title: 'Inbox', page_title: 'Inbox', sub_title: 'Email' });
})
route.get('/email-read', (req, res, next) => {
    res.render('email-read', { title: 'Email Read', page_title: 'Email Read', sub_title: 'Email' });
})
route.get('/email-templates', (req, res, next) => {
    res.render('email-templates', { title: 'Tamplates', page_title: 'Tamplates', sub_title: 'Email' });
})
route.get('/email-templates-action', (req, res, next) => {
    res.render('email-templates-action', { layout: false });
})
route.get('/email-templates-alert', (req, res, next) => {
    res.render('email-templates-alert', { layout: false });
})
route.get('/email-templates-billing', (req, res, next) => {
    res.render('email-templates-billing', { layout: false });
})


// Contacts
route.get('/contacts-profile', (req, res, next) => {
    res.render('contacts-profile', { title: 'Profile', page_title: 'Profile', sub_title: 'Contacts' })
})
route.get('/contacts-list', (req, res, next) => {
    res.render('contacts-list', { title: 'Members List', page_title: 'Members List', sub_title: 'Contacts' })
})

// Contacts
route.get('/task-details', (req, res, next) => {
    res.render('task-details', { title: 'Task Detail', page_title: 'Task Detail', sub_title: 'Contacts' })
})
route.get('/task-kanban-board', (req, res, next) => {
    res.render('task-kanban-board', { title: 'Kanban Board', page_title: 'Kanban Board', sub_title: 'Contacts' })
})
route.get('/task-list', (req, res, next) => {
    res.render('task-list', { title: 'Task List', page_title: 'Task List', sub_title: 'Contacts' })
})

// Auth Pages
route.get('/auth-login', (req, res, next) => {
    res.render('auth/auth-login', { title: 'Login In', layout: false })
})
route.get('/auth-register', (req, res, next) => {
    res.render('auth/auth-register', { title: 'Register & Signup', layout: false })
})
route.get('/auth-logout', (req, res, next) => {
    res.render('auth/auth-logout', { title: 'Logout', layout: false })
})
route.get('/auth-recoverpw', (req, res, next) => {
    res.render('auth/auth-recoverpw', { title: 'Forgot Password', layout: false })
})
route.get('/auth-confirm-mail', (req, res, next) => {
    res.render('auth-confirm-mail', { title: 'Confirm Mail', layout: false })
})
route.get('/auth-confirm-mail-2', (req, res, next) => {
    res.render('auth-confirm-mail-2', { title: 'Confirm Mail', layout: false })
})
route.get('/auth-signin-signup', (req, res, next) => {
    res.render('auth-signin-signup', { title: 'Signin Signup', layout: false })
})
route.get('/auth-signin-signup-2', (req, res, next) => {
    res.render('auth-signin-signup-2', { title: 'Signin Signup', layout: false })
})
route.get('/auth-register-2', (req, res, next) => {
    res.render('auth-register-2', { title: 'Register 2', layout: false })
})
route.get('/auth-recoverpw-2', (req, res, next) => {
    res.render('auth-recoverpw-2', { title: 'Forgot Password 2', layout: false })
})
route.get('/auth-logout-2', (req, res, next) => {
    res.render('auth-logout-2', { title: 'Logout 2', layout: false })
})
route.get('/auth-login-2', (req, res, next) => {
    res.render('auth-login-2', { title: 'Login 2', layout: false })
})
route.get('/auth-lock-screen', (req, res, next) => {
    res.render('auth-lock-screen', { title: 'Lock Screen', layout: false })
})
route.get('/auth-lock-screen-2', (req, res, next) => {
    res.render('auth-lock-screen-2', { title: 'Lock Screen 2', layout: false })
})

// Pages
route.get('/pages-404', (req, res, next) => {
    res.render('pages-404', { title: 'Error Page | 404 | Page not Found', layout: false })
})
route.get('/pages-500', (req, res, next) => {
    res.render('pages-500', { title: 'Error Page | 500 | Internal Server Error', layout: false })
})
route.get('/pages-coming-soon', (req, res, next) => {
    res.render('pages-coming-soon', { title: 'Coming Soon', layout: false })
})
route.get('/pages-maintenance', (req, res, next) => {
    res.render('pages-maintenance', { title: 'Mintenance', layout: false })
})
route.get('/pages-404-alt', (req, res, next) => {
    res.render('pages-404-alt', { title: 'Error Page 404-alt', page_title: 'Error Page 404-alt', sub_title: 'Pages' })
})
route.get('/pages-faqs', (req, res, next) => {
    res.render('pages-faqs', { title: 'FAQs', page_title: 'FAQs', sub_title: 'Pages' })
})
route.get('/pages-gallery', (req, res, next) => {
    res.render('pages-gallery', { title: 'Gallery', page_title: 'Gallery', sub_title: 'Pages' })
})
route.get('/pages-invoice', (req, res, next) => {
    res.render('pages-invoice', { title: 'Invoice', page_title: 'Invoice', sub_title: 'Pages' })
})
route.get('/pages-pricing', (req, res, next) => {
    res.render('pages-pricing', { title: 'Pricing', page_title: 'Pricing', sub_title: 'Pages' })
})
route.get('/pages-search-results', (req, res, next) => {
    res.render('pages-search-results', { title: 'Search Results', page_title: 'Search Results', sub_title: 'Pages' })
})
route.get('/pages-sitemap', (req, res, next) => {
    res.render('pages-sitemap', { title: 'Sitemap', page_title: 'Sitemap', sub_title: 'Pages' })
})
route.get('/pages-starter', (req, res, next) => {
    res.render('pages-starter', { title: 'Starter', page_title: 'Starter', sub_title: 'Pages' })
})
route.get('/pages-timeline', (req, res, next) => {
    res.render('pages-timeline', { title: 'Timeline', page_title: 'Timeline', sub_title: 'Pages' })
})

// Base Ui
route.get('/ui-avatars', (req, res, next) => {
    res.render('ui-avatars', { title: 'Avatars', page_title: 'Avatars', sub_title: 'Base UI' })
})
route.get('/ui-buttons', (req, res, next) => {
    res.render('ui-buttons', { title: 'Buttons', page_title: 'Buttons', sub_title: 'Base UI' })
})
route.get('/ui-cards', (req, res, next) => {
    res.render('ui-cards', { title: 'Cards', page_title: 'Cards', sub_title: 'Base UI' })
})
route.get('/ui-carousel', (req, res, next) => {
    res.render('ui-carousel', { title: 'Carousel', page_title: 'Carousel', sub_title: 'Base UI' })
})
route.get('/ui-dropdowns', (req, res, next) => {
    res.render('ui-dropdowns', { title: 'Dropdowns', page_title: 'Dropdowns', sub_title: 'Base UI' })
})
route.get('/ui-general', (req, res, next) => {
    res.render('ui-general', { title: 'General UI', page_title: 'General UI', sub_title: 'Base UI' })
})
route.get('/ui-grid', (req, res, next) => {
    res.render('ui-grid', { title: 'Grid System', page_title: 'Grid System', sub_title: 'Base UI' })
})
route.get('/ui-images', (req, res, next) => {
    res.render('ui-images', { title: 'Images', page_title: 'Images', sub_title: 'Base UI' })
})
route.get('/ui-list-group', (req, res, next) => {
    res.render('ui-list-group', { title: 'List Group', page_title: 'List Group', sub_title: 'Base UI' })
})
route.get('/ui-modals', (req, res, next) => {
    res.render('ui-modals', { title: 'Modals', page_title: 'Modals', sub_title: 'Base UI' })
})
route.get('/ui-notifications', (req, res, next) => {
    res.render('ui-notifications', { title: 'Notifications', page_title: 'Notifications', sub_title: 'Base UI' })
})
route.get('/ui-offcanvas', (req, res, next) => {
    res.render('ui-offcanvas', { title: 'Offcanvas', page_title: 'Offcanvas', sub_title: 'Base UI' })
})
route.get('/ui-placeholders', (req, res, next) => {
    res.render('ui-placeholders', { title: 'Placeholders', page_title: 'Placeholders', sub_title: 'Base UI' })
})
route.get('/ui-portlets', (req, res, next) => {
    res.render('ui-portlets', { title: 'Portlets', page_title: 'Portlets', sub_title: 'Base UI' })
})
route.get('/ui-progress', (req, res, next) => {
    res.render('ui-progress', { title: 'Progress', page_title: 'Progress', sub_title: 'Base UI' })
})
route.get('/ui-ribbons', (req, res, next) => {
    res.render('ui-ribbons', { title: 'Ribbons', page_title: 'Ribbons', sub_title: 'Base UI' })
})
route.get('/ui-spinners', (req, res, next) => {
    res.render('ui-spinners', { title: 'Spinners', page_title: 'Spinners', sub_title: 'Base UI' })
})
route.get('/ui-tabs-accordions', (req, res, next) => {
    res.render('ui-tabs-accordions', { title: 'Tabs & Accordions', page_title: 'Tabs & Accordions', sub_title: 'Base UI' })
})
route.get('/ui-tooltips-popovers', (req, res, next) => {
    res.render('ui-tooltips-popovers', { title: 'Tooltips & Popovers', page_title: 'Tooltips & Popovers', sub_title: 'Base UI' })
})
route.get('/ui-typography', (req, res, next) => {
    res.render('ui-typography', { title: 'Typography', page_title: 'Typography', sub_title: 'Base UI' })
})
route.get('/ui-video', (req, res, next) => {
    res.render('ui-video', { title: 'Embed Video', page_title: 'Embed Video', sub_title: 'Base UI' })
})

// Extended UI
route.get('/extended-nestable', (req, res, next) => {
    res.render('extended-nestable', { title: 'Nestable List', page_title: 'Nestable List', sub_title: 'Extended UI' })
})
route.get('/extended-range-slider', (req, res, next) => {
    res.render('extended-range-slider', { title: 'Range Slider', page_title: 'Range Slider', sub_title: 'Extended UI' })
})
route.get('/extended-scrollspy', (req, res, next) => {
    res.render('extended-scrollspy', { title: 'Scrollspy', page_title: 'Scrollspy', sub_title: 'Extended UI' })
})
route.get('/extended-sweet-alert', (req, res, next) => {
    res.render('extended-sweet-alert', { title: 'Sweet Alerts', page_title: 'Sweet Alerts', sub_title: 'Extended UI' })
})
route.get('/extended-tour', (req, res, next) => {
    res.render('extended-tour', { title: 'Tour', page_title: 'Tour', sub_title: 'Extended UI' })
})
route.get('/extended-treeview', (req, res, next) => {
    res.render('extended-treeview', { title: 'Treeview', page_title: 'Treeview', sub_title: 'Extended UI' })
})

// Widgets
route.get('/widgets', (req, res, next) => {
    res.render('widgets', { title: 'Widgets', page_title: 'Widgets', sub_title: 'Components' })
})

// Icons
route.get('/icons-boxicons', (req, res, next) => {
    res.render('icons-boxicons', { title: 'Boxicons', page_title: 'Boxicons', sub_title: 'Icons' })
})
route.get('/icons-feather', (req, res, next) => {
    res.render('icons-feather', { title: 'Feather Icons', page_title: 'Feather Icons', sub_title: 'Icons' })
})
route.get('/icons-font-awesome', (req, res, next) => {
    res.render('icons-font-awesome', { title: 'Font Awesome Icons', page_title: 'Font Awesome Icons', sub_title: 'Icons' })
})
route.get('/icons-mdi', (req, res, next) => {
    res.render('icons-mdi', { title: 'Material Design Icons', page_title: 'Material Design', sub_title: 'Icons' })
})
route.get('/icons-remix', (req, res, next) => {
    res.render('icons-remix', { title: 'Remix Icons', page_title: 'Remix Icons', sub_title: 'Icons' })
})
route.get('/icons-weather', (req, res, next) => {
    res.render('icons-weather', { title: 'Weather Icons', page_title: 'Weather Icons', sub_title: 'Icons' })
})

// Forms
route.get('/forms-advanced', (req, res, next) => {
    res.render('forms-advanced', { title: 'Form Advanced', page_title: 'Form Advanced', sub_title: 'Forms' })
})
route.get('/forms-elements', (req, res, next) => {
    res.render('forms-elements', { title: 'Form Elements', page_title: 'Form Elements', sub_title: 'Forms' })
})
route.get('/forms-file-uploads', (req, res, next) => {
    res.render('forms-file-uploads', { title: 'Form Elements', page_title: 'Form Elements', sub_title: 'Forms' })
})
route.get('/forms-masks', (req, res, next) => {
    res.render('forms-masks', { title: 'Form Masks', page_title: 'Form Masks', sub_title: 'Forms' })
})
route.get('/forms-pickers', (req, res, next) => {
    res.render('forms-pickers', { title: 'Form Pickers', page_title: 'Form Pickers', sub_title: 'Forms' })
})
route.get('/forms-quilljs', (req, res, next) => {
    res.render('forms-quilljs', { title: 'Quilljs Editor', page_title: 'Quilljs Editor', sub_title: 'Forms' })
})
route.get('/forms-validation', (req, res, next) => {
    res.render('forms-validation', { title: 'Quilljs Editor', page_title: 'Quilljs Editor', sub_title: 'Forms' })
})
route.get('/forms-wizard', (req, res, next) => {
    res.render('forms-wizard', { title: 'Form Wizard', page_title: 'Form Wizard', sub_title: 'Forms' })
})
route.get('/forms-x-editable', (req, res, next) => {
    res.render('forms-x-editable', { title: 'X Editable', page_title: 'X Editable', sub_title: 'Forms' })
})

// Tables
route.get('/tables-basic', (req, res, next) => {
    res.render('tables-basic', { title: 'Basic Tables', page_title: 'Basic Tables', sub_title: 'Tables' })
})
route.get('/tables-datatables', (req, res, next) => {
    res.render('tables-datatables', { title: 'Datatables', page_title: 'Datatables', sub_title: 'Tables' })
})
route.get('/tables-editable', (req, res, next) => {
    res.render('tables-editable', { title: 'Table Editable', page_title: 'Table Editable', sub_title: 'Tables' })
})
route.get('/tables-footables', (req, res, next) => {
    res.render('tables-footables', { title: 'FooTable', page_title: 'FooTable', sub_title: 'Tables' })
})
route.get('/tables-responsive', (req, res, next) => {
    res.render('tables-responsive', { title: 'Responsive Table', page_title: 'Responsive Table', sub_title: 'Tables' })
})
route.get('/tables-tablesaw', (req, res, next) => {
    res.render('tables-tablesaw', { title: 'Tablesaw', page_title: 'Tablesaw', sub_title: 'Tables' })
})

// Charts
route.get('/charts-apex', (req, res, next) => {
    res.render('charts-apex', { title: 'Apexcharts', page_title: 'Apexcharts', sub_title: 'Charts' });
})
route.get('/charts-flot', (req, res, next) => {
    res.render('charts-flot', { title: 'Flot Charts', page_title: 'Flot Charts', sub_title: 'Charts' });
})
route.get('/charts-chartjs', (req, res, next) => {
    res.render('charts-chartjs', { title: 'Chartjs', page_title: 'Chartjs', sub_title: 'Charts' });
})
route.get('/charts-sparklines', (req, res, next) => {
    res.render('charts-sparklines', { title: 'Sparklines Charts', page_title: 'Sparklines Charts', sub_title: 'Charts' });
})
route.get('/charts-knob', (req, res, next) => {
    res.render('charts-knob', { title: 'Jquery knob', page_title: 'Jquery knob', sub_title: 'Charts' });
})
route.get('/charts-morris', (req, res, next) => {
    res.render('charts-morris', { title: 'Morris Charts', page_title: 'Morris Charts', sub_title: 'Charts' });
})
route.get('/charts-chartist', (req, res, next) => {
    res.render('charts-chartist', { title: 'Chartist Charts', page_title: 'Chartist Charts', sub_title: 'Charts' });
})
route.get('/charts-c3', (req, res, next) => {
    res.render('charts-c3', { title: 'C3 Charts', page_title: 'C3 Charts', sub_title: 'Charts' });
})
route.get('/charts-peity', (req, res, next) => {
    res.render('charts-peity', { title: 'Peity Charts', page_title: 'Peity Charts', sub_title: 'Charts' });
})

// Maps
route.get('/maps-google', (req, res, next) => {
    res.render('maps-google', { title: 'Google Maps', page_title: 'Google Maps', sub_title: 'Maps' });
})
route.get('/maps-mapael', (req, res, next) => {
    res.render('maps-mapael', { title: 'Mapeal Maps', page_title: 'Mapeal Maps', sub_title: 'Maps' });
})
route.get('/maps-vector', (req, res, next) => {
    res.render('maps-vector', { title: 'Vector Maps', page_title: 'Vector Maps', sub_title: 'Maps' });
})

module.exports = route;