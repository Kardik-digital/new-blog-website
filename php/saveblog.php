<?php 
ini_set('max_input_vars', 30000);
include "./db.php";


if(isset($_POST["save_blog"])){
    $blog_title = $_POST['blog_title'];
    $tags = $_POST["tags"];
    $blog_content = $_POST['blog_content'];

    $user_id = "user334211";
    $saveBlog = $server_connect->prepare("INSERT INTO blogs(user_id, blog_title, tags, blog_content) VALUES(:user_id,
    :blog_title, :tags, :blog_content)");
    $saveBlog->execute([
        "user_id" => $user_id,
        "blog_title" => $blog_title,
        "tags" => $tags,
        "blog_content" => $blog_content,
    ]);

    if($saveBlog){
        echo "blogSaved";
    }else{
        echo "error";
    }

}