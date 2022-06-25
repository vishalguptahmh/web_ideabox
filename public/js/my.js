$(document).ready(() => {
    console.log("read is done..outside!! my js")
    hideLoader();
    $('a').click(function(){
        showLoader();
    }); 
});

function showLoader(){
    console.log("show loading");
    $("#loading")[0].style.display="block";
};

function hideLoader(){
    console.log("hide loader")
    $("#loading")[0].style.display="none";
};