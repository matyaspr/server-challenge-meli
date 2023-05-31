import { Request, Response } from "express";
import {  EmptyQuery, Error, NotFound, Ok } from "../utils/Response/http.response";
import { getProductByIdService, getProductService } from "../services/getProduct.service";
import { fetchMeliSearch } from "../helper/api.meli.search"
import { IResponseGetProductsDetails } from "../utils/Interfaces/IResponseGetProductDetails";



// todo: /api/items?q:query
export const getProducts = async (req:Request, res:Response) => {
  const { q: nameProduct } = req.query
  if (!nameProduct) return EmptyQuery(res, {})

  try {
    const { data } = await fetchMeliSearch(nameProduct)
    const response = await getProductService( data )
    if (response) return Ok(res, response)
    return NotFound(res, response)
  
    
  } catch (error) {
    return Error(res, {})
  }
}



// todo: /api/items/:id
export const getProductDescription = async (req:Request, res: Response) => {
  const { id } = req.params
  try {
    
    let data:IResponseGetProductsDetails = await getProductByIdService(id)
    if (!data) return NotFound(res, {})
    return Ok(res, data)
    
  } catch (error) {
    return Error(res, {})
  }

}