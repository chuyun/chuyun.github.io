---
title: react-mobx-todo
tags:
  - React
  - MobX
  - Ant-Design
categories: React
thumbnail: '/image/pic/banner/MobxTodo.png'
date: 2017-04-23 22:38:39
description: MboX 实践
---

MobX 是一个简单、方便扩展、久经考验的状态管理解决方案。





### Mbox核心概念

State 是每一个应用程序的核心部分，而使用一个不合规范的 State 则是让你的应用充满 bug 和不可控性，或者就是局部变量的循环，让你的 state 失去了同步。有很多框架试图解决这个问题，比如使用不可变的 state，但是这样以来又带来了新的问题，比如数据必须规格化，完整性约束失效等等。



MobX 和Redux一样都是很热门的库，MboX通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。MobX背后的哲学很简单:

> *任何源自应用状态的东西都应该自动地获得*

其中包括UI、数据序列化、服务器通讯，等等。

下图为MobX对状态的管理过程

![flow](/image/pic/pages/react-mobx-todo/flow-cn.png)



更多详细信息请参阅MboX中文文档=>[http://cn.mobx.js.org/](http://cn.mobx.js.org/)

关于MboX和Redux的比较，**sorrycc** 讲的比较清楚，感兴趣的可以移步 ==>[MboX和Redux的比较](https://github.com/sorrycc/blog/issues/5?utm_source=tuicool&utm_medium=referral)


### MobX项目实践

该实践项目涉及到的技术：

- Ract
- MobX
- Ant-Design
- Less
- LocalStroge



#### 组件划分

#### ![todo-main-component](/image/pic/pages/react-mobx-todo/todo-main-component.jpeg)



后期将继续完善



代码托管在Github，感兴趣可以自行下载，谢谢



项目地址：[GitHub](https://github.com/chuyun/react-mobx-todos)

在线预览： [在线](https://chuyun.github.io/project/React/react-mobx-todo/)