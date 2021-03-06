'use strict';var _createClass = require('babel-runtime/helpers/create-class')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];Object.defineProperty(exports, '__esModule', { value: true });var _invariant = require('./invariant');var _invariant2 = _interopRequireDefault(_invariant);var 

BlockComments = (function () {
    function BlockComments(context, blockNode) {_classCallCheck(this, BlockComments);
        this.context = context;
        this.blockNode = blockNode;

        // Define left and right ranges for the current block
        if (blockNode.type === 'Program') {
            this.leftRange = 0;
            this.rightRange = context.maxRange();} else 
        {
            this.leftRange = blockNode.range[0];
            this.rightRange = blockNode.range[1];}}



    /**
     * Print Leading comments for the given node.
     *
     * Leading comments are the comments above the node of the block
     * @example
     *
     *      // I'm a leading comment
     *      / * me too * /
     *      someBlockNode() { ... };
     *
     * Criteria:
     * Any comment that has
     *  1. comment.range[0] > previousNode.range[0]
     *      // take the left range of the prev node
     *      // we assume that its own comments were already extracted
     *      // @see https://github.com/eslint/espree/issues/41
     *
     *      AND
     *
     *  2. comment.range[0] < node.range[0]
     *
     * if it is the first node in the block then
     *  3. block.range[0] < comment.range[0]
     */_createClass(BlockComments, [{ key: 'printLeading', value: 
        function printLeading(node, prev) {var _this = this;
            var comments = [];
            var match = [];

            var leftRange = prev && prev.range[0] || this.leftRange;
            var rightRange = node.range[0];

            this.context.comments.forEach(function (comment) {
                if (comment.range[0] >= leftRange && comment.range[0] < rightRange) {
                    match.push(comment);} else 
                {
                    comments.push(comment);}});



            // Remove found comments from the context.comments
            // TODO: move mutating logic to the context and expose a fn doing that
            this.context.comments = comments;

            return match.map(function (comment) {
                return _this.context.getIndent() + 
                _this.printComment(comment) + '\n';}).
            join('');}


        /**
         * Trailing comments are the comments that are on the same line after
         * The node, or the comments within the block after the last node
         * @example
         *  if (true) {
         *      a + b; // i'm the trailing comment
         *      // i am NOT
         *      c + d; /* trailing! * / // i'm the trailing comment too
         *      // so am i
         *  }
         *
         *  Criteria:
         *      1. Same line trailing comments
         *          1.1. comment.range[0] > node.range[0] // includes comments within
         *              AND
         *          1.2 comment.range[0] < next.range[0]
         *              AND
         *          1.3 comment.loc.start.line === node.loc.end.line
         *      2. Comments after the node
         *          2.1 comment.range[0] > node.range[0]
         *          2.2 comment.range[1] < next.range[0]
         *
         */ }, { key: 'printTrailing', value: 
        function printTrailing(node, prev, next) {var _this2 = this;
            var sameLine = [];
            var after = [];
            var comments = [];
            var result = '';

            var leftRange = node.range[0];
            var rightRange = next && next.range[0] || this.rightRange;


            this.context.comments.forEach(function (comment) {
                if (comment.range[0] > leftRange && comment.range[0] < rightRange) {
                    if (comment.loc.start.line === node.loc.end.line) {
                        return sameLine.push(comment);}


                    if (next) {
                        // that's a leading comment of the next node
                        // not trailing comment of this node
                        return comments.push(comment);}


                    after.push(comment);} else 
                {
                    comments.push(comment);}});



            (0, _invariant2['default'])(
            sameLine.filter(function (c) {return c.type === 'Line';}).length <= 1, 
            'there can be only one line comment on the line');


            if (sameLine.length) {
                result = ' ' + sameLine.map(this.printComment.bind(this)).join(' ');}


            after.forEach(function (comment) {
                result += '\n' + _this2.context.getIndent() + 
                _this2.printComment(comment);});


            // remove found comments from context
            this.context.comments = comments;

            return result;} }, { key: 'printComment', value: 


        function printComment(comment) {
            switch (comment.type) {
                case 'Line':
                    return this.printLineComment(comment);
                case 'Block':
                    return this.printBlockComment(comment);}} }, { key: 'printLineComment', value: 



        function printLineComment(comment) {
            return '//' + comment.value;} }, { key: 'printBlockComment', value: 


        function printBlockComment(comment) {
            return '/*' + comment.value + '*/';} }]);return BlockComments;})();exports['default'] = BlockComments;module.exports = exports['default'];