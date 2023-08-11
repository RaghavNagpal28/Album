<?php
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $jsonData);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
