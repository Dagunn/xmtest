<?php
$email = $_POST['email'];
$pass = $_POST['password'];
$passPattern = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#\[\]()@$&*!?|,.^\/\\\\+_ -])[A-Za-z\d#\[\]()@$&*!?|,.^\/\\\\+_ -]{8,15}$/';
if(preg_match($passPattern, $pass) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'success';
} else {
    echo 'err';
}
