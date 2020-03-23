module.exports = {
  /*
  * 根目录标识
  * 1、标识当前配置文件为最层底的文件，无需向更上一级的文件目录中进行搜索
  * 2、默认eslint的配置文件搜索文件方式是，从目标文件夹进行搜索，遍历内部每一个文件夹，找到配置文件并层叠使用，在跳出本项目，往祖先文件夹进行遍历
  * 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找。
  * */
  root: true,
  /*
  * 运行环境
  * */
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  /**
   * 规则继承
   * http://eslint.cn/docs/user-guide/configuring#extending-configuration-files
   *【】可继承的方式有以下几种
   *【】eslint内置推荐规则，就只有一个，即「eslint:recommended」
   *【】可共享的配置， 是一个 npm 包，它输出一个配置对象。即通过npm安装到node_module中
   *    可共享的配置可以省略包名的前缀 eslint-config-，即实际设置安装的包名是 eslint-config-airbnb-base
   *【】从插件中获取的规则，书写规则为 「plugin:插件包名/配置名」，其中插件报名也是可以忽略「eslint-plugin-」前缀。如'plugin:vue/essential'
   *【】从配置文件中继承，即继承另外的一个配置文件，如'./node_modules/coding-standard/eslintDefaults.js'
   * 继承了 eslint:recommended 的配置【node_modules/eslint/conf/eslint-recommended.js】
   */
  "extends": "eslint:recommended",
  /**
   * 全局变量
   * http://eslint.cn/docs/user-guide/configuring#specifying-globals
   * 【】定义额外的全局，开发者自定义的全局变量，让其跳过no-undef 规则
   * 【】key值就是额外添加的全局变量
   * 【】value值用于标识该变量能否被重写，类似于const的作用。true为允许变量被重写
   * 【】注意：要启用no-global-assign规则来禁止对只读的全局变量进行修改。
   *
   * 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。
   * 如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。
   */
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  /*
  * * 解析器配置项
  * http://eslint.cn/docs/user-guide/configuring#specifying-parser-options
  * 【】这里设置的配置项将会传递到解析器中，被解析器获取到，进行一定的处理。具体被利用到，要看解析器的源码有没有对其进行利用。这里仅仅做了参数定义，做了规定，告诉解析器的开发者可能有这些参数
  * 【】配置项目有：
  * "sourceType": "module",  指定JS代码来源的类型，script(script标签引入) | module（es6的module模块），默认为script。为什么vue的会使用script呢？因为vue是通过babel-loader编译的，而babel编译后的代码就是script方式
  * "ecmaVersion": 6,  支持的ES语法版本，默认为5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
  * */
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    parser: 'babel-eslint',
  },
  /*
  * 规则
  * "off" 或 0 - 关闭规则
  * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  * */
  "rules": {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    "no-var": 2,
    "no-spaced-func": 2,
    // 该规则有两个选项，一个是字符串，一个是对象。
    "semi": [0, 0],
    // 要求或禁止函数圆括号之前有一个空格
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "no-cond-assign": 0,
  },
  /**
   * 针对特定文件的配置
   * 【】可以通过overrides对特定文件进行特定的eslint检测
   * 【】特定文件的路径书写使用Glob格式，一个类似正则的路径规则，可以匹配不同的文件
   * 【】配置几乎与 ESLint 的其他配置相同。覆盖块可以包含常规配置中的除了 extends、overrides 和 root 之外的其他任何有效配置选项，
   */
  overrides: [
    {
      'files': ['bin/*.js', 'lib/*.js'],
      'excludedFiles': '*.test.js',
      'rules': {

      }
    }
  ],
};
