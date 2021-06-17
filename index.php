
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Faznet Service Provider">
    <meta title="Fibre Coverage in your Area">
    <meta name="description" content="Check fibre coverage in your area at lowest price from R399/pm">
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/loader.css">
    <link rel="stylesheet" href="style/modal.css">
    <script src="ajax/json.js"></script> 
    
    <title>Check Fibre Coverage | Faznet</title>
</head>
<body>
    <div class="fixed_background"></div>

    <div id="loader"><div class="lds-ripple"><div></div><div></div></div></div>
 <!-- Modal -->

 <a class="link-1" id="myBtn" >Open Modal</a>

<div class="modal-container" id="myModal">
  <div class="modal">

    <div class="modal__details">
      <h1 class="modal__title">Fibre Coverage</h1>
      <p class="modal__description" id="fibrecheck"></p>
    </div>

    <p class="modal__text">Select any Network provider you prefer below</p>
    <div class="card-container">
    </div>
    

    <a class="link-2 close"></a>

  </div>
</div>



    <!-- Modal Ends -->
    <div class="container">
        <div class="header">
         <h1>Faznet</h1>
         <p>Unit 1 - Highfield 80 Grant Avenue Norwood 2192 | 0871523871</p>
        </div>
        <div class="content">
      
            <div class="rows">
                <div class="column-1">
                <h2>Check fibre coverage in your area</h2>
            <p>When you start typing your address, an autocomplete list will appear at the bottom where you can just select your address so that you can find out if the area has fibre. </p>
                </div>
                <div class="column-2">
                    <h3>Fibre Availability Check</h3>
                    <span class="blue-color">Available</span>
                    <span class="white-color">Not Available</span>
                </div>
            </div>
            <div class="rows-2">
                <?php
                require_once 'API/require_class.php';
                $api = new api();
                $session = new Session();
                $session->getSession();
                ?>
            
            <script src="ajax/ajax.js" id="fibrescript"></script> 
           
            </div>
            
          
            
        </div>
    </div>
    <div class="contactUs">
                <h2>Contact Faznet</h2>
                <p>Address: <strong>Unit 1 - Highfield 80 Grant Avenue Norwood 2192</strong></p>
                <p>Phone: <strong>0871523871</strong></p>
           
                <p>Email: <strong><a href="mailto:enquiries@faznet.co.za">enquiries@faznet.co.za</a></strong></p>
                <p>Business Hours: <strong>9:00am - 5:00pm support only</strong></p>
           
            </div>

    <footer id="footer">
        <a href="http://facebook.com/faznetZA"><img src="" alt="Faznet" srcset="">Facebook</a>
        <p>Copyright © Faznet 2021</p>
    </footer>

       
</body>
<script src="ajax/modal.js"></script>
</html>

