

    @if (isset($demo) && $demo == 'creative')
        @vite(['resources/scss/config/creative/app.scss', 'resources/scss/config/creative/bootstrap.scss'])
    @elseif(isset($demo) && $demo == 'modern')
        @vite(['resources/scss/config/modern/app.scss', 'resources/scss/config/modern/bootstrap.scss'])
    @elseif (isset($demo) && $demo == 'material')
        @vite(['resources/scss/config/material/app.scss', 'resources/scss/config/material/bootstrap.scss'])
    @elseif (isset($demo) && $demo == 'corporate')
        @vite(['resources/scss/config/corporate/app.scss', 'resources/scss/config/corporate/bootstrap.scss'])
    @elseif (isset($demo) && $demo == 'saas')
        @vite(['resources/scss/config/saas/app.scss', 'resources/scss/config/saas/bootstrap.scss'])
    @else
        @vite(['resources/scss/config/default/app.scss', 'resources/scss/config/default/bootstrap.scss'])
    @endif

