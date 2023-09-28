var iRecords = 0;

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
            

                const [keys, ...rest] = allText.trim().split('\n').map((item) => item.split(','))
    
                const formedArr = rest.map((item) => {
                    const object = {}
                    keys.forEach((key, index) => object[key] = item.at(index))
                    console.log(object);
                    var result = getFields(object, "Colour"); // returns [ 1, 3, 5 ]
                    console.log(result);
                    iRecords = iRecords + 1;
                    return object
                })
                console.log(iRecords);

                //go through the array, get lat, lon and add to map
                //let result = '';
                var coCode = '';
                FNresult = '';
                SNresult = '';
                Visit = '';                
                
                let i = 0;
                
                do {                                    
                    rColour = getFields(formedArr, "Colour");
                    rName = getFields(formedArr, "Name");
                    rCounty = getFields(formedArr, "County");
                    rLat = getFields(formedArr, "Lat");
                    rLon = getFields(formedArr, "Lon");
                    rphone = getFields(formedArr, "Phone");
                    rLink = getFields(formedArr, "Link");
                    rImage = getFields(formedArr, "Image");

                    rTown = getFields(formedArr, "Town");
                    rEircode = getFields(formedArr, "Eircode");
                    rWhat = getFields(formedArr, "What");

                    var thisLat = (rLat[i]);
                    var thisLng = (rLon[i]);

                                                                          

                    // if (rImage[i] !== null) {
                    //     var myShadow = "<div style='border:0; width:209px; height:109px; overflow:hidden;'><img src='libs/images/image.jpg' width=209 height=109></img><img style='position:relative; left: 0px; top: -159px;' src='libs/images/" + rImage[i] + "' width=200 height=100></div>";
                    //     DetailsBox += "<br>" + myShadow;
                    // }  ;                    
                    
                    // specify popup options 
                    var restauOptions =
                        {
                        'maxWidth': '400',
                        'width': '200',
                        'className' : 'restau-popup'
                        } 
                        
                    var localOptions =
                        {
                        'maxWidth': '400',
                        'width': '200',
                        'className' : 'local-popup'
                        } 
                        
                    var visitOptions =
                        {
                        'maxWidth': '400',
                        'width': '200',
                        'className' : 'visit-popup'
                        } 
                        
                    var passOptions =
                        {
                        'maxWidth': '400',
                        'width': '200',
                        'className' : 'pass-popup'
                        }  
                    var accomOptions =
                        {
                        'maxWidth': '400',
                        'width': '200',
                        'className' : 'pass-popup'
                        }                                                

                    //var myRestauData = "<div class='weathertitle'>Weather for : <br>" + $('#capitalCity').val() + '</div>';  
                    var sPin                                   

                    switch(rColour[i]) {
                        case "R":
                            var RestauMarker = L.marker([thisLat, thisLng], {icon: RestauIcon}).addTo(placeRestau);
                            var markerPopup = RestauMarker.bindPopup(DetailsBox, restauOptions)
                            sPin="pin-restau.png";
                            break
                        case "G":
                            var RestauMarker = L.marker([thisLat, thisLng], {icon: LocalIntIcon}).addTo(placeLocal);
                            var markerPopup = RestauMarker.bindPopup(DetailsBox, localOptions)
                            sPin="pin-local.png";
                            break
                        case "T":
                            var RestauMarker = L.marker([thisLat, thisLng], {icon: ToVisitIcon}).addTo(PLaceToVisit);
                            var markerPopup = RestauMarker.bindPopup(DetailsBox, visitOptions)
                            sPin="pin-tovisit.png";
                            break
                        case "P":
                            var RestauMarker = L.marker([thisLat, thisLng], {icon: PassesIcon}).addTo(placePass);
                            var markerPopup = RestauMarker.bindPopup(DetailsBox, passOptions)
                            sPin="pin-passes.png";
                            break
                        case "A":
                            var RestauMarker = L.marker([thisLat, thisLng], {icon: AccomIcon}).addTo(Accom);
                            var markerPopup = RestauMarker.bindPopup(DetailsBox, accomOptions)
                            sPin="pin-accom.png";
                            break                            
                    }
                    var DetailsBox = "";
                    if (rLink[i] !== null) {
                        DetailsBox += "<br><a href='" + rLink[i] + "' target='_blank'><img src='libs/icons/"+sPin+ "' style='width:40px;height:60px;'></a><br>"; //Image
                    } else {
                        DetailsBox += "<br><img src='libs/icons/pin-restau.png' style='width:40px;height:60px;'><br>"; //Image
                    }; 
                    DetailsBox += "Name : " + rName[i];                    
                    if (rWhat[i] !== null) {
                        DetailsBox += "<br>What : " + rWhat[i];
                    };
                    if (rTown[i] !== null) {
                        DetailsBox += "<br>Town : " + rTown[i];
                    };
                    if (rCounty[i] !== null) {
                        DetailsBox += "<br>County : " + rCounty[i];
                    };
                    if (rEircode[i] !== null) {
                        DetailsBox += "<br>Eircode : " + rEircode[i];
                    }  ;                     
                    if (rphone[i] !== null) {
                        DetailsBox += "<br>Phone : " + rphone[i];
                    }  ;                     
                
                //marker.bindPopup(popup).openPopup();                    

                    
                    varTooltip = rName[i]
                    markerPopup = RestauMarker.bindTooltip(varTooltip);
                    markerPopup = RestauMarker.on('mouseover', showHideTooltip);
                    //markerPopup.addTo(map)

                    i = i + 1; 
                    
                    console.log(iRecords);
                } while (i < iRecords);

                //var FNresult = getFields(formedArr, "First Name"); // returns [ 1, 3, 5 ]
                //console.log(iRecords + "counted");
                //console.log(result[0]);
                return formedArr;                         
                      
            }
        }
    }
    rawFile.send(null);
}

function getFields(input, field) {
    var output = [];
    for (var i=0; i < input.length ; ++i)
        output.push(input[i][field]);
    return output;
}

function getLatLonf(curCCode, FNresult, LNresult,Status){
        var strSearch = curCCode.toString();
        //console.log(strSearch + "mark");
        $.ajax({
        url: "libs/php/getLocB.php",
        async: true,
        dataType: 'json',
        data: {
            ECode: strSearch,
        },         
        success: function (data) {

      
      var VOLDatashow =
      {
        'maxWidth': '400',
        'className' : 'VOL-popup'
      }        

            //console.log("success");
            var thisLat = (data['data']['results']['0']['geometry']['location']['lat']);
            var thisLng = (data['data']['results']['0']['geometry']['location']['lng']);

        //set the variables
      //console.log(JSON.stringify(data)); 
      switch(Status){
        case "Active":
            VOLIcon = L.icon({
                iconUrl: 'libs/icons/VOLicon-active.png',
                iconSize: [40, 60],
              //    iconAnchor: [22, 94],
              //    popupAnchor: [-3, -76],
              //    shadowUrl: 'my-icon-shadow.png',
              //    shadowSize: [68, 95],
              //    shadowAnchor: [22, 94]
              });   
              var VOLmarker = L.marker([thisLat, thisLng], {icon: VOLIcon}).addTo(VolAMarkers)
            break;

        case "Fully trained/Awaiting checks":
            VOLIcon = L.icon({
                iconUrl: 'libs/icons/VOLicon-L.png',
                iconSize: [40, 60],
              //    iconAnchor: [22, 94],
              //    popupAnchor: [-3, -76],
              //    shadowUrl: 'my-icon-shadow.png',
              //    shadowSize: [68, 95],
              //    shadowAnchor: [22, 94]
              });          
              var VOLmarker = L.marker([thisLat, thisLng], {icon: VOLIcon}).addTo(VolLMarkers)           
            break;
        default:
            VOLIcon = L.icon({
                iconUrl: 'libs/icons/VOLicon.png',
                iconSize: [40, 60],
              //    iconAnchor: [22, 94],
              //    popupAnchor: [-3, -76],
              //    shadowUrl: 'my-icon-shadow.png',
              //    shadowSize: [68, 95],
              //    shadowAnchor: [22, 94]
              });   
              var VOLmarker = L.marker([thisLat, thisLng], {icon: VOLIcon}).addTo(VolTBMMarkers) 
              break;                    
    }             
  

            //var markerPopup = OPmarker.bindPopup('Vol Name : ' + FNresult + " " + LNresult, VOLData)
            var markerPopup = VOLmarker.bindPopup('Name : ' + FNresult+ ' ' + LNresult + ":<br><br>Status : " + Status + "<br><br>" + extraText,VOLDatashow)
            markerPopup = VOLmarker.bindTooltip(FNresult + ' ' + LNresult);
            markerPopup = VOLmarker.on('mouseover', showHideTooltip);            
            //markerPopup.addTo(map)          
  
            //console.log(data);
          }
      });      
}

function getLatLonB(curCCode){
    //console.log(curCCode + "mark");
    $.ajax({
        url: "libs/php/getLocB.php",
        async: true,
        dataType: 'json',
      data: {
          coCode: curCCode,
      },       
        success: function (data) {
          //console.log("success");
          //console.log(data.latitude);
          //console.log(data.longitude);

          var OPmarker = L.marker([data.latitude, data.longitude], {icon: myIcon}).addTo(map)
          var markerPopup = OPmarker.bindPopup('OP1, OP Address ' + OPmarker.getLatLng()).openPopup()
          markerPopup.addTo(map)          

          //console.log(data);
        }
      }); 
  }

  function customTip(ShortTip) {
    this.unbindTooltip();
    if(!this.isPopupOpen()) this.bindTooltip(ShortTip).openTooltip();
  }

  function customPop() {
      this.unbindTooltip();
  }