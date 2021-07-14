$(document).ready(function(){
    $(".assetPie").find("h2").hide();

});

var ctx = $("#myCanvas").get(0).getContext("2d");
var stocks = document.getElementById("stocks");
var bonds = document.getElementById("bonds");
var cash = document.getElementById("cash");




$("form").on("submit", function(e)
{

  var pieChart = new Chart(ctx, {
    type:"pie",
    data:{
      labels:["Stocks", "Bonds", "Cash"],
      datasets:
      [{
        data:
        [
        stocks.value,
        bonds.value,
        cash.value
      ],
      backgroundColor:
      [
        "#00F9F1",
        "#E800F9",
        "#08F900"
      ]
    }]
    },
  });

  var add = [stocks.value, bonds.value, cash.value];
  pieChart.data.datasets[0].data = add;
  pieChart.update();
  e.preventDefault();

  var sum = parseInt(stocks.value) + parseInt(bonds.value) + parseInt(cash.value);

  var stockAlloc = stocks.value * 100.0 / sum;
  var bondAlloc = bonds.value * 100.0 / sum;
  var cashAlloc = cash.value * 100.0 / sum;



  document.getElementById("StockAllocation").innerHTML = "Total Stocks: " + stockAlloc.toFixed(2) + "%";
  document.getElementById("BondAllocation").innerHTML = "Total Bonds: " + bondAlloc.toFixed(2) + "%";
  document.getElementById("CashAllocation").innerHTML = "Total Cash: " + cashAlloc.toFixed(2) + "%";


  $(".assetPie").find("h2").fadeIn("slow");
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
