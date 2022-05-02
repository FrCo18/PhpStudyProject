<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{asset('images/php.ico')}}" type="image/x-icon">
    <title>PHP Study</title>
</head>
<body class="antialiased">
<div id="root"></div>
<script src="{{asset('/js/index.js')}}"></script>
</body>
</html>
