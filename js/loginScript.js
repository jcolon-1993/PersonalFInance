$(document).ready(function(){
    $("#logout").hide();

});

// cookies
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
}
//Sets cookies when user logs in by storing information inside cookies.
function logIn()
{
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  alert("Thank you " + email.value + " for logging on");

  var currentCookie = document.getElementById("showname").innerHTML = email.value;
  setCookies("login", currentCookie, 365);



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

// Redirects user to home page when form is submitted.
function redirect() {
    window.location.replace("index.html");
    return false;
}
