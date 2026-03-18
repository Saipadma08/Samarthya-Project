<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$HOST = "localhost";
$USERNAME = "root";
$PASSWORD = "";
$DB_NAME = "crud_db";

$con = new mysqli($HOST, $USERNAME, $PASSWORD, $DB_NAME);

if ($con->connect_error) {
    die("Database Connection Failed: " . $con->connect_error);
}
?>