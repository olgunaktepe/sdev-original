@extends('layouts.vertical', ['page_title' => 'Google Maps', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('css')
@endsection

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Google Maps</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Maps</a></li>
                        <li class="breadcrumb-item active">Google Maps</li>
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
                    <h4 class="header-title mb-3">Basic</h4>

                    <div id="gmaps-basic" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Markers</h4>

                    <div id="gmaps-markers" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div> <!-- end row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Ultra Light</h4>

                    <div id="ultra-light" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Dark</h4>

                    <div id="dark" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div> <!-- end row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Polygons</h4>

                    <div id="gmaps-polygons" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Overlays</h4>

                    <div id="gmaps-overlay" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div> <!-- end row-->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Street View Panoramas</h4>

                    <div id="panorama" class="gmaps-panaroma"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Routes</h4>

                    <div id="gmaps-route" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div> <!-- end row-->


    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Map Types</h4>

                    <div id="gmaps-types" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Context menu (right click on map)</h4>

                    <div id="gmaps-menu" class="gmaps"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div> <!-- end row-->
@endsection

@section('script')
    <!-- Google Maps API -->
    <script src="https://maps.google.com/maps/api/js"></script>
    @vite(['resources/js/pages/google-maps.init.js'])
@endsection
