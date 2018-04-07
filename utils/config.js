//var API_BASE = 'http://iklch.ezagoo.com:16111/'; //正式环境

var API_BASE = 'http://cs.ezagoo.net:8002/';  //测试环境


//http://iklch.ezagoo.com:16111/home/getRecommonendData.ashx?pageIndex=1&pageSize=10

//http://iklch.ezagoo.com:16111/detail/travelguide_detail.ashx?memberguid=&travelGuideGuid=c42f4f6bf6214e79bb214cedd4347bde&token=

// res_code 返回 - 1000 表示需要重新登录
// 200 返回正常数据    其余可根据返回的res_msg相应提示



//error相关
var ERROR_DATA_IS_NULL = "获取数据为空，请重试";

const CONFIG = {
        //请求数据地址  必带参数 token   memberguid
        APP_KEY: {
                AmapKey: "580186a553d30b077a830ac2a9ca6ba7"
        },
        API_URL: {
                GET_INDEX: API_BASE,
                GET_CamperCarAll: API_BASE + 'motorHomesCar/getCamperCarAll.ashx',//住房车列表 (首页)
                GET_CamperCarInfo: API_BASE + 'motorHomesCar/getCamperCarInfo.ashx',//住房车详情
                GET_CampOwerData: API_BASE + 'home/getCampOwerData.ashx', //营地列表（营地）
                GET_CampOwerInfo: API_BASE + 'home/getCampOwerInfo.ashx', //营地详情


                // 124、住房车提交订单
                POST_CamperOrder: API_BASE + 'motorHomesCar/postCamperOrder.ashx',
                // memberguid 会员id
                // bookingPersonName 预定人
                // bookingPersonPhone 预定人手机号
                // carGuid 车型id
                // bTime 预定开始日期2017- 09 - 22
                // eTime  预定结束日期2017- 09 - 22
                // currencyAmount-1 不用电子币支付抵扣
                // totalMoney 总金额
                // invoice  0 不需要邮费 1 需要邮费（不填默认为0）

                GET_MyOrderData: API_BASE + 'motorHomesCar/getMyOrderData.ashx',// 125、住房车我的订单（我的）
                GET_IsCamperOrder: API_BASE + 'motorHomesCar/IsCamperOrder.ashx',// 126、住房车订单验证是否可以支付（支付前调用）
                GET_CamperOrderInfo: API_BASE + 'motorHomesCar/getCamperOrderInfo.ashx',// 127、住房车订单详情接口

                //  130、开锁接口  参数：  memberguid 会员id   deviceId  锁设备id（二维码中获取）
                GET_OpenMotorHomesCar: API_BASE + 'motorHomesCar/openMotorHomesCar.ashx',


                 GET_WxPay: API_BASE + 'mydata/postWxPay.ashx',

                //126、住房车订单验证是否可以支付（支付前调用）memberguid 会员id           orderNo 订单号	
                GET_IsCamperOrder: API_BASE + 'motorHomesCar/IsCamperOrder.ashx',

                // 133、添加发票信息接口
                GET_AddInvoiceInfo: API_BASE + 'motorHomesCar/AddInvoiceInfo.ashx',
                // 传入参数：
                // orderGuid 订单id 
                // headerType   0 企业抬头 1 个人/非企业单位
                // headerTitle   抬头
                // number   纳锐人识别号
                // invoiceFee  发票费用
                // remarks  备注
                // addressee  收件人
                // contactNumber 联系电话
                // detailedAddress 收件详细地址


                //    3、注册（微信） 传入参数：
                //     mobile：手机号  checkcode：验证码   mobiletype 类型 手机类型  0：未知  1：安卓 2 苹果 3小程序   mobiletag：手机唯一码  type 1微信 
                //     openidopenid 必填(微信注册)  unionidunionid 必填(微信注册)password： 密码
                GET_RegToThirdParty: API_BASE + 'account/regToThirdParty.ashx',

                //    4、注册 重发验证码
                //     传入参数：
                //     action: resendmsg固定参数  mobile：手机号  imgCode 图形验证码  
                GET_RegToThirdParty: API_BASE + 'account/reg.ashx',

                //119、图形验证码获取 参数： mark = 1
                GET_SecurityCode: API_BASE + 'SecurityCode.aspx',

                //发送验证码 
                // phone = 18670339102 & mark=9
                // mark 1  支付密码发送 2 第三方登陆授权注册获取验证码  3 商家注册/商家修改手机号修改第二步  4 微信注册 5商家修改手机号(第一步)  6找回密码发送验证码 9 微信版绑定
                GET_SendPhoneCode: API_BASE + 'mydata/sendPhoneCode.ashx',




                //62、第三方登陆授权接口
                // 传入参数：openid=第三方id  photo=头像  nickname=昵称  city=城市  province=省份  sex= 性别0 女 1男  unionid= 第三方unionid   country=国家
                // type=类型 1 微信  phone=手机号(已登录状态下绑定微信 手机号必须填写) registrationId 极光注册id(暂无)

                //res_msg": "200 成功(未绑定继续走下一步注册流程), 101 失败, 102已绑定直接登陆返回登陆信息 103 该微信已绑定其它帐号" 104 该手机号已注册&未绑定 走修改流程(接口59)
                GET_RegToThirdParty: API_BASE + 'account/LoginToThirdParty.ashx',

                GET_CamperRecommend: API_BASE + 'motorHomesCar/getCamperRecommend.ashx',
                GET_RecommonendData: API_BASE + 'home/getRecommonendData.ashx',
                GET_TravelGuideDetail: API_BASE + 'detail/travelguide_detail.ashx',

                //根据code获取openid
                GET_WxOpenId: API_BASE + 'wechat/getWxOpenId.ashx',
                // flag: 0：微信网页版 1 小程序
                // code：微信授权码

                GET_MemberInfoByUnionid: API_BASE + 'wechat/getMemberInfoByUnionid.ashx',
                // flag: 0：微信网页版 1 小程序
                // unionid


                //152、根据微信用户信息 获取unionid及判断微信用户是否已绑定房车行账号
                GET_WeChatLoginInfo: API_BASE + 'wechat/postWeChatLoginInfo.ashx',
                //传入参数： jsonData：微信返回的数据

                //绑定手机号
                GET_BindWxPhone: API_BASE + 'wechat/bindWxPhone.ashx',
                // flag: 0：微信网页版 1 小程序
                // openid：
                // unionid 
                // mobile 手机号
                // code 验证码

                //房车管理app开锁
                GET_Unlock: API_BASE + 'fcxmanage/unlock.ashx',
                //传入参数：
                //         userid 用户id
                // campid 营地id
                // deviceId 锁设备id
                // token


                GET_ARTICLE: API_BASE + '&p=',
                GET_CATEGORY: API_BASE + '&cat='

        },

        //文字提示
        TEST_HINT: {
                ERROR_DATA_IS_NULL: ERROR_DATA_IS_NULL
        }
}

module.exports = CONFIG;
