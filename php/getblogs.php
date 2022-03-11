<?php
require_once "./db.php";
// <!-- GET THE LATEST BLOGs -->
if(isset($_GET["get_blogs"])){
$getBlogs = $server_connect->prepare("SELECT * FROM `blogs` ORDER BY date_posted DESC");
$getBlogs->execute();
$countBlogs = $getBlogs->rowCount();
if ($countBlogs >= 1) {

 echo json_encode($getBlogs->fetchAll());
} else {
 echo "noBlogs";
}

}

if (isset($_POST["filter_categories"])) {
    $tag      = '%' . $_POST["tag"] . '%';
    $getBlogs = $server_connect->prepare("SELECT * FROM `blogs` WHERE tags LIKE :tag ORDER BY date_posted
    DESC");
    $getBlogs->execute(["tag" => $tag]);
    $blogs      = $getBlogs->fetchAll();
    $countBlogs = $getBlogs->rowCount();
    if ($countBlogs >= 1) {
        echo json_encode($blogs);
    } else {
        echo "";
    }
}


if (isset($_POST["search"])) {
    $search_text      = '%' . $_POST["search_text"] . '%';
    $getBlogs = $server_connect->prepare("SELECT * FROM `blogs` WHERE blog_title LIKE :search_text ORDER BY
    date_posted DESC");
    $getBlogs->execute(["search_text" => $search_text]);
    $blogs      = $getBlogs->fetchAll();
    $countBlogs = $getBlogs->rowCount();
    if ($countBlogs >= 1) {
        echo json_encode($blogs);
    } else {
        echo "";
    }
}

if (isset($_POST["get_blog"])) {
    $blog_id = $_POST["blog_id"];
    $getBlog = $server_connect->prepare("SELECT * FROM `blogs` WHERE blog_id =:blog_id");
    $getBlog->execute(["blog_id" => $blog_id]);
    $blog      = $getBlog->fetch();
  
        echo json_encode($blog);
    
}