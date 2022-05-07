/**
 * 折叠tokens,即处理 嵌套数据
 * @param {} tokens 
 */
export default function nestedTokens(tokens) {
    var nestedTokens = [];  //结果
    var sections = [];   //栈
    var collector = nestedTokens; //收集器
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token[0]) {
            case '#':
                sections.push(token)    //入栈
                collector.push(token)   // 带 # 的指一条 token数组 并不存入它的嵌套数组[2]内 .
                collector = token[2] = []
                break;
            case '/':
                let session_pop = sections.pop()    //出栈  .接受的session_pop在这里可不要 .
                //收集器指向 上面这句 出栈 后的 那个栈顶 section 的数组[2]的地址 收集它的数据 . 简单来说,就是返回上一层
                //如果栈为空,就表示此时已没有嵌套数组section了.
                //也就是此时要收集到根层了(也就是嵌套数组不是位于 跟数据的最末端,而是[根数据部分1,嵌套数据,根数据部分2])
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens   //因为数组的push是尾插,所以要取最后一个(也就是栈顶,因为最先插的在数组的索引值越小)
                break;
            default:
                /**
                 * 用于以下情况:
                 *  1.没有遇到任何一个 # 符号 
                 *  2.每次遇到了 # 符号之后,但没遇到与之匹配的 / 符号之前 
                 * (也肯定是匹配的,不然格式就错了 ==>比如 : # # / ,这是数据的问题,一定会是与之匹配的 / 符号)
                 */
                collector.push(token)   
                break;
        }

    }
    return nestedTokens;

}