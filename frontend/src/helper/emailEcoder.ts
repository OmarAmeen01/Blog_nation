
export default function  emailEncoder(email:string ){
 


const indexOfSymbol =email.indexOf("@")
const emailFristPart =email.slice(0,3)
const emailLastPart= email.slice(indexOfSymbol,email.length)
  
const remainingPart = email.length-(2+(emailFristPart.length-1))

let stars = ''

for(let i=0;i<remainingPart;i++){
    stars+="*"
}

const finalEmail = emailFristPart+stars+emailLastPart
return finalEmail

}
