import axios from 'axios';
import https from 'https';

const instance = axios.create({
  baseURL: 'http://engcon.utv/rest-api',
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// Exports
async function getTranslation() {
  // let urlExtension = "/filter";
  let urlExtension = "/translate/filter";

  try {
    const response = await instance.get(urlExtension);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export {
  getTranslation
};