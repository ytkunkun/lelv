~function () {
    layui.use(['table'], function () {
        var table = layui.table;
        let cols = [
            [{
                type: 'checkbox',
                fixed: 'left'
            }, {
                field: 'shop_id',
                title: '商店id',
                sort: true,
                fixed: 'left',

            }, {
                field: 'activity_id',
                title: '商家id',
                sort: true,
            }, {
                field: 'title',
                title: '标题',
                sort: true
            }, {
                field: 'content',
                title: '内容',
                sort: true
            }, {
                field: 'address',
                title: '地址',
                sort: true
            }, {
                field: 'type',
                title: '类型',
                sort: true
            }, {
                field: 'number',
                title: '人数',
                sort: true
            }, {
                field: 'image_url',
                templet: '<div><img style="height: 100%;width: 100%" src="{{d.image_url}}" alt=""></div>',
                event: 'image_url',
                title: '图片',
            }, {
                field: 'max_age',
                title: '最大人数',
                sort: true
            }, {
                field: 'min_age',
                title: '最少人数',
                sort: true
            }, {
                field: 'state',
                title: '状态',
                sort: true
            }, {
                field: 'price',
                title: '价格',
                sort: true
            }, {
                field: 'start_time',
                title: '开始时间',
                templet: function (d) {
                    var date = new Date();
                    date.setTime(d.start_time);
                    return new Date().format('Y-m-d')
                },
                sort: true
            }, {
                field: 'end_time',
                title: '结束时间',
                templet: function (d) {
                    var date = new Date();
                    date.setTime(d.end_time);
                    return new Date().format('Y-m-d')
                },
                sort: true
            }, {
                field: 'create_time',
                title: '创建时间',
                templet: function (d) {
                    var date = new Date();
                    date.setTime(d.create_time);
                    return new Date().format('Y-m-d')
                },
                sort: true
            }, {
                field: 'shop_name',
                title: '商店名称',
                sort: true
            }, {
                field: 'followCount',
                title: '关注数',
                sort: true
            }, {
                fixed: 'right',
                align: 'center',
                width: 120,
                title: '操作',
                toolbar: '#barDemo',

            }
            ]
        ];
        // 活动
        table.render({
            elem: '#t_activity',
            url: baseUrl + '/activity/getAllActivity',
            method: "post",
            toolbar: '#toolbarDemo',
            title: '活动数据表',
            cellMinWidth: cellMinWidth,
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
            },
            request: request
        });


        // 删除编辑
        table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            if (layEvent === 'del') { //删除
                layer.alert('是否删除这条数据', function (index) {
                    $.ajax({
                        url: baseUrl + '/activity/deleteActivity',
                        type: 'post',
                        data: {
                            activity_id: data.activity_id
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

            if (obj.event === 'image_url') {
                console.log(data);
                // layer.msg();
                layer.alert(`<img src="${data.image_url}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }
        });
        // 活动标题搜索
        $('#activityName').bind('input propertychange', function () {
            let keyword = $('#activityName').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_activity',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/activity' //设置异步接口
                    , id: 't_activity'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword,
                        type: 'title'
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
                // 活动
                table.render({
                    elem: '#t_activity',
                    url: baseUrl + '/activity/getAllActivity',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    title: '活动数据表',
                    cellMinWidth: cellMinWidth,
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
                    },
                    request: request
                });

            }


        });
        // 活动时间搜索
        $('#activityTime').bind('input propertychange', function () {
            let keyword = $('#activityTime').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_activity',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/activity' //设置异步接口
                    , id: 't_activity'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword,
                        type: 'create_time'
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
                // 活动
                table.render({
                    elem: '#t_activity',
                    url: baseUrl + '/activity/getAllActivity',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    title: '活动数据表',
                    cellMinWidth: cellMinWidth,
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
                    },
                    request: request
                });

            }


        });

    });


}();