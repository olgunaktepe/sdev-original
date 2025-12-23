@extends('layouts.vertical', ['page_title' => 'Flot Charts', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Flot Charts</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Charts</a></li>
                        <li class="breadcrumb-item active">Flot Charts</li>
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
                    <h4 class="header-title">Multiple Statistics</h4>

                    <div id="website-stats" style="height: 350px;" class="flot-chart mt-5" data-colors="#3bafda,#1abc9c"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Line Chart</h4>

                    <div id="website-stats1" style="height: 350px;" class="flot-chart mt-5" data-colors="#3bafda,#1abc9c"></div>
                </div>
            </div>
            <!-- end card -->
        </div> <!-- end col -->
    </div>
    <!-- end row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Donut Pie</h4>

                    <div id="donut-chart" class="flot-chart mt-5" data-colors="#3bafda,#f672a7,#f7b84b,#6559cc,#1abc9c" style="height: 350px;"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Realtime Statistics</h4>

                    <div id="flotRealTime" style="height: 350px;" data-colors="#3bafda" class="flot-chart mt-5"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Line Chart</h4>

                    <div id="line-chart-alt" class="mt-5" data-colors="#3bafda,#1abc9c" style="height:350px;"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Combine Chart</h4>

                    <div id="combine-chart" data-colors="#e3eaef,#f672a7,#3bafda" class="flot-chart mt-5" style="height: 350px;"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Stacked Bar chart</h4>

                    <div id="ordered-bars-chart" style="height: 350px;" class="mt-5" data-colors="#e3eaef,#3bafda,#1abc9c"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Pie Chart</h4>

                    <div id="pie-chart" class="flot-chart mt-5" data-colors="#3bafda,#f672a7,#f7b84b,#6559cc,#1abc9c" style="height: 350px;"></div>

                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>
    <!-- end row -->
@endsection

@section('script')
    @vite('resources/js/pages/flot.init.js')
@endsection
