<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="UTF-8">
    <title>Math Puzzle</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reset.css">
</head>
<body>

<div class="background">
    <div class="areaPlay">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>

</div>
<div class="calcule">
    <?php
    function random (){
        $a=rand(0,9);
        $b=rand(0,9);
        $c=rand(0,9);
        $first=$a+$b;
        while(($c==$a) || ($c==$b) || $c>=$first){
            $c=rand(0,9);
        }
        $d=$first-$c;
        $second=$c+$d;

        return $a . '  ' . $b .'  ' .$c . '  ' .$d . "<br> <br>";


    }
    $number=random();
    echo $number;
    $i=0;
    for($i=1;$i<=4;$i++){
        echo random();
    }
    ?>
</div>
</body>
</html>