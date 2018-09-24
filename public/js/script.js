$(document).ready(function(){   
    // Send screen size and whatever else that is not available from headers

    console.log("Loaded");

    $.post('/logger', { width: screen.width, height: screen.height }, function(res) {
    	console.log("Thank you for your data.");
    });
 });  



// // Somewhere on your page(s) - here we use jQuery
// $(document).ready(function(){   
//   // Check if they have been logged
//   if ($.cookie('logged') == null ){
//     // Send screen size and whatever else that is not available from headers
//     $.post('/logger', { width: screen.width, height: screen.height }, function(res) {
//       // Set cookie  for 30 days so we don't keep doing this
//        $.cookie('logged', true, { expires: 30 }); 
//     });
//   } 
//  });  