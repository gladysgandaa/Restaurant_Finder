<?php
session_start();


//SEAT VALIDATION

$quantities  = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);

$seatPricing = array(
  'STA' => 0, 
  'STP' => 0, 
  'STC' => 0, 
  'FCA' => 0, 
  'FCP' => 0, 
  'FCC' => 0
);

$seatQuantity = array(
  'STA' => 0, 
  'STP' => 0, 
  'STC' => 0, 
  'FCA' => 0, 
  'FCP' => 0, 
  'FCC' => 0
);

$booking  = false;
$error = array();

$movieList  = array(
            1 => array(
            'title' => 'Avengers: Endgame', 
            'ratn' => 'M (Violence)', 
            'movie_session' => [
              ['Wednesday', '9:00 PM'], 
              ['Thursday', '9:00 PM'], 
              ['Friday', '9:00 PM'], 
              ['Saturday', '6:00 PM'], 
              ['Sunday', '6:00 PM']
              ]),
                        
                        2 => array(
              'title' => 'Top End Wedding', 
              'ratn' => 'M', 
              'movie_session' => [
                ['Monday', '6:00 PM'], 
                ['Tuesday', '6:00 PM'], 
                ['Saturday', '3:00 PM'], 
                ['Sunday', '3:00 PM']
                ]),  
                        
                        3 => array(
              'title' => 'Dumbo', 
              'ratn' => 'PG', 
              'movie_session' => [
                ['Monday', '12:00 PM'], 
                ['Tuesday', '12:00 PM'], 
                ['Wednesday', '6:00 PM'], 
                ['Thursday', '6:00 PM'], 
                ['Friday', '6:00 PM'], 
                ['Saturday', '12:00 PM'], 
                ['Sunday', '12:00 PM']
                ]),
                        
                        4 => array(
              'title' => 'The Happy Prince', 
              'ratn' => 'MA 15', 
              'movie_session' => [
                ['Wednesday', '12:00 PM'], 
                ['Thursday', '12:00 PM'], 
                ['Friday', '12:00 PM'], 
                ['Saturday', '9:00 PM'], 
                ['Sunday', '9:00 PM']
                ]),
                        
                        
                        );


$pricing = array(
    'discounted' => array(
        'standard' => array(
            'adult' => 14,
            'concession' => 12.5,
            'child' => 11,
        ),
        'firstClass' => array(
            'adult' => 24,
            'concession' => 22.5,
            'child'  => 21,
        )
    ),
    'normal' => array(
        'standard' => array(
            'adult' => 19.8,
            'concession' => 17.5,
            'child' => 15.3,
        ),
        'firstClass' => array(
            'adult' => 30,
            'concession' => 27,
            'child'  => 24,
        )
    )

);


function getSeatPrice($seat){
    
  global $seatPricing, $seatQuantity;
    return '$'.number_format(($seatPricing[$seat] * $seatQuantity[$seat]), 2);
    
  }
  


//CODE IMPLEMENTATION 
    
/* Function to get formatted seat Unit price; unit times quantity   */
function getSingleSeatPrice($seat){
  global $seatPricing;

    return '$'.number_format($seatPricing[$seat], 2);
    
    }
  


/* Function to get formatted Total seat price   */
function getTotal(){
    
    global $seatPricing, $seatQuantity;
  $totalPrice = 0.00;
    foreach($seatPricing as $key => $sp){
    $totalPrice += number_format(($sp * $seatQuantity[$key]), 2);
    }
    return '$'.number_format($totalPrice, 2);
}

/* Function to get formatted Total seat price  GST only  */
function getTotalGST(){
    
    global $seatPricing, $seatQuantity;
  $totalPrice = 0.00;
    foreach($seatPricing as $key => $sp){
        $totalPrice += number_format(($sp * $seatQuantity[$key]), 2);
    }
    return '$'.number_format($totalPrice/11, 2);
}

/* Function to get formatted Total seat price  GST only  */
function getFinalTotal(){
    
    global $seatPricing, $seatQuantity;
    $totalPrice = 0.00;
    foreach($seatPricing as $key => $sp){
        $totalPrice += number_format(($sp * $seatQuantity[$key]), 2);
    }
    return '$'.number_format(($totalPrice + $totalPrice/11), 2);
}

/* Function to get the real price   */
function  get_price($id, $mDay, $hDay){
    
    global $pricing;
    
    if ($id == 'STP') {
        $class = 'standard'; $type =  'concession';
    }
    elseif ($id == 'STA') {
        $class = 'standard'; $type =  'adult';
     }
    elseif ($id == 'STC') {
        $class = 'standard'; $type =  'child';
    }
    elseif ($id == 'FCP') {
        $class = 'firstClass'; $type =  'concession';
    }
    elseif ($id == 'FCA') {
        $class = 'firstClass'; $type =  'adult';
    }
    elseif ($id == 'FCC') {
        $class = 'firstClass'; $type =  'child';
    }
    
    if ($mDay == 'SAT' || $mDay  == 'SUN') {
        if($hDay == 'T12'){
            $price = $pricing['discounted'][$class][$type];
        }
        else{
            $price = $pricing['normal'][$class][$type];
            }
        } 
    
      else if ($mDay == 'MON' || $mDay  == 'WED') {
            $price = $pricing['discounted'][$class][$type];
        } 
      
      else {
              $price = $pricing['normal'][$class][$type];
           }
    
    return $price;
    }



function getSeatCode($id){
    
    if ($id == 'STP') {
        return 'Standard concession';
    }
    elseif ($id == 'STA') {
        return 'Standard adult';
     }
    elseif ($id == 'STC') {
        return 'Standard child';
    }
    elseif ($id == 'FCP') {
        return 'FirstClass concession';
    }
    elseif ($id == 'FCA') {
        return 'FirstClass adult';
    }
    elseif ($id == 'FCC') {
        return 'FirstClass child';
    }
    
  }
  
  function getTotalSeat(){
    global $seatQuantity;
    $totalSeat = $seatQuantity['STA']+$seatQuantity['STC']+$seatQuantity['STP']+$seatQuantity['FCA']+$seatQuantity['FCP']+$seatQuantity['FCA'];
    return $totalSeat;
  }

  function preShow( $arr, $returnAsString=false ) {
    $ret  = '<pre>' . print_r($arr, true) . '</pre>';
    if ($returnAsString)
      return $ret;
    else 
      echo $ret; 
  }
  
  // preShow($_POST); // ie echo a string
  // preShow($_SESSION);
  
  //$aaarg = preShow($my_bad_array, true); // ie return as a string
  //echo "Why is \n $aaarg \n not working?"; 

  
  function printMyCode() {
    $lines = file($_SERVER['SCRIPT_FILENAME']);
    echo "<pre class='mycode'><ol>";
    foreach ($lines as $line)
       echo '<li>'.rtrim(htmlentities($line)).'</li>';
    echo '</ol></pre>';
  }
  
  //printMyCode(); // prints all lines of code in this file with line numbers

  function php2js( $arr, $arrName ) {
    $lineEnd="";
    echo "<script>\n";
    echo "/* Generated with A4's php2js() function */";
    echo "  var $arrName = ".json_encode($arr, JSON_PRETTY_PRINT);
    echo "</script>\n\n";
  }
  

    function styleCurrentNavLink ($css){
      $here = $_SERVER['SCRIPT_NAME'];
      $bits = explode('/',$here);
      $filename = $bits[count($bits)-1];
      echo "<style>nav a[href$='filename'] {$css} </style>";
    }

    function show_error($field){
      global $error;
      global $booking;
      if($booking){
      if(isset($error[$field]))
      echo '<div style="color:red; font-size:10px">'.$error[$field].'</div>';
      
      }
     }
    
    
    /* Function to show the original text entered by customer  */
    function show_spost($field1, $field2 = ''){
      global $booking;
      if($booking){
        if($field2 == ''){
          if(isset($_POST[$field1]))
          echo $_POST[$field1];
        }
        else{
          
          if(isset($_POST[$field1][$field2]))
          echo $_POST[$field1][$field2];
          
          }
      
      }
     }
    
    
    /* Function to auto select checkboxes */
    function trigger_seat_option($field1, $field2 = ''){
      global $booking;
      if($booking){
          if(isset($_POST[$field1][$field2]))
          echo  'document.getElementById(\'seats-'.$field2.'\').value = \''. $_POST[$field1][$field2]. '\';';
        
      }
     }
    

    