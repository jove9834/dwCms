/*
 * @value 要验证的值
 * @type  要验证的类型
 * passwd: [{ required: false/true, type:'pwd',min='5',max:'9', trigger: 'blur', validator:checkForm}],
 * trigger: 'blur'//失去焦点时，'change'//表单发生变化时
 */
export function checkForm(rule, value, callback){
    var lireg = '';
    let retu = {};
    if(!rule.required && value == ''){
        callback();
        return false;
    }
    switch(rule.type){
        case 'name'://用户名正则，4到16位（字母，数字，下划线，减号）
            lireg = /^[a-zA-Z0-9_-]{4,16}$/;
            if(lireg.test(value)){
                retu = {msg:'名符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的用户名',code:false}
            }
            break;
        case 'bpwd'://密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            lireg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'密码至少6位并包含大写与小写字母，数字，特殊字符等',code:false}
            }
            break;
        case 'pwd'://密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            lireg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'密码至少6位并包含至少一个字母、数字、特殊字符等',code:false}
            }
            break;
        case 'lpwd'://密码强度正则，最少6位
            lireg = /^.*(?=.{6,})(?=.*[0-9A-Za-z]).*$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'密码至少6位数字、字母等',code:false}
            }
            break;
        case '+int'://正整数正则
            lireg = /^\d+$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的正整数',code:false}
            }
            break;
        case '-int'://负正整数正则
            lireg = /^-\d+$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的负正整数',code:false}
            }
            break;
        case 'int'://整数正则
            lireg = /^-?\d+$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确整数',code:false}
            }
            break;
        case 'num'://数字正则,整数也可以是浮点数
            lireg = /^-?\d*\.?\d+$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确数字',code:false}
            }
            value = parseFloat(value);
            if(rule.maxnum < value){
                retu = {msg:'输入的数字不能大于' + rule.maxnum ,code:false}
            }
            if(rule.minnum > value){
                retu = {msg:'输入的数字不能小于' + rule.minnum ,code:false}
            }
            break;
        case 'Email'://Email正则
            lireg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的邮箱',code:false}
            }
            break;
        case 'phone'://手机号正则
            lireg = /^1[34578]\d{9}$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的手机号',code:false}
            }
            break;
        case 'code'://身份证号（18位）正则
            lireg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的18位身份证',code:false}
            }
            break;
        case 'url'://URL正则
            lireg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的url地址',code:false}
            }
            break;
        case 'color'://十六进制颜色正则
            lireg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的颜色值例：‘#FFFFFF’',code:false}
            }
            break;
        case 'qq'://QQ号码正则
            lireg = /^[1-9][0-9]{4,13}$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入5-14位正确的QQ号',code:false}
            }
            break;
        case 'car'://车牌号正则
            lireg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'请输入正确的车牌号',code:false}
            }
            break;
        case 'cn'://包含中文正则
            lireg = /[\u4E00-\u9FA5]/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'只能输入中文',code:false}
            }
            break;
        case 'en'://只能是英文
            lireg = /^[a-zA-Z]{1,}$/;
            if(lireg.test(value)){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'只能输入英文',code:false}
            }
            break;
        case 'date'://只能是日期2018-08-18
            lireg = /^(\d{4})-(\d{2})-(\d{2})$/;
            if(lireg.test(value)){
                let man = parseInt(value.substr(5,2));
                let dat = parseInt(value.substr(8,2));
                console.log(man,dat);
                if(man > 12 || dat > 31){
                    retu = {msg:'只能是日期如：2018-08-18',code:false}
                }else{
                    retu = {msg:'符合规则',code:true}
                }
            }else{
                retu = {msg:'只能是日期如：2018-08-18',code:false}
            }
            break;
        case 'time'://只能是时间18:58:08
            lireg = /^(\d{2}):(\d{2}):(\d{2})$/;
            if(lireg.test(value)){
                let one = parseInt(value.substr(0,2));
                let two = parseInt(value.substr(3,2));
                let three = parseInt(value.substr(6));
                if(one > 24 || two > 60 || three > 60){
                    retu = {msg:'只能是日期如：18:58:08',code:false}
                }else{
                    retu = {msg:'符合规则',code:true}
                }
            }else{
                retu = {msg:'只能是时间如：18:58:08',code:false}
            }
            break;
        case 'dateTime'://只能是日期时间2018-08-18 18:58:08
            
            let str = value.split(" ");
            let yea = str[0];
            let tim = str[1];
            lireg = /^(\d{4})-(\d{2})-(\d{2})$/;//日期
            let liregT = /^(\d{2}):(\d{2}):(\d{2})$/;//时间
            if(lireg.test(yea) && liregT.test(tim)){
                let man = parseInt(yea.substr(5,2));
                let dat = parseInt(yea.substr(8,2));
                
                let one = parseInt(tim.substr(0,2));
                let two = parseInt(tim.substr(3,2));
                let three = parseInt(tim.substr(6));
                
                if(man > 12 || dat > 31 || one > 24 || two > 60 || three > 60){
                    retu = {msg:'只能是日期时间如：2018-08-18 18:58:08',code:false}
                }else{
                    retu = {msg:'符合规则',code:true}
                }
            }else{
                retu = {msg:'只能是日期时间如：2018-08-18 18:58:08',code:false}
            }
            
            break;
        default:
            if(rule.required && value != ''){
                retu = {msg:'符合规则',code:true}
            }else{
                retu = {msg:'不能为空',code:false}
            }
            break;
    }
    if(rule.min && value.length < rule.min){
         retu = {msg:'字符最少需要'+rule.min+'位',code:false}
    }
    if(rule.max && value.length > rule.max){
         retu = {msg:'字符最长只能'+rule.max+'位',code:false}
    }
    if(!retu.code) {
        callback(new Error(retu.msg))
    } else {
        callback()
    }
    
    //console.log(11111);
}

