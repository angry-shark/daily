const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;
const imgprot = 8011;

//create a Api service
const apiServer = http.createServer((req,res) => {
    const url = 'http://news-at.zhihu.com/api/4' + req.url;
    const options ={
        url:url
    }

    function callback(error ,response, date){
        if(!error && response.statuCode === 200){
            //set Chinese Code
            res.setHeader('Content-Type','text/plain;charset=utf-8');
            //set all domain can be over domain
            res.setHeader("Access-Control-Allow-Origin",'*');
            //return the content be proxy
            res.end(body);
        }
    }

    request.get(options,callback)
});

//listen the 8010 port
apiServer.listen(port,hostname,()=>{
    console.log(`接口代理运行在 http://${hostname}:${port}/`)
});

//create one image proxy service
const imgServer = http.createServer((res,req)=>{
    const url = req.url.split('/img/')[1];
    const options = {
        url:url,
        encoding:null
    }

    function callback(error, response, body){
        if(!error && response.statuCode === 200){
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', contentType) ;
            res.setHeader('Access-Control-Allow-Origin','*');
            res.end(body);
        }
    }

    request.get(options,callback);
})

//listen the 8011 port
imgServer.listen(imgprot,hostname,()=>{
    console.log(`图片代理运行在http://${hostname}:${imgprot}/`);
});