<?php
$_id = $_POST['ID'];
$p_Pname = $_POST['Pname'];
$p_Pcom = $_POST['Pcom'];
$p_Porder = $_POST['Porder'];
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "oldguestcustdb";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if(!$conn){
    die("連線錯誤".mysqli_connect_error());
}
echo "連線成功";

$sql = "INSERT INTO oldguestcustlist (ID,Pname,pcom,Porder) VALUES ('$_id','$p_Pname','$p_Pcom','$p_Porder')";
if(mysqli_query($conn,$sql)){
    echo "新增成功";
}else{
    echo "新增失敗".mysqli_error($conn);
}

mysqli_close($conn);
?>