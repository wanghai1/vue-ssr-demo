module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'
    ]],
    'rtc-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'rtc-rule': ({subject}) => {
          // 匹配 rtc 单号 提交格式例如: feat: 完成页面开发#rtc#1818188
          const reg = new RegExp(/#rtc#\d{8}$/);
          return [
            reg.test(subject), // 返回 boolean
            `Your subject should contain rtc message like #rtc#18181888`, // 报错提示
          ];
        },
      },
    },
  ],
}