export const LOGO = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
export const USER_LOGO = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_API_KEY
  }
};

export const IMG_CDN ="https://image.tmdb.org/t/p/w500"

export const SUPPORTED_LANG = [{identifier: "en", name: "English"},{identifier: "hindi", name: "Hindi"}, {identifier: "marathi", name: "Marathi"} ]