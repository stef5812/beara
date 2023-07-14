//Functions run on loading of html

  //Preloader
  $(window).on('load', function () {
    
    if ($('#preloader').length) {
      $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });
  
  //trigger Main loader

  document.addEventListener('DOMContentLoaded', () => {
    //get the current location using geolocation
    //console.log("Just checking");
    //showPosition();
    getLocation();

    //getLatLon();
    //getLatLonB();
    readTextFile("libs/data/RestauData.csv");

    //console.log(OPArray);
    //CSVToArray(csvOPData, ",");

    //L.control.locate(position).addTo(map);

    //L.marker([52.9, -8.49], {icon: greenIcon}).addTo(map); 

    L.control.loading().addTo(myMap);

    map.closePopup();       
  });





  function showHideTooltip()
  {
          var mytooltip = this.getTooltip();
          if(this.isPopupOpen())
          {      
              // Popup is open, set opacity to 0 (invisible)
              mytooltip.setOpacity(0.0);
          }
          else
          {
              // Popup is cosed, set opacity back to visible
              mytooltip.setOpacity(0.9);
          }
  }
  
  function clickHideTooltip()
  {
          var mytooltip = this.getTooltip();
          mytooltip.setOpacity(0.0);
  }
  //vol retreive data
  
  

  //gLobal variables set 
  var varTooltip = '';

  var extraText = 'There can be more text added to these boxes, at the moment i havent added any <br><br>It might be useful just to give more details befor ea link to the OP or vol themselves';

  var FNresult = '';
  var LNresult = '';
  var EIRresult = '';
  var Status = '';
  var coCode = '';

  var Address = '';
  var varX = '';
  var varY = '';

  var OPdropdown = '';
  var VOLdropdown = '';
  var HOSPdropdown = '';

  var Visit = '';
    
  var Addr1 = '';
  var Addr2 = '';
  var Addr3 = '';
  var SetCountryCode = 'IE';
  var csvOPData = '';
  var strDelimiter = '';

  var globCurLat = '';
  var globCurLng = '';


  //Function to get users location if allowed
  async function getLocation() {
    //console.log("stefan10");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }else{
        console.warn("Can't geolocate!");
        //this would be a good place to fall back on geolocation by IP (AJAX necessary)
      }

  }

  //setting up other onload options
  function showPosition(position) {
    //check return, add to input text for future use
    curLat = position.coords.latitude;
    $('#inpLat').val(curLat);
    console.log('Latitude: ' + curLat);
    console.log($('#inpLat').val())

    //check return, add to input text for future use
    curLng = position.coords.longitude;
    $('#inpLng').val(curLng);
    console.log('Longitude: ' + curLng);
    console.log($('#inpLng').val())
  }

