
function fmtTime(time)
{
    if (!time)
    {
        return "-";
    }
    var str = "" + time["hour"] + ":";
    var minStr = "" + time["minute"];
    if (minStr.length == 1)
    {
        minStr = "0" + minStr;
    }
    return str + minStr;
}

function drawMap(id, json)
{
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById(id), {
      zoom: 6,
      center: {lat: 49, lng: 17},
      //center: uluru
    });

    var poly = [];
    for (var i = 0; i < json["route"].length; i++)
    {
        var stop = json["route"][i];
        var long = stop["longitude"];
        var lat = stop["latitude"];

        if (long && lat && stop["stop_id"] != 380451)
        {
            poly.push({lat:lat, lng:long});
            if (stop["stops"])
            {
                console.log("Drawing");
                console.log(stop);
                /*var cityCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                    fillColor: '#FF0000',
                    fillOpacity: 1,
                    map: map,
                    center: {lat:lat, lng:long},
                    radius: 100
                });*/
                contentString = "<div class='info-station-name'><a title='View station' href='#' class='stop-link' data-stop-id='" + stop["stop_id"] + "'>" + stop["name"] + "</a></div>";
                contentString += "<div class='info-station-time'>" + fmtTime(stop["arrival"]) + " / " + fmtTime(stop["departure"]) + "</div>";

                var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

                var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(lat,long),
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillOpacity: 0.8,
                    fillColor: '#ff0000',
                    strokeOpacity: 1.0,
                    // strokeColor: '#fff000',
                    strokeWeight: 1.0,
                    scale: 8 //pixels
                },
                  map: map
                });

                (function(m, i) {
                m.addListener('click', function() {
                  i.open(map, m);
                });
            } )(marker, infowindow);
            }
        }
    }

    var path = new google.maps.Polyline({
      path: poly,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    path.setMap(map);

    /*
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
  });*/


}

function drawStation(id, json)
{
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById(id), {
        zoom: 10,
        center: {lat: json.coords.lat, lng: json.coords.long},
        //center: uluru
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(json.coords.lat, json.coords.long),
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 0.8,
            fillColor: '#ff0000',
            strokeOpacity: 1.0,
            // strokeColor: '#fff000',
            strokeWeight: 1.0,
            scale: 10 //pixels
        },
        map: map
    });

    /*
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
  });*/


}


    /*

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {lat: 0, lng: -180},
        mapTypeId: 'terrain'
      });

      var flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
    }
    */
