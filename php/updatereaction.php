<?php
require_once "./db.php";

if (isset($_POST["updateReaction"])) {
 
$blog_id = $_POST["blogId"];

  if (isset($_POST["like"])) {
    $updateReaction = $server_connect->prepare("UPDATE blogs SET likes = likes + 1 WHERE blog_id = :blog_id");
    $updateReaction->execute([
      "blog_id" => $blog_id,
    ]);

    if ($updateReaction) {
      echo "reactionUpdated";
    }
  }
  
  if (isset($_POST["dislike"])) {
    $updateReaction = $server_connect->prepare("UPDATE blogs SET dislikes = dislikes + 1 WHERE blog_id = :blog_id");
    $updateReaction->execute([

      "blog_id" => $blog_id,
    ]);

    if ($updateReaction) {
      echo "reactionUpdated";
    }
  }
  if (isset($_POST["love"])) {
    $updateReaction = $server_connect->prepare("UPDATE blogs SET loves = loves + 1 WHERE blog_id = :blog_id");
    $updateReaction->execute([
     
      "blog_id" => $blog_id,
    ]);

    if ($updateReaction) {
      echo "reactionUpdated";
    }
  }

}