$(document).ready(function(){

//EDIT BELOW
  // Adding click event listen listener to all buttons
  $(document).on("click", ".animal", function() {
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

//Form


//event handler
  $('#run-search').on('click', function (){
    var animalButton = $("#searchAnimal").val();
    event.preventDefault();
    console.log(animalButton);
 //add the new animal button
 
    var newAnimalButton = $("<button>").addClass ("btn btn-info animal").attr('data-animal', animalButton).html(animalButton);

    $(animals).append(newAnimalButton);
    console.log("It works!");

    });
  
 });

