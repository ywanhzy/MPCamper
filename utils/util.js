
const formatTime = date => {
        if (!date) {
                date = new Date();
        }
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
}

function formatDistance(distance) {
        distance = +distance;
        return distance < 1000 ? Math.round(distance) + 'm' : (distance / 1000).toFixed(1) + 'km';
}
function isPhoneNumber(num) {
        return /^1[34578]\d{9}$/.test(num);
}

//字符串分割成字符串数组
function spiltStr(str) {
        var ret = [];
        var splits = str.split(',');
        for (let i = 0; i < splits.length; i++) {
                ret.push(splits[i]);
        }
        return ret;
}

//计算两个时间的相差天数
//sDate1和sDate2是yyyy-month-day格式  
function dateDifference(sDate1, sDate2) {
        var dateSpan, tempDate, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        // dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
}
//判断是否为空
function isEmpty(value) {
        if (value == undefined || value == null || value == '' || value == 'null' || value == '[]' || value == '{}'){
                return true
        }
        return false
}

module.exports = {
        formatTime: formatTime,
        isPhoneNumber: isPhoneNumber,
        formatDistance: isPhoneNumber,
        spiltStr: spiltStr,
        dateDifference: dateDifference,
        isEmpty: isEmpty
}
