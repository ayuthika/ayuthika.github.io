function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isValidName(name) {
  if(name.length<=0){
    return false;
  }
  var regex = /^[A-Za-z]*$/;;
  return regex.test(name);
}
function isValidPassword() {
if($('input[name="conf-password]').val()==$('input[name="password]').val() && $('input[name="conf-password"').val().length>5){
  return true;
}
else{
  return false;
}
}
