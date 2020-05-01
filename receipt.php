<?php 

include_once('tools.php');
// unset($_SESSION['cart']);
if (empty($_SESSION['cart']))
{
    header("Location: index.php");
}


// print_r($_SESSION['cart']);

$movie_title =  $movieList[$_SESSION["cart"][0]['id']]["title"];
$movie_ratn =  $movieList[$_SESSION['cart'][0]['id']]['ratn'];
$movie_day = $_SESSION['cart'][0]['day'];
$movie_hour =  $_SESSION['cart'][0]['hour'];


$seatPricing = $_SESSION['cart'][0]['seatsPrice'];
$seatQuantity = $_SESSION['cart'][0]['seatsQuantity'];
?>


<!DOCTYPE html>

<html lang='en'>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Lunardo Cinemas - Receipt </title>
    <link rel="stylesheet" href="receipt.css">
</head>

<body>


<!--  <div style="height:297mm; width:210mm; text-align:center; border:dotted 2px #CCC"> -->
<div id="main_page">

        <div class="wrapper_receipt" id="wrapper_receipt">

                    <div class = "Heading">
                        <h1> <img id ="logo" src="../../media/Lunardo.png"></h1>
                        <h2 class = "Bus_name">LUNARDO CINEMAS</h2>
                    
                    </div>

                      <div class = "bus_details"> Lunardo Cinemas 
                      <br> ABN Number : 01 234 567 890
                      <br> 80 Swanston St 
                      <br> Melbourne 3000 VIC 
                      </div>

                      

                    <div class="cust_details">
                    
                        <h2>Customer Details </h2>
                        <table>
                              <tr>
                                <th>Name:</th>
                                <td><?php echo $_SESSION['cart'][0]['name']; ?></td>
                              </tr>
                              <tr>
                                <th>Mobile: </th>
                                <td><?php echo $_SESSION['cart'][0]['phone']; ?></td>
                              </tr>
                              <tr>
                                <th>Email :</th>
                                <td><?php echo $_SESSION['cart'][0]['email']; ?></td>
                              </tr>
                              <tr>
                                <th>Card Details:</th>
                                <td> **** **** **** <?php echo substr($_SESSION['cart'][0]['card'], -4); ?></td>
                              </tr>
                       </table>
                    </div>

                  
                    <div class="movie_details">
                        <table>
                          <tr id="title">
                          <th> Movie Details</th>
                        </tr>
                        <tr>
                          <td><?php echo $movie_title ; ?></td>
                        </tr>
                        <tr>
                        <td><?php echo $movie_ratn; ?></td>
                        </tr>
                        <tr>
                        <td><strong>Day : </strong> <?php echo $_SESSION['cart'][0]['day'] ?>    |  <strong>Time : </strong> <?php echo $_SESSION['cart'][0]['hour']; ?></td>
                        </tr>
                      </table>

                    </div>


                    <div class="seat_details">
                    
                    <h2>Seat Details </h2>
                    
                        <table>
                          <tr class="tr_header">
                            <th scope="col">Seat Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Price</th>
                          </tr>
                          <tr>
                         
                         <?php 
                          foreach($seatQuantity as $key => $value){
                              if($value != 0){ // This seat was booked
                          ?>
                            <td><?php echo getSeatCode($key); ?></td>
                            <td><?php echo $value; ?></td>
                            <td><?php echo getSingleSeatPrice($key); ?></td>
                            <td><?php echo getSeatPrice($key); ?></td>
                          </tr>
                          <?php } } ?>
                          
                          <tr style="border-top:1px solid #444444">
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td><strong><?php echo getTotal(); ?></strong></td>
                          </tr>
                          
                          <tr>
                            <td></td>
                            <td></td>
                            <td><strong>GST </strong></td>
                            <td><strong><?php echo getTotalGST(); ?></strong></td>
                          </tr>
                          
                          <tr>
                            <td></td>
                            <td></td>
                            <td style="border-top:1px solid #444"><strong>Grand Total </strong><small><small>(Include GST)</small></small></td>
                            <td style="border-top:1px solid #444; border-bottom:1px solid #444"><strong><?php echo getFinalTotal($key); ?></strong></td>
                          </tr>
                        </table>
                    </div>

    </div>



<div class="print_out"><button onClick="print_rc_page('wrapper_receipt')">Print Receipt</button></div>

<br>
<div class="wrapper_ticket" id="wrapper_ticket">

    <h3>Ticket(s)</h3>
    
     <?php
        $total_seat = 0;
        foreach($seatQuantity as $key => $value){
              if($value != 0){ // This seat was booked
            
            if(substr($key, 0, 1) == 'S') $class = 'ticket_standard';
            else   $class = 'ticket_first';
            
            for($cn = 0; $cn < $value; $cn++){
                 $total_seat++;
                $seat_number =  '<style="font-size:8px;">'.$key.'</style>'. str_pad(($cn + 1), 3, '0', STR_PAD_LEFT) ;
                
            
            ?>
    
                    <div class="<?php echo $class; ?>">
                    <div class="ticket_header">
                    <img id ="ticket_logo" src="../../media/Lunardo.png"> 
                    <h3>LUNARDO CINEMAS</h3>
                    </div>
                    
                    
                    
                    <div class="ticket_details">
                    <?php echo $movie_title; ?>
                    <span><?php echo $movie_ratn; ?></span>
                    </div>

                    <div class="ticket_seat">
                    <div class="ticket_date"><?php echo $movie_day.'; '.$movie_hour; ?>
                  </div>
                    <div>
                    <div class="ticket_title">Seat Class: <?php echo $key; ?></div>
                    </div>
                    <div>
                    <div class="ticket_title">Seat No: <?php echo $seat_number; ?></div>
                    </div>
                    </div>
                    
                    
                
                    
                    </div>
                    
                    <?php if($total_seat % 16 == 0) echo '<div class="ticket_sep"></div>'; ?>
                    
                <?php  } } } ?>

</div>

  <div class="print_session"><button onClick="print_rc_page('wrapper_ticket')">Print Ticket(s)</button></div>

</div>



<script>

function print_rc_page(page){
         var  restore_page  = document.getElementById('main_page').innerHTML;
         
         var print_content =  document.getElementById(page).innerHTML;
        
         document.getElementById('main_page').innerHTML = print_content;
         
         window.print() ;
         
         setTimeout(function(){
                document.getElementById('main_page').innerHTML = restore_page;
         }, 3000);
  }

</script>

</body>
</html>
  