<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $albumTitle = $_POST['albumTitle'];

    // Delete the album from the database

    echo json_encode(['success' => true]);
}
?>
