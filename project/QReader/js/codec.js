/**
 * Created by jun on 2016/11/23.
 */

/**
 * @author  info_together@aliyun.com
 * @description 二维码的识别
 * @param {}
 * @return {}
 */

require.config({
    baseUrl:'js/libs',
    shim:{
        jsQR:{
            deps:[],
            exports:'jsQR'
        }
    },
    paths:{
        "jquery": "jquery-3.0.0.min"

    }
});

require(['jsQR','UTF8To16',"jquery"],function (jsQR,UTF8To16,$) {

    load();

    var gCtx = null;
    var gCanvas = null;
    var imageData = null;

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();

    }
    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function drop(e) {
        e.stopPropagation();
        e.preventDefault();
        // alert(e.dataTransfer);
        var dt = e.dataTransfer;
        var files = dt.files;
        var reader=handleFiles(files);
        // console.log(reader);

    }
    function handleFiles(f) {
        var o = [];
        for (var i = 0; i < f.length; i++) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {

                    // QR.qrcode.decode(e.target.result);
                    console.log(decodeURI(e.target.result));
                    // console.log(jsQR.decodeQRFromImage(e.target.result,100,100));

                    var txt = e.target.result;
                    // var img = document.createElement("img");
                    // img.src = txt;
                    // document.getElementById("res").appendChild( img );
                    var canvas = document.getElementById("qr-canvas");
                    var gctx=canvas.getContext('2d');
                    gctx.clearRect(0,0,200,200);

                    var myImage=new Image();
                    myImage.onload=function () {
                        gctx.drawImage(myImage,0,0,200,200);
                        var myImageData = gctx.getImageData(0, 0, 200, 200);
                        gctx.clearRect(0,0,200,200);
                        console.log(myImageData.data);
                        var decoded=jsQR.decodeQRFromImage(myImageData.data,myImageData.width,myImageData.height);
                        console.log(UTF8To16.utf8ToUtf16(decoded));
                        alert(UTF8To16.utf8ToUtf16(decoded));

                    };
                    myImage.src=txt;


                };
            })(f[i]);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f[i]);
            console.log(reader.result);
            return reader;
        }
    }

    // function readAsDataURL(file){
    //     //检验是否为图像文件
    //     // var file = document.getElementById("file").files[0];
    //     if(!/image\/\w+/.test(file.type)){
    //         alert("看清楚，这个需要图片！");
    //         return false;
    //     }
    //     var reader = new FileReader();
    //     //将文件以Data URL形式读入页面
    //     reader.readAsDataURL(file);
    //     reader.onload=function(e){
    //         var result=document.getElementById("result");
    //         //显示文件
    //         result.innerHTML='<img src="' + this.result +'" alt="" />';
    //     }
    // }



    function initCanvas(ww, hh) {
        gCanvas = document.getElementById("qr-canvas");
        gCanvas.addEventListener("dragenter", dragenter, false);
        gCanvas.addEventListener("dragover", dragover, false);
        gCanvas.addEventListener("drop", drop, false);

        var w = ww;
        var h = hh;
        gCanvas.style.width = w + "px";
        gCanvas.style.height = h + "px";
        gCanvas.width = w;
        gCanvas.height = h;
        gCtx = gCanvas.getContext("2d");
        gCtx.clearRect(0, 0, w, h);
        imageData = gCtx.getImageData(0, 0, 200, 200);
        console.log(imageData);
        // console.log(jsQR.decodeQRFromImage(imageData.data,imageData.width,imageData.height));
    }



    function load() {
        console.log("enter" +
            " ");
        initCanvas(200, 200);
//         QR.qrcode.success = function (d) {
// //            alert('javascript读出的二维码信息为：' + utf8ToUtf16(d));
//
//
//         };
//         QR.qrcode.error = function (d) {
//             alert('读取二维码信息错误：' + UTF8To16.utf8ToUtf16(d))
//         };
//         QR.qrcode.callback = function (d, status) {
//             alert('读取二维码信息' + (status == 1 ? '成功' : '失败') + '：'+
//                 '\n'+'二维码信息为：' + UTF8To16.utf8ToUtf16(d));
// //            window.clipboardData.setData("Text", utf8ToUtf16(d));
// //                    alert(utf8ToUtf16(d));
//             var decodeURL=UTF8To16.utf8ToUtf16(d);
// //
// //              判断是不是URL
//             var strRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
//             var re = new RegExp(strRegex);
//
//             if(re.test(decodeURL)){
//                 window.open(decodeURL);
//             }else {
// //                alert('not url');
//             }
//
//
//         };
//         QR.qrcode.decode("meqrthumb.png");
    }

});