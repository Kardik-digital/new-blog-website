<?php 
$username = "root";
$password = "";
$dbname = "web_blog";
$dsn = "mysql:host=localhost;dbname=$dbname";

$server_connect = new PDO($dsn, $username, $password);
$server_connect->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);