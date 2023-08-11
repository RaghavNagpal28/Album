<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Replace the validation logic with your actual validation
    if ($email === 'raghav' && $password === 'raghav') {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Wrong email or password. Please try again.']);
    }
}
?>
