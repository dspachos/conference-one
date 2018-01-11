<?php

// remove in production
//$_POST['data'] = "gender=Mrs.&fname=Dimitris&lname=Spachos&address=Karavageli%203&postalcode=56124&city=Thessaloniki&country=Greece&email=dimitris.spachos%40gmail.com&telephone=306936598133&fee=500&termsaccept=1";

// Check for empty fields
if( empty($_POST['data']) ) {
	print "No arguments Provided!";
	return false;
   }

	parse_str(http_build_query($_POST), $values);
	$str=print_r($values,true);
	print $str;
	// Create the email and send the message

	$to = '[YOUR EMAIL ADDRESS HERE]'; // Insert your email here
	$email_subject = "New registration";
	$email_body = "You have a new registration. Here are the details:\n\n $str";
	$headers = "From: [YOUR EMAIL ADDRESS HERE]\n"; // Insert your email here
	$headers .= "Reply-To: $email_address";
	return mail($to,$email_subject,$email_body,$headers);

?>
