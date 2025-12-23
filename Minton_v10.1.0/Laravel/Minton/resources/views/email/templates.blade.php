@extends('layouts.vertical', ['page_title' => 'Email Templates', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Email Templates</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Email</a></li>
                        <li class="breadcrumb-item active">Email Templates</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <h4 class="header-title mb-3">Basic action email</h4>
                            <a href="{{ route('second', ['email', 'templates-action']) }}" target="_blank"> <img src="/images/email/1.png" class="img-fluid" alt=""> </a>
                        </div>
                        <div class="col-md-4">
                            <h4 class="header-title my-3 mt-md-0">Email alert</h4>
                            <a href="{{ route('second', ['email', 'templates-alert']) }}" target="_blank"> <img src="/images/email/2.png" class="img-fluid" alt=""> </a>
                        </div>
                        <div class="col-md-4">
                            <h4 class="header-title my-3 mt-md-0">Billing email</h4>
                            <a href="{{ route('second', ['email', 'templates-billing']) }}" target="_blank"> <img src="/images/email/3.png" class="img-fluid" alt=""> </a>
                        </div>
                    </div> <!-- end row-->
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row-->
@endsection
