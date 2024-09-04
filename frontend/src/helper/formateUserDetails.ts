interface UserDetails{
    first_name?:string ,
        last_name?:string ,
        email:string,
        password:string
    }

export default function formatUserDetails(userDetail:UserDetails){
    const firstName = userDetail.first_name as string
    const lastName =userDetail.last_name as string
   const first_name = firstName.slice(0,1).toUpperCase()+firstName.slice(1).toLowerCase()
    const last_name = lastName.slice(0,1).toUpperCase()+lastName.slice(1).toLowerCase()
    const email = userDetail.email.toLowerCase()
       
    return {first_name,last_name,email,password:userDetail.password}
}