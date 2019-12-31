import { create } from 'apisauce'

// define the api
const BaseRequest = create({
  baseURL: 'https://api.vnext.work/api/',
  headers: { Accept: 'application/json','Access-Control-Allow-Origin': '*' },

});


export default BaseRequest;
