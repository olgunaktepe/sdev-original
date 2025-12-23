@extends('layouts.vertical', ['page_title' => 'Morris Charts', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Morris Charts</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Charts</a></li>
                        <li class="breadcrumb-item active">Morris Charts</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row">
        <div class="col-lg-6">
            <div class="card" dir="ltr">
                <div class="card-body">
                    <h4 class="header-title mb-3">Stacked Bar Chart</h4>
                    <div class="text-center">
                        <p class="text-muted font-15 font-family-secondary mb-0">
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-success"></i> Bitcoin</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-primary"></i> Ethereum</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-muted"></i> Litecoin</span>
                        </p>
                    </div>
                    <div id="morris-bar-stacked" style="height: 350px;" class="morris-chart" data-colors="#1abc9c,#3bafda,#e3eaef"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card" dir="ltr">
                <div class="card-body">
                    <h4 class="header-title mb-3">Area Chart</h4>
                    <div class="text-center">
                        <p class="text-muted font-15 font-family-secondary mb-0">
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-success"></i> Bitcoin</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-light"></i> Ethereum</span>
                        </p>
                    </div>
                    <div id="morris-area-example" style="height: 350px;" class="morris-chart" data-colors="#1abc9c,#ebeff2"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card" dir="ltr">
                <div class="card-body">
                    <h4 class="header-title mb-3">Line Chart</h4>
                    <div class="text-center">
                        <p class="text-muted font-15 font-family-secondary mb-0">
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-success"></i> Bitcoin</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-primary"></i> Ethereum</span>
                        </p>
                    </div>
                    <div id="morris-line-example" style="height: 350px;" class="morris-chart" data-colors="#1abc9c,#3bafda"></div>
                </div>
            </div> <!-- card -->
        </div> <!-- end row -->

        <div class="col-lg-6">
            <div class="card" dir="ltr">
                <div class="card-body">
                    <h4 class="header-title mb-3">Bar Chart</h4>
                    <div class="text-center">
                        <p class="text-muted font-15 font-family-secondary mb-0">
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-success"></i> Bitcoin</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-primary"></i> Ethereum</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-light"></i> Litecoin</span>
                        </p>
                    </div>
                    <div id="morris-bar-example" style="height: 350px;" class="morris-chart" data-colors="#1abc9c,#3bafda,#ebeff2"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row -->


    <div class="row">
        <div class="col-lg-6">
            <div class="card" dir="ltr">
                <div class="card-body">
                    <h4 class="header-title mb-3">Area Chart with Point</h4>
                    <div class="text-center">
                        <p class="text-muted font-15 font-family-secondary mb-0">
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-primary"></i> Bitcoin</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-light"></i> Ethereum</span>
                        </p>
                    </div>
                    <div id="morris-area-with-dotted" style="height: 350px;" class="morris-chart" data-colors="#e3eaef,#3bafda"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-lg-6">
            <div class="card" dir="ltr">
                <div class="card-body">
                    <h4 class="header-title mb-3">Donut Chart</h4>
                    <div id="morris-donut-example" style="height: 350px;" class="morris-chart" data-colors="#3bafda,#1abc9c,#ebeff2"></div>
                    <div class="text-center">
                        <p class="text-muted font-15 font-family-secondary mb-0">
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-primary"></i> Bitcoin</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-success"></i> Ethereum</span>
                            <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-light"></i> Litecoin</span>
                        </p>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row -->
@endsection

@section('script')
    @vite('resources/js/pages/morris.init.js')
@endsection
