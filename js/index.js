var x;
var wikisearch = {
   loadWiki: function(value){
      var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=2&exlimit=10&exintro=1&explaintext=1&gsrsearch="+value+"&gsroffset=2&gsrinterwiki=1";
      $.ajax({
         type: 'GET',
         url: url,
         data: null,
         dataType: 'jsonp',
         success: function(response) {
            if(!response.query){
               var z = $("input").val();
               $("input").val("");
               $('.input-group-btn button span').removeClass('glyphicon-refresh').addClass('glyphicon-search');
               $("#results").append("<li><h2>Sorry, no results for '"+z+"'. Please, try another search</h2></li>");
            }

            console.log(response.query.pages);
            var obj = response.query.pages;
            for (var re in obj){
               x = obj[re];
               console.log(x);
               $("#results").append("<a href='https://en.wikipedia.org/?curid="+x.pageid+"' target='_blank'><li><h2>"+x.title+"<span id='wikilink'>Link to Wikipedia <span class='glyphicon glyphicon-globe'></span></span></h2><h3>"+x.extract+"</h3></li></a>");
            }
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
         beforeSend: function() {
            $('.input-group-btn button span').removeClass('glyphicon-search').addClass('glyphicon-refresh');
            console.log("loading....");
         },
         complete: function() {
            $('.input-group-btn button span').removeClass('glyphicon-refresh').addClass('glyphicon-search');
            console.log("Complete...");
         }
      });
   }
};

$(document).ready(function() {
   $('form').on('submit', function(event) {
      event.preventDefault();
      $("#results").html("");
      var value = $('input').val();
      value = value.replace(/\s/g, '+');
      $('.ticket').html(value);
      wikisearch.loadWiki(value);
   });
});
