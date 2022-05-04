/*
promise is a javascript object
represents eventual completion/failure of async operation
when completion occurs, provide resulting value
*/

//promise.then() - allows us to do someething when promise is resolve
/*
let promise = asyncFunction();
let promise2 = promise.then(function(val){
    console.log('text' +val);
})
promise2.then(function(){
    console.log('second promise'  + val)
})

*/

//after 3000 seconds setTimeout lets anonymous fuunction run
setTimeout(function(){
    console.log("The functioon was called back");

}, 3000);