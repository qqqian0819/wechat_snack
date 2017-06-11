<?php  

sleep(2);//模拟漫长的加载数据过程

if(!$link=mysqli_connect('localhost','root','','wechat')){// mysqli_connect(host,username,password,dbname);
	die("连接错误: " . mysqli_connect_error()); 
}

// 设置字符集
mysqli_set_charset($link,'utf8');// mysqli_query($link,'set names utf8');

// 防止sql注入


// 查询数据
if(isset($_GET['sort'])){
	$sort=$_GET['sort'];
	$sql="SELECT * FROM snacks WHERE sort='$sort'";
}else{
	$sql='SELECT * FROM snacks';
}

$result=mysqli_query($link,$sql);



// $obj=mysqli_fetch_all($result,MYSQLI_ASSOC);
// echo $json=json_encode($obj);
$data=array();
while ($row=mysqli_fetch_assoc($result)) {
	$id=$row['id'];
	$data[$id]=$row;
}

// print_r($data);
echo $json=json_encode($data);


mysqli_free_result($result);
mysqli_close($link);