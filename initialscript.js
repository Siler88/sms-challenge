function show(){
    var x = document.getElementById("password");
    var y = document.getElementById("confirmpassword");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";

    } else {
      x.type = "password";
      y.type = "password";
    }
}
//check passwort 
var password = document.getElementById("password")
var confirmpassword = document.getElementById("confirmpassword");
function validatePassword(){
  if(password.value != confirmpassword.value) {
    confirmpassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmpassword.setCustomValidity('');
  }
}
password.onchange = validatePassword;
confirmpassword.onkeyup = validatePassword;

//check email
var email = document.getElementById("email")
var confirmEmail = document.getElementById("confirmEmail");
function validateemail(){
  if(email.value != confirmEmail.value) {
    confirmEmail.setCustomValidity("Emails Don't Match");
  } else {
    confirmEmail.setCustomValidity('');
  }
}
email.onchange = validateemail;
confirmEmail.onkeyup = validateemail;
// final submit
function processForm(e) {
    if (e.preventDefault) e.preventDefault();


    window.alert("erfolgreich");
    window.location.href="./index2.html";

    return false;
}

var form = document.getElementById('form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}