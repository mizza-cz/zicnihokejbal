function serialize (form){
   if( !form || form.nodeName !== "FORM" ){
      return false;
   }
   let i, j, q = [];
   for ( i = form.elements.length - 1; i >= 0; i = i - 1){
      if( form.elements[i].name === ""){
         continue;
      }
      switch(form.elements[i].nodeName){
         case 'INPUT':
            switch(form.elements.i.type){
               case 'text':
               case 'tel':
               case 'email':
               case 'hidden':
               case 'password':
               case 'button':
               case 'reset':
               case 'submit':
                  q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                  break;
               case 'checkbox':
               case 'radio':
                  if(form.elements[i].checked){
                     q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); 
                  }
                  break;
            }
            break;
            case 'file':
            break;
            case 'TEXTAREA':
               q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
               break; 
            case 'BUTTON':
               switch(form.elements[i].type){
                  case 'reset':
                  case 'submit':
                  case 'button':
                     q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                     break; 
               }
               break;
      }
   }
   return q.join("&");
} 