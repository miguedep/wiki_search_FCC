var x;
var loadWiki = function(value){
      // URL using Wikipedia's API. Value = user's search
      var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=2&exlimit=10&exintro=1&explaintext=1&gsrsearch="+value+"&gsroffset=2&gsrinterwiki=1";
      // connect to Wikipedia's API. It Uses jsonp because CORS
      $.ajax({
         type: 'GET',
         url: url,
         data: null,
         dataType: 'jsonp',
         success: function(response) {
            //Alerts If no results from Wikipedia. Reset input form
            if(!response.query){
               var z = $("input").val();
               $("input").val("");
               $('.input-group-btn button span').removeClass('glyphicon-refresh').addClass('glyphicon-search');
               $("#results").append("<li><h2>Sorry, no results for '"+z+"'. Please, try another search</h2></li>");
            }
            // loop through the object and create a li with the title and extract of each element of the object
            console.log(response.query.pages);
            var obj = response.query.pages;
            for (var re in obj){
               x = obj[re];
               console.log(x);
               $("#results").append("<a href='https://en.wikipedia.org/?curid="+x.pageid+"' target='_blank'><li><h2>"+x.title+"<span id='wikilink'>Link to Wikipedia <span class='glyphicon glyphicon-globe'></span></span></h2><h3>"+x.extract+"</h3></li></a>");
            }
            // Make visible "link to Wikipedia when hover over an element (li)
            $("li").hover(function(){
               $(this).addClass("visible");
            }, function(){
               $(this).removeClass("visible");
            });
         },
         error: function(request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' with message: ' + errorMessage);

         },
         timeout: 3000,
         // changes icon from search to refresh during the response of Wikipedia's API
         beforeSend: function() {
            $('.input-group-btn button span').removeClass('glyphicon-search').addClass('glyphicon-refresh');
            console.log("loading....");
         },
         complete: function() {
            $('.input-group-btn button span').removeClass('glyphicon-refresh').addClass('glyphicon-search');
            console.log("Complete...");
         }
      });
};

$(document).ready(function() {
   $('form').on('submit', function(event) {
      event.preventDefault();
      $("#results").html("");
      //replace "spaces" for "+" in the user search
      var value = $('input').val();
      value = value.replace(/\s/g, '+');
      $('.ticket').html(value);
      loadWiki(value);
   });
});
