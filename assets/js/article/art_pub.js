$(function() {
    var layer = layui.layer
    var form = layui.form
    initCate();
    initEditor()
        // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章类别失败！')
                }
                console.log(res);

                // 调用模板引擎
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr);
                form.render()
            }
        })
    }


})