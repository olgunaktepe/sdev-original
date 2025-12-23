<!DOCTYPE html>
<html lang="en" data-layout-mode="two-column" data-two-column-color="brand" data-bs-theme="{{ $theme ?? 'light' }}" dir="{{ $rtl ?? 'ltl' }}" class="loading"  data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": true}'>

<head>
    @include('layouts.shared/title-meta', ['title' => $page_title])
    @yield('css')
    @include('layouts.shared/head-css', ['mode' => $mode ?? '', 'demo' => $demo ?? ''])
    @vite(['resources/scss/icons.scss', 'resources/js/head.js'])
</head>

<body >

    <div id="wrapper">

        @include('layouts.shared/topbar')
        @include('layouts.shared/two-column-sidebar')

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
