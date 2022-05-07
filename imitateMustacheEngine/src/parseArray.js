
import lookup from './lookup';
import renderTemplate from './renderTemplate';

/**
 * 处理 带 # 的token(不是tokens),递归调用renderTemplate,调用次数由data决定(data的元素个数)
 * token;['#','student',[..]]                           
 * 如果data形式如下,则递归调用递归调用renderTemplate方法3次
 *      var data1 = {           
            students: [
                { 'name': '张三', 'hobbies': ['游泳', '剑圣'] },
                { 'name': '李四', 'hobbies': ['吃饭', '看书', '吃鸡'] },
                { 'name': '王五', 'hobbies': ['睡觉', '写字'] }
            ]
        };

 * @param {*} token 
 * @param {*} data 
 */
export default function parseArray(token, data) {
    return lookup(data, token[1]).reduce((res, curInfo) => { //提取key 对应的 数据数组,并对数组的每一个元素进行遍历
        return res += renderTemplate(token[2], {
            ...curInfo, //展开原来的数据(...对基本数据类型是深拷贝,对引用类型是浅拷贝.这里是字符串,是深拷贝).
            '.': curInfo  //并且 能用...打开并用大括号{}包裹 [也就是先打散,再组装.还是源对象嘛~~] ===>等价于 该形参位置直接写源对象 curInfo ,只是多增加了一个 '.':curInfo 属性来解决当toekn[2]的值是点 .  时,能获取到相应的值,因为再lookyo中,对于keyName 是 点. 的时候,dataObj[.]如果这里不添加这个属性 ,就会因为不存在ley为.从而获取不到值了  
        })
    }, '')
}