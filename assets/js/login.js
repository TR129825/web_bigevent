$(function() {
    // 点击“去注册链接”
    $('#link_login').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_reg').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //  从layui中获取form对象
    var form = layui.form
        // 从layui中获取layer
    var layer = layui.layer
        // 通过form.verify（）函数自定义校验规则
    form.verify({
        // 自定义pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // value 是当前确认密码框的内容
            var pwdd = $('.reg-box [name=password]').val()
            if (pwdd != value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起Ajax请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_reg').click()
        })
    })

    // 监听登录表单提交事件
    $('#form_login').on('submit', function(e) {
        //    阻止默认提交行为
        e.preventDefault();
        // 发起Ajax请求
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})