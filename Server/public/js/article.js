~function () {
    layui.use(['table'], function () {
        var table = layui.table;
        // 社区
        let cols = [
            [{
                type: 'checkbox',
                fixed: 'left'
            }
                , {
                field: 'article_id',
                title: '文章id',
                fixed: 'left',
                sort: true,

            }, {
                field: 'user_id',
                title: '用户id',
                sort: true,

            }, {
                field: 'article_title',
                title: '文章标题',
                sort: true,
            }, {
                field: 'article_content',
                title: '文章内容',
                sort: true,
            }, {
                field: 'article_image',
                title: '图片',
                templet: '<div><img style="height: 100%;" src="{{d.article_image}}" alt=""></div>',
                event: 'article_image',
                sort: true
            }, {
                field: 'article_time',
                title: '时间',

                sort: true
            }, {
                field: 'nick',
                title: '昵称',
                sort: true
            }, {
                field: 'followCount',
                title: '关注数量',
                sort: true
            }, {
                title: '操作',
                toolbar: '#barDemo',
                fixed: 'right',
                align: 'center',
                width: 120,
            }
            ]
        ];
        table.render({
            elem: '#t_article',
            url: baseUrl + '/article/getAllarticle',
            method: "post",
            toolbar: '#toolbarDemo',
            cellMinWidth: cellMinWidth,
            title: '文章数据表',
            height: height,
            cols: cols,
            page: page,
            limit: limit,
            limits: limits,
            parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                return {
                    "code": 0, //解析接口状态
                    "msg": res.code, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.data //解析数据列表
                };
            }, request: request
        });


        // 单元格修改事件
        table.on('edit(test)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
            console.log(obj.value); //得到修改后的值
            console.log(obj.field); //当前编辑的字段名
            console.log(obj.data); //所在行的所有相关数据
        });

        // 删除编辑
        table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            if (layEvent === 'del') { //删除
                layer.alert('是否删除这条数据', function (index) {
                    $.ajax({
                        url: baseUrl + '/article/deleteArticle',
                        type: 'post',
                        data: {
                            article_id: data.article_id
                        },
                        success: res => {
                            console.log(res);
                        },
                        error: err => {
                            console.log(err);
                        }
                    });
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                });
            }
            if (layEvent === 'article_image') {
                console.log(data);
                layer.alert(`<img src="${data.article_image}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }
        });

        table.on('checkbox(test)', function (obj) {
            console.log(obj.checked); //当前是否选中状态
            console.log(obj.data); //选中行的相关数据
            console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        });


        // 文章标题搜索
        $('#articleName').bind('input propertychange', function () {
            let keyword = $('#articleName').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_article',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/article' //设置异步接口
                    , id: 't_article'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword,
                        type: 'article_title'
                    }
                    , page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 0, //解析接口状态
                            "msg": res.code, //解析提示文本
                            "count": res.data.length, //解析数据长度
                            "data": res.data //解析数据列表
                        };
                    }
                });
            } else {
                table.render({
                    elem: '#t_article',
                    url: baseUrl + '/article/getAllarticle',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    cellMinWidth: cellMinWidth,
                    title: '文章数据表',
                    height: height,
                    cols: cols,
                    page: page,
                    limit: limit,
                    limits: limits,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 0, //解析接口状态
                            "msg": res.code, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.data //解析数据列表
                        };
                    }, request: request
                });
            }


        });

        // 文章时间搜索
        $('#articleTime').bind('input propertychange', function () {
            let keyword = $('#articleTime').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_article',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/article' //设置异步接口
                    , id: 't_article'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword,
                        type: 'article_time'
                    }
                    , page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 0, //解析接口状态
                            "msg": res.code, //解析提示文本
                            "count": res.data.length, //解析数据长度
                            "data": res.data //解析数据列表
                        };
                    }
                });
            } else {
                table.render({
                    elem: '#t_article',
                    url: baseUrl + '/article/getAllarticle',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    cellMinWidth: cellMinWidth,
                    title: '文章数据表',
                    height: height,
                    cols: cols,
                    page: page,
                    limit: limit,
                    limits: limits,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 0, //解析接口状态
                            "msg": res.code, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.data //解析数据列表
                        };
                    }, request: request
                });
            }


        });

    });


}();