~function () {
    layui.use(['table', 'form'], function () {
        var table = layui.table;
        var form = layui.form;
        let cols = [
            [{
                type: 'checkbox',
                fixed: 'left'
            }, {
                field: 'business_id',
                title: '商家id',
                fixed: 'left',
                sort: true,
            }, {
                field: 'phone',
                title: '手机号',
                sort: true,
                edit: 'text',
            }, {
                field: 'pwd',
                title: '密码',
                templet: '<div>******</div>',
            }, {
                field: 'nick',
                title: '昵称',
                edit: 'text',
                sort: true
            }, {
                field: 'sex',
                title: '性别',
                templet: '#switch_sex',
                unresize: true
            }, {
                field: 'avatar',
                templet: '<div><img style="height: 100%;border-radius: 50%" src="{{d.avatar}}" alt=""></div>',
                title: '头像',
                event: 'avatar',
            }, {
                field: 'birthday',
                title: '生日',
                templet: function (d) {
                    var date = new Date();
                    date.setTime(d.birthday);
                    return new Date().format('Y-m-d')
                },
                width: '110',
                sort: true
            }, {
                field: 'state',
                title: '账户状态',
                templet: '#switch_state',
                unresize: true
            }, {
                field: 'create_time',
                title: '创建时间',

                sort: true
            }, {
                field: 'qualification_front',
                templet: '<div><img style="height: 100%;" src="{{d.qualification_front}}" alt=""></div>',
                title: '营业执照正面',
                event: 'qualification_front'

            }, {
                field: 'qualification_back',
                templet: '<div><img style="height: 100%;" src="{{d.qualification_back}}" alt=""></div>',
                title: '营业执照背面',
                event: 'qualification_back'
            }, {
                field: 'idcard_front',
                templet: '<div><img style="height: 100%;" src="{{d.idcard_front}}" alt=""></div>',
                title: '身份证正',
                event: 'idcard_front'
            }, {
                field: 'idcard_back',
                templet: '<div><img style="height: 100%;" src="{{d.idcard_back}}" alt=""></div>',
                title: '身份证反',
                event: 'idcard_back'
            }, {
                field: 'cooperation_type',
                title: '合作类型',
                sort: true
            }, {
                field: 'is_qualification',
                title: '是否认证',
                templet: '#switch_qualification',
                width: 120,
                unresize: true
            }, {
                fixed: 'right',
                title: '操作',
                align: 'center',
                toolbar: '#barDemo',
                width: 120,
            }
            ]
        ];
        // 商家
        table.render({
            elem: '#t_business',
            url: baseUrl + '/business/getAllBusinessInfo',
            method: "post",
            toolbar: '#toolbarDemo',
            title: '商家数据表',
            height: height,
            cellMinWidth: cellMinWidth,
            limit: limit,
            limits: limits,
            cols: cols,
            page: page,
            parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                return {
                    "code": 0, //解析接口状态
                    "msg": res.code, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.data //解析数据列表
                };
            }, request: request
        });

        //监听是否激活
        form.on('switch(state)', function (obj) {

            console.log(this.value)
            let phone = this.value;
            $.ajax({
                url: baseUrl + '/business/updateBusinessInfo',
                type: 'post',
                data: {
                    type: 5,
                    phone: phone,
                    state: obj.elem.checked ? 1 : 0
                },
                success: res => {
                    console.log(res.data);
                }
            });
        });
        //监听性别
        form.on('switch(sex)', function (obj) {

            console.log(this.value)
            let phone = this.value;
            $.ajax({
                url: baseUrl + '/business/updateBusinessInfo',
                type: 'post',
                data: {
                    type: 3,
                    phone: phone,
                    sex: obj.elem.checked ? '男' : '女'
                },
                success: res => {
                    console.log(res.data);
                }
            });
        });
        //监听是否认证
        form.on('switch(qualification)', function (obj) {

            console.log(this.value)
            let phone = this.value;
            $.ajax({
                url: baseUrl + '/business/updateBusinessInfo',
                type: 'post',
                data: {
                    type: 6,
                    phone: phone,
                    qualification: obj.elem.checked ? 1 : 0
                },
                success: res => {
                    console.log(res.data);
                }
            });
        });

        // 单元格修改事件
        table.on('edit(test)', function (obj) {
            //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
            // console.log('修改后的值', obj.value); //得到修改后的值
            // console.log('当前编辑的字段名', obj.field); //当前编辑的字段名
            // console.log('相关数据', obj.data); //所在行的所有相关数据
            setBusinessDate(obj.field, obj.data);
        });
        // 删除编辑
        table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            if (layEvent === 'detail') { //查看
            } else if (layEvent === 'del') { //删除
                layer.alert('是否删除这条数据', function (index) {
                    $.ajax({
                        url: baseUrl + '/business/deleteBusiness',
                        type: 'post',
                        data: {
                            business_id: data.business_id
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
                    //向服务端发送删除指令
                });
            } else if (layEvent === 'edit') { //编辑

                layer.confirm('是否重置密码为888888', {title: '重置密码'}, function () {
                    layer.msg('重置成功');
                    $.ajax({
                        url: baseUrl + '/business/updateBusinessInfo',
                        type: 'post',
                        data: {
                            type: 1,
                            phone: data.phone,
                            password: '888888'
                        },
                        success: res => {
                            console.log(res);
                        },
                        error: err => {
                            console.log(err);
                        }
                    });
                }, function () {
                    console.log(22);
                });

            } else if (layEvent === 'LAYTABLE_TIPS') {
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }

            if (obj.event === 'avatar') {
                console.log(data);
                // layer.msg();
                layer.alert(`<img src="${data.avatar}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }

            if (obj.event === 'qualification_front') {
                console.log(data);
                // layer.msg();
                layer.alert(`<img src="${data.qualification_front}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }
            if (obj.event === 'qualification_back') {
                console.log(data);
                // layer.msg();
                layer.alert(`<img src="${data.qualification_back}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }
            if (obj.event === 'idcard_front') {
                console.log(data);
                // layer.msg();
                layer.alert(`<img src="${data.idcard_front}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }
            if (obj.event === 'idcard_back') {
                console.log(data);
                // layer.msg();
                layer.alert(`<img src="${data.idcard_back}">`, {title: false, type: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
            }
        });

        // 商家昵称搜索
        $('#businessName').bind('input propertychange', function () {
            let keyword = $('#businessName').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_business',
                    method: "post"
                    , cols: cols,
                    cellMinWidth: cellMinWidth
                    , url: baseUrl + '/search/business' //设置异步接口
                    , id: 't_business'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword
                        , type: 'nick'

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
                // 商家
                table.render({
                    elem: '#t_business',
                    url: baseUrl + '/business/getAllBusinessInfo',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    title: '商家数据表',
                    height: height,
                    cellMinWidth: cellMinWidth,
                    limit: limit,
                    limits: limits,
                    cols: cols,
                    page: page,
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
        // 商家手机号搜索
        $('#businessPhone').bind('input propertychange', function () {
            let keyword = $('#businessPhone').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_business',
                    method: "post"
                    , cols: cols,
                    cellMinWidth: cellMinWidth
                    , url: baseUrl + '/search/business' //设置异步接口
                    , id: 't_business'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword
                        , type: 'phone'

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
                // 商家
                table.render({
                    elem: '#t_business',
                    url: baseUrl + '/business/getAllBusinessInfo',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    title: '商家数据表',
                    height: height,
                    cellMinWidth: cellMinWidth,
                    limit: limit,
                    limits: limits,
                    cols: cols,
                    page: page,
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

    function setBusinessDate(target, data) {
        console.log(data);
        let params; // 定义传入的参数
        if (target == 'phone') {
            $.ajax({
                url: baseUrl + '/business/updatePhoneByBusinessID',
                type: 'post',
                data: {
                    newphone: data.phone,
                    business_id: data.business_id
                },
                success: res => {
                    console.log(res);
                }
            });
            return;
        }
        switch (target) {
            case 'nick': {
                params = {
                    type: 2,
                    phone: data.phone,
                    nick: data.nick
                };
            }
                break;

            case 'avatar': {
                params = {
                    type: 9,
                    phone: data.phone,
                    avatar: data.avatar
                };
            }
                break;
            case 'cooperation_type': {
                params = {
                    type: 6,
                    phone: data.phone,
                    cooperation_type: data.cooperation_type
                };
            }
                break;
            case 'coin': {
                params = {
                    type: 7,
                    phone: data.phone,
                    coin: data.coin
                };
            }
                break;

        }
        console.log(params)
        $.ajax({
            url: baseUrl + '/business/updateBusinessInfo',
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
}();