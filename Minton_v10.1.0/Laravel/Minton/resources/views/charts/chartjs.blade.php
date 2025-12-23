@extends('layouts.vertical', ['page_title' => 'Chartjs Charts', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Chartjs</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Charts</a></li>
                        <li class="breadcrumb-item active">Chartjs</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Line Chart</h4>
                    <div class="mt-4 chartjs-chart">
                        <canvas id="line-chart-example" height="350" data-colors="#3bafda,#f672a7"></canvas>
                    </div>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bar Chart</h4>

                    <div class="mt-4 chartjs-chart">
                        <canvas id="bar-chart-example" height="350" data-colors="#1abc9c,#e3eaef"></canvas>
                    </div>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Pie Chart</h4>

                    <div class="mt-4 chartjs-chart">
                        <canvas id="pie-chart-example" height="350" class="mt-4" data-colors="#3bafda,#1abc9c,#f7b84b,#e3eaef"></canvas>
                    </div>

                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Donut Chart</h4>

                    <div class="mt-4 chartjs-chart">
                        <canvas id="donut-chart-example" height="350" data-colors="#3bafda,#1abc9c,#e3eaef"></canvas>
                    </div>

                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col -->
    </div>
    <!-- end row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Polar area Chart</h4>

                    <div class="mt-4 chartjs-chart">
                        <canvas id="polar-chart-example" height="350" data-colors="#3bafda,#f7b84b,#1abc9c,#e3eaef">
                        </canvas>
                    </div>

                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Radar Chart</h4>

                    <div class="mt-4 chartjs-chart">
                        <canvas id="radar-chart-example" height="350" data-colors="#3bafda,#f672a7"></canvas>
                    </div>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col -->
    </div>
    <!-- end row -->
@endsection

@section('script')
    @vite('resources/js/pages/chartjs.init.js')
@endsection
