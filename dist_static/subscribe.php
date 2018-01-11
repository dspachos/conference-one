<?php

// Check for empty fields
if(
   empty($_POST['email']) 		||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }

$email_address = $_POST['email'];

// Create the email and send the message

	$to = '[YOUR EMAIL ADDRESS HERE]'; // Insert your email here
	$email_subject = "New subscriber";
	$email_body = "You have a new subscriber. Here are the details: Email: $email_address";
	$headers = "From: [YOUR EMAIL ADDRESS HERE]\n";
	$headers .= "Reply-To: $email_address";
	mail($to,$email_subject,$email_body,$headers);

	return true;

?>
