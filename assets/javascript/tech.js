//Autocomplete in searchbar (not working - revisit)
/* $(document).ready(function(){                 
    $('#autocomplete-input').autocomplete({
    data: {
        "Apple": null,
        "Microsoft": null,
        "Google": null,
        "Gargle":null
    }
    });                
});*/

//Carousel Function (for brands)
$(document).ready(function() {
    $('.carousel').carousel();
  });

//Modal Function
$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

/* enter function 
$('#autocomplete-input').on("keypress", function (e) {
  if(e.keyCode === 13){
    console.log("yay");
});
*/