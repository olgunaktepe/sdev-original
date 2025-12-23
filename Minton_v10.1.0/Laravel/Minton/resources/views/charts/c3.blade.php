@extends('layouts.vertical', ['page_title' => 'C3 Charts', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('css')
    @vite(['node_modules/c3/c3.min.css'])
@endsection

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">C3 Charts</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Charts</a></li>
                        <li class="breadcrumb-item active">C3 Charts</li>
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
                    <h4 class="header-title mb-3">Bar Chart</h4>

                    <div id="chart" style="height: 300px;" data-colors="#e3eaef,#1abc9c,#3bafda" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Stacked Area Chart</h4>

                    <div id="chart-stacked" style="height: 300px;" data-colors="#1abc9c,#3bafda" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div>
    <!-- End row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Roated Chart</h4>

                    <div id="roated-chart" style="height: 300px;" data-colors="#1abc9c,#4a81d4" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Combine Chart</h4>

                    <div id="combine-chart" style="height: 300px;" data-colors="#e3eaef,#3bafda,#f672a7,#6559cc,#1abc9c" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div>
    <!-- End row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Donut Chart</h4>

                    <div id="donut-chart" style="height: 300px;" data-colors="#e3eaef,#3bafda,#1abc9c" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Pie Chart</h4>

                    <div id="pie-chart" style="height: 300px;" data-colors="#3bafda,#e3eaef,#1abc9c" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div>
    <!-- End row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Scatter Plot</h4>

                    <div id="scatter-plot" style="height: 300px;" data-colors="#3bafda,#1abc9c,#3bafda,#1abc9c" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Line Chart with Regions</h4>

                    <div id="line-regions" style="height: 300px;" data-colors="#3bafda,#1abc9c" dir="ltr"></div>
                </div>
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div>
    <!-- End row -->
@endsection

@section('script')
    @vite('resources/js/pages/c3.init.js')
@endsection
