<?php
// $_ID = $_POST['ID'];
// $p_Pname = $_POST['Pname'];
// $p_Pcom = $_POST['Pcom'];
// $p_Porder = $_POST['Porder'];
// $p_Pordersitu = $_POST['Pordersitu'];
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "oldguestcustdb";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if(!$conn){
    die("連線錯誤".mysqli_connect_error());
}

$sql = "SELECT * FROM oldguestcustlist WHERE ID = '1'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $myData = [];
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $myData [] = $row;
    }
  }
  
  echo json_encode($myData);
    mysqli_close($conn);
?>