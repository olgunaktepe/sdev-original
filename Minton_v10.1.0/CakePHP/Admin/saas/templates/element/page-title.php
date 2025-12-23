<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"><?= ($title) ? h($title) : '' ?></h4>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                    <li class="breadcrumb-item"><a
                            href="javascript: void(0);"><?= ($subTitle) ? h($subTitle) : '' ?></a></li>
                    <li class="breadcrumb-item active"><?= ($title) ? h($title) : '' ?></li>
                </ol>
            </div>
        </div>
    </div>
</div>
<!-- end page title -->
