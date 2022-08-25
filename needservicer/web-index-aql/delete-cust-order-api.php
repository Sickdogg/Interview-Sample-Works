<?php
$TopicID = $_POST['TopicID'];
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "oldguestcustdb";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if(!$conn){
    die("連線錯誤".mysqli_connect_error());
}
echo "連線成功";
$sql = "DELETE FROM oldguestcustlist WHERE TopicID = '$TopicID' ";

if(mysqli_query($conn,$sql)){
echo "刪除成功";
}else{
    echo "刪除失敗". mysqli_error($conn);
}
?>