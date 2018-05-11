
# Javascript编码规范

## 命名规范

### 1.通用命名规则

* 所有变量必须是有意义的英文，严厉禁止拼音；</br>
* 变量命名采用小驼峰法(第一个单词首字母小写，其余单词首字母大写)；</br>
* 变量允许使用公认英文缩写，例如nav；</br>
* 常量必须所有单词大写，并且每个单词间加下划线；</br>
* 类命名必须是大驼峰法(所有单词第一个字母均大写)；</br>
* 私有类的变量属性成员， 建议使用混合式命名，并前面下下划线；</br>
* "on"只能用作事件的命名；</br>
* 所有全局变量必须初始化；</br>
* 保留字以及特有的dom属性不能作为变量名。</br>

### 2.变量命名规范

* 类型前缀 + 有意义的单词；</br>
* 字符串：sXXX，如：sName，sHtml；</br>
* 数字：nXXX，如：nPage，nTotal；</br>
* 逻辑：bXXX，如：bChecked，bHasLogin；</br>
* 数组：aXXX，如：aList，aGroup；</br>
* 正则：rXXX，如：rDomain，rEmail；</br>
* 函数：fXXX，如：fGetList；</br>
* DOM节点：dXX，如：dDiv，dSpan；</br>
* 其他类型：oXXX，如：oButton，oDate；</br>
* 特殊简写：小范围作用域临时变量，如函数内部的局部变量或参数：o(Object)、e(Element)、evt(event)、err(errot)等；</br>
* 循环变量：i、j、k以此类推；</br>

### 3.函数命名规范

* 普通函数：动词+名词，如：fGetList、fGetVersion；</br>
* 涉及逻辑返回值的函数：is、has、can，如：fisAdmin、fhasChild；</br>
* 内部函数：_f+上面规则，如：fLoopCount；</br>


## 书写规范
### 1.对齐和缩进
* 必须使用 Tab 键进行代码缩进，以节约代码大小，建议设置编辑器的tab为4个空格的宽度（而不是8个空格）；</br>
* 所有语句结束后，必须使用 ; 号结束；</br>
* 大括号前面不能换行；</br>
* 操作符必须使用空格隔开；</br>
* 字符串使用单引号 ''；</br>

程序化生成字符串时，使用模板字符串代替字符串连接。
``` javascript
// bad
function sayHi(name) {
    return 'How are you, ' + name + '?';
}
// bad
function sayHi(name) {
    return ['How are you, ', name, '?'].join();
}

// good
function sayHi(name) {
    return `How are you, ${name}?`;
}
```
### 2.语法结构
* 普通代码段应该如下：
``` javascript
while(!isDone) {
    doSomething();
    isDone = moreToDo();
}
```
* 变量定义方法如下：
``` javascript
let a = null, b = 1, c = 0;
```

* 函数定义方法如下：
``` javascript
var funcA = function() {
    var a = 0;
    ...
}
```

## ECMAScript 6 新特性

#### let 定义的变量不会被变量提升，const 定义的常量不能被修改，let 和 const 都是块级作用域

#### import导入模块、export导出模块
```javascript
// 全部导入
import people from './example'
 
// 将整个模块当作单一对象进行导入，该模块的所有导出都会作为对象的属性存在
import * as example from "./example.js"
console.log(example.name)
console.log(example.getName())
 
// 导入部分，引入非 default 时，使用花括号
import {name, age} from './example'
 
 
// 导出默认, 有且只有一个默认
export default App
 
// 部分导出
export class App extend Component {};
```
#### arrow functions （箭头函数）


函数的快捷写法。不需要 function 关键字来创建函数，省略 return 关键字，继承当前上下文的 this 关键字
```javascript
// ES5
var arr1 = [1, 2, 3];
var newArr1 = arr1.map(function(x) {
    return x + 1;
});
 
// ES6
let arr2 = [1, 2, 3];
let newArr2 = arr2.map((x) => {
    x + 1
});
```
箭头函数小细节：当你的函数有且仅有一个参数的时候，是可以省略掉括号的；当你函数中有且仅有一个表达式的时候可以省略{}
```javascript
let arr2 = [1, 2, 3];
let newArr2 = arr2.map(x => x + 1);
```
JavaScript语言的this对象一直是一个令人头痛的问题，运行下面的代码会报错，这是因为setTimeout中的this指向的是全局对象。
```javascript

class Animal {
    constructor() {
        this.type = 'animal';
    }
    says(say) {
        setTimeout(function() {
            console.log(this.type + ' says ' + say);
        }, 1000);
    }
}
 
var animal = new Animal();
animal.says('hi'); //undefined says hi

```
解决办法：
```javascript
// 传统方法1: 将this传给self,再用self来指代this
says(say) {
    var self = this;
    setTimeout(function() {
    console.log(self.type + ' says ' + say);
    }, 1000);
}
 
// 传统方法2: 用bind(this),即
says(say) {
    setTimeout(function() {
        console.log(this.type + ' says ' + say);
    }.bind(this), 1000);
}
 
// ES6: 箭头函数
// 当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象
says(say) {
    setTimeout(() => {
        console.log(this.type + ' says ' + say);
    }, 1000);
}
```

#### template string （模板字符串）
第一个用途：字符串拼接。将表达式嵌入字符串中进行拼接，用 \` 和${}`来界定。

```javascript
// es5
var name1 = "bai";
console.log('hello' + name1);
 
// es6
const name2 = "ming";
console.log(`hello${name2}`);

```

第二个用途：在ES5时我们通过反斜杠来做多行字符串拼接。ES6反引号 `` 直接搞定。

```javascript
// es5
var msg = "Hi \
man!";
 
// es6
const template = `<div>
<span>hello world</span>
</div>`;
```


