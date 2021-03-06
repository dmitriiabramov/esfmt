// { type: 'TemplateLiteral',
//   quasis:
//    [ { type: 'TemplateElement',
//        value: [Object],
//        tail: false,
//        range: [Object],
//        loc: [Object] },
//      { type: 'TemplateElement',
//        value: [Object],
//        tail: false,
//        range: [Object],
//        loc: [Object] },
//      { type: 'TemplateElement',
//        value: [Object],
//        tail: true,
//        range: [Object],
//        loc: [Object] } ],
//   expressions:
//    [ { type: 'Identifier', name: 'a', range: [Object], loc: [Object] },
//      { type: 'Identifier', name: 'b', range: [Object], loc: [Object] } ],
//   range: [ 0, 23 ],
//   loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 23 } } }
'use strict';Object.defineProperty(exports, '__esModule', { value: true });exports.format = format;
function format(node, context, recur) {
    context.write('`');
    var i = 0;
    var j = 0;

    while (i < node.quasis.length || j < node.expressions.length) {
        recur(node.quasis[i]);
        i += 1;

        if (node.expressions[j]) {
            context.write('${');
            recur(node.expressions[j]);
            context.write('}');
            j++;}}



    context.write('`');}