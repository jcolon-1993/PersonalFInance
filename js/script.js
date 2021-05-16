var submit = document.getElementById("result");



function showAlert()
{
  var name = document.getElementById("Firstname");
  var email = document.getElementById("email");
  var lastName = document.getElementById("Lastname");

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email.value) == false)
          {
              alert('Invalid Email Address');
              return false;
          }
  if(lastName.value == false)
  {
    alert("First name must be filled out");
  }
  if(name.value == false)
  {
    alert("Last name must be filled out");
  }

  else
  {
  alert("Thank you " + name.value + " for filling out the form. An email has" +
  " been sent to " + email.value + ". One on our advisors " + "will be reaching out to you shortly");
  }
}

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

function logIn()
{
  var email = document.getElementById("email");
  var password = document.getElementById("password");

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
