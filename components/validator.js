
// email validator
export const isEmail = (email)=>{
   let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return pattern.test(email)
}

//phone
export const isPhone = (phone)=>{
    let pattern = /^\d{10}$/;
    if(phone.match(pattern)) return true;
    else return false;
}