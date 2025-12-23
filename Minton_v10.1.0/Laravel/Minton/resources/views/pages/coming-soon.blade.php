<!DOCTYPE html>
<html lang="en">

<head>

    @include('layouts.shared/title-meta', ['title' => 'Coming Soon'])

    @include('layouts.shared/head-css', ['mode' => $mode ?? '', 'demo' => $demo ?? ''])

</head>

<body>

    <div class="my-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10">

                    <div class="text-center">

                        <img src="/images/animat-rocket-color.gif" alt="" height="160">

                        <h3 class="mt-4">Stay tunned, we're launching very soon</h3>
                        <p class="text-muted">We're making the system more awesome.</p>

                        <div class="row mt-5 justify-content-center">
                            <div class="col-md-8">
                                <div data-countdown="2022/12/17" class="counter-number"></div>
                            </div> <!-- end col-->
                        </div> <!-- end row-->
                    </div> <!-- end /.text-center-->

                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->

    <footer class="footer footer-alt">
        2015 -
        <script>
            document.write(new Date().getFullYear())
        </script> &copy; Minton theme by <a href="" class="text-white-50">Coderthemes</a>
    </footer>

    @include('layouts.shared/footer-scripts')

    @section('script')
        @vite(['node_modules/jquery-countdown/dist/jquery.countdown.min.js'])
    @endsection
</body>

</html>
