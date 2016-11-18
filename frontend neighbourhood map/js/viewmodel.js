var viewmodel = function(){
    //stores all the information like database

        var map;

      var markers = [];

    var obserInfo = ko.observableArray([
          {title: 'New delhi', location: {lat: 28.613939, lng: 77.209021} ,wiki: ' '},
          {title: 'Agra', location: {lat: 27.176670, lng: 78.008075},wiki: ' '},
          {title: 'Noida', location: {lat: 28.535516, lng: 77.391026},wiki: ' '},
          {title: 'Gurgaon', location: {lat: 28.459497, lng: 77.026638},wiki: ' '},
          {title: 'Gaziabad', location: {lat: 28.669156, lng: 77.453758},wiki: ' '},
          {title: 'Faridabad', location: {lat: 28.408912, lng: 77.317789},wiki: ' '}
        ]);

    console.log(obserInfo);
    //Stores all the marking position useful in tagging positions
    var initMap = function(){
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 28.613939, lng: 77.209021},
          zoom: 11,
          mapTypeControl: false
        });

        var largeInfowindow = new google.maps.InfoWindow();

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < obserInfo().length; i++) {
          // Get the position from the location array.
          var position = obserInfo()[i].location;
          var title = obserInfo()[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
           populateInfoWindow(this, largeInfowindow);
          });
        }
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      };

      initMap();

   //Fetch info from wiki pages using jsonp
 var initWikiInfo = function(){
      // load wikipedia data

  for (var i = 0 ; i < obserInfo().length ; i++){
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + obserInfo()[i].title + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        //$wikiElem.text("failed to get wikipedia resources");
   // }, 8000);
    });
      $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            //console.log(info[].title);
            var articleList = response[2];
            //console.log(articleList[0]);
            //$("#container").val(articleList[0]);
            //var table = info[i].title;
            //console.log(table);
             //val.wiki = articleList[0];
            clearTimeout(wikiRequestTimeout);
        }
    });
    //info[i].wiki = $("#container").val();
  }
};
initWikiInfo();

//initMap();
};

//Binding values for knockout library
ko.applyBindings(new viewmodel());
