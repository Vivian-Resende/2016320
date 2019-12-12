var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//this code get the latitude and longitude
function getLocation(){
  navigator.geolocation.getCurrentPosition(geoCallback, onError)
  }
  
  function geoCallback(position){
      console.log(position);

      var lat = position.coords.latitude;
      var long = position.coords.longitude

      document.getElementById('position').innerHTML = lat + "," + long;

      updateMap(lat, long);
  }
  //I tried to get this code to show the map
  function initMap() {
    var cct = {lat: 53.3574136, lng: -6.2531001};
    var map = new google.maps.Map(document.getElementById("map"), {  zoom: 4,
            center: cct
          }
        );
        var marker = new google.maps.Marker({
            position: cct,
            map: map
        });    
    }
//my position in the map
function updateMap(latitude, longitude){
    var location = {lat: latitude, long: longitude};
    var map = new google.maps.Map(document.getElementById("map"), {  zoom: 4,
        center: location
      }
    );
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });    
}

    //this code put the city, country, date and time on the app screen
      window.onload = function(){
  // function openCageApi(){
      var http = new XMLHttpRequest();
      const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.357293899999995+-6.253085&key=4bd0dc4467e74c70ae06f55f0bc87f06';
      http.open("GET", url);
      http.send();
      http.onreadystatechange = (e) => {
      var response = http.responseText;
      var responseJSON = JSON.parse(response); 
         
          console.log(response);
          console.log(responseJSON);

          document.getElementById('pos').innerHTML = responseJSON.results[0].components.country;
          document.getElementById('pos1').innerHTML = responseJSON.results[0].components.city;
          document.getElementById('pos2').innerHTML = responseJSON.timestamp.created_http;

      }
  }

  //this code show the city, temperature and how is the weather outside
  function getWeather(){
      var http = new XMLHttpRequest();
      const url = 'https://api.darksky.net/forecast/acb54a97d13768c699e433257fb18659/53.357293899999995,-6.253085';
      http.open("GET", url);
      http.send();
      http.onreadystatechange = (e) => {
          var response = http.responseText;
          var responseJSON = JSON.parse(response); 
         
          console.log(response);
          console.log(responseJSON);

          document.getElementById("timezone").innerHTML = responseJSON.timezone;
          document.getElementById("current-temperature").innerHTML = farenheitToCelsius(responseJSON.currently.temperature) + "C";
          document.getElementById("summary").innerHTML = responseJSON.currently.summary;
         document.getElementById("icon").innerHTML = responseJSON.currently.icon;
        
          //daily.data.summary;
      //    var country = responseJSON.resu (property) InnerHTML.innerHTML: string 
    //  weatherIcon.src = weatherImages[object.currently.icon];
   //  temperature.innerHTML = farenheitToCelsius(responseJSON.currently.temperature) + " C" + " / " + responseJSON.currently.temperature + " F";
      }
  }
  function farenheitToCelsius(k) {
      return Math.round((k - 32) * 0.5556 );
  }
 
        //to save read and write files
            function tryingFile() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
            
            }
            
            function fileSystemCallback(fs) {
            
         //   for (var i =0, fileToCreate; fileToCreate = files[i]; ++i)
            // Name of the file I want to create
            var fileToCreate = "newPersistentFile.txt";
            //    var fileToCreate = "weather.txt";
            // Opening/creating the file
            fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
            }


            var fileSystemOptionals = { create: true, exclusive: false };
            
          function getFileCallback(fileEntry) {
            
          var text = document.getElementById("in").value;  
            var currentLocation =  document.getElementById("timezone").innerHTML;
            var currentSummary =  document.getElementById("summary").innerHTML; 
            var currentTemperature = document.getElementById("current-temperature").innerHTML;
            var dateOfVisit = document.getElementById('pos2').innerHTML;
            
     //       var dataObj= new Blob([text], { type: 'text/html' });
        
            var dataObj = new Blob([JSON.stringify(currentLocation), JSON.stringify(currentSummary), JSON.stringify(currentTemperature),JSON.stringify(dateOfVisit), text], { type: 'aplication/json'}, { type: "image/jpeg" }, { type: 'text/html' });
            //var dataObj1 = new Blob([JSON.stringify(currentSummary)], { type: 'aplication/json' });    
           

            // Now decide what to do
            // Write to the file
            writeFile(fileEntry, dataObj);
           //appendFile(fileEntry, dataObj1);
            
            // Or read the file
            readFile(fileEntry);
            }
          
            // Let&#39;s write some files
            function writeFile(fileEntry, dataObj) {
            
            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function (fileWriter) {
            
            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {
                dataObj= new Blob(['Hello'], { type: 'text/html' });
                    }
        fileWriter.write(dataObj);
    
        fileWriter.onwriteend = function() {
                console.log("Successful file write...");
            if (dataObj.type == "image/jpeg") {
                readBinaryFile(fileEntry);
    }
            else {
        readFile(fileEntry);
}
            };
    
    fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };
                //fileWriter.write(dataObj);
        });
    }
    
    // Let&#39;s read some files
    function readFile(fileEntry) {
    
    // Get the file from the file entry
    fileEntry.file(function (file) {
    
    // Create the reader
    var reader = new FileReader();
     reader.readAsText(file);
    //    reader.readAsArrayBuffer(file);
  
    reader.onloadend = function() {
    
                console.log("Successful file read: " + this.result)
;
                console.log("file path: " + fileEntry.fullPath);
                
                document.getElementById("content").innerHTML = this.result;

               
            };
               reader.readAsArrayBuffer(file); 
        }, onError);
    }
    
    function onError(msg) {
        console.log(msg);
    }

function takePics(){
        navigator.camera.getPicture(cameraCallback, onError, {destinationType: Camera.DestinationType.FILE_URI});
    
    }

function pics(){
        navigator.camera.getPicture(cameraCallback, onError, {destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
        }
        function cameraCallback(imageData) {
        var image = document.getElementById("myImage");
        image.src = imageData;
        }
        function onError(msg){
            alert(msg);
        }

    //getting JSON through the API key and loading to the screen
    function display(){
      var to = document.getElementById('To');
      var from = document.getElementById('From');
      var http = new XMLHttpRequest();
      http.onreadystatechange=function() {
          if(http.readyState==4 && http.status==200){
              var obj = JSON.parse(this.responseText);
              var options='';
              for(key in obj.rates){
                  options=options+ '<option>'+key+'</option>';
              }
              to.innerHTML=options;
              from.innerHTML=options;
          }
      }
      http.open('GET','http://data.fixer.io/api/latest?access_key=e0af55b4352d21ec13e608a245c76489', true) //API KEY
      http.send();
  }
  
   // converting the currencies from and to elements using the API key
  function convert(){
      var to = document.getElementById('To').value;
      var from = document.getElementById('From').value;
      var amount = document.getElementById('amount').value;
      var xHttp = new XMLHttpRequest();
          xHttp.onreadystatechange=function(){
              if(xHttp.readyState==4 && xHttp.status==200){
                  var obj = JSON.parse(this.responseText);
                  var el= obj.rates[to];
                  var el2= obj.rates[from];
                  if(el && el2!= undefined){
                      result = parseFloat(amount)*parseFloat(el)/parseFloat(el2);
                  }
              }
          }
          xHttp.open('GET', 'http://data.fixer.io/api/latest?access_key=e0af55b4352d21ec13e608a245c76489&base'+from+'&symbols'+to, true);//api key
          xHttp.send();
  }
  
  function Result(){
      document.getElementById("print").innerHTML = '<b> Convertion Result: </b> '+ result;
  } 

  //dialog alert box 
  function alertDismissed(){

        alert("Bye!");
    }

    function dialogAlert(){
       navigator.notification.alert('Welcome!', alertDismissed, 'welcome','done');
    }

    //show the how many contacts on the phone
    function seeContacts(){
       
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id];
     //   fields = ["displayName"];
        var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccess, onError, options);
    
        function onSuccess(contacts){
      
       //     for(var i = 0; i < contacts.length; i++){
        //        alert("Found = "  + contacts[i].fields);
          alert("Found = "  + contacts.length + ' contacts.' );
     //   }
     //   var elem = document.getElementById('divID');
      //  elem.innerHTML = "<table>" + th + tr + "</table>";
    }
        function onError(message){
            alert('onError' + message);
        }
    
    }
    //show informations about the device
    function aboutDevice(){

        alert("Device model:" + device.model + "\n" +
        "Device plataform:" + device.platform + "\n" +
        "Device UUID:" + device.uuid + "\n" +
        "Device version:" + device.version);
    }

    //language used
    function getLanguage(){
        navigator.globalization.getPreferredLanguage(onSuccess, onError);

        function onSuccess(language){
            alert('language:' + language.value + '\n');
        }
        function onError(){
            alert('onError');
        }
    }

    //show date
    function getDate(){

        var date = new Date();
        var options = {
            formatLength: 'short',
            selector: 'date and time'
        }
        navigator.globalization.dateToString(date, onSuccess, onError, options);

        function onSuccess(date){
            alert('date:' + date.value);
        }
        function onError(){
            alert('onError');
        }
    }

   


            function fileSystem(){
        window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, fileSystemCallback, onError);
            } 
             function fileSystemCallback(fs) {
            var fileToCreate = "newPersistentFile.txt";
            //    var fileToCreate = "weather.txt";
            // Opening/creating the file
            fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
         

            console.log('file system open: ' + fs.name);
            getSampleFile(fs.root);
        
            }

        function saveFile(dirEntry, fileData, fileName) {

            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
        
                writeFile(fileEntry, fileData);
        
            });
        }

        function writeFile(fileEntry, dataObj, isAppend) {

            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function (fileWriter) {
        
                fileWriter.onwriteend = function() {
                    console.log("Successful file write...");
                    if (dataObj.type == "image/png") {
                        readBinaryFile(fileEntry);
                    }
                    else {
                        readFile(fileEntry);
                    }
                };
        
                fileWriter.onerror = function(e) {
                    console.log("Failed file write: " + e.toString());
                };
        
                fileWriter.write(dataObj);
            });
        }

        function readBinaryFile(fileEntry) {

            fileEntry.file(function (file) {
                var reader = new FileReader();
        
                reader.onloadend = function() {
        
                    console.log("Successful file write: " + this.result);
                    console.log(fileEntry.fullPath + ": " + this.result);
        
                    var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
                  //  displayImage(blob);
                };
        
                reader.readAsArrayBuffer(file);
        
            });
        }

        function displayImage(blob) {

            // Displays image if result is a valid DOM string for an image.
            var elem = document.getElementById('imageFile');
            // Note: Use window.URL.revokeObjectURL when finished with image.
            var objURL = window.URL.createObjectURL(blob);
            elem.src = objURL;
        }

        function displayImageByFileURL(fileEntry) {
            var elem = document.getElementById('imageFile');
            elem.src = fileEntry.toURL();
        }


        function validateForm() {
            var x = document.forms["myForm"]["fname"].value;
            if (x == "") {
              alert("Name must be filled out");
              return false;
            }
          }

         