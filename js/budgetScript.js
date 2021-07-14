//Hides pie chart when page is loaded
$(document).ready(function(){
    $(".myPie").find("h2").hide();

});
  // Used to pass to argument
  //Gets reference of placeholder for pie chart.
  var ctx = $("#myCanvas").get(0).getContext("2d");
  var income = document.getElementById("income");
  var expenses = document.getElementById("expenses");
  var savings = document.getElementById("savings");
  var investments = document.getElementById("investments");


//Updates chart when user clicks away from form.
//Also implements logic and arithmetic.
  $("form").on("submit", function(e)
  {

    // Create instance of Chart object for pieChart
    //Takes two argument: context and object literal
    var pieChart = new Chart(ctx, {
      type:"pie",
      data:{
        labels:["Expenses", "Savings", "Investments"],
        datasets:
        [{
          data:
          [
          expenses.value,
          savings.value,
          investments.value
        ],
        backgroundColor:
        [
          "#F90000",
          "#003AF9",
          "#00F929"
        ]
      }]
      },
    });

    var add = [expenses.value, savings.value, investments.value];
    pieChart.data.datasets[0].data = add;
    pieChart.update();
    e.preventDefault();

    var expensesAlloc = expenses.value * 100.0 / income.value;
    var savingsAlloc = savings.value * 100.0 / income.value;
    var investmentAlloc = investments.value * 100.0 / income.value;
    var cashLeftOver = parseInt(income.value) - (parseInt(expenses.value) + parseInt(savings.value) + parseInt(investments.value));

    document.getElementById("cash").innerHTML = "Cash left over: $" + cashLeftOver;
    document.getElementById("ExpenseAllocation").innerHTML = "Total Expenses: " + expensesAlloc.toFixed(2) + "%";
    document.getElementById("SavingsAllocation").innerHTML = "Total Savings: " + savingsAlloc.toFixed(2) + "%";
    document.getElementById("InvestmentsAllocation").innerHTML = "Total Investments: " + investmentAlloc.toFixed(2) + "%";
    $(".myPie").find("h2").fadeIn("slow");
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

  alert("Thank you " + email.value + " for logging on");


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
