import { Notification } from "../typescript/interfaces";
type Obj = {[key:string]:boolean}

export default function notificationFilter(settings:Obj,notifications:Notification[]){
 
     const filteredArray=notifications.filter(notification=>{
         return settings[notification.type]===true
     })
 return filteredArray
}

