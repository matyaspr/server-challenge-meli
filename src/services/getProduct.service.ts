import { IResponseGetProducts, Item } from '../utils/Interfaces/IResponseGetProducts';
import { AvailableFilter, SearchMeli, Result } from '../utils/Interfaces/ISearchMeli';
import { validConditions } from "../utils/Enums/ValidConditions";
import { fetchMeliCategories } from "../helper/api.meli.categories";
import { ICategories, PathFromRoot } from '../utils/Interfaces/ICategories';
import { IResponseGetProductsDetails } from '../utils/Interfaces/IResponseGetProductDetails';
import { IEndpoint } from "../utils/Interfaces/IEndpoint";
import { fetchMeliItems } from '../helper/api.meli.item';
import { Items } from '../utils/Interfaces/Item';
import { ItemDescription } from '../utils/Interfaces/ItemDescription';




export const getProductService = async (data: SearchMeli): Promise<IResponseGetProducts | null> => {

  const { filters, available_filters, results } = data
  if ( !results.length) return null

  let responseGetProduct: IResponseGetProducts = {
    categories: [],
    author: { name: "Matias", lastname: "Primo"},
    items: []
  };

  if(filters.length) {
    const { path_from_root } = filters[0].values[0]
    responseGetProduct.categories = path_from_root.map( (category) => category.name )
  }else{
    const categoryId = sortCategory(available_filters)
    const { data } = await fetchMeliCategories(categoryId)
    const { path_from_root } : {path_from_root: PathFromRoot[]} = data
    responseGetProduct.categories = path_from_root.map( category => category.name )
  }

  responseGetProduct.items = results.map( (item:Result) => getFormattedProduct(item) )

  return responseGetProduct
}



export const getProductByIdService = async  (id: string): Promise<IResponseGetProductsDetails | any> => {
  let entryPoint:IEndpoint = {id, description: false}

  const item:Items = await fetchMeliItems(entryPoint)
  const category: ICategories = await fetchMeliCategories(item.category_id)
  const categories = category.path_from_root.map( cat => cat.name)

  let pDescription:ItemDescription = await fetchMeliItems({id, description: true})
  if(!pDescription.plain_text) pDescription.plain_text = 'Producto sin descripción.'
  
  const responseItem =  await getProductWithDescription(item, pDescription, categories); 
  
 return responseItem
}




const getProductWithDescription = async(item: Items, pDescription: ItemDescription, categories: string[] ): Promise<IResponseGetProductsDetails> => {  
  let res: IResponseGetProductsDetails = {
    author: {
      name: "Matias",
      lastname: "Primo"
    },
    items: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.trunc(item.price),
        decimals: getDecimals(item.price)
      },
      picture: item.pictures[0]?.url || item.thumbnail,
      condition: validConditions[item.condition as keyof typeof validConditions],
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: pDescription.plain_text
    },
    categories
  }

  return res;
}


const sortCategory = (available_filters: AvailableFilter[]) => {
  const sortCategories = available_filters[0].values.sort((a,b) => b.results - a.results);
  return sortCategories[0].id
}


const getDecimals = (price:number) :number => {
  return +price.toString().split('.')[1] || 0;
};


const getFormattedProduct = (product: Result): Item => {
  const { id, title, currency_id, price, thumbnail, condition, shipping } = product;
  const decimals = getDecimals(price);

  return {
    id,
    title,
    price: {
      currency: currency_id,
      amount: Math.trunc(price),
      decimals
    },
    picture: thumbnail,
    condition: validConditions[condition as keyof typeof validConditions],
    free_shipping: shipping.free_shipping
  };
};