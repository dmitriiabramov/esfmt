/**
 *  {
 *      type: 'ArrowFunctionExpression',
 *      id: null,
 *      params: [{
 *          type: 'Identifier',
 *          name: 'a'
 *      }, {
 *          type: 'Identifier',
 *          name: 'b'
 *      }],
 *      body: {
 *          type: 'BlockStatement',
 *          body: [
 *              [Object]
 *          ]
 *      },
 *      generator: false,
 *      expression: false
 *  }
 */
import {long, short} from '../list';

export function format(node, context, recur) {
    // if (node.id) {
    //     context.write(node.id);
    // }

    let rollback = context.transaction();

    long(node, node.params, context, recur, '()');
    if (context.overflown()) {
        rollback();
        short(node, node.params, context, recur, '()');
    }

    context.write(' => ');
    recur(node.body);
}
