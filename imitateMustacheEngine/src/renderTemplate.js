/**
 * 数据数组 ==> dom(相应变量的值都已完成幅值)
 */

import lookup from './lookup';
import parseArray from './parseArray';
export default function renderTemplate(tokens, data) {
    let result = ''
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token[0] == 'text') {
            result += token[1];   //下标0为类型,1 为内容,2为token(或者叫dom样式数组)
        } else if (token[0] == 'name') {
            result += lookup(data,[token[1]])
        } else {
            result +=parseArray(token,data)
        
        }
    }
    return result;
    // console.log(result);
}