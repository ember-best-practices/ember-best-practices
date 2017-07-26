/**
 * @fileOverview Disallow the use of global `$`.
 * @author Steve Calvert
 */
'use strict';

const ALIASES = ['$', 'jQuery'];

/**
 * Determines if this expression matches a global jQuery invocation, either `$` or `jQuery`.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if the expression matches, otherwise false.
 */
function isGlobalJquery(node) {
  return node.callee && ALIASES.includes(node.callee.name);
}

const MESSAGE = 'Do not use global `$` or `jQuery`. Use `Ember.$` instead. Please see the following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-global-jquery.md';

module.exports = {
  docs: {
    description: 'Disallow the use of global `$`',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        if (isGlobalJquery(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
