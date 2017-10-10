<?php
include "connect.php";
$sql = "SELECT * FROM numbers";
$result = $conn->query($sql);
$numbers = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
    $numbers[]=array(
        "id"=>$row["id"],
        "firstNumber"=>$row["firstNumber"],
        "secondNumber"=>$row["secondNumber"],
        "class"=>$row["class"]
    );
    }
}
echo json_encode($numbers, true);
?>
