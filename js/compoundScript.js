$(document).ready(function(){
    $(".compoundOutput").hide();

});
var assets = document.getElementById("assets");
var years = document.getElementById("years");
var $compoundEl = $(".compoundOutput").find("h2");


//Computes compound interest when user clicks away from form.
$("form").on("submit", function(e)
{
  var compoundInterest = 0;
  const INTEREST_RATE = .07;
  e.preventDefault();

  for (var i = 1; i <= years.value; i++)
  {
    compoundInterest = parseInt(assets.value) + (parseInt(assets.value) * (((Math.pow(1 + INTEREST_RATE / 12, 12 * parseInt(years.value))) - 1) /
                                (INTEREST_RATE / 12)) * (1 + INTEREST_RATE / 12));
  }

  document.getElementById("result").innerHTML = "In " + years.value + " years, " +
   "$" + assets.value + " will grow to: " + " $" + compoundInterest.toFixed(2);

   $compoundEl = $("<h2>Final Balance</h2>").insertBefore("#result");


  $(".compoundOutput").delay("slow").fadeIn();
});


if(getCookies("login") != "")
{
  $("#login").hide();
  var email = document.getElementById("email");
  document.getElementById("showname").innerHTML = "You are signed in";

}

else
{
  if(getCookies("login") != "" && getCookies("login") != null)
  {

  var email = document.getElementById("email");
  var currentCookie = document.getElementById("showname").innerHTML = email.value;


  $("#name").show();
  setCookies("login", currentCookie, 365)

  }

  if(getCookies("login") == "" || getCookies("login") == null)
  {
    $("#logout").hide();

  }

}

function logIn()
{
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var currentCookie = document.getElementById("showname").innerHTML = email.value;



  setCookies("login", currentCookie, 365);

}

function logout()
{

  document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.reload();



}

function setCookies(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookies(cName)
{
  var name = cName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0) == " " )
    {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0)
    {
      return c.substring(name.length, c.length)
    }
  }

  return "";
}
