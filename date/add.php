<?php
include "connect.php";
$numbers=[];
$numbers=$_POST['numbers'];
$classes=$_POST['classes'];
$ids=$_POST['id'];

for($i=0;$i<12;$i++){
    $firstNumber =$numbers[$i][0];
    $secondNumber =$numbers[$i][1];
    $class =$classes[$i];
    $id=$ids[$i]+1;
//echo json_encode($firstNumber."+".$secondNumber."+".$id, true);
$getId="SELECT id FROM numbers WHERE id=$id";
$result=mysqli_query($conn,$getId);
$row=mysqli_num_rows($result);
    if(isset($_POST['id'])) {
        if ($row ==1) {
            $sql = "UPDATE numbers SET firstNumber = '$firstNumber', secondNumber = '$secondNumber', class = '$class' WHERE id = $id";
        } else {
            $sql = "INSERT INTO numbers(firstNumber, secondNumber, class) VALUES('$firstNumber', '$secondNumber','$class')";
        }
    }
//    echo $sql;
    $conn->query($sql);
}
$conn->close();
//header('Location: ../index.html');
?>