<?php

function top_module($pageTitle){
echo "
<!DOCTYPE html>
<html lang='en'>

<head>

    <title>$pageTitle</title>

    <!-- Keep wireframe.css for debugging, add your css to style.css -->
    <link id='wireframecss' type='text/css' rel='stylesheet' href='../wireframe.css' disabled>
    <link id='stylecss' type='text/css' rel='stylesheet' href='style.css'>
    <script src='../wireframe.js'></script>
    <link href='https://fonts.googleapis.com/css?family=Libre+Baskerville|Roboto&display=swap' rel='stylesheet'>

</head>

<body>

    <header>
        <video playsinline='playsinline' autoplay=''autoplay' muted='muted' loop='loop''>
            <source src='../../media/header.mp4' type='video/mp4'>
        </video>
        <div class='container h-100'>
            <div class='d-flex h-100 text-center align-items-center'>
                <div class='w-100 text-white'>
                    <h1 class='display-3'>LUNARDO</h1>
                    <img src='../../media/Lunardo.png' alt='Lunardo' style='width:150px;background-color:black;' />
                </div>
            </div>
        </div>
    </header>
    ";
}
?>