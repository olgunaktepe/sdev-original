@extends('layouts.vertical', ['page_title' => 'Mapeal Maps', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Mapeal Maps</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Maps</a></li>
                        <li class="breadcrumb-item active">Mapeal Maps</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Map with a legend where slices are specified with a fixed value instead of min and max values</h4>
                    <div class="row justify-content-center" dir="ltr">
                        <div class="col-md-6">
                            <div class="map-usa">
                                <div class="map">
                                    <span>Alternative content for the map</span>
                                </div>
                                <div class="plotLegend">
                                    <span>Alternative content for the legend</span>
                                </div>
                            </div>
                        </div> <!-- end col-->
                    </div> <!-- end row-->
                </div>
            </div> <!-- end card-box-->
        </div> <!-- end col-->
    </div>
    <!-- end row-->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Map with links between the plotted cities</h4>
                    <div class="mapcontainer">
                        <div class="map">
                            <span>Alternative content for the map</span>
                        </div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row-->
@endsection

@section('script')
    <!-- Vector Maps Demo js -->
    @vite(['resources/js/pages/mapeal-maps.init.js'])
@endsection
