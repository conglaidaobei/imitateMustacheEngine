/**
 * 转换tokens  .处理 连续点  a.b.c
 * @param {*} dataObj 
 * @param {*} keyName 
 */         //这里的 处理的 . 是指 对象的取值的那种点.
export default function lookup(dataObj, keyName) {
    if (keyName.indexOf('.') != -1 && keyName!='.') {   //不等于 '.' 是指token里的 name: '.' 的这个点
        return keyName.split('.')
        .reduce((total, cur) =>  total[cur]
        , dataObj)
    }
    return dataObj[keyName]
}

/**
 *     renderTemplate(tokens,data)
       let res= lookup({
            m:{
                n:{
                    p:123
                }
            }
        },'m.n.p')
        console.log(res);   //123
 */