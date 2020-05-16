~function () {
    layui.use(['table'], function () {
        var table = layui.table;
        let cols = [
            [{
                type: 'checkbox',
                fixed: 'left'
            }
                , {
                field: 'order_id',
                title: '订单id',
                fixed: 'left',
                sort: true,

            }, {
                field: 'user_id',
                title: '用户id',
                sort: true,

            }, {
                field: 'nick',
                title: '用户昵称',
                sort: true,

            }, {
                field: 'shop_id',
                title: '店铺id',
                sort: true,
            }, {
                field: 'shop_name',
                title: '店铺名称',
                sort: true,
            }, {
                field: 'activity_id',
                title: '活动id',
                sort: true
            }, {
                field: 'serial',
                title: '流水号',

                sort: true
            }, {
                field: 'state',
                title: '订单状态',
                sort: true
            }, {
                field: 'pay_type',
                title: '支付类型',
                sort: true
            }, {
                field: 'pay_time',
                title: '支付时间',
                sort: true
            }, {
                field: 'money',
                title: '实付',
                sort: true
            }, {
                field: 'count',
                title: '数量',
                sort: true
            }, {
                field: 'price',
                title: '单价',
                sort: true
            }, {
                field: 'total',
                title: '总价',
                sort: true
            }, {
                field: 'note',
                title: '备注',
                sort: true
            }, {
                field: 'create_time',
                title: '创建时间',
                sort: true
            }, {
                field: 'update_time',
                title: '更新时间',
                sort: true
            }, {
                field: 'close_time',
                title: '关闭时间',
                sort: true
            }, {
                field: 'done_time',
                title: '结束时间',
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
        // 订单
        table.render({
            elem: '#t_order',
            url: baseUrl + '/order/getAllOrderDetails',
            method: "post",
            cellMinWidth: cellMinWidth,
            toolbar: '#toolbarDemo',
            title: '订单数据表',
            height: height,
            cols: cols,
            limit: limit,
            limits: limits,
            page: page,
            parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                console.log(res);
                return {
                    "code": 0, //解析接口状态
                    "msg": '', //解析提示文本
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
                        url: baseUrl + '/order/deleteOrder',
                        type: 'post',
                        data: {
                            order_id: data.order_id
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
        });
        // 单元格修改事件
        table.on('edit(test)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
            console.log(obj.value); //得到修改后的值
            console.log(obj.field); //当前编辑的字段名
            console.log(obj.data); //所在行的所有相关数据
        });

        table.on('checkbox(test)', function (obj) {
            console.log(obj.checked); //当前是否选中状态
            console.log(obj.data); //选中行的相关数据
            console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        });


        // 订单号搜索
        $('#orderID').bind('input propertychange', function () {
            let keyword = $('#orderID').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_order',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/order' //设置异步接口
                    , id: 't_order'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword,
                        type: 'serial'
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
                // 订单
                table.render({
                    elem: '#t_order',
                    url: baseUrl + '/order/getAllOrderDetails',
                    method: "post",
                    cellMinWidth: cellMinWidth,
                    toolbar: '#toolbarDemo',
                    title: '订单数据表',
                    height: height,
                    cols: cols,
                    limit: limit,
                    limits: limits,
                    page: page,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        console.log(res);
                        return {
                            "code": 0, //解析接口状态
                            "msg": '', //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.data //解析数据列表
                        };
                    },
                    request: request
                });
            }


        });


        // 用户名搜索
        $('#o_userName').bind('input propertychange', function () {
            let keyword = $('#o_userName').val();
            if (keyword != '') {  //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_order',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/order' //设置异步接口
                    , id: 't_order'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword,
                        type: 'nick'
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
                // 订单
                table.render({
                    elem: '#t_order',
                    url: baseUrl + '/order/getAllOrderDetails',
                    method: "post",
                    cellMinWidth: cellMinWidth,
                    toolbar: '#toolbarDemo',
                    title: '订单数据表',
                    height: height,
                    cols: cols,
                    limit: limit,
                    limits: limits,
                    page: page,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        console.log(res);
                        return {
                            "code": 0, //解析接口状态
                            "msg": '', //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.data //解析数据列表
                        };
                    },
                    request: request
                });
            }


        });


        // 店铺名字搜索
        $('#o_businessName').bind('input propertychange', function () {
            let keyword = $('#o_businessName').val();
            //所获得的 tableIns 即为当前容器的实例
            var tableIns = table.render({
                elem: '#t_order',
                method: "post",
                cellMinWidth: cellMinWidth
                , cols: cols
                , url: baseUrl + '/search/order' //设置异步接口
                , id: 't_order'
            });
            //这里以搜索为例
            tableIns.reload({
                where: { //设定异步数据接口的额外参数，任意设
                    keyword: keyword,
                    type: 'shop_name'
                }
                ,
                parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                    return {
                        "code": 0, //解析接口状态
                        "msg": res.code, //解析提示文本
                        "count": res.data.length, //解析数据长度
                        "data": res.data //解析数据列表
                    };
                }
            });

        });

    });
}();