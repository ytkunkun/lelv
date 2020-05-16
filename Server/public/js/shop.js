~function () {
    layui.use(['table'], function () {
        var table = layui.table;
        let cols = [
            [{
                type: 'checkbox',
                fixed: 'left'
            }
                , {
                field: 'shop_id',
                title: '店铺id',
                sort: true,
            }, {
                field: 'business_id',
                title: '商家id',
                sort: true,
            }, {
                field: 'shop_name',
                title: '店铺名称',
                edit: 'text',
                sort: true

            }, {
                field: 'create_time',
                title: '创建时间',

                sort: true
            }, {
                field: 'address',
                title: '地址',
                edit: 'text',
                sort: true
            }, {
                field: 'money',
                title: '店铺余额',

            }
            ]
        ];
        // 店铺
        table.render({
            elem: '#t_shop',
            url: baseUrl + '/shop/getAllShopInfo',
            method: "post",
            toolbar: '#toolbarDemo',
            cellMinWidth: cellMinWidth,
            title: '店铺数据表',
            height: height,
            limit: limit,
            limits: limits,
            cols: cols,
            page: page,
            parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                console.log(res);
                return {
                    "code": 0, //解析接口状态
                    "msg": res.code, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.data //解析数据列表
                };
            },
            request: request
        });

        // 单元格修改事件
        table.on('edit(test)', function (obj) {
            setShopDate(obj.field, obj.data);
        });
        // 商家手机号搜索
        $('#shopName').bind('input propertychange', function () {
            let keyword = $('#shopName').val();
            if (keyword != '') {    //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_shop',
                    method: "post",
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/shop' //设置异步接口
                    , id: 't_shop'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword
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
            } else {     // 店铺
                table.render({
                    elem: '#t_shop',
                    url: baseUrl + '/shop/getAllShopInfo',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    cellMinWidth: cellMinWidth,
                    title: '店铺数据表',
                    height: height,
                    limit: limit,
                    limits: limits,
                    cols: cols,
                    page: page,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        console.log(res);
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

    function setShopDate(target, data) {
        let params; // 定义传入的参数
        if (target == 'shop_name') {
            params = {
                business_id: data.business_id,
                shop_name: data.shop_name
            };
            $.ajax({
                url: baseUrl + '/shop/setShopName',
                type: 'post',
                data: params,
                success: res => {
                    console.log(res);
                },
                error: err => {
                    console.log(err);
                }
            });
        } else if (target == 'address') {
            params = {
                business_id: data.business_id,
                address: data.address
            };

            $.ajax({
                url: baseUrl + '/shop/setShopAdress',
                type: 'post',
                data: params,
                success: res => {
                    console.log(res);
                },
                error: err => {
                    console.log(err);
                }
            });
        }

    }

}();