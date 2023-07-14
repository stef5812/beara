function getBearaData(myToken, myInstanceUrl) {
    getData(myToken, myInstanceUrl);
  }
  
  function getData(SFToken, instanceSFUrl) {
    var myNewToken = SFToken.toString();
    var myNewInstanceUrl = instanceSFUrl.toString();
  
    $.ajax({
      url: "libs/php/getSFData.php",
      async: true,
      dataType: 'json',
      data: {
        myNewSFToken: myNewToken,
        myNewSFinstanceUrl: myNewInstanceUrl,
      },
      success: function (data) {
        console.log(data);
  
        // Process the data further as needed
        // For example, you can iterate through the results and access specific fields
        for (var i = 0; i < data.records.length; i++) {
          var record = data.records[i];
          var accountName = record.Name;
          console.log("Account Name: " + accountName);
        }
      },
      error: function(xhr, status, error) {
        console.error("API request error:", error);
        console.log(xhr.responseText);
      }
    });
  }