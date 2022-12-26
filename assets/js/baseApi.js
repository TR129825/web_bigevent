// 每次调用$.post()或$.get()或$.ajax()都会先调用ajaxPrefilter()
// 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

})