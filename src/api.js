import axios from 'axios';
import https from 'https';
import qs from 'qs';

// Public
// const baseUrl = "https://" + window.location.hostname + "/rest-api";
const configuratorUrl = "http://beta.configurator.engcon.com/Configurator.ashx?country=se";

// Local
const baseUrl = "http://engcon.com/rest-api";

const instance = axios.create({
  baseURL: baseUrl,
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

  let urlExtension = "/translate/filter?lang=" + window.lang;

  try {
    const response = await instance.get(urlExtension);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function getModels(id) {
  try {
    const response = await instance.get(configuratorUrl + "&brand=" + id);
    return response.data.Excavator[0].Model;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function getBrands() {
  try {
    const response = await instance.get(configuratorUrl);
    return response.data.Excavator;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function getProductIDs(brandId, modelId) {
  try {
    const response = await instance.get(configuratorUrl + "&brand=" + brandId + "&model=" + modelId);
    return response.data.Excavator[0].Model[0].Products;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function getProducts(query) {
  let urlExtension = "/1/0/303.online-5.0/search";

  try {
    const response = await instance.get(baseUrl + urlExtension, {          params: {
      format: "json",
      json: JSON.stringify(query)
    },
    headers: {
      "Content-Type": "application/json"
    }});
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export {
  getTranslation, getModels, getBrands, getProducts, getProductIDs
};