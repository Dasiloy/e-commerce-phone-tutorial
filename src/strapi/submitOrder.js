import axios from "axios";
import url from "../utils/URL";

const submitOredr = async ({
  name,
  items,
  total,
  stripeToken,
  userToken
}) => {
    const response = await axios.post(`${url}/orders`, {
         name,items,total,stripeToken  
    }, {
        headers: {
               Authorization:`Bearer ${userToken}`
           }
    }).catch(error => console.log(error))
    return response
   };


   export default submitOredr