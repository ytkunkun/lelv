# 乐旅亲子APP后台

## 项目结构
```
│  app.js               Nodejs入口文件
│  package-lock.json    所有模块的版本信息，模块来源及依赖的小版本信息。
│  package.json         项目及项目所依赖的模块信息
│  readme.md            简要的描述该项目的信息
│  
├─public                静态文件夹
│  │  index.html        静态文件入口
│  │  
│  ├─apidoc             存放API文档
│  ├─css                样式文件
│  ├─download           存放供下载的APK文件
│  │      乐旅.apk
│  │      
│  ├─html               后台管理系统页面
│  │  │  index.html      
│  │  │  
│  │  └─module          后台管理各个模块
│  │          
│  ├─images             存放静态图片与上传的图片
│  │  ├─img             存放后台管理系统使用的静态图片
│  │  └─uploads         存放前端上传过来的图片
│  │
│  ├─js                 
│  │      
│  ├─less
│  │      
│  └─plugin             存放使用到的插件与框架
│      ├─jQuery         
│      ├─layui          
│      └─other          
│              
├─routes                路由模块
│      
├─server                服务器文件夹
│  │  server.js         服务器入口文件
│  │  
│  ├─core               核心模块
│  │  ├─config          配置文件
│  │  │      
│  │  ├─mysql           MySQL封装
│  │  │      
│  │  ├─redis           Redis封装
│  │  │      
│  │  └─util            常用工具封装
│  │          
│  └─module             存放各个接口模块
│          
└─uploads               上传生成的临时二进制文件
```  
