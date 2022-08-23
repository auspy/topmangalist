import { getDocs,collection } from "firebase/firestore"
import db from "./firebase"





// get mangas
export const getMangas= async()=>{
    let obj={}
   const docs= await getDocs(collection(db,"mangas"))
   docs.forEach((key)=>{
        // console.log(key.data(),"=>",key.id);
        obj[key.id]=key.data()
   })
return obj
}