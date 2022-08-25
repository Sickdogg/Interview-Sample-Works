<?php
$p_Pname = $_POST['Pname'];
$p_Pcom = $_POST['Pcom'];
$p_Pconnway = $_POST['Pconnway'];
$p_Pconncon = $_POST['Pconncon'];
$p_Porder = $_POST['Porder'];
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "newguestdb";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if(!$conn){
    die("連線錯誤".mysqli_connect_error());
}
echo "連線成功";

$sql = "INSERT INTO newguestlist (Pname,pcom,Pconnway,Pconncon,Porder) VALUES ('$p_Pname','$p_Pnum','$p_Pconnway','$p_Pconncon','$p_Porder')";
if(mysqli_query($conn,$sql)){
    echo "新增成功";
}else{
    echo "新增失敗".mysqli_error($conn);
}

mysqli_close($conn);
?>