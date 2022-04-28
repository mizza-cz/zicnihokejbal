let radio = document.querySelector('input[name="choice-radio"]');
let sendForm = document.querySelector('#send-form');
let form = document.querySelector('#frm-contactForm');
sendForm.onClick = function(event){
   event.preventDefault();
   console.log(serialize(form));
   console.log('ololo');
}
 