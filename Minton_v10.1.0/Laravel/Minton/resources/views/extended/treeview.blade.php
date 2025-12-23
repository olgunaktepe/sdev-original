@extends('layouts.vertical', ['page_title' => 'Treeview', 'mode' => $mode ?? '', 'demo' => $demo ?? ''])

@section('css')
    @vite(['node_modules/jstree/dist/themes/default/style.min.css'])
@endsection

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Treeview</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Extended UI</a></li>
                        <li class="breadcrumb-item active">Treeview</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Basic Tree</h4>

                    <div id="basicTree">
                        <ul>
                            <li><b>MINTON</b>
                                <ul>
                                    <li data-jstree='{"opened":true}'>Assets
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Css</li>
                                            <li data-jstree='{"opened":true}'>Plugins
                                                <ul>
                                                    <li data-jstree='{"selected":true,"type":"file"}'>Plugin one</li>
                                                    <li data-jstree='{"type":"file"}'>Plugin two</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"opened":true}'>Email Template
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Email one</li>
                                            <li data-jstree='{"type":"file"}'>Email two</li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"icon":"mdi mdi-view-dashboard"}'>Dashboard</li>
                                    <li data-jstree='{"icon":"mdi mdi-format-font"}'>Typography</li>
                                    <li data-jstree='{"opened":true}'>User Interface
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Buttons</li>
                                            <li data-jstree='{"type":"file"}'>Cards</li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"icon":"mdi mdi-texture"}'>Forms</li>
                                    <li data-jstree='{"icon":"mdi mdi-view-list"}'>Tables</li>
                                </ul>
                            </li>
                            <li data-jstree='{"type":"file"}'>Frontend</li>
                        </ul>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Checkbox Tree</h4>

                    <div id="checkTree">
                        <ul>
                            <li><b>MINTON</b>
                                <ul>
                                    <li data-jstree='{"opened":true}'>Assets
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Css</li>
                                            <li data-jstree='{"opened":true}'>Plugins
                                                <ul>
                                                    <li data-jstree='{"selected":true,"type":"file"}'>Plugin one</li>
                                                    <li data-jstree='{"type":"file"}'>Plugin two</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"opened":true}'>Email Template
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Email one</li>
                                            <li data-jstree='{"type":"file"}'>Email two</li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"icon":"mdi mdi-view-dashboard"}'>Dashboard</li>
                                    <li data-jstree='{"icon":"mdi mdi-format-font"}'>Typography</li>
                                    <li data-jstree='{"opened":true}'>User Interface
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Buttons</li>
                                            <li data-jstree='{"type":"file"}'>Cards</li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"icon":"mdi mdi-texture"}'>Forms</li>
                                    <li data-jstree='{"icon":"mdi mdi-view-list"}'>Tables</li>
                                </ul>
                            </li>
                            <li data-jstree='{"type":"file"}'>Frontend</li>
                        </ul>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Drag & Drop Tree</h4>

                    <div id="dragTree">
                        <ul>
                            <li><b>MINTON</b>
                                <ul>
                                    <li data-jstree='{"opened":true}'>Assets
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Css</li>
                                            <li data-jstree='{"opened":true}'>Plugins
                                                <ul>
                                                    <li data-jstree='{"selected":true,"type":"file"}'>Plugin one</li>
                                                    <li data-jstree='{"type":"file"}'>Plugin two</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"opened":true}'>Email Template
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Email one</li>
                                            <li data-jstree='{"type":"file"}'>Email two</li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"icon":"mdi mdi-view-dashboard"}'>Dashboard</li>
                                    <li data-jstree='{"icon":"mdi mdi-format-font"}'>Typography</li>
                                    <li data-jstree='{"opened":true}'>User Interface
                                        <ul>
                                            <li data-jstree='{"type":"file"}'>Buttons</li>
                                            <li data-jstree='{"type":"file"}'>Cards</li>
                                        </ul>
                                    </li>
                                    <li data-jstree='{"icon":"mdi mdi-texture"}'>Forms</li>
                                    <li data-jstree='{"icon":"mdi mdi-view-list"}'>Tables</li>
                                </ul>
                            </li>
                            <li data-jstree='{"type":"file"}'>Frontend</li>
                        </ul>
                    </div>
                </div>

            </div> <!-- end card -->
        </div> <!-- end col-->

        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Ajax Tree</h4>

                    <div id="ajaxTree"></div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col-->
    </div>
    <!-- end row-->
@endsection

@section('script')
    @vite(['resources/js/pages/treeview.init.js'])
@endsection
