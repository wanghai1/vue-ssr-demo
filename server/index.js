const path = require('path');
const fs = require('fs');
const express = require('express');
// const renderer = require('vue-server-renderer').createRenderer();
const { createBundleRenderer } = require('vue-server-renderer');
// const createApp = require('../dist/server.bundle.js').default;
const server = express();

const template = fs.readFileSync(path.resolve(__dirname, '../public/index-ssr.html'), 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');


const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})




const renderToString = (context) => {
  return new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        console.log(err);
        err ? reject(err) : resolve(html);
      });
  });
};



// webpack 不使用 

server.get('*', (req,res)=> {  
  const context = {url: req.url};
  console.log(context);
  renderToString(context).then(html=> {
    // console.log('html', html);
    res.end(html);
  }).catch(err => {
    if(err.code && err.code === '404'){
      res.status(404).end('no that Page')
    }else{
      res.status(500).end("Internal Server Error")
    }
  });

  
  // 2.5 以下
  // renderer.renderToString((app, (err, html)=> {
  //   if(err){
  //     if(err.code === '404'){
  //       res.status(404).end('no that Page')
  //     }else{
  //       res.status(500).end("Internal Server Error")
  //     }
  //   }else{
  //     res.end(html)
  //   }
  // }))

  // 适用于 2.6 官方案例第一个示例
  // createApp(context).then(app=> {
  //   // console.log("renderer", renderer);
  //   console.log('context', context);
  //   if(!app) return;
  //   renderer
  //     .renderToString(app).then(html => {
  //       // console.log(html);
  //       res.end(html)
  //     })
  //     .catch(err => {
  //       if(err.code === '404'){
  //         res.status(404).end('no that Page')
  //       }else{
  //         res.status(500).end("Internal Server Error")
  //       }
  //     })
  // });

  // renderToString(context).then(html=> {
  //   console.log('html', html);
  //   res.end(html);
  // }).catch(err => {
  //   if(err.code && err.code === '404'){
  //     res.status(404).end('no that Page')
  //   }else{
  //     res.status(500).end("Internal Server Error")
  //   }
  // });

})

server.listen(8081)