var validate=[false,false,false,false]
$( document ).ready(function() {
  var modal = document.getElementById("modal");

function openModal(){
  modal.classList.add("display");
  setTimeout(function(){
    modal.classList.add("transition");
  },20);//20milliseconds
}

function closeModal(){
  modal.classList.remove("transition");

  setTimeout(function(){
    modal.classList.remove("display");
  },300);//300milliseconds

}
modal.addEventListener("click",function(){
 closeModal();
});
modal.children[0].addEventListener("click",function(event){
  event.stopPropagation();
});
$('#button-modal').on('click',function(){
  closeModal();
})

$('#register-form').submit(function( event ) {
  event.preventDefault();

  vFlag=true;
  validate.forEach(function(v){
    if(!v){
      vFlag=false;
      openModal();
    }
  });
if(vFlag){

    $('.login').addClass('test')
    setTimeout(function(){
      $('.login').addClass('testtwo')
    },300);
    setTimeout(function(){
      $(".authent").show().animate({right:-320},{easing : 'easeOutQuint' ,duration: 600, queue: false });
      $(".authent").animate({opacity: 1},{duration: 200, queue: false }).addClass('visible');
    },500);
data=$('#register-form').serialize();
  $.ajax({
  url: "https://officesolutions2-api-heroku.herokuapp.com/office-solutions/register",
  type: "POST",
  data: data,
  success: function(data,textStatus,jqXHR){
    data=data.trim()
    console.log(data)
    if(data=="success"){
      setTimeout(function(){
        $(".authent").show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
        $(".authent").animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
        $('.login').removeClass('testtwo')
      },2500);
      setTimeout(function(){
        $('.login').removeClass('test')
        $('.login div').fadeOut(123);
      },2800);
      setTimeout(function(){
        $('.success').fadeIn();
      },3200);
      Cookies.set('isLoggedIn', 'true');

    }
    else{
      setTimeout(function(){
        $(".authent").show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
        $(".authent").animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
        $('.login').removeClass('testtwo')
      },2500);
      setTimeout(function(){
        $('.login').removeClass('test')
        $('.login div').fadeOut(123);
      },2800);
      setTimeout(function(){
        $('.failure').fadeIn();
      },3200);

    }
  },
  error: function(jqXHR,textStatus,errorThrown){}
});
}
  // setTimeout(function(){
  //   $(".authent").show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
  //   $(".authent").animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
  //   $('.login').removeClass('testtwo')
  // },2500);
  // setTimeout(function(){
  //   $('.login').removeClass('test')
  //   $('.login div').fadeOut(123);
  // },2800);
  // setTimeout(function(){
  //   $('.success').fadeIn();
  // },3200);
});
});
$('input[type="text"],input[type="password"]').focus(function(){
  $(this).prev().animate({'opacity':'1'},200)
});
$('input[type="text"],input[type="password"]').blur(function(){
  $(this).prev().animate({'opacity':'.5'},200)
});
//validation

//email
$('input[name="emp-email"]').keyup(function(){

  if(isEmail($(this).val())) {
    $(this).next().animate({'opacity':'1','right' : '30'},200)
    validate[0]=true;
  } else {
    $(this).next().animate({'opacity':'0','right' : '20'},200)
    validate[0]=false;
  }
});

//email
$('input[name="emp-lname"]').keyup(function(){

  if(isValidName($(this).val())) {
    $(this).next().animate({'opacity':'1','right' : '30'},200)
      validate[1]=true;
  } else {
    $(this).next().animate({'opacity':'0','right' : '20'},200)
    validate[1]=false;
  }
});

$('input[name="emp-fname"]').keyup(function(){

  if(isValidName($(this).val())) {
    $(this).next().animate({'opacity':'1','right' : '30'},200)
      validate[2]=true;
  } else {
    $(this).next().animate({'opacity':'0','right' : '20'},200)
    validate[2]=false;
  }
});

$('input[name="password"]').keyup(function(){

  if(isValidPassword()) {

    $(this).next().animate({'opacity':'1','right' : '30'},200)
    $('input[name="conf-password"]').next().animate({'opacity':'1','right' : '30'},200)
    validate[3]=true;
  } else {
    $(this).next().animate({'opacity':'0','right' : '20'},200)
    $('input[name="conf-password"]').next().animate({'opacity':'0','right' : '20'},200)
    validate[3]=false;
  }
});
$('input[name="conf-password"]').keyup(function(){

  if(isValidPassword()) {
    $(this).next().animate({'opacity':'1','right' : '30'},200)
    $('input[name="password"]').next().animate({'opacity':'1','right' : '30'},200)
    validate[3]=true;
  } else {
    $(this).next().animate({'opacity':'0','right' : '20'},200)
      $('input[name="password"]').next().animate({'opacity':'0','right' : '20'},200)
      validate[3]=false;
  }
});

// $('input[type="text"],input[type="password"]').keyup(function(){
//   if(!$(this).val() == ''){
//     $(this).next().animate({'opacity':'1','right' : '30'},200)
//   } else {
//     $(this).next().animate({'opacity':'0','right' : '20'},200)
//   }
// });

var open = 0;
$('.tab').click(function(){
  $(this).fadeOut(200,function(){
    $(this).parent().animate({'left':'0'})
  });


});
