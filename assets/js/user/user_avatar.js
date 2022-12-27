$(function() {
    var layer = layui.layer
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)
        // 为上传按钮添加点击事件
    $('#btnChooseImage').on('click', function() {
            $('#file').click()
        })
        // 为文件选择框绑定change事件
    $('#file').on('change', function(e) {
            var filelist = e.target.files;
            if (filelist.length === 0) {
                return layer.msg('请选择照片')
            }
            // 1.拿到用户选择的文件
            var file = e.target.files[0];
            //  2.将文件转化为路径
            var imgURL = URL.createObjectURL(file);
            // 3.重新初始化裁剪区域
            $image.cropper('destroy').attr('src', imgURL).cropper(options)
        })
        // 为上传确定按钮添加点击事件
    $('#btnUpload').on('click', function() {
        // 1.拿到用户裁剪后的头像
        var dataURL = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            }).toDataURL('image/png')
            // 2.调用接口将头像上传服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })
    })

})