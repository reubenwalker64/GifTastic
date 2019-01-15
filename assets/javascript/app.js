/*Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

We chose animals for our theme, but you can make a list to your own liking.
Your app should take the topics in this array and create buttons in your HTML.

Try using a loop that appends a button for each string in the array.
When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

Under every gif, display its rating (PG, G, so on).

This data is provided by the GIPHY API.
Only once you get images displaying with button presses should you move on to the next step.
Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

*/

//Look at Dynamic Elements activity and Button Triggered Ajax activity

// Giphy Api Key:734LB9IAWwIgnKyEvKjRSj8pUKFwU5Oo sub into below

$(document).ready(function(){

//EDIT BELOW
  // Adding click event listen listener to all buttons
  $("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");
    event.preventDefault();

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=734LB9IAWwIgnKyEvKjRSj8pUKFwU5Oo&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          animalImage.addClass("image");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          animalImage.attr('data-still', results[i].images.fixed_height_still.url)

          animalImage.attr('data-animate', results[i].images.fixed_height.url)

          animalImage.attr('data-state', 'still'); 

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(animalImage);
          animalDiv.append(p);

          // Prependng the animalDiv to the HTML page in the "#gifs" div
          $("#gifs").prepend(animalDiv);
        }
      });
  });

//Pausing gifs EDIT

$(document).on("click", ".image", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    } else {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
  });


//Form from NYT activity EDIT BELOW
/*

function buildQueryURL() {
//variable
  var animal = $(this).attr("search-term");


    // queryURL is the url we'll use to query the API. 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchAnimal + "&api_key=734LB9IAWwIgnKyEvKjRSj8pUKFwU5Oo&limit=10";
  
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "api-key": "734LB9IAWwIgnKyEvKjRSj8pUKFwU5Oo" };
  
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $("#searchAnimal")
      .val()
      .trim();

      // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}
//CHANGE BELOW TO APPEND BUTTON TO ANIMALS DIV CLASS

*/

//event handler
$('#run-search').on('click', function (){
  var animalButton = $("#searchAnimal").val();
  event.preventDefault();
  
 //add the new animal button !!!ADDING 10 RANDOM GIFS AT BOTTOM, SAME AS EMPTY FIELD + SUBMIT!!!
 
  var newAnimalButton = $("<button>").addClass ("btn btn-info animal").attr('data-animal', animalButton).html(animalButton);

  $(animals).append(newAnimalButton);
    console.log("It works!");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animalButton + "&api_key=734LB9IAWwIgnKyEvKjRSj8pUKFwU5Oo&limit=10";
    console.log (animalButton);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
       // After data comes back from the request
       .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");        

          // Creating and storing an image tag
          var animalImage = $("<img>");
          animalImage.addClass("image");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          animalImage.attr('data-animate', results[i].images.fixed_height.url)
          
          animalImage.attr('data-still', results[i].images.fixed_height_still.url)

          animalImage.attr('data-state', 'animate'); 

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(animalImage);
          animalDiv.append(p);

          // Prependng the animalDiv to the HTML page in the "#gifs" div
          $("#gifs").prepend(animalDiv);
        }
      });
  });
  $("#search-animal").val("");
  return false;

});
/* EDIT AND PLACE ABOVE
function updatePage(GiphyData) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  var newAnimal = $("#searchAnimal").val();

  // Log the NYTData to console, where it will show up as an object
  console.log(GiphyData);
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < newAnimal; i++) {
    // Get specific article info for current index
    var article = GiphyData.response.docs[i];

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

*/

