/**
 * 扫描器类
 */

export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr;
        //类中要加this
        this.pos = 0;  //指针
        this.tail = templateStr;    //尾巴,一开始就是全字符串
    }

    scan(tag) {    //用于跳过  stopTag 字符串长度 的位置
        if (this.tail.indexOf(tag) == 0) {
            this.pos += tag.length;
            //变尾巴
            this.tail = this.templateStr.substring(this.pos);
        }

    }
    scanUtil(stopTag) {
        //遍历前保存原位置
        const pos_backup = this.pos;
        while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
            this.pos++;
            //改变尾巴
            this.tail = this.templateStr.substr(this.pos)   //substr:起始,长度  左闭右开
        }
        return this.templateStr.substring(pos_backup, this.pos)  //substring:起始,结束   左闭右开
    }

    eos() { //end of string     搜寻没到头
        return this.pos >= this.templateStr.length
    }
}