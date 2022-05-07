
import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";


window.myTemplateEngine = {
    render(templateStr, data) {
        //模板字符串 ==>  数组
        var tokens = parseTemplateToTokens(templateStr);
        //数组 ==> dom
        let res = renderTemplate(tokens, data)
        return res
    },
}