<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Dynamic Title (controlled by Inertia pages) -->
    <title inertia></title>

    <!-- Dynamic Meta Tags will be injected by React components via @inertiaHead -->
    <!-- Default Meta (only used if React doesn't override them) -->
    @hasSection('default-meta')
        {{-- If you need default meta, use sections --}}
    @else
        {{-- These are fallbacks - they will be replaced by React's Head component --}}
        <meta name="description" content="Shuchikhabar - नेपाल र विश्वका ताजा समाचारहरू।">
        <meta name="keywords" content="समाचार, नेपाल, विश्व, ताजा समाचार">
        <link rel="canonical" href="{{ url()->current() }}">
    @endif

    <!-- Favicon -->
    <link rel="icon" href="/images/logo.png" type="image/png">
    <link rel="apple-touch-icon" href="/images/logo.png">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Racing+Sans+One&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])

    <!-- Inertia Head - React components will inject their SEO tags here -->
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>