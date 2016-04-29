var wikisearch = {
  init: function() {
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=cars&gsroffset=2&gsrinterwiki=1";
    $('.confirmation').on('click', 'button', function(){
      $.ajax({
        type: 'GET',
        url: url,
        data: null,
        dataType: 'jsonp',
        success: function(response) {
          // $('.ticket').html(response);
          console.log(response.query.pages);
        },
        error: function(request, errorType, errorMessage) {
          alert('Error: ' + errorType + ' with message: ' + errorMessage);
        },
        timeout: 3000,
        beforeSend: function() {
          $('.confirmation').addClass('is-loading');
          console.log("loading....");
        },
        complete: function() {
          $('.confirmation').removeClass('is-loading');
          console.log("Complete...");
        }
      });
    });
  }
};

$(document).ready(function() {
  wikisearch.init();
});
