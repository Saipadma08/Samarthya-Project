<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit(0);
}

require_once "dbConnect.php";

$response = [];

$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit;
}

if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $name = $data->name;
    $email = $data->email;
    $phone  = $data->phone;
    $gender = $data->gender;
    $password = $data->password;

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $qry = "INSERT INTO users(name,email,phone,gender,password) VALUES(?,?,?,?,?)";
    $stmt = $con->prepare($qry);

    if(!$stmt){
        $response["status"] = "error";
        $response["message"] = "Prepare failed";
        echo json_encode($response);
        exit;
    }

    $stmt->bind_param("sssss", $name, $email,$phone,$gender,$hashedPassword);

    if($stmt->execute()){
        $response["status"] = "success";
        $response["message"] = "Signup successful!";
    } 
    else{
        $response["status"] = "error";
        $response["message"] = $stmt->error;
    }

    echo json_encode($response);
}

?>