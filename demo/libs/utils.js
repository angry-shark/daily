import axios from 'axios';

const Utils = {
    imgPath:"http://127.0.0.1:8011/img",
    apiPath:"http://127.0.0.1:8010/"
};

//Ajax general setting
Utils.ajax = axios.create({
    baseURL:Utils.apiPath
});

//add the react filter
Utils.ajax.interceptors.response.use(res => {
    return res.data;
});

export default Utils;