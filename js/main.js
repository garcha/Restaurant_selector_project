var auth = { 
  //
  // Update with your auth tokens.
  //
    consumerKey: "wCDI3cCWcp2xoepcrAdE5Q", 
    consumerSecret: "xthfPXUSNJ4eFa9UkzcvdfTg0bM",
    accessToken: "exuEA22jIXntED-3EYydV6Ap4t8jn5hD",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "RGE8GAbXXOgh64MfCKvGPwb6BAs",
    serviceProvider: { 
      signatureMethod: "HMAC-SHA1"  }
};

var terms = 'Mexican';
var near = 'Santa Monica';

var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};

parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = { 
  'action': 'http://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters 
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);


// $(event.keycode === 13){
//   $(this).
// }

//     $("#id_of_textbox").keyup(function(event){
//     if(event.keyCode == 13){
//         $("#id_of_button").click();
//     }
// });

$(function(){
  // getData();



  $('#submit').on("click", function() {
    // get data from inputs

    terms = $('#terms').val();
    near = $('#near').val();
    // replace data in parameters


    parameters.shift();
    parameters.shift();
    parameters.unshift(['location', near]);
    parameters.unshift(['term', terms]);


    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    // getData
    getData();
    return false




  });
});

function getData() {
  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
  $.ajax({
    'url': message.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
    'jsonpCallback': 'cb',
    'success': function(data, textStats, XMLHttpRequest) {
      gdata = data;
      console.log(data);
      //var output = prettyPrint(data);
      //$("body").append(output);
      
      businesses = [];

      _.each(gdata.businesses, function(business, index) {
        b = new Business(business.name, business.image_url, business.snippet_text, business.rating_img_url);
        businesses.push(b);
      });

      console.log(b);
      // writeToPage();
      writePageHeader();
      deleteContent();
      writePagecontent();
      random();
      writeRandomcontent();

  }
});

};

function Business(name, image_url, snippet_text, rating_img_url) {
  this.name = name;
  this.image_url = image_url;
  this.snippet_text = snippet_text;
  this.rating_img_url = rating_img_url;
};

function writePageHeader(){
  $("#nearlist").html(near);
  $("#termslist").html(terms);
};

function writePagecontent(){
  for(i = 0; i <= 10; i++){
  $(".list").append("<a href=\"#\" class=\"list-group-item \"><h4 class=\"list-group-item-heading name\">" + 
    businesses[i].name + " " +
    "<span class=\"rating\"><image_url:\"" + 
    businesses[i].rating_img_url + 
    "\"></span></h4> <p class=\"list-group-item-text snippit\">" + 
    businesses[i].snippet_text + "</p></a>" );      
}
};

function deleteContent(){
  $(".list").empty();
};

function enter(){
$("#near").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit").click();
    }
});
}



function random(){

  var restaurantnumber = Math.floor(Math.random() * 10)

    switch(restaurantnumber)
    {
    case 1:
      radrest = businesses[1];
      break;
    case 2:
      radrest = businesses[2];
      break;
    case 3:
      radrest = businesses[3];
      break;
    case 4:
      radrest = businesses[4];
      break;
    case 5:
      radrest = businesses[5];
      break;
    case 6:
      radrest = businesses[6];
      break;
    case 7:
      radrest = businesses[7];
      break;
    case 8:
      radrest = businesses[8];
      break;
    case 9:
      radrest = businesses[9];
      break;
    case 10:
      radrest = businesses[0];
      break;
    default:
      radrest = businesses[0];
      break;
    }

}

function writeRandomcontent(){
  $(".random").html("<img src=" + radrest.image_url + " \"width=\"270px\" height=\"250px\">" + "<h4 class=\"list-group-item-heading\">" + radrest.name + "</h4>");
     };


$(document).ready(function(){
    $( ".randomBottom" ).click(function() {
      random();
      writeRandomcontent();;
    });
});

getData();

