export interface IResponseGetProducts {
  author:     Author;
  categories: string[];
  items:      Item[];
}

export interface Author {
  name:     string;
  lastname: string;
}

export interface Item {
  id:            string;
  title:         string;
  price:         Price;
  picture:       string;
  condition:     string;
  free_shipping: boolean;
}

export interface Price {
  currency: string;
  amount:   number;
  decimals: number;
}



// { 
//   "author": {   
//     "name": "String",
//     "lastname": "String"
//   },
//   "categories": ["String", "String", "String"],
//   "items": [
//     {
//       "id": "String",
//       "title": "String",
//       "price": { 
//         "currency": "String", 
//         "amount": 10,
//         "decimals": 10
//       },
//       "picture": "String",
//         "condition": "String",
//         "free_shipping": true
//       },
//       {
//         "id": "String",
//         "title": "String",
//         "price": { 
//           "currency": "String", 
//           "amount": 10,
//           "decimals": 10
//         },
//         "picture": "String",
//           "condition": "String",
//           "free_shipping": true
//       }
      
//     ]
//   }
      // Generated by https://quicktype.io


