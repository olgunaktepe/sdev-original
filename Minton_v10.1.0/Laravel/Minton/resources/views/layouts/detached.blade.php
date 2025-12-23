<!DOCTYPE html>
<html lang="en" data-layout-mode="detached" class="loading"  data-bs-theme="{{ $theme ?? 'light' }}" dir="{{ $rtl ?? 'ltl' }}" data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": true}, "topbar": {"color": "dark"}, "showRightSidebarOnPageLoad": true}'>

<head>
    @include('layouts.shared/title-meta', ['title' => $page_title])
    @yield('css')
    @include('layouts.shared/head-css', ['mode' => $mode ?? '', 'demo' => $demo ?? ''])
    @vite(['resources/scss/icons.scss', 'resources/js/head.js'])
</head>

<body>
    <div id="wrapper">

        @include('layouts.shared/topbar')
        @include('layouts.shared/left-sidebar')

        <div class="content-page">
            <div class="content">
                <!-- Start Content-->
                <div class="container-fluid">
                    @yield('content')
                </div>
            </div>
            @include('layouts.shared/footer')
        </div>

    </div>

    @include('layouts.shared/right-sidebar')
    @include('layouts.shared/footer-scripts')
    @vite(['resources/js/layout.js', 'resources/js/app.js'])

</body>

</html>
