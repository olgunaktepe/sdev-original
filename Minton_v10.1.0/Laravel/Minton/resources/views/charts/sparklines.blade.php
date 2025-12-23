@extends('layouts.vertical', ['page_title' => 'Sparkline Charts', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Sparklines Charts</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Charts</a></li>
                        <li class="breadcrumb-item active">Sparklines Charts</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row">
        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Line Charts</h4>

                    <div class="mt-4">
                        <div id="sparkline1" data-colors="#3bafda,#1abc9c"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bar Chart</h4>

                    <div class="mt-4">
                        <div id="sparkline2" data-colors="#3bafda" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Pie Chart</h4>

                    <div class="mt-4">
                        <div id="sparkline3" data-colors="#e3eaef,#3bafda,#1abc9c,#f1556c" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Custom Line Chart</h4>

                    <div class="mt-4">
                        <div id="sparkline4" data-colors="#f672a7,#3bafda" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Mouse Speed Chart</h4>

                    <div class="mt-4">
                        <div id="sparkline5" data-colors="#1abc9c" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Composite bar Chart</h4>

                    <div class="text-center mt-4">
                        <div id="sparkline6" data-colors="#e3eaef,#1abc9c" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Discrete Chart</h4>

                    <div class="text-center mt-4">
                        <div id="sparkline7" data-colors="#4a545e" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bullet Chart</h4>

                    <div class="text-center mt-4" style="min-height: 164px;">
                        <div id="sparkline8" data-colors="#3bafda,#5553ce" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Box Plot Chart</h4>

                    <div class="text-center mt-4" style="min-height: 164px;">
                        <div id="sparkline9" data-colors="#3bafda,#1abc9c" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-md-6 col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Tristate Charts</h4>

                    <div class="text-center mt-4" style="min-height: 164px;">
                        <div id="sparkline10" data-colors="#1abc9c,#e3eaef,#f1556c" class="text-center"></div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

    </div>
    <!-- end row -->
@endsection

@section('script')
    @vite('resources/js/pages/sparkline.init.js')
@endsection
