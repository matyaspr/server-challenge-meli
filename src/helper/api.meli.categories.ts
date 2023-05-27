import axios, { AxiosResponse } from "axios";
import { ICategories } from "../utils/Interfaces/ICategories";

export const fetchMeliCategories = async ( id: string ) :Promise<ICategories | any> => {
  
  const searchUrl = `${process.env.MELI_API}/categories/${id}`
  
 try {
   const response: AxiosResponse<ICategories> = await axios.get(searchUrl);
   return response.data;
 } catch (error) {
   throw new Error();
 }

}