import axios, { AxiosResponse } from 'axios';


export const fetchMeliSearch = async ( query: string | any ) :Promise<AxiosResponse> => {
  
  const searchUrl = `${process.env.MELI_API}/sites/MLA/search?q=${query}&limit=4`
    
  try {
    const response = await axios.get(searchUrl);
    return response;
  } catch (error) {
    throw new Error();
  }

}




  


  



  
  
