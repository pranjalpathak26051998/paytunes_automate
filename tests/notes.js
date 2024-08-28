



const RO_no = require('../tests/ro');
console.log(RO_no);
// var str = RO_no_id; 
//https://staging-connect.paytunes.in/agency/order/ro/655/change/
// var str = "https://staging-connect.paytunes.in/agency/order/ro/655/change/";
// var n = str.lastIndexOf('/');
// console.log(n)
// var result = str.substring(n - 2);
// console.log(result);


var str = "https://staging-connect.paytunes.in/agency/order/ro/655/change/";

// Find the position of the last '/' in the URL
var lastIndex = str.lastIndexOf('/');

// Get the substring starting from the position after the last '/'
var numberPart = str.substring(lastIndex + 1);

// Extract the number from the substring
var number = parseInt(numberPart);

// Check if the extracted part is a valid number
if (!isNaN(number)) {
    console.log("Extracted number:", number);
} else {
    console.log("Number extraction failed.");
}



var str = "https://staging-connect.paytunes.in/agency/order/ro/655/change/";
let first_split = str.split("ro/")[1];
console.log(first_split);
let  resultant_ro = first_split.split("/")[0];
console.log(resultant_ro);

const url = "files/images/gallery/image.jpg";

console.log(url.split("files/").pop());
