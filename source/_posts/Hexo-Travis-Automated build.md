---
title: Hexo使用TravisCI自动化构建
tags:
  - Hexo
  - TravisCI
  - 自动化构建
categories: Hexo
description: Hexo使用TravisCI自动化构建
thumbnail: '/image/pic/banner/TravisCI.png'
date: 2016-10-06 15:40:09
---
Hexo使用TravisCI自动化构建,从而减去了大量的`hexo clean`，`hexo d -g`操作
<!--more-->
### Travis CI 简介
Travis CI 是目前新兴的开源持续集成构建项目，它与jenkins，GO的很明显的特别在于采用yaml格式，同时他是在在线的服务，不像jenkins需要你本地打架服务器，简洁清新独树一帜。目前大多数的github项目都已经移入到Travis CI的构建队列中。

### 大致介绍
我的博客是使用Hexo来搭建的，托管到Github提供的Gitpage服务上的，之前使用Hexo在Bash下不断地hexo d -g,后来发现了[Travis CI](https://travis-ci.org/)可持续构建项目，集成了Travis CI后，每次写完博客git push到github / 直接在github上新建文章，然后Travis自动构建，构建完成后自动推送到Gitpage服务上。
新建一个仓库用于存放博客源代码，并将源代码上传：
![](/image/pic/pages/blog-source.png)

username.github.io 这个仓库存放 博客的静态文件，也就是hexo生成后的HTML文件，因为要使用Gitpage服务，放在默认的master分支
![](/image/pic/pages/master.png)

### 使用Travis CI 构建
使用Travis CI，必须要GIthub账号（Travis CI只支持构建github的项目）和一个项目
使用Github账号登录[Travis CI官网](https://travis-ci.org/)
+ 登录完后会进入如下界面,点击My Repositories旁边的+，添加一个要自动构建的仓库，点击右上角的“Sync account”按钮，就可以同步了你的Github仓库
+ 开启你需要构建的仓库
+ 进行配置：在More option下选择settings，开启Build only if .travis.yml is present和Build pushes

Build only if .travis.yml is present：是只有在.travis.yml文件中配置的分支改变了才构建
Build pushes：当推送完这个分支后开始构建

### 在Travis CI配置Github的Access Token
标题已经说得很明白了吧，我们需要在Travis上配置Access Token，这样我们就可以在他构建完后自动push到gitpgaes了，用户名密码可以直接写文件里，这样可以push成功，但是安全性就有问题了
#### 在github上生成Access Token
首先我们来到github的设置界面，点击到Personal access tokens页面，点击右上角的Generate new token按钮会重新生成一个，点击后他会叫你输入密码，然后来到如下界面勾选全部权限，生成TokenKey。生成完后，你需要拷贝下来，只有这时候他才显示，下载进来为了安全他就不会显示了，如果忘了只能重新生成一个了，拷贝完以后我们需要到Travis CI网站配置。
#### 在Travis CI配置
配置界面还是在项目的setting里面，如下图
![](/image/pic/pages/token1.png)
到这里我已经配置了要构建的仓库和要访问的Token.
之后还需要在源代码的仓库里创建一个.travis.yml配置文件，放到源代码的根目录，如下图
![](/image/pic/pages/blog-source.png)
其中内容如下：
```yaml
language: node_js
node_js: stable

# S: Build Lifecycle
install:
  - npm install
  
#before_script:
 # - npm install -g gulp

script:
  - hexo g

after_script:
  - cd ./public
  - git init
  - git config user.name "user_name"
  - git config user.email "user_email"
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master
# E: Build LifeCycle

branches:
  only:
    - master    
env:
 global:
   - GH_REF: github.com/user_name/user_name.github.io.git
```
更换的又git config后面的配置为你你自己的信息
GH_REF的值更改为你的仓库地址

**配置完成**

#### Push文章到Github
写一篇文章，添加到你的博客的_posts目录下（push可以用git也可以直接用Github Desktop）
TravisCI 构建过程：
![](/image/pic/pages/token2.png)
构建完成后，我们去博客可以看见[这个文章](http://chuyun.github.io/2016/10/06/Hexo%E4%BD%BF%E7%94%A8Travis%E8%87%AA%E5%8A%A8%E5%8C%96%E6%9E%84%E5%BB%BA/)了
![](/image/pic/pages/TCIFIN.png)

文章大部分内容参考自[TravisCI构建](http://i.woblog.cn/2016/05/04/hello-travis-ci/)
