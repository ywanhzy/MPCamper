//远程图片no found情况下指引 
function errImgFun(e, that) {
        var _errImg = e.target.dataset.errImg;
        var _errObj = {};
        _errObj[_errImg] = "https://w.chesudi.com/Public/web/img/onerrorcar.png";
        console.error(e.detail.errMsg + "----" + "----" + _errImg);
        that.setData(_errObj); 
}


module.exports = {
        errImgFun: errImgFun
}  