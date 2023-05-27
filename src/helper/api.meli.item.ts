import axios, { AxiosResponse } from 'axios';
import { IEndpoint } from '../utils/Interfaces/IEndpoint';
import { Items } from '../utils/Interfaces/IResponseGetProductDetails';
import { ItemDescription } from '../utils/Interfaces/ItemDescription';


export const fetchMeliItems = async ( endpoint:IEndpoint ) :Promise<Items | ItemDescription | any> => {
  
  const searchUrl = endpoint.description 
    ? `${process.env.MELI_API}/items/${endpoint.id}/description`
    : `${process.env.MELI_API}/items/${endpoint.id}`
    
 try {
   const response: AxiosResponse<Items | ItemDescription> = await axios.get(searchUrl);
   return response.data
 } catch (error) {
   throw new Error();
 }

}




  


  



  
  
