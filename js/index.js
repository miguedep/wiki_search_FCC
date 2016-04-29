var wikisearch = {
  init: function() {
    $('.confirmation').on('click', 'button', this.loadWiki);
  },
   loadWiki: function(value){
      var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch="+value+"&gsroffset=2&gsrinterwiki=1";
      $.ajax({
         type: 'GET',
         url: url,
         data: null,
         dataType: 'jsonp',
         success: function(response) {

            console.log(response.query.pages);
         },
         error: function(request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' with message: ' + errorMessage);
         },
         timeout: 3000,
         beforeSend: function() {
            //$('.confirmation').addClass('is-loading');
            console.log("loading....");
         },
         complete: function() {
            //$('.confirmation').removeClass('is-loading');
            console.log("Complete...");
         }
      });
   }
};

$(document).ready(function() {
  wikisearch.init();
   $('form').on('submit', function(event) {
      event.preventDefault();
      var value = $('input').val();
      value = value.replace(/\s/g, '+');
      $('.ticket').html(value);
      wikisearch.loadWiki(value);
   });
});
