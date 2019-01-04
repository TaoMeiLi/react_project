# manage_v2017

> 基于2017版UI的商家后台管理系统

* 后端同学应了解第 1 点中的目录结构，并重点阅读第 3 点

## 1. 目录结构

- 发布目录 /public (所有前端路由请求应在服务器上重定向到index.html)
- 通信接口 /api

### `/src`中涉及前端开发的结构

```
    ├ public
    ├ api
    └ src
      ├ images //素材图片
      ├ less //此处只存放一些全局样式，各个组件的样式和其对应组件放置在一起
      ├ components //可复用UI组件或系统级别的模块
      ├ pages //入口和各个页面
      ├ stores //系统层面的state
      ├ utils //网络请求等工具方法
      ├ index.html //入口html，一般不需更改
      └ index.js //入口js，一般不需更改
```

### 开发要点:

- 兼容性测试要求做到 最新chrome、最新firefox、IE(9及以上)，推荐商户使用最新chrome
- 统一样式从 `src/less/vars.less` 中引用，  
  z-index层次统一从 `src/less/z-index.less` 中引用
- 有几个特殊目录(components | utils)，可以直接用首字母大写的简写引用，如 `import PageTitle from 'Components/common/PageTitle';`
- app_requests.js 也可以用简写引用，如 `import { order_getEmplFormInfo, order_getEmplEdit } from 'AppRequests';` 
- 一般来说，所有 ajax 请求都应归纳到 app_requests.js 中调用
- 初始化请求 `${prefix}/app/config` 得到的数据会保存在 store.AppState.config 中
- 所有中英文辅助说明文字都放在组件对应的locale.js里面  
  (命名必须为locale.js或xxx.locale.js)，不得硬编码到组件中
- 样式和locale文件命名应和对应组件一致，但用小写开头; 或直接叫`style.less`和`locale.js`
- `stores/` 中只存放系统层面(全局和报表等大模块)的state，  
  并汇总到其index.js中，各模块通过mobx的inject引用；  
  要注意UI组件等的state不放在里面，如ShopPicker就单独引用其state文件
- 简单的弹出提示，可以使用 store.AppState.alert(msg)
- 页面跳转可以通过 history.push(routePath, stateObject), 目标页面通过 location.state 可接收到 stateObject, 具体文档见 https://github.com/ReactTraining/history
- push() 后因为页面路由相同而不重新加载组件的情况，可通过改为继承 AutoRemountComponent 实现
- `src/images/` 中的素材图片，仅应包含必要的图标、装饰等，会动态变化的示例图片（如头像、卡面）应由ajax返回完整url的外部图片或mock目录图片（api目录支持静态图片，用类似 http://localhost:8081/api/xxx.jpg 访问）
- 公共组件的使用方法可参考 __test__ 单元测试目录中的用例

## 2. 运行命令

- 前端开发时
    + `npm start` - 实时编译，并启动开发预览服务器(http://127.0.0.1:8080)
    + `npm run mock` - 启动接口数据服务器
    + `npm run build` - 发布到 /public
    + 如果安装了新的依赖，应运行`npm shrinkwrap`锁定版本
- 后端预览时
    + `npm run preview` - 启动服务器预览 /public 下的内容(http://127.0.0.1:8080)

### 安装必须依赖

- 安装 [nodejs](https://nodejs.org/en/) 环境后，运行 `npm install`

### 如果在mac电脑上遇到 Error: dyld: Library not loaded

```
Module build failed: Error: dyld: Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dylib
  Referenced from: /path/to/front-end-stack/node_modules/mozjpeg/vendor/cjpeg
  Reason: image not found
```

安装`brew`并运行 `brew install libpng` 以修复这个错误 [ref](https://raw.githubusercontent.com/choonchernlim/front-end-stack/master/README.md)

## 3. 路由规划

*本地判断超过20秒，就认为是请求超时*

### 界面导航

- `/` 首页
- `/login` 登录-选择登录账号


### 前后端通信

> 所有ajax请求的统一前缀为 `/manage2017` (以 dev.server.js定义的为准)，接口细节统一定义在 /api 目录下

- 后端静态服务器(Nginx等)应该统一拦截`OPTIONS`请求，该请求为浏览器在跨域时自动添加的预请求
- 并在响应中返回`Access-Control-Allow-Origin`等允许跨域的头部信息
- 不需要返回响应body，也就是不需要执行业务逻辑消耗时间
- 参考`preview.server.js`中用app.all('*')实现的示例代码

```json
{
    errcode: random(0, 1), // 0 - 业务逻辑合法, 非 0 - 业务逻辑错误
    errmsg: ':)', // 提示信息
    errlevel: 'console', //报错级别： page | alert | console， 默认 page
    result: any // 业务逻辑
}
```

```json
{
    errcode: random(0, 1),
    errmsg: ':)',
    errlevel: 'page',
    result: {
        pageTitle: '页面title', //可选 - 页面标题

        app_nav: { //可选 - 设置页面加载后高亮的侧边栏菜单，一般在GET方法后返回
          level1: 2,
          level2: 0,
          level3: 0
        },

        route: '/some/where', //可选 - 响应后自动跳转到的路由(如果带https?://则刷新跳转页面)
        routeDelay: 3000, //可选 - 自动跳转的延迟时间
        routeAfterMsg: true, //可选 - 先显示通用提示页面，再从提示页面跳转到route
        buttons: [ //可选 - 在 /msg 界面中显示的一组跳转按钮
            {route, label, style?},
            ...
        ],
    }
}
```

```javascript
import requestUtil from '../utils/request';

#工具会自动附加前缀
requestUtil.get('/cities').then(result=>{
    //result in response
});
requestUtil.post('/cities', data).then(result=>{
    //result in response
});

#也可以将以上的get和post方法组合，作为sequence()的第一个参数，一次性顺序访问
requestUtil.sequence(promiseRequests, autoMergeResults=true).then(result=>{
    //a merged result or a results array
});

#错误处理可通过 get 或 post 方法的最后一个errCallback(msg, response)参数处理，如果是 `errcode!==0` 级别的错误也可以通过 catch(exception) 处理

```

## 4. 请求时间打点

- 每次请求会附加 POST 请求一次 `/manage2017/timelog`
- request body 里面包含 time 和 info 两个字段
- time字段表示请求所用毫秒数
- info字段包含了对应的请求信息

```
//请求信息类似于：

time: 205

info: { method: 'GET',
  url: 'http://localhost:8080/manage2017/app/config',
  headers: {},
  referrer: '' }

```

## 5. 单元测试

- 对公共组件、公用方法等，应编写单元测试用例
- 测试用例统一用 `<文件原目录结构>/<文件原名>.spec.js` 命名，存放在 `__test__` 目录下
- 开发过程中可调用 `npm test` 检验，发布编译(npm run build)之前也会自动运行一遍

## 6. 涉及技术

- [react-bootstrap](https://react-bootstrap.github.io/components.html)
- [react-datetime](https://github.com/YouCanBookMe/react-datetime)
- [react-draft-wysiwyg](https://jpuri.github.io/react-draft-wysiwyg/#/)
- [moment](http://momentjs.com/docs)
- [MobX](https://mobx.js.org/)
- [React](https://facebook.github.io/react/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [lodash](https://lodash.com/docs)
- [mobile-utils](https://www.npmjs.com/package/mobile-utils)
- [css modules](https://segmentfault.com/a/1190000004300065)
- [form-serialize](https://github.com/defunctzombie/form-serialize)
- [eslint语法检查](http://eslint.org/docs/rules/)
- [jest](http://facebook.github.io/jest/)
- [enzyme](http://airbnb.io/enzyme/)
- [sinon](http://sinonjs.org)

