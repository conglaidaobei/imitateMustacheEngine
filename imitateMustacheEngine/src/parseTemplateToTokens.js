import Scanner from "./Scanner.js";
import nestedTokens from './nestTokens'
/**
 * 模板字符串 ==> 数组
 */
export default function parseTemplateToTokens(templateStr) {
    var tokens = [];
    var scaner = new Scanner(templateStr);
    var words;
    while (!scaner.eos()) {
        words = scaner.scanUtil('{{');
        //遍历到最后会返回一个空字符串 . 排除word不为空
        if (words) tokens.push(['text', words]);
        scaner.scan('{{');

        words = scaner.scanUtil('}}');
        if (words) {
            if(words[0]=='#'){

                tokens.push(['#', words.substring(1)]);
            }else if(words[0]=='/'){
                tokens.push(['/', words.substring(1)]);
            }else{
                tokens.push(['name', words]);
            }
        }
        scaner.scan('}}');
    }
    return nestedTokens(tokens);
}