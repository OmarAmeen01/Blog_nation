export default function validateCredentails(email:string, password:string, setIsEmailInvalid:any,setIsPasswordInvalid:any){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailRegex.test(email)) {
        setIsEmailInvalid(false)
        if (passwordRegex.test(password)) {
            setIsPasswordInvalid(false)
            return true
        } else {
            setIsPasswordInvalid(true)
            return false
        }
    } else {
        setIsEmailInvalid(true)
        return false
    }
}