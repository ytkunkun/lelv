define({ "api": [
  {
    "type": "post",
    "url": "activity/addActivity",
    "title": "添加活动",
    "description": "<p>添加活动</p>",
    "name": "addActivity",
    "group": "Activity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "shop_id",
            "description": "<p>店铺id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>活动类型  1室内 2室外 3野外 4其他</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "state",
            "description": "<p>状态  state = 0 下架 1正常 2热销 3新品  4推荐</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "number",
            "description": "<p>人数</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "image_url",
            "description": "<p>图片路径</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "max_age",
            "description": "<p>适合最大年龄</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "min_age",
            "description": "<p>适合最小年龄</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start_time",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end_time",
            "description": "<p>结束时间</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "使用方法\n chooseImage() {\n\t\t\tuni.chooseImage({\n\t\t\t\t// 调用选择图片的方法\n\t\t\t\tsuccess: chooseImageRes => {\n\t\t\t\t\tconst tempFilePaths = chooseImageRes.tempFilePaths;\n\t\t\t\t\tconsole.log(tempFilePaths);\n\t\t\t\t\tconsole.log(tempFilePaths[0]);\n\t\t\t\t\tsessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址\n\t\t\t\t}\n\t\t\t});\n\t\t},\n upload() {\n\t\t\tlet path = sessionStorage.getItem('tempFilePaths'); //  获取刚刚存的图片临时地址\n\n\t\t\tlet data = {\n\t\t\t\t// 添加活动接口需要传入的参数\n\t\t\t\tactivity_id: 2,\n\t\t\t\ttitle: 'title1',\n\t\t\t\tcontent: 'c1ontent',\n\t\t\t\taddress: 'a1ddress',\n\t\t\t\ttype: 2,\n\t\t\t\tstate: 1,\n\t\t\t\tnumber: 510,\n\t\t\t\tmax_age: 118,\n\t\t\t\tmin_age: 16,\n\t\t\t\tprice: 199,\n\t\t\t\tstart_time: '2022-01-01',\n\t\t\t\tend_time: '2022-01-05'\n\t\t\t};\n\n\t\t\t// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)\n\t\t\t$upload.upload('http://127.0.0.1/activity/setActivity', path, data, res => {\n\t\t\t\tconsole.log(res);\n\t\t\t});\n\t\t}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/activity/addActivity"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "post",
    "url": "activity/deleteActivity",
    "title": "删除活动",
    "description": "<p>删除活动</p>",
    "name": "deleteActivity",
    "group": "Activity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "activity_id",
            "description": "<p>活动id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/activity/deleteActivity"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "post",
    "url": "activity/getActivity",
    "title": "获取某个活动",
    "description": "<p>获取活动</p>",
    "name": "getActivity",
    "group": "Activity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "activity_id",
            "description": "<p>活动id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/activity/getActivity"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "post",
    "url": "activity/getAllActivity",
    "title": "获取全部活动",
    "description": "<p>获取全部活动</p>",
    "name": "getAllActivity",
    "group": "Activity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": "<p>页数(可选参数)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "size",
            "description": "<p>一页展示多少(可选参数)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/activity/getAllActivity"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "post",
    "url": "activity/setActivity",
    "title": "修改活动",
    "description": "<p>修改活动</p>",
    "name": "setActivity",
    "group": "Activity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "activity_id",
            "description": "<p>活动id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>活动类型  0室内 1室外 2野外3其他</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "state",
            "description": "<p>状态  state = 0 下架 1正常 2热销 3新品  4推荐</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "number",
            "description": "<p>人数</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "image_url",
            "description": "<p>图片路径</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "max_age",
            "description": "<p>适合最大年龄</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "min_age",
            "description": "<p>适合最小年龄</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start_time",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end_time",
            "description": "<p>结束时间</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n使用方法：\n chooseImage() {\n\t\t\tuni.chooseImage({\n\t\t\t\t// 调用选择图片的方法\n\t\t\t\tsuccess: chooseImageRes => {\n\t\t\t\t\tconst tempFilePaths = chooseImageRes.tempFilePaths;\n\t\t\t\t\tconsole.log(tempFilePaths);\n\t\t\t\t\tconsole.log(tempFilePaths[0]);\n\t\t\t\t\tsessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址\n\t\t\t\t}\n\t\t\t});\n\t\t},\n upload() {\n\t\t\tlet path = sessionStorage.getItem('tempFilePaths'); //  获取刚刚存的图片临时地址\n\n\t\t\tlet data = {\n\t\t\t\t// 添加活动接口需要传入的参数\n\t\t\t\tactivity_id: 2,\n\t\t\t\ttitle: 'title1',\n\t\t\t\tcontent: 'c1ontent',\n\t\t\t\taddress: 'a1ddress',\n\t\t\t\ttype: 2,\n\t\t\t\tstate: 1,\n\t\t\t\tnumber: 510,\n\t\t\t\tmax_age: 118,\n\t\t\t\tmin_age: 16,\n\t\t\t\tprice: 199,\n\t\t\t\tstart_time: '2022-01-01',\n\t\t\t\tend_time: '2022-01-05'\n\t\t\t};\n\n\t\t\t// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)\n\t\t\t$upload.upload('http://127.0.0.1/activity/setActivity', path, data, res => {\n\t\t\t\tconsole.log(res);\n\t\t\t});\n\t\t}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/activity/"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "post",
    "url": "article/addArticle",
    "title": "添加文章",
    "description": "<p>添加文章</p>",
    "name": "addArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>图片</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "isview",
            "description": "<p>其他人是否可见 0 不可见 1 可见</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "使用方法：\n chooseImage() {\n\t\t\tuni.chooseImage({\n\t\t\t\t// 调用选择图片的方法\n\t\t\t\tsuccess: chooseImageRes => {\n\t\t\t\t\tconst tempFilePaths = chooseImageRes.tempFilePaths;\n\t\t\t\t\tconsole.log(tempFilePaths);\n\t\t\t\t\tconsole.log(tempFilePaths[0]);\n\t\t\t\t\tsessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址\n\t\t\t\t}\n\t\t\t});\n\t\t},\n upload() {\n\t\t\tlet path = sessionStorage.getItem('tempFilePaths'); //  获取刚刚存的图片临时地址\n\n\t\t\tlet data = {\n\t\t\t\t// 添加活动接口需要传入的参数\n\t\t\t\tarticle_id: 2,\n\t\t\t\ttitle: '1111',\n\t\t\t\tcontent: '2222'\n\t\t\t};\n\t\t\t// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)\n\t\t\t$upload.upload('http://127.0.0.1/article/setArticle', path, data, res => {\n\t\t\t\tconsole.log(res);\n\t\t\t});\n\t\t}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/article/addArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "article/deleteArticle",
    "title": "删除文章",
    "description": "<p>删除文章</p>",
    "name": "deleteArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "article_id",
            "description": "<p>文章id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/article/deleteArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "article/getAllArticle",
    "title": "获取全部文章",
    "description": "<p>获取全部文章</p>",
    "name": "getAllArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": "<p>页数(可选参数)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "size",
            "description": "<p>一页展示多少(可选参数)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/article/getAllArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "article/getArticle",
    "title": "获取某个文章",
    "description": "<p>获取某个文章</p>",
    "name": "getArticle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "article_id",
            "description": "<p>文章id</p>"
          }
        ]
      }
    },
    "group": "Article",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/article/getArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "article/getUserArticle",
    "title": "获取某个用户文章",
    "description": "<p>获取某个用户文章</p>",
    "name": "getUserArticle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "group": "Article",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/article/getUserArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "article/setArticle",
    "title": "修改文章",
    "description": "<p>修改文章</p>",
    "name": "setArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>图片</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "isview",
            "description": "<p>其他人是否可见 0 不可见 1 可见</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "使用方法：\n chooseImage() {\n\t\t\tuni.chooseImage({\n\t\t\t\t// 调用选择图片的方法\n\t\t\t\tsuccess: chooseImageRes => {\n\t\t\t\t\tconst tempFilePaths = chooseImageRes.tempFilePaths;\n\t\t\t\t\tconsole.log(tempFilePaths);\n\t\t\t\t\tconsole.log(tempFilePaths[0]);\n\t\t\t\t\tsessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址\n\t\t\t\t}\n\t\t\t});\n\t\t},\n upload() {\n\t\t\tlet path = sessionStorage.getItem('tempFilePaths'); //  获取刚刚存的图片临时地址\n\n\t\t\tlet data = {\n\t\t\t\t// 添加活动接口需要传入的参数\n\t\t\t\tarticle_id: 2,\n\t\t\t\ttitle: '1111',\n\t\t\t\tcontent: '2222',\n\t\t\t\tisview :1\n\t\t\t};\n\t\t\t// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)\n\t\t\t$upload.upload('http://127.0.0.1/article/setArticle', path, data, res => {\n\t\t\t\tconsole.log(res);\n\t\t\t});\n\t\t}\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/article/setArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "business/deleteBusiness",
    "title": "删除用户",
    "description": "<p>删除用户</p>",
    "name": "deleteBusiness",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/business/deleteBusiness"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/getAllBusinessInfo",
    "title": "获取全部商家信息",
    "description": "<p>获取全部商家信息</p>",
    "name": "getAllBusinessInfo",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": "<p>页数(可选参数)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "size",
            "description": "<p>一页展示多少(可选参数)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n        \"data\": {\n            \"business_id\": 3,\n            \"phone\": \"123321\",\n            \"pwd\": \"123321\",\n            \"nick\": \"商家用户_13246\",\n            \"avatar\": \"http://127.0.0.1/images/default.jpg\",\n            \"sex\": \"男\",\n            \"birthday\": \"2000-01-01 00:00:00\",\n            \"state\": 1,\n            \"create_time\": \"2019-12-07 14:23:23\",\n            \"money\": 0,\n            \"qualification_front\": null,\n            \"qualification_back\": null,\n            \"idcard_front\": null,\n            \"idcard_back\": null,\n            \"cooperation_type\": null,\n            \"is_qualification\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/business/getAllBusinessInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/getBusinessInfo",
    "title": "获取商家信息",
    "description": "<p>获取商家信息</p>",
    "name": "getBusinessInfo",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n        \"data\": {\n            \"business_id\": 3,\n            \"phone\": \"123321\",\n            \"pwd\": \"123321\",\n            \"nick\": \"商家用户_13246\",\n            \"avatar\": \"http://127.0.0.1/images/default.jpg\",\n            \"sex\": \"男\",\n            \"birthday\": \"2000-01-01 00:00:00\",\n            \"state\": 1,\n            \"create_time\": \"2019-12-07 14:23:23\",\n            \"money\": 0,\n            \"qualification_front\": null,\n            \"qualification_back\": null,\n            \"idcard_front\": null,\n            \"idcard_back\": null,\n            \"cooperation_type\": null,\n            \"is_qualification\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/business/getBusinessInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/login",
    "title": "登录",
    "description": "<p>登录</p>",
    "name": "login",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\"code\": \"ok\",\n\"data\": {\n    \"msg\": \"登录成功\",\n         \"info\": {\n            \"business_id\": 3,\n            \"phone\": \"123321\",\n            \"pwd\": \"123321\",\n            \"nick\": \"商家用户_13246\",\n            \"avatar\": \"http://127.0.0.1/images/default.jpg\",\n            \"sex\": \"男\",\n            \"birthday\": \"2000-01-01 00:00:00\",\n            \"state\": 1,\n            \"create_time\": \"2019-12-07 14:23:23\",\n            \"money\": 0,\n            \"qualification_front\": null,\n            \"qualification_back\": null,\n            \"idcard_front\": null,\n            \"idcard_back\": null,\n            \"cooperation_type\": null,\n            \"is_qualification\": 0\n     }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/login"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/register",
    "title": "注册",
    "description": "<p>商家用户注册</p>",
    "name": "register",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"code\":\"ok\",\"data\":\"注册成功\"}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/business/register"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/updateBusinessInfo",
    "title": "修改用户信息",
    "description": "<p>修改商家信息</p>",
    "name": "updateBusinessInfo",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>类型 (0:修改手机号 1:修改密码,2:修改昵称,3:修改性别,4:修改生日,5:修改账户余额,6:修改账号状态，7:是否认证)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号(可选)  type=0</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码(可选) type=1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick",
            "description": "<p>昵称(可选) type=2</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sex",
            "description": "<p>性别(可选) type=3</p>"
          },
          {
            "group": "Parameter",
            "type": "datetime",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日(可选) type=4</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "state",
            "description": "<p>账号状态(可选) type=5  (0:冻结，1:正常)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "qualification",
            "description": "<p>是否认证(可选) type=6  (0:未认证，1:认证)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "cooperation_type",
            "description": "<p>合作方式(可选) type=7  (0商家入驻1广告佣金2团购3vip会员4其他)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "修改手机号",
          "content": "request：\n type:0\n phone:17759131234\n newphone:18344991234\n\n response：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"手机号修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改密码",
          "content": "request：\n type:1\n phone:17759131234\n password:123456\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"密码修改成功\"\n        }\n     }",
          "type": "json"
        },
        {
          "title": "修改昵称",
          "content": "request：\n type:2\n phone:17759131234\n nick:林小锟\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"昵称修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改性别",
          "content": "request：\n type:3\n phone:17759131234\n sex:'男'\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"性别修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改生日",
          "content": "request：\n type:4\n phone:1777778822\n birthday:'1997-12-21'\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"生日修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改账号状态",
          "content": "request：\n type:5\n phone:1777778822\n state:0\nresponse：\n {\n       \"code\": \"ok\",\n            \"data\": {\n            \"msg\": \"账号状态修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改认证状态",
          "content": "request：\n type:6\n phone:1777778822\n qualification:1\nresponse：\n {\n       \"code\": \"ok\",\n            \"data\": {\n            \"msg\": \"是否认证成功已修改\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改合作类型",
          "content": "request：\n type:7\n phone:1777778822\n cooperation_type:1\nresponse：\n {\n       \"code\": \"ok\",\n            \"data\": {\n            \"msg\": \"修改合作类型成功\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/business/updateBusinessInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/uploadAvatar",
    "title": "上传头像",
    "description": "<p>上传用户头像</p>",
    "name": "uploadAvatar",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "formData",
            "description": "<p>formData</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "前端：\n<input type=\"file\" name=\"file\" id=\"file\">\nvar baseURL = \"http://dkcloud.xyz/business/uploadAvatar\";\n\nfunction uploadImg() {\n       let file = document.getElementById('file');\n       let formData = new FormData();\n       formData.append('file', file.files[0]);\n       formData.append('phone', '177');\n       axios.post(baseURL, formData)\n           .then(res => {\n               console.log(res);\n           })\n   }\n\nresponse:\n{\n code: \"ok\"\n data: {msg: \"头像修改成功\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "business/uploadCertificates",
    "title": "上传证件",
    "description": "<p>身份证正面、身份证反面、营业执照正面、营业执照反面</p>",
    "name": "uploadCertificates",
    "group": "Business",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>type=1(身份证正面) type=2(身份证反面) type=3(营业执照正面) type=4(营业执照反面)</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "formData",
            "description": "<p>formData</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "<template>\n\t<view>\n\t\t<button @click=\"btn(1)\">身份证正面</button>\n\t\t<button @click=\"btn(2)\">身份证反面</button>\n\t\t<button @click=\"btn(3)\">营业执照正面</button>\n\t\t<button @click=\"btn(4)\">营业执照反面</button>\n\t\t<button type=\"primary\">下一步</button>\n\t</view>\n</template>\n\n<script>\nconst $upload = require('@/components/util/upload.js');\nexport default {\n\tdata() {\n\t\treturn {};\n\t},\n\tmethods: {\n\t\tbtn(e) {\n\t\t\tlet url = this.baseURL + '/business/uploadCertificates';\n\t\t\tlet data = {\n\t\t\t\tphone: '11111',// 手机号\n\t\t\t\ttype: e//  type=1(身份证正面) type=2(身份证反面) type=3(营业执照正面) type=4(营业执照反面)\n\t\t\t};\n\n\t\t\tuni.chooseImage({\n\t\t\t\t// 调用选择图片的方法\n\t\t\t\tsuccess: chooseImageRes => {\n\t\t\t\t\tconst tempFilePaths = chooseImageRes.tempFilePaths[0]; // 获取当前选择的图片临时地址，仅选择一张。\n\t\t\t\t\t$upload.upload(url, tempFilePaths, data, res => {\n\t\t\t\t\t\tconsole.log(res);\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}\n};\n</script>",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "chat/getBusinessChatObj",
    "title": "获取商家的聊天记录对象",
    "description": "<p>获取商家的聊天记录对象</p>",
    "name": "getBusinessChatObj",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n    \"data\": [\n        {\n            \"receive_id\": 1,\n            \"receive_nick\": \"林小锟\",\n            \"receive_avatar\": \"/images/uploads/20200107193492.jpeg\",\n            \"sender_id\": 2,\n            \"sender_nick\": \"杨芤蔻\",\n            \"sender_avatar\": \"/images/uploads/32.jpg\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/chat/getBusinessChatObj"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "post",
    "url": "chat/getUserAndBusinessRecord",
    "title": "用户和商家之间的聊天记录",
    "description": "<p>某个用户和某个商家之间的聊天记录</p>",
    "name": "getUserAndBusinessRecord",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户 id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家 id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n    \"data\": {\n        \"ascending\": [\n            {\n                \"message_id\": 12,\n                \"content\": \"你好\",\n                \"type\": 2,\n                \"send_time\": \"2020-03-05 12:10:22\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"胡小安\",\n                \"receive_nick\": \"杨芤蔻\"\n            },\n            {\n                \"message_id\": 13,\n                \"content\": \"你好！\",\n                \"type\": 3,\n                \"send_time\": \"2020-03-05 12:10:30\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"杨芤蔻\",\n                \"receive_nick\": \"胡小安\"\n            },\n            {\n                \"message_id\": 14,\n                \"content\": \"想问下\",\n                \"type\": 2,\n                \"send_time\": \"2020-03-05 12:10:47\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"胡小安\",\n                \"receive_nick\": \"杨芤蔻\"\n            },\n            {\n                \"message_id\": 15,\n                \"content\": \"什么?\",\n                \"type\": 3,\n                \"send_time\": \"2020-03-05 12:10:54\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"杨芤蔻\",\n                \"receive_nick\": \"胡小安\"\n            }\n        ],\n        \"descending\": [\n            {\n                \"message_id\": 15,\n                \"content\": \"什么?\",\n                \"type\": 3,\n                \"send_time\": \"2020-03-05 12:10:54\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"杨芤蔻\",\n                \"receive_nick\": \"胡小安\"\n            },\n            {\n                \"message_id\": 14,\n                \"content\": \"想问下\",\n                \"type\": 2,\n                \"send_time\": \"2020-03-05 12:10:47\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"胡小安\",\n                \"receive_nick\": \"杨芤蔻\"\n            },\n            {\n                \"message_id\": 13,\n                \"content\": \"你好！\",\n                \"type\": 3,\n                \"send_time\": \"2020-03-05 12:10:30\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"杨芤蔻\",\n                \"receive_nick\": \"胡小安\"\n            },\n            {\n                \"message_id\": 12,\n                \"content\": \"你好\",\n                \"type\": 2,\n                \"send_time\": \"2020-03-05 12:10:22\",\n                \"receive_id\": 2,\n                \"sender_id\": 2,\n                \"sender_nick\": \"胡小安\",\n                \"receive_nick\": \"杨芤蔻\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/chat/getUserAndBusinessRecord"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "post",
    "url": "chat/getUserChatObj",
    "title": "获取用户的聊天记录对象",
    "description": "<p>获取用户的聊天记录对象</p>",
    "name": "getUserChatObj",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n    \"data\": [\n        {\n            \"receive_id\": 1,\n            \"receive_nick\": \"林锟锟\",\n            \"receive_avatar\": \"/images/uploads/20200107164500.jpeg\",\n            \"sender_id\": 2,\n            \"sender_nick\": \"胡小安\",\n            \"sender_avatar\": \"/images/uploads/2.jpg\"\n        },\n        {\n            \"receive_id\": 2,\n            \"receive_nick\": \"杨芤蔻\",\n            \"receive_avatar\": \"/images/uploads/32.jpg\",\n            \"sender_id\": 2,\n            \"sender_nick\": \"胡小安\",\n            \"sender_avatar\": \"/images/uploads/2.jpg\"\n        },\n        {\n            \"receive_id\": 3,\n            \"receive_nick\": \"胡安安\",\n            \"receive_avatar\": \"/images/uploads/33.jpg\",\n            \"sender_id\": 2,\n            \"sender_nick\": \"胡小安\",\n            \"sender_avatar\": \"/images/uploads/2.jpg\"\n        },\n        {\n            \"receive_id\": 5,\n            \"receive_nick\": \"别拿经历谈人生\",\n            \"receive_avatar\": \"/images/uploads/35.jpg\",\n            \"sender_id\": 2,\n            \"sender_nick\": \"胡小安\",\n            \"sender_avatar\": \"/images/uploads/2.jpg\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/chat/getUserChatObj"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "post",
    "url": "chat/receiveMessage",
    "title": "接收消息",
    "description": "<p>接收消息</p>",
    "name": "receiveMessage",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "receive_id",
            "description": "<p>接收id（用户id或商家id）</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>发送类型 type=1 用户 -&gt; 用户 2 用户-&gt; 商家 3 商家-&gt; 用户</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " req :\n receive_id:1\n type:3\n resp:\n {\n     \"code\": \"ok\",\n     \"data\": [\n          {\n               \"message_id\": 4,\n               \"content\": \"好的呢亲\",\n               \"type\": 3,\n               \"send_time\": \"2019-12-16 11:29:06\",\n               \"receive_id\": 1,\n               \"sender_id\": 3,\n               \"sender_nick\": \"胡安安\",\n               \"receive_nick\": \"亲子用户_林小锟\"\n          }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/chat/receiveMessage"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "post",
    "url": "chat/sendMessage",
    "title": "发送消息",
    "description": "<p>发送消息</p>",
    "name": "sendMessage",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "sender_id",
            "description": "<p>发送id（用户id或商家id）</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "receive_id",
            "description": "<p>接收id（用户id或商家id）</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "content",
            "description": "<p>发送内容</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>发送类型 type=1 用户 -&gt; 用户 2 用户-&gt; 商家 3 商家-&gt; 用户</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " req:\n sender_id:1\n receive_id:2\n type:1\n content:这个活动安全么\n\n resp:\n {\n     \"code\": \"ok\",\n     \"data\": [\n          {\n               \"message_id\": 4,\n               \"content\": \"好的呢亲\",\n               \"type\": 3,\n               \"send_time\": \"2019-12-16 11:29:06\",\n               \"receive_id\": 1,\n               \"sender_id\": 3,\n               \"sender_nick\": \"胡安安\",\n               \"receive_nick\": \"亲子用户_林小锟\"\n          }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/chat/sendMessage"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "post",
    "url": "follow/deleteForward",
    "title": "删除转发",
    "description": "<p>删除转发</p>",
    "name": "deleteForward",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "follow_id",
            "description": "<p>follow_id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/deleteForward"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "follow/followActivity",
    "title": "关注活动",
    "description": "<p>关注活动</p>",
    "name": "followActivity",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "firend_id",
            "description": "<p>被关注的活动id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/followActivity"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "follow/followShop",
    "title": "关注店铺",
    "description": "<p>关注店铺</p>",
    "name": "followShop",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "firend_id",
            "description": "<p>被关注的店铺id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/followShop"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "follow/followUser",
    "title": "关注用户",
    "description": "<p>关注用户</p>",
    "name": "followUser",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "firend_id",
            "description": "<p>被关注的用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/followUser"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "follow/forwardArticle",
    "title": "转发文章",
    "description": "<p>转发文章</p>",
    "name": "forwardArticle",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "firend_id",
            "description": "<p>被转发的文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "forward_account",
            "description": "<p>转发理由</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/forwardArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "follow/getFollowInfo",
    "title": "获取关注、点赞、转发",
    "description": "<p>获取关注、点赞、转发</p>",
    "name": "getFollowInfo",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>type = 1:用户2:店铺3:活动 4: 文章点赞 5：文章转发</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/getFollowInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "follow/likeArticle",
    "title": "点赞文章",
    "description": "<p>点赞文章</p>",
    "name": "likeArticle",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "firend_id",
            "description": "<p>被点赞的文章id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/follow/likeArticle"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/follow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "post",
    "url": "manage/getAllManage",
    "title": "获取管理员信息",
    "description": "<p>获取管理员信息</p>",
    "name": "getAllManage",
    "group": "Manage",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/manage/getAllManage"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/manage.js",
    "groupTitle": "Manage"
  },
  {
    "type": "post",
    "url": "manage/login",
    "title": "管理员登录",
    "description": "<p>管理员登录</p>",
    "name": "managelogin",
    "group": "Manage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/manage/login"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/manage.js",
    "groupTitle": "Manage"
  },
  {
    "type": "post",
    "url": "manage/register",
    "title": "注册管理员",
    "description": "<p>注册管理员</p>",
    "name": "register",
    "group": "Manage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/manage/register"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/manage.js",
    "groupTitle": "Manage"
  },
  {
    "type": "post",
    "url": "manage/setPassword",
    "title": "修改管理员密码",
    "description": "<p>修改管理员密码</p>",
    "name": "setPassword",
    "group": "Manage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/manage/setPassword"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/manage.js",
    "groupTitle": "Manage"
  },
  {
    "type": "post",
    "url": "notice/deleteNotice",
    "title": "删除系统通知",
    "description": "<p>删除系统通知</p>",
    "name": "deleteNotice",
    "group": "Notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "notice_id",
            "description": "<p>通知id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/notice/deleteNotice"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/notice.js",
    "groupTitle": "Notice"
  },
  {
    "type": "post",
    "url": "notice/getAllNotice",
    "title": "获取系统通知",
    "description": "<p>获取系统通知</p>",
    "name": "getAllNotice",
    "group": "Notice",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/notice/getAllNotice"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/notice.js",
    "groupTitle": "Notice"
  },
  {
    "type": "post",
    "url": "notice/isUpdated",
    "title": "获取更新信息",
    "description": "<p>获取更新信息</p>",
    "name": "isUpdated",
    "group": "Notice",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/notice/isUpdated"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/notice.js",
    "groupTitle": "Notice"
  },
  {
    "type": "post",
    "url": "notice/sendNotice",
    "title": "发送系统通知",
    "description": "<p>发送系统通知</p>",
    "name": "sendNotice",
    "group": "Notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "sender_id",
            "description": "<p>发送者id（管理员id）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>返回ok</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>{}</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/notice/sendNotice"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/notice.js",
    "groupTitle": "Notice"
  },
  {
    "type": "post",
    "url": "order/addOrder",
    "title": "添加订单",
    "description": "<p>添加订单</p>",
    "name": "addOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "shop_id",
            "description": "<p>店铺id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "activity_id",
            "description": "<p>活动id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "money",
            "description": "<p>实际付款金额</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "count",
            "description": "<p>数量</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "total",
            "description": "<p>总价</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "note",
            "description": "<p>备注</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "req:\nshop_id:1\nactivity_id:1\nuser_id:1\nmoney:199\ncount:1\nprice:199\ntotal:199\nnote:打印发票\nresp:\n{\n   \"code\": \"ok\",\n   \"data\": \"订单生成成功\"\n  }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/addOrder"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/cancelOrder",
    "title": "取消订单",
    "description": "<p>取消订单</p>",
    "name": "cancelOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "req:\norder_id:1\nresp:\n{\n       \"code\": \"ok\",\n       \"data\": \"订单已取消\"\n   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/cancelOrder"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/deleteOrder",
    "title": "删除订单",
    "description": "<p>删除订单</p>",
    "name": "deleteOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/deleteOrder"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/getAllOrder",
    "title": "获取所有订单",
    "description": "<p>获取所有订单</p>",
    "name": "getAllOrder",
    "group": "Order",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " resp:\n {\n     \"code\": \"ok\",\n     \"data\": {\n          \"order\": [\n               {\n                    \"order_id\": 1,\n                    \"store_id\": null,\n                    \"activity_id\": 1,\n                    \"user_id\": 2,\n                    \"serial\": \"123\",\n                    \"state\": 0,\n                    \"pay_type\": 1,\n                    \"pay_time\": \"2019-12-08 16:22:18\",\n                    \"money\": 111,\n                    \"count\": 111,\n                    \"price\": 21,\n                    \"total\": 23,\n                    \"note\": \"备注\",\n                    \"is_comment\": 1,\n                    \"create_time\": \"2019-12-08 16:22:18\",\n                    \"update_time\": \"2019-12-08 16:22:18\",\n                    \"close_time\": \"2019-12-08 16:22:18\",\n                    \"done_time\": \"2019-12-08 16:22:18\"\n               }\n          ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/getAllOrder"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/getAllOrderDetails",
    "title": "获取所有订单详情",
    "description": "<p>获取所有订单详情</p>",
    "name": "getAllOrderDetails",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": "<p>页数(可选参数)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "size",
            "description": "<p>一页展示多少(可选参数)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " resp:\n {\n     \"code\": \"ok\",\n     \"data\": {\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/getAllOrderDetails"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/getShopOrder",
    "title": "获取某个店铺的订单",
    "description": "<p>获取某个店铺的订单</p>",
    "name": "getShopOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "shop_id",
            "description": "<p>店铺id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " req:\n store_id:1\n\n resp:\n\n {\n    \"code\": \"ok\",\n    \"data\": [\n    {\n        \"order_id\": 3,\n        \"business_id\": 1,\n        \"activity_id\": 223,\n        \"user_id\": 113,\n        \"serial\": \"20191208132727\",\n        \"state\": 2,\n        \"pay_type\": 1,\n        \"pay_time\": \"2019-12-08 17:56:00\",\n        \"money\": 199,\n        \"count\": 1,\n        \"price\": 199,\n        \"total\": 199,\n        \"note\": \"打印发票\",\n        \"is_comment\": 0,\n        \"create_time\": \"2019-12-08 17:10:28\",\n        \"update_time\": \"2019-12-08 17:10:28\",\n        \"close_time\": null,\n        \"done_time\": null\n    },\n    {\n        \"order_id\": 4,\n        \"business_id\": 1,\n        \"activity_id\": 223,\n        \"user_id\": 113,\n        \"serial\": \"20191208132303\",\n        \"state\": 0,\n        \"pay_type\": 1,\n        \"pay_time\": \"2019-12-08 17:58:32\",\n        \"money\": 199,\n        \"count\": 1,\n        \"price\": 199,\n        \"total\": 199,\n        \"note\": \"打印发票\",\n        \"is_comment\": 0,\n        \"create_time\": \"2019-12-08 17:13:19\",\n        \"update_time\": \"2019-12-08 19:25:13\",\n        \"close_time\": \"2019-12-08 19:06:34\",\n        \"done_time\": \"2019-12-08 19:06:34\"\n    }\n]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/getStoreOrder"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/getShopOrderDetails",
    "title": "获取某个店铺的详情订单",
    "description": "<p>获取某个店铺的详情订单</p>",
    "name": "getShopOrderDetails",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "shop_id",
            "description": "<p>店铺id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " req:\n store_id:1\n\n resp:\n\n {\n    \"code\": \"ok\",\n    \"data\": [\n\n]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/getShopOrderDetails"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/getUserOrder",
    "title": "获取某个用户的订单",
    "description": "<p>获取某个用户的订单</p>",
    "name": "getUserOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " req:\n user_id:1\n\n resp:\n\n {\n    \"code\": \"ok\",\n    \"data\": [\n    {\n        \"order_id\": 3,\n        \"business_id\": 1,\n        \"activity_id\": 223,\n        \"user_id\": 113,\n        \"serial\": \"20191208132727\",\n        \"state\": 2,\n        \"pay_type\": 1,\n        \"pay_time\": \"2019-12-08 17:56:00\",\n        \"money\": 199,\n        \"count\": 1,\n        \"price\": 199,\n        \"total\": 199,\n        \"note\": \"打印发票\",\n        \"is_comment\": 0,\n        \"create_time\": \"2019-12-08 17:10:28\",\n        \"update_time\": \"2019-12-08 17:10:28\",\n        \"close_time\": null,\n        \"done_time\": null\n    },\n    {\n        \"order_id\": 4,\n        \"business_id\": 1,\n        \"activity_id\": 223,\n        \"user_id\": 113,\n        \"serial\": \"20191208132303\",\n        \"state\": 0,\n        \"pay_type\": 1,\n        \"pay_time\": \"2019-12-08 17:58:32\",\n        \"money\": 199,\n        \"count\": 1,\n        \"price\": 199,\n        \"total\": 199,\n        \"note\": \"打印发票\",\n        \"is_comment\": 0,\n        \"create_time\": \"2019-12-08 17:13:19\",\n        \"update_time\": \"2019-12-08 19:25:13\",\n        \"close_time\": \"2019-12-08 19:06:34\",\n        \"done_time\": \"2019-12-08 19:06:34\"\n    }\n]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/getUserOrder"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/getUserOrderDetails",
    "title": "获取某个用户的详情订单",
    "description": "<p>获取某个用户的详情订单</p>",
    "name": "getUserOrderDetails",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " req:\n user_id:1\n\n resp:\n\n {\n    \"code\": \"ok\",\n    \"data\": [\n\n]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/getUserOrderDetails"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/orderEnd",
    "title": "订单结束",
    "description": "<p>订单结束</p>",
    "name": "orderEnd",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "req:\norder_id:1\nresp:\n{\n       \"code\": \"ok\",\n       \"data\": \"交易已完成\"\n   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/orderEnd"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "order/pay",
    "title": "支付订单",
    "description": "<p>支付订单</p>",
    "name": "pay",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "pay_type",
            "description": "<p>支付类型（1：支付宝 2 ：微信）</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "req:\norder_id:1\npay_type:1\n\nresp:\n{\n       \"code\": \"ok\",\n       \"data\": \"微信支付成功\"\n   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/order/pay"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "resource/addResource",
    "title": "添加闲置资源",
    "description": "<p>添加闲置资源</p>",
    "name": "addResource",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "title",
            "description": "<p>闲置资源名称</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>闲置资源类型 type= 0 策划 1场地 2物料3影像 4其他</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/resource/addResource"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "post",
    "url": "resource/deleteResource",
    "title": "删除闲置资源",
    "description": "<p>删除闲置资源</p>",
    "name": "deleteResource",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "resource_id",
            "description": "<p>闲置资源id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/resource/deleteResource"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "post",
    "url": "resource/getAllResource",
    "title": "获取全部闲置资源",
    "description": "<p>获取全部闲置资源</p>",
    "name": "getAllResource",
    "group": "Resource",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/resource/getAllResource"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "post",
    "url": "resource/getResource",
    "title": "获取某个闲置资源",
    "description": "<p>删除闲置资源</p>",
    "name": "getResource",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "resource_id",
            "description": "<p>闲置资源id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/resource/getResource"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "post",
    "url": "search/activity",
    "title": "通过活动标题搜索活动",
    "description": "<p>通过活动标题搜索活动</p>",
    "name": "searchActivity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>title或 create_time</p>"
          }
        ]
      }
    },
    "group": "Search",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/search/activity"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/activity.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "search/article",
    "title": "通过文章标题或时间搜索文章内容",
    "description": "<p>通过文章标题或时间搜索文章内容</p>",
    "name": "searchArticle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>article_title、article_time</p>"
          }
        ]
      }
    },
    "group": "Search",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/search/article"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/article.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "search/business",
    "title": "通过手机号或昵称搜索商家信息",
    "description": "<p>通过手机号或昵称搜索商家信息</p>",
    "name": "searchBusiness",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>phone、nick</p>"
          }
        ]
      }
    },
    "group": "Search",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/search/business"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "/search/order",
    "title": "通过订单号、 用户名、 店铺名搜索订单",
    "description": "<p>通过订单号、 用户名、 店铺名搜索订单</p>",
    "name": "searchOrder",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>serial、nick、shop_name</p>"
          }
        ]
      }
    },
    "group": "Search",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/search/order"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/order.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "search/shop",
    "title": "通过店名搜索店铺",
    "description": "<p>通过店名搜索店铺</p>",
    "name": "searchShop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          }
        ]
      }
    },
    "group": "Search",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/search/shop"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "search/user",
    "title": "通过手机号或昵称搜索用户信息",
    "description": "<p>通过手机号或昵称搜索用户信息</p>",
    "name": "searchUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>phone、nick</p>"
          }
        ]
      }
    },
    "group": "Search",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/search/user"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "shop/addEmployee",
    "title": "添加员工",
    "description": "<p>添加员工</p>",
    "name": "addEmployee",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "shop_id",
            "description": "<p>店铺id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "permissions",
            "description": "<p>权限  1 客服 2管理员</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/addEmployee"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/addMoney",
    "title": "添加金额、收益金额",
    "description": "<p>添加金额、收益金额</p>",
    "name": "addMoney",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "money",
            "description": "<p>收益金额</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/addMoney"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/deleteEmployee",
    "title": "删除员工",
    "description": "<p>删除员工</p>",
    "name": "deleteEmployee",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>员工id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/deleteEmployee"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/drawMoney",
    "title": "提现",
    "description": "<p>提现</p>",
    "name": "drawMoney",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "money",
            "description": "<p>提现金额</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/drawMoney"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/getAllBill",
    "title": "获取全部店铺账单",
    "description": "<p>获取全部店铺账单</p>",
    "name": "getAllBill",
    "group": "Shop",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/getAllBill"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/getAllEmployee",
    "title": "获取全部员工信息",
    "description": "<p>获取全部员工信息</p>",
    "name": "getAllEmployee",
    "group": "Shop",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/getAllEmployee"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/getAllShopInfo",
    "title": "获取全部店铺信息",
    "description": "<p>获取全部店铺信息</p>",
    "name": "getAllShopInfo",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": "<p>页数(可选参数)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "size",
            "description": "<p>一页展示多少(可选参数)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/getAllShopInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/getBill",
    "title": "获取店铺账单",
    "description": "<p>获取店铺账单</p>",
    "name": "getBill",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "shop_id",
            "description": "<p>店铺id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/getBill"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/getShopInfo",
    "title": "获取店铺信息",
    "description": "<p>获取店铺信息</p>",
    "name": "getShopInfo",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/getShopInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/setEmployeeInfo",
    "title": "修改员工昵称",
    "description": "<p>修改员工信息</p>",
    "name": "setEmployeeInfo",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>员工id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick",
            "description": "<p>昵称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/setEmployeeInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/setEmployeeState",
    "title": "删除员工",
    "description": "<p>删除员工</p>",
    "name": "setEmployeeState",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>员工id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "state",
            "description": "<p>状态 0 冻结 1 激活</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/setEmployeeState"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/setShopAdress",
    "title": "修改店铺地址",
    "description": "<p>修改店铺地址</p>",
    "name": "setShopAdress",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/setShopAdress"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "shop/setShopName",
    "title": "修改店铺名称",
    "description": "<p>修改店铺名称</p>",
    "name": "setShopName",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "shop_name",
            "description": "<p>店铺名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/shop/setShopName"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "user/deleteUser",
    "title": "删除用户",
    "description": "<p>删除用户</p>",
    "name": "deleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/deleteUser"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/getAllUserInfo",
    "title": "获取全部用户信息",
    "description": "<p>获取全部用户信息</p>",
    "name": "getAllUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": "<p>页数(可选参数)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "size",
            "description": "<p>一页展示多少(可选参数)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n        \"data\": {\n            \"user_id\": 1,\n            \"phone\": 1775913932,\n            \"pwd\": \"123456\",\n            \"nick\": \"林小锟\",\n            \"sex\": \"男\",\n            \"pay_pwd\": 123456,\n            \"birthday\": \"1997-12-21 00:00:00\",\n            \"avatar\": \"\",\n            \"qq\": 822202522,\n            \"coin\": 9999,\n            \"state\": 1,\n            \"create_time\": \"2019-12-18 00:00:00\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/getAllUserInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/getUserInfo",
    "title": "获取用户信息",
    "description": "<p>获取用户信息</p>",
    "name": "getUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n        \"data\": {\n            \"user_id\": 1,\n            \"phone\": 1775913932,\n            \"pwd\": \"123456\",\n            \"nick\": \"林小锟\",\n            \"sex\": \"男\",\n            \"pay_pwd\": 123456,\n            \"birthday\": \"1997-12-21 00:00:00\",\n            \"avatar\": \"\",\n            \"qq\": 822202522,\n            \"coin\": 9999,\n            \"state\": 1,\n            \"create_time\": \"2019-12-18 00:00:00\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/getUserInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/login",
    "title": "登录",
    "description": "<p>登录</p>",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n    \"data\": {\n        \"msg\": \"登录成功\",\n        \"info\": {\n            \"user_id\": 44,\n            \"phone\": \"822202522@qq.com\",\n            \"pwd\": \"41543f13b1de57f6e02a2eb519d8d47d\",\n            \"nick\": \"亲子用户_19546\",\n            \"sex\": \"男\",\n            \"pay_pwd\": null,\n            \"birthday\": \"2000-01-01 00:00:00\",\n            \"avatar\": \"/images/default_avatar_user.png\",\n            \"qq\": null,\n            \"coin\": 100,\n            \"state\": 1,\n            \"create_time\": \"2020-03-19 22:35:27\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/login"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/register",
    "title": "注册",
    "description": "<p>亲子用户注册</p>",
    "name": "register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"code\": \"ok\",\n    \"data\": \"注册成功\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/register"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/business/updatePhoneByBusinessID",
    "title": "通过用户id修改手机号码",
    "description": "<p>通过用户id 修改手机号码</p>",
    "name": "updatePhoneByBusinessID",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "newphone",
            "description": "<p>新手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "business_id",
            "description": "<p>商家id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/business/updatePhoneByBusinessID"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/business.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/updatePhoneByUserID",
    "title": "通过用户id修改手机号码",
    "description": "<p>通过用户id修改手机号码</p>",
    "name": "updatePhoneByUserID",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "newphone",
            "description": "<p>新手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"code\":\"ok\",\"data\":\"修改成功\"}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/updatePhoneByUserID"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/updateUserInfo",
    "title": "修改用户信息",
    "description": "<p>修改用户信息</p>",
    "name": "updateUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>类型 (0:修改手机号 1:修改密码,2:修改昵称,3:修改性别,4:修改支付密码,5:修改生日,6:修改qq,7:修改乐旅币,8:修改账号状态)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号(可选)  type=0</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码(可选) type=1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick",
            "description": "<p>昵称(可选) type=2</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sex",
            "description": "<p>性别(可选) type=3</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "payPassword",
            "description": "<p>支付密码(可选) type=4</p>"
          },
          {
            "group": "Parameter",
            "type": "datetime",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日(可选) type=5</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "qq",
            "description": "<p>qq账号(可选) type=6</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "coin",
            "description": "<p>乐旅币(可选) type=7</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "state",
            "description": "<p>账号状态(0:冻结，1:正常)(可选) type=8</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "修改手机号",
          "content": "request：\n   data: {\n         type:0,\n         phone:17759131234,\n         newphone:18344991234\n    }\n\n response：\n {\n    \"code\": \"ok\",\n    \"data\": {\n        \"msg\": \"手机号修改成功\"\n    }\n  }",
          "type": "json"
        },
        {
          "title": "修改密码",
          "content": "request：\n data: {\n    type: 1\n    phone: 17759131234\n    password: 123456\n}\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"密码修改成功\"\n        }\n     }",
          "type": "json"
        },
        {
          "title": "修改昵称",
          "content": "request：\n data: {\n    type: 2\n    phone: 17759131234\n    nick: 林小锟\n}\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"昵称修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改性别",
          "content": "request：\n\n data: {\n    type: 3\n    phone: 17759131234\n    sex: '男'\n}\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"性别修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改支付密码",
          "content": "request：\n\n\n data: {\n    type: 4\n    phone: 17759131234\n    payPassword: 666666\n}\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"支付密码修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改生日",
          "content": "request：\n\n data: {\n    type: 5\n    phone: 1777778822\n    birthday: '1997-12-21'\n\n}\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"生日修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改qq",
          "content": "request：\n\n data: {\n    type: 6\n    phone: 1777778822\n    qq: 88888888\n}\n\nresponse：\n {\n    \"code\": \"ok\",\n    \"data\": {\n        \"msg\": \"qq修改成功\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "修改乐旅币",
          "content": "request：\n data: {\n    type: 7\n    phone: 1777778822\n    coin: 666\n}\nresponse：\n {\n        \"code\": \"ok\",\n        \"data\": {\n            \"msg\": \"乐旅币修改成功\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "修改账号状态",
          "content": "request：\n\n data: {\n    type: 8\n    phone: 1777778822\n    state: 0\n}\nresponse：\n {\n       \"code\": \"ok\",\n            \"data\": {\n            \"msg\": \"账号状态修改成功\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/user/updateUserInfo"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/uploadAvatar",
    "title": "上传头像",
    "description": "<p>上传用户头像</p>",
    "name": "uploadAvatar",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "formData",
            "description": "<p>formData</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "前端：\n<input type=\"file\" name=\"file\" id=\"file\">\nvar baseURL = \"http://dkcloud.xyz/user/uploadAvatar\";\nfunction uploadImg() {\n       let file = document.getElementById('file');\n       let formData = new FormData();\n       formData.append('file', file.files[0]);\n       formData.append('phone', '177');\n       axios.post(baseURL, formData)\n           .then(res => {\n               console.log(res);\n           })\n   }\nresponse:\n{\n code: \"ok\"\n data: {msg: \"头像修改成功\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/module/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "verify/isVerify",
    "title": "验证邮箱验证码",
    "description": "<p>验证邮箱验证码</p>",
    "name": "isVerify",
    "group": "Verify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱地址</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"code\": \"ok\",\n       \"data\":\"data\": {\n               \"isVerify\": true\n               }\n   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/verify/isVerify"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/verify.js",
    "groupTitle": "Verify"
  },
  {
    "type": "post",
    "url": "verify/sendMailCode",
    "title": "发送邮箱验证码",
    "description": "<p>发送邮箱验证码</p>",
    "name": "sendMailCode",
    "group": "Verify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱地址</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "code",
            "description": "<p>int</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "data",
            "description": "<p>array[object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"code\": \"ok\",\n   \"data\": {\n       \"msg\": \"验证码发送成功\",\n       \"mailCode\": \"2511\"\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://dkcloud.xyz/verify/sendMailCode"
      }
    ],
    "version": "1.0.0",
    "filename": "server/module/verify.js",
    "groupTitle": "Verify"
  }
] });
