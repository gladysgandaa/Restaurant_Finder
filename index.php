<?php
// include_once ('tools.php');
// $nameErr = $emailErr = $phoneErr = $cardErr = $mmErr = $yyErr = " ";
// $name = $email = $mobile = $pid=$oid=$quantity=$price=$subTotal="";
// $errors=0;


// if (isset($_POST['id'])) {
//     $booking = true;
//     $pass_mverification = false; // If movie detail are valid
//     if (isset($_POST['id'])) {
//         $movie_id = $_POST['id'];
//         $day = @$_POST['day'];
//         $hour = @$_POST['hour'];
//         $pass_mverification = true;
//     }
//     if ($pass_mverification) { // If the movie datas are valid
//         $icheck = 0;
//         foreach ($_POST['seats'] as $key => $value) {
//             if (in_array($value, $quantities)) { // if it is a valid quantity
//                 $seatQuantity[$key] = $value;
//                 $price = get_price($key, $day, $hour);
//                 $seatPricing[$key] = $price;
//                 $icheck++;
//             }
//         }
//         if ($icheck == 0) // If no seat was selected
//         $error['seat'] = 'You must select a seat option';
//     }



   
//     if (!empty($_POST)) {
//         if (empty($_POST['name'])) {
//             $nameErr = "Name is required";
//             $errors++;
//         } else if (!preg_match("/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/", $_POST['name'])) {
//             $errors++;
//             $nameErr = "Enter Valid Name";
//         }

//         if (empty($_POST['phone'])) {
//             $phoneErr = "Phone Number is required";
//             $errors++;
//         } else if (!preg_match("/^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/", $_POST['phone'])) {
//             $phoneErr = "Enter valid number.";
//             $errors++;
//         }

//         if (empty($_POST['email'])) {
//             $errors++;
//             $emailErr = "Email is required";
//         } else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
//             $errors++;
//             $emailErr = "Enter Valid Email";
//         }

//         if (empty($_POST['card'])) {
//             $cardErr = "Card Number is required";
//             $errors++;
//         } else if (!preg_match("/\d{4}-?\d{4}-?\d{4}-?\d{4}/", $_POST['card'])) {
//             $cardErr = "Enter valid card number";
//             $errors++;
//         }

//         if (empty($_POST['mm']) || empty($_POST['yy'])) {
//             $mmErr = "MM/YY is required";
//             $errors++;
//         } else {
//             if ($_POST['yy'] < date("Y")) {
//                 // expiry is valid
//                 $yyErr = "Error in year";
//                 $errors++;
//             } else if ($_POST['yy'] == date("Y")) {
//                 if ($_POST['mm'] < (date("m") + 1)) {
//                     // display error
//                     $mmErr = "Error in month";
//                     $errors++;
//                 }
//             } 
//         }
//         // print_r($_POST["seats"]);
        
//         if ($errors <= 0) {
//             $date = date("d-m-Y");
//             $movieId = $_POST['id'];
//             $name = $_POST['name'];
//             $email = $_POST['email'];
//             $mobile = $_POST['phone'];
//             $card = $_POST['card'];
//             $total = $_POST['total'];
//             $seatSTA = $_POST['seats']["STA"];
//             $seatSTP = $_POST['seats']["STP"];
//             $seatSTC = $_POST['seats']["STC"];
//             $seatFCA = $_POST['seats']["FCA"];
//             $seatFCP = $_POST['seats']["FCP"];
//             $seatFCC = $_POST['seats']["FCC"];
//             $day = $_POST['day'];
//             $hour = $_POST['hour'];
//             $booking_data = array(date('Y-m-d', time()), $name, $email,
//             $mobile, $movie_id, $day, $hour,$seatSTA, $seatSTP, $seatSTC,
//             $seatFCA, $seatFCP, $seatFCC , getTotal());
            
//             $booking = fopen('bookings.txt','a');
//             fputcsv($booking,$booking_data,"\t");
//             fclose($booking);
//             unset($_SESSION['cart']);
//             $_SESSION['cart'][] = ["date"=>$date,"name"=>$name,"email"=>$email,"phone"=>$mobile,"card"=>$card,"total"=>$total,"day"=>$day,"hour"=>$hour,
//             "id"=>$movieId, "seatsPrice"=>$seatPricing,"seatsQuantity"=>$seatQuantity];
//             // unset($_SESSION['cart']);
            
//             header("Location:receipt.php");
          
//         }
//     }
// }
?>

<?php
    include_once 'header.php';
    top_module('Lunardo Cinema');
?>

    <nav>
        <a href=#AboutUs>About Us</a>
        <a href=#Pricing>Price</a>
        <a href=#now-showing>Now Showing</a>
    </nav>

    <main>

        

            <article class='Section' id='AboutUs'>
                <h1 class="Head-font">Welcome to Lunardo!</h1>
                <p class="body-text">
                    <br> Over the course of a few months, Lunardo Cinemas has undergone major renovations and improvements in an all-out effort to create a more welcoming atmosphere for our fellow customers! You might notice the upgraded snack bar now providing all your favorite snacks from chips to crisps! Additionally, Lunardo now boasts top-of-the-line projection and sound systems with: 3D Dolby Vision Projection and Dolby Atmos Sound respectively! <a href="https://www.dolby.com/us/en/cinema">Click here</a> for more information.
                    <br>
                    <br> Check out the new seats and cinema facilities:
                </p>

                <div class="slideshow-container">

                    <!-- Full-width images with number and caption text -->
                    <div class="mySlides fade">
                        <div class="numbertext">1 / 4</div>
                        <img src="../../media/standard.jpg" style="width:100%">
                        <div class="text">New Standard Seating</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">2 / 4</div>
                        <img src="../../media/first.jpg" style="width:100%">
                        <div class="text">New First Class Seating</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">3 / 4</div>
                        <img src="../../media/tech.jpg" style="width:100%">
                        <div class="text">New Technology</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext"> 4 / 4 </div>
                        <img src="../../media/sound.png" style="width:100%">
                        <div class="text">New Sound System</div>
                    </div>

                    <!-- Next and previous buttons -->
                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>
                </div>
                <br>

                <!-- The dots/circles -->
                <div style="text-align:center">
                    <span class="dot" onclick="currentSlide(1)"></span>
                    <span class="dot" onclick="currentSlide(2)"></span>
                    <span class="dot" onclick="currentSlide(3)"></span>
                    <span class="dot" onclick="currentSlide(4)"></span>
                </div>
            </article>
        

        <article class="Section" id='Pricing'>
            <h1 class="Head-font">PRICE</h1>
            <div class="table-column">
                <table class="pricing-column" id="price">
                    <tr>
                        <th class="body-text">Seat Type</th>
                        <th class="body-text">All day Monday and Wednesday AND 12pm on Weekdays</th>
                        <th class="body-text">All other times</th>
                    </tr>

                    <tr class="body-text">
                        <th>Standard Adult</th>
                        <th>14.00</th>
                        <th>19.80</th>
                    </tr>

                    <tr class="body-text">
                        <th>Standard Concession</th>
                        <th>12.50</th>
                        <th>17.50</th>
                    </tr>

                    <tr class="body-text">
                        <th>Standard Child</th>
                        <th>11.00</th>
                        <th>15.30</th>
                    </tr>

                    <tr class="body-text">
                        <th>First Class Adult</th>
                        <th>24.00</th>
                        <th>30.00</th>
                    </tr>

                    <tr class="body-text">
                        <th>First Class Concession</th>
                        <th>22.50</th>
                        <th>27.00</th>
                    </tr>

                    <tr class="body-text">
                        <th>First Class Child</th>
                        <th>21.00</th>
                        <th>24.00</th>
                    </tr>

                </table>
            </div>
        </article>

        <article class="Section" id="now-showing">

            <h1 class="Head-font">NOW SHOWING</h1>

            <div class="movie-show" id="nowshowing-poster">
                <button class="btn btn-secondary btnFeature" role="button" id="moviePanelACT" value="ACT" >
                    <div class='col-lg-3 column'>
                        <img class="movie-poster" src='../../media/avengers.jpg' alt='Avengers Poster'>
                        <h2 class="Head-font">Avengers : End Game</h2>
                        <div class="movie-list">
                            <ul class="body-text">
                                <li> Wednesday - 9pm </li>
                                <li> Thursday - 9pm </li>
                                <li> Friday - 9pm </li>
                                <li> Saturday - 6pm </li>
                                <li> Sunday - 6pm </li>
                            </ul>
                        </div>

                </button>

                <button class="btn btn-secondary btnFeature" role="button" id="moviePanelRMC" value="RMC" >
                    <img class="movie-poster" src='../../media/topendwedding.jpg' alt='Top End Wedding poster'>
                    <h2 class="Head-font">Top End Wedding</h2>

                    <div class="movie-list">
                        <ul class="body-text">
                            <li> Monday - 6pm </li>
                            <li> Tuesday - 6pm </li>
                            <li> Saturday - 3pm </li>
                            <li> Sunday - 3pm </li>
                        </ul>
                    </div>
                </button>

                <button class="btn btn-secondary btnFeature" role="button" id="moviePanelANM" value="ANM" >
                    <img class="movie-poster" src='../../media/dumbo.jpg' alt='Dumbo poster'>
                    <h2 class="Head-font">Dumbo</h2>
                    <div class="movie-list">
                        <ul class="body-text">
                            <li> Monday - 12pm </li>
                            <li> Tuesday - 12pm </li>
                            <li> Wednesday - 6pm </li>
                            <li> Thursday - 6pm </li>
                            <li> Friday - 6pm </li>
                            <li> Saturday - 12pm </li>
                            <li> Sunday - 12pm </li>
                        </ul>
                    </div>
                </button>

                <button class="btn btn-secondary btnFeature" role="button" id="moviePanelAHF"  value="AHF" >
                    <img class="movie-poster" src='../../media/thehappyprince.jpg' alt='The Happy Prince poster'>
                    <h2 class="Head-font">The Happy Prince</h2>
                    <div class="movie-list">
                        <ul class="body-text">
                            <li> Wednesday - 12pm </li>
                            <li> Thursday - 12pm </li>
                            <li> Friday - 12pm </li>
                            <li> Saturday - 9pm </li>
                            <li> Sunday - 9pm </li>
                        </ul>
                    </div>
                </button>
            </div>

        </article>

        <section class="Section" id="synopsis-area">

            <div class="row hiddenClass" id="synopsisACT">
                <div class="col-lg-12">
                    <h1 class="Head-font">AVENGERS : END GAME</h1>
                </div>
                <div class='col-lg-12' id="video">
                    <iframe class="youtube-video" src="https://www.youtube.com/embed/TcMBFSGVi1c"></iframe>
                </div>

                <div class="col-lg-12">

                    <h3 class="body-text">Plot Description:</h3>
                    <p class="body-text"> When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's "dream team" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).</p>

                </div>
                <div>
                    <button class="synopsis-button" type="button" value="ACT-Wed-T21" onClick="selectedBooking(1, 'WED', 'T21')" >Wednesday 21:00</button>
                    <button class="synopsis-button" type="button" value="ACT-Thu-T21" onClick="selectedBooking(1, 'THU','T21')">Thursday 21:00</button>
                    <button class="synopsis-button" type="button" value="ACT-Fri-T21" onClick="selectedBooking(1,'FRI','T21')" >Friday 21:00</button>
                    <button class="synopsis-button" type="button" value="ACT-Sat-T18" onClick="selectedBooking(1,'SAT','T18')" >Saturday 18:00</button>
                    <button class="synopsis-button" type="button" value="ACT-Sun-T18" onClick="selectedBooking(1,'SUN','T18')" >Sunday 18:00</button>
                </div>
            </div>

            <div class="row hiddenClass" id="synopsisRMC">
                <div class="col-lg-12">
                    <h1 class="Head-font">TOP END WEDDING</h1>
                </div>
                <div class='col-lg-12' id="video">
                    <iframe class="youtube-video" src="https://www.youtube.com/embed/uoDBvGF9pPU"></iframe>
                </div>

                <div class="col-lg-12">
                    <h3 class="body-text">Plot Description:</h3>
                    <p class="body-text"> Lauren and Ned have 10 days to find Lauren's mother who has gone AWOL in the remote far north of Australia so that they can reunite her parents and pull off their dream wedding.</p>
                </div>
                <div>
                    <button class="synopsis-button" type="button" value="RMC-Mon-T18" onClick="selectedBooking(2, 'TUE', 'T18')" value="Monday 18:00">Monday 18:00</button>
                    <button class="synopsis-button" type="button" value="RMC-Tue-T18" onClick="selectedBooking(2,'TUE','T18')" value="Tuesday 18:00">Tuesday 18:00</button>
                    <button class="synopsis-button" type="button" value="RMC-Sat-T15" onClick="selectedBooking(2,'SAT','T15')" value="Saturday 15:00">Saturday 15:00</button>
                    <button class="synopsis-button" type="button" value="RMC-Sun-T15" onClick="selectedBooking(2,'SUN','T15')" value="Sunday 15:00">Sunday 15:00</button>
                </div>
            </div>

            <div class="row hiddenClass" id="synopsisANM">
                <div class="col-lg-12">
                    <h1 class="Head-font">DUMBO</h1>
                </div>
                <div class='col-lg-12' id="video">
                    <iframe class="youtube-video" src="https://www.youtube.com/embed/ocWpGdITSR4"></iframe>
                </div>

                <div class="col-lg-12">
                    <h3 class="body-text">Plot Description:</h3>
                    <p class="body-text"> A young circus elephant is born with comically large ears and given the cruel nickname Dumbo. One day at a show, he is taunted by a group of kids, inciting his mother into a rage that gets her locked up. After Dumbo's ears cause an accident that injures many of the other elephants, he is made to dress like a clown and perform dangerous stunts. Everything changes when Dumbo discovers that his enormous ears actually allow him to fly, and he astounds everyone at the circus with his new talent.</p>
                </div>
                <div>
                    <button class="synopsis-button" type="button" value="ANM-Mon-T12" onClick="selectedBooking(3,'MON','T12')" >Monday 12:00</button>
                    <button class="synopsis-button" type="button" value="ANM-Tue-T12" onClick="selectedBooking(3,'TUE','T12')" >Tuesday 12:00</button>
                    <button class="synopsis-button" type="button" value="ANM-Wed-T18" onClick="selectedBooking(3,'WED','T18')" >Wednesday 18:00</button>
                    <button class="synopsis-button" type="button" value="ANM-Thu-T18" onClick="selectedBooking(3,'THU','T18')" >Thursday 18:00</button>
                    <button class="synopsis-button" type="button" value="ANM-Fri-T18" onClick="selectedBooking(3,'FRI','T18')" >Friday 18:00</button>
                    <button class="synopsis-button" type="button" value="ANM-Sat-T12" onClick="selectedBooking(3,'SAT','T12')" >Saturday 12:00</button>
                    <button class="synopsis-button" type="button" value="ANM-Sun-T12" onClick="selectedBooking(3,'SUN','T12')" >Sunday 12:00</button>
                </div>
            </div>

            <div class="row hiddenClass" id="synopsisAHF">
                <div class="col-lg-12">
                    <h1 class="Head-font">THE HAPPY PRINCE</h1>
                </div>
                <div class='col-lg-12' id="video">
                    <iframe class="youtube-video" src="https://www.youtube.com/embed/tXANCJQkUIE"></iframe>
                </div>

                <div class="col-lg-12">

                    <h3 class="body-text">Plot Description:</h3>
                    <p class="body-text"> The Happy Prince by Oscar Wilde is the story of a statue, the Happy Prince, covered with gold and many fine jewels. It sits overlooking the city. One day, a swallow passing through seeks shelter under the statue and discovers the prince is not happy, but sad.</p>

                </div>
                <div>
                    <button class="synopsis-button" type="button" value="AHF-Wed-T12" onClick="selectedBooking(4,'WED','T12)" >Wednesday 12:00</button>
                    <button class="synopsis-button" type="button" value="AHF-Thu-T12" onClick="selectedBooking(4,'THU','T12')" >Thursday 12:00</button>
                    <button class="synopsis-button" type="button" value="AHF-Fri-T12" onClick="selectedBooking(4,'FRI','T12')" >Friday 12:00</button>
                    <button class="synopsis-button" type="button" value="AHF-Sat-T21" onClick="selectedBooking(4,'SAT','T21')" >Saturday 21:00</button>
                    <button class="synopsis-button" type="button" value="AHF-Sun-T21" onClick="selectedBooking(4,'SUN','T21')" >Sunday 21:00</button>
                </div>
            </div>
        </section>
        
        
        <section class="Booking-Form" id="form">
        <!-- https://titan.csit.rmit.edu.au/~e54061/wp/lunardo-formtest.php -->
        <form id="form" action="index.php" method="post" name="booking" style="text-align:100px" onsubmit="return checkForm()">
            <?php echo show_error('hidden'); ?>
            <input type="hidden" id="hidden1" name="day" value="<?php show_spost('movie', 'day'); ?>" >
            <input type="hidden" id="hidden2" name="hour" value="<?php show_spost('movie', 'hour'); ?>">
            <input type="hidden" id="hidden3" name="id" value="<?php show_spost('movie', 'id'); ?>" >
            <p style="font-size: 22px; text-align: center"><span id="id"></span><span id="day"></span><span id="hour"></span></p>
            <div id="form-standardclass">
            <?php echo show_error('seat'); ?>
                <h3> Standard Ticketing </h3> 
                <span> Standard Adult Ticket : </span>
                <select data-price="0" name ='seats[STA]' id='seats-STA' onchange="totalAmount('seats-STA')">
                <option value=" ">Please select</option>
                <?php for ($STA = 1;$STA <= 10;$STA++) echo "<option value=$STA>$STA</option>";
            ?>
                </select>
                <br>

                <span> Standard Concession Ticket : </span>
                <select data-price="0" name ='seats[STP]' id='seats-STP' onchange="totalAmount('seats-STP') ">
                <option value=" ">Please select</option>
                 <?php for ($STP = 1;$STP <= 10;$STP++) echo "<option value=$STP>$STP</option>";
            ?> 
                </select>
                <br>
                
                <span> Standard Child Ticket : </span>
                <select data-price="0" name ='seats[STC]' id='seats-STC' onchange="totalAmount('seats-STC') ">
                <option value=" ">Please select</option>
                <?php for ($STC = 1;$STC <= 10;$STC++) echo "<option value=$STC>$STC</option>";
            ?>
                </select>
                <br>
                
                </div>
                <div id="form-firstclass">
                <?php echo show_error('seat'); ?>
                <h3> First Class Ticketing </h3> 
                <span> First Class Adult Ticket : </span>
                <select data-price="0" name ='seats[FCA]' id='seats-FCA' onchange="totalAmount('seats-FCA') ">
                <option value=" ">Please select</option>
                <?php for ($FCA = 1;$FCA <= 10;$FCA++) echo "<option value=$FCA>$FCA</option>";
            ?>
                </select>
                <br>

                <span> First Class Concession Ticket : </span>
                <select data-price="0" name ='seats[FCP]' id='seats-FCP' onchange="totalAmount('seats-FCP') ">
                <option value=" ">Please select</option>
                 <?php for ($FCP = 1;$FCP <= 10;$FCP++) echo "<option value=$FCP>$FCP</option>";
            ?> 
                </select>
                <br>
                
                <span> First Class Child Ticket : </span>
                <select data-price="0" name ='seats[FCC]' id='seats-FCC' onchange="totalAmount('seats-FCC') ">
                <option value=" ">Please select</option>
                <?php for ($FCC = 1;$FCC <= 10;$FCC++) echo "<option value=$FCC>$FCC</option>";
            ?>
                </select>
                <br>
                </div>

                <div id="form-standard">
                    <label for="contact-name">Name: </label>
                    <input type="text" class="namel" id="name" name="name" placeholder="Enter name">
                    <span class="error"><?php echo $nameErr; ?></span>

                    <br> 

                    <div class="form-group">
                    <label for="contact-phone">Mobile: </label>
                    <input type="text" class="form-control" id="phone" name="phone" maxlength="10" pattern='^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$' title="Valid Australian Number only "placeholder="Ex: 0412345678">
                    <span class="error"><?php echo $phoneErr;; ?>
                    </div>

                    <label for="contact-email">Email address: </label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email">
                    <span class="error"><?php echo $emailErr; ?></span>
                    <br> 


                    <label>Credit Card:</label>
                    <input type="text" id="card" name="card" minlength="14" maxlength="19" oninput="checkCard()" placeholder="0000-0000-0000-0000">
                    <span class="error"><?php echo $cardErr; ?></span>

                    <img src="../../media/visa.png" alt="visa" width="25" height="25" id="visa" style="visibility:hidden">
                    <br> 
                    
                    <label>Expiry Date: 
                    <select name="mm" class="date" id="mm" >
                        <option value="01" selected>01</option>
                        <option value="02" >02</option>
                        <option value="03" >03</option>
                        <option value="04" >04</option>
                        <option value="05" >05</option>
                        <option value="06" >06</option>
                        <option value="07" >07</option>
                        <option value="08" >08</option>
                        <option value="09" >09</option>
                        <option value="10" >10</option>
                        <option value="11" >11</option>
                        <option value="12" >12</option>
                    </select>

                    <select name="yy" class="date" id="yy" required value="<?php show_spost('cust', 'expiry'); ?>">>
                        <option value="2019" selected>2019</option>
                        <option value="2020" >2020</option>
                        <option value="2021" >2021</option>
                        <option value="2022" >2022</option>
                        <option value="2023" >2023</option>
                        <option value="2024" >2024</option>
                        <option value="2025" >2025</option>
                    </select>
                    
                    <span class="error">
                    <?php echo $mmErr; echo $yyErr; ?></span>
                    </label>
                    <br>
                    <br>
                    <div class="total">
                    <td style="text-align:left; width: 300px; padding-left: 5em">
                        <label>Total $</label>
                        <input style="width: 150px; margin-left: 0.8em" type="text" name="total" id="demo" step=".01" readonly>
                    </td>
                    <br>
                    <b>Includes GST : </b><output name="GST" id="GST" value=" " style="margin-left:150px"></output>
                    </div>
                    <input type="submit" name="order" value="Submit">
                </form>
            </div>
            
        </section>

    </main>

<?php include_once "footer.php"; ?>
            