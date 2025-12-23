
(function () {
    var savedConfig = sessionStorage.getItem("__MINTON_CONFIG__");
    // var savedConfig = localStorage.getItem("__MINTON_CONFIG__");

    var html = document.getElementsByTagName("html")[0];

    //  Default Config Value
    var defaultConfig = {
        theme: "light",

        layout: {
            position: "fixed",
            width: "fluid",
        },

        topbar: {
            color: "light",
        },

        menu: {
            color: "light",
        },

        // This option for only vertical (left Sidebar) layout
        sidebar: {
            size: "default",
            user: false,
        },
    };

    var htmlElement = document.documentElement;
    var config = Object.assign(JSON.parse(JSON.stringify(defaultConfig)), {});

    var layoutColor = htmlElement.getAttribute('data-bs-theme');
    config['theme'] = layoutColor !== null ? layoutColor : defaultConfig.theme;

    var layoutPosition = htmlElement.getAttribute('data-layout-position');
    config['layout']['position'] = layoutPosition != null ? layoutPosition : defaultConfig.layout.position;

    var layoutWidth = htmlElement.getAttribute('data-layout-width');
    config['layout']['width'] = layoutWidth != null ? layoutWidth : defaultConfig.layout.width;

    var topbarColor = htmlElement.getAttribute('data-topbar-color');
    config['topbar']['color'] = topbarColor != null ? topbarColor : defaultConfig.topbar.color;

    var leftbarSize = htmlElement.getAttribute('data-sidebar-size');
    config['sidebar']['size'] = leftbarSize !== null ? leftbarSize : defaultConfig.sidebar.size;

    var sidebarUser = htmlElement.getAttribute('data-sidebar-user')
    config['sidebar']['user'] = sidebarUser !== null ? true : defaultConfig.sidebar.user;

    var menuColor = htmlElement.getAttribute('data-menu-color');
    config['menu']['color'] = menuColor !== null ? menuColor : defaultConfig.menu.color;

    window.defaultConfig = JSON.parse(JSON.stringify(config));

    if (savedConfig !== null) {
        config = JSON.parse(savedConfig);
    }

    window.config = config;

    if (config) {
        html.setAttribute("data-bs-theme", config.theme);
        html.setAttribute("data-topbar-color", config.topbar.color);
        html.setAttribute("data-menu-color", config.menu.color);
        html.setAttribute("data-sidebar-size", config.sidebar.size);
        html.setAttribute("data-layout-width", config.layout.width);
        html.setAttribute("data-layout-position", config.layout.position);

        if (config.sidebar.user && config.sidebar.user.toString() === "true") {
            html.setAttribute("data-sidebar-user", true);
        } else {
            html.removeAttribute("data-sidebar-user");
        }
    }

    if (window.innerWidth <= 991.98) {
        html.setAttribute("data-sidebar-size", "full");
    } else if (window.innerWidth >= 991.98 && window.innerWidth <= 1140) {
        if (self.config.sidebar.size !== 'full') {
            html.setAttribute("data-sidebar-size", "condensed");
        }
    }

    if (document.getElementById('app-stylesheet').href.includes('rtl.min.css')) {
        document.getElementsByTagName('html')[0].dir = "rtl";
    }
    
})();



