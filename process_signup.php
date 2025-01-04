<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "webproject2";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);

    // Validate form data
    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        echo "All fields are required.";
    } elseif ($password !== $confirm_password) {
        header("Location: signup.html");
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert data into the database
        $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        if ($stmt->execute()) {
            header("Location: login.html");
            exit();       
         } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    }
}
$conn->close();
?>
