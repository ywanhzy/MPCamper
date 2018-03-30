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
        return /^1\d{10}$/.test(num);
}

//字符串分割成字符串数组
function spiltStr(str) {
        var ret = [];
        var splits = str.split(',');
        for (let i = 0; i < splits.length; i++) {
                ret.push(splits[i]);
        }
        return ret;
};

module.exports = {
        formatTime: formatTime,
        isPhoneNumber: isPhoneNumber,
        formatDistance: isPhoneNumber,
        spiltStr: spiltStr
}
