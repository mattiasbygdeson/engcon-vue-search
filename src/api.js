import axios from 'axios';
import https from 'https';
import qs from 'qs';

const instance = axios.create({
  baseURL: 'http://engcon.utv/rest-api',
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  paramsSerializer: params => qs.stringify(params),
});

// Exports
async function getTranslation() {
  
  // var lang = navigator.language.slice(0,2);

  let urlExtension = "/translate/filter?lang=" + window.lang;

  // eslint-disable-next-line no-console
  console.log(window.lang);

  try {
    const response = await instance.get(urlExtension);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function getProducts() {
  
  // const instance = axios.create({
  //   baseURL: "http://engcon.utv/rest-api/1/0/303.online-5.0/",
  //   paramsSerializer: params => qs.stringify(params)
  // });

  // let url = "/search";

  // var startOfString = "+(";
  // var endOfString = ") AND language:sv";

  // return startOfString + middleOfString + endOfString;
}

export {
  getTranslation, getProducts
};