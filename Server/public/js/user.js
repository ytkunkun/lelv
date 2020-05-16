~function () {
    layui.use(['table', 'form', 'layer'], function () {
        let table = layui.table, form = layui.form, layer = layui.layer;

        let cols = [
            [
                {
                    type: 'checkbox',
                    fixed: 'left',
                }, {
                field: 'user_id',
                title: '用户id',
                // event: 'user_id',
                fixed: 'left',
                sort: true,
            }, {
                field: 'phone',
                title: '手机号',
                sort: true,
                edit: 'text',
            }, {
                field: 'nick',
                title: '昵称',
                edit: 'text',
                sort: true
            }, {
                field: 'pwd',
                title: '密码',
                templet: '<div>******</div>',

            }, {
                field: 'pay_pwd',
                title: '支付密码',
                templet: '<div>******</div>',

            },
                {
                    field: 'sex',
                    title: '性别',
                    templet: '#switch_sex',
                    unresize: true
                },
                {
                    field: 'birthday',
                    title: '生日',
                    templet: function (d) {
                        var date = new Date();
                        date.setTime(d.birthday);
                        return new Date().format('Y-m-d')
                    },
                    sort: true
                }, {
                field: 'avatar',
                title: '头像',
                templet: '<div><img style="height: 100%;border-radius: 50%" src="{{d.avatar}}" alt=""></div>',
                event: 'avatar',
                // edit: 'text'
            }, {
                field: 'qq',
                title: 'QQ',
                edit: 'text',
                sort: true
            }, {
                field: 'coin',
                title: '乐旅币',
                edit: 'text',
                sort: true
            },
                {
                    field: 'state',
                    title: '账户状态',
                    templet: '#switch_state',
                    unresize: true
                }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#barDemo',
                width: 120,
            }
            ]
        ];
        table.render({
            elem: '#t_user',
            url: baseUrl + '/user/getAllUserInfo',
            method: "post",
            toolbar: '#toolbarDemo',
            cellMinWidth: cellMinWidth,
            height: height,
            limit: limit,
            limits: limits,
            title: '用户数据表',
            cols: cols,
            page: page,
            parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                return {
                    "code": 0, //解析接口状态
                    "msg": res.code, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.data //解析数据列表
                };
            },
            request: request,
        });

        //监听是否激活
        form.on('switch(state)', function (obj) {

            console.log(this.value);
            let phone = this.value;
            $.ajax({
                url: baseUrl + '/user/updateUserInfo',
                type: 'post',
                data: {
                    type: 8,
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
            console.log();
            console.log(this.value)
            let phone = this.value;
            $.ajax({
                url: baseUrl + '/user/updateUserInfo',
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

        // 单元格修改事件
        table.on('edit(test)', function (obj) {
            //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
            // console.log('修改后的值', obj.value); //得到修改后的值
            // console.log('当前编辑的字段名', obj.field); //当前编辑的字段名
            // console.log('相关数据', obj.data); //所在行的所有相关数据
            setUserDate(obj.field, obj.data);
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
                        url: baseUrl + '/user/deleteUser',
                        type: 'post',
                        data: {
                            user_id: data.user_id
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
                        url: baseUrl + '/user/updateUserInfo ',
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
                // layer.alert(`<input type="text" id="test1">`);
            }
        });
        // 用户昵称搜索
        $('.search-u-nick').bind('input propertychange', function () {
            let keyword = $('.search-u-nick').val();
            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_user',
                    method: "post",
                    cellMinWidth: cellMinWidth,
                    cols: cols,
                    url: baseUrl + '/search/user',
                    id: 't_user'
                });
                //这里以搜索为例
                tableIns.reload({
                    where: { //设定异步数据接口的额外参数，任意设
                        keyword: keyword, type: 'nick'
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
                    },
                    request: request
                });
            } else {
                table.render({
                    elem: '#t_user',
                    url: baseUrl + '/user/getAllUserInfo',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    cellMinWidth: cellMinWidth,
                    height: height,
                    limit: limit,
                    limits: limits,
                    title: '用户数据表',
                    cols: cols,
                    page: page,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 0, //解析接口状态
                            "msg": res.code, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.data //解析数据列表
                        };
                    },
                    request: request,
                });
            }
        });

        // 用户手机号搜索
        $('.search-u-phone').bind('input propertychange', function () {
            let keyword = $('.search-u-phone').val();

            if (keyword != '') {
                //所获得的 tableIns 即为当前容器的实例
                var tableIns = table.render({
                    elem: '#t_user',
                    method: "post"
                    ,
                    cellMinWidth: cellMinWidth
                    , cols: cols
                    , url: baseUrl + '/search/user' //设置异步接口
                    , id: 't_user'
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
                table.render({
                    elem: '#t_user',
                    url: baseUrl + '/user/getAllUserInfo',
                    method: "post",
                    toolbar: '#toolbarDemo',
                    cellMinWidth: cellMinWidth,
                    height: height,
                    limit: limit,
                    limits: limits,
                    title: '用户数据表',
                    cols: cols,
                    page: page,
                    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 0, //解析接口状态
                            "msg": res.code, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.data //解析数据列表
                        };
                    },
                    request: request,
                });
            }

        });
    });


    function setUserDate(target, data) {
        console.log(data);
        let params; // 定义传入的参数
        switch (target) {
            case 'phone': {
                // 通过id修改手机号
                $.ajax({
                    url: baseUrl + '/user/updatePhoneByUserID',
                    type: 'post',
                    data: {
                        newphone: data.phone,
                        user_id: data.user_id
                    },
                    success: res => {
                        console.log(res);
                    }
                });
            }
                break;
            case 'nick': {
                params = {
                    type: 2,
                    phone: data.phone,
                    nick: data.nick
                };
            }
                break;
                break;
            case 'birthday': {
                params = {
                    type: 5,
                    phone: data.phone,
                    birthday: data.birthday
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
            case 'qq': {
                params = {
                    type: 6,
                    phone: data.phone,
                    qq: data.qq
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
            url: baseUrl + '/user/updateUserInfo ',
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