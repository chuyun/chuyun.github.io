---
title: 个人博客搭建
tags:
  - 技术
  - 文章
categories: Hexo
description: Hexo
thumbnail: '/image/pic/banner/Hexo.png'
date: 2016-04-23 18:42:28
---
Hexo个人博客搭建
<!--more-->
 Hexo搭建 Github／Coding 静态博客主要使用了以下内容：
- 使用Hexo框架（基于Node.js的静态博客框架）
- 安装git
- HTML  CSS  YML等相关知识

先来一张预览图
 ![预览图](/image/pic/pages/pre.png)

之前使用新浪的第三方博客，一直觉得体验不太好，加之之前购买的域名到期，就想使用Hexo框架在Github上搭建自己的个人博客主页
## 1.安装环境
### 1.1 安装git
作用：将本地Hexo内容提交到Github
其它：申请Github账号，设置SSH Keys，请先自行Google，稍后填坑

### 1.2 安装Node.js
下载：http://nodejs.org/download/
下载最新版本，安装时直接保持默认配置即可（也可以使用Homeblew安装，对于Homeblew安装，请自行Google）

## 2. 配置Github
### 2.1 建立Repository
建立与你用户名对应的仓库，仓库名必须为【your_user_name.github.io】
### 2.2 配置SSH Key
1.安装Github桌面客户端会自动设置好SSH Key
2.直接通过Terminal生成，然后添加到Github上（请自行Google填坑）

## 3. 安装Hexo
Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。
### 3.1 正式安装
当Git和Node.js安装安成以后，新建一个文件夹，例如MyBlog，用于存放Hexo相关文件，在Terminal中 cd 到MyBlog文件夹
执行以下命令安装Hexo：
`$ npm install -g hexo-cli`
安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。
`$ hexo init`
`$ cd`
  `$ npm install`
至此，全部安装工作已经完成！MyBlog就是你的博客根目录，所有的操作都在里面进行。

### 3.2快速设置
#### 1. 生成静态页面
hexo generate（hexo g也可以）
该命令执行完后，会在 ..\MyBlog\public\ 目录下生成一系列html，css等文件。
#### 2. 本地启动
启动本地服务，进行文章预览调试，命令：
`$ hexo server`
浏览器输入http://localhost:4000 即可查看，按Control＋C停止Server
#### 3. Create a new post
在Terminal中继续输入：
`$ hexo new [layout] <title>`
新建一篇文章。如果没有设置 layout 的话，默认使用 \config.yml 中的 default\layout 参数代替。如果标题包含空格的话，请使用引号括起来。
刷新http://localhost:4000/，可以发现已生成了一篇新文章 "My New Post"。
#### 4. 编辑文章
`hexo new "My New Post"`会在..\Myblog\source\posts目录下生成一个markdown文件：My-New-Post.md
可以使用一个支持markdown语法的编辑器（比如 Sublime Text 2 /Ulysses /Mou）来编辑该文件,个人推荐使用FarBox推出的[MarkEditor][1]，售价¥58，pro 版¥128，可以免费试用，但是会特别频繁的跳出购买链接（PS：赚钱无可厚非，但是频繁的跳出提示框似乎远离了其 优雅高效的体验，我特么好像跑题了 囧rz）

#### 5.部署到Github
部署到Github前需要配置\config.yml文件，首先找到下面的内容
```yaml
#Deployment
##Docs: http://hexo.io/docs/deployment.html
deploy:
  type:
```
修改为：
```yaml
#Deployment
##Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repository:github: https://github.com/your\user\name/your\user\name.github.io.git,master
  branch: master
```
##### NOTE1:
Repository：可以是是SSH形式的url（git@github.com:your\user\name/your_user_name.github.io.git），也可以是HTTPS形式的url（https://github.com/your_user_name/your\user\name.github.io.git），请自行选择
使用SSH url，如果电脑没有开放SSH 端口，会致部署失败。
##### NOTE2：
如果你是为一个项目制作网站，那么需要把branch设置为gh-pages。

#### 6. 测试
部署完成后，在浏览器打开https://your\user\name.github.io，正常显示网页，则是部署成功

#### 7. 总结：部署步骤
每次部署的步骤，可按以下三步来进行。
```bash
$ hexo clean
$ hexo generate
$ hexo deploy
```


#### 8. 总结：本地调试
##### 1. 在执行下面的命令后，
```bash
$ hexo g #生成
$ hexo s #启动本地服务，进行文章预览调试
```

浏览器输入http://localhost:4000，查看搭建效果。此后的每次变更\config.yml 文件或者新建文件都可以先用此命令调试。
##### 2. 可以用简化的一条命令
`hexo s -g`

### 3.3 命令总结
#### 3.3.1 常用命令
```bash
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本
```

#### 3.3.2 复合命令
```bash
hexo deploy -g  #生成加部署
hexo server -g  #生成加预览
```
命令的简写为：
```bash
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```

## 4. 配置Hexo
### 4.1基本设置
这里贴一下我自己的设置，不多说

```yaml
#Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/
# Site
title: chuyun
subtitle:
description:
author: chuyun
# keywords:

language:
timezone:

# URL#可以不用配置
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
# 网址，搜索时会在搜索引擎中显示
url: http://chuyun.github.io 
# 网站根目录
root: /
# 永久链接格式
permalink: :year/:month/:day/:title/
# 永久链接中各部分的默认值
permalink\defaults:

# Directory 目录配置
# 资源文件夹，这个文件夹用来存放内容
source\dir: source
# 公共文件夹，这个文件夹用于存放生成的站点文件
public\dir: public
# 标签文件夹
tag\dir: tags
# 归档文件夹
archive\dir: archives
# 分类文件夹
category\dir: categories
# Include code 文件夹
code\dir: downloads/code

# 国际化文件夹
i18n\dir: :lang
# 跳过指定文件的渲染，您可使用 glob 来配置路径
skip\render:
about\dir: about
messageboard\dir: messageBoard

# Writing  # Writing 写作配置
new\post\name: :title.md # File name of new posts # 新文章的文件名称
default\layout: post  #默认布局
titlecase: false # Transform title into titlecase
external\link: true # Open external links in new tab
filename\case: 0  #把文件名称转换为 (1) 小写或 (2) 大写
render\drafts: false  #显示草稿
post\asset\folder: false  #是否启动资源文件夹
relative\link: false #把链接改为与根目录的相对位址
future: true
highlight:  #代码块的设置
  enable: true
  line\number: true
  auto_detect: false
  tab_replace:

# Category & Tag  分类 & 标签
# 默认分类
default_category: uncategorized
# 分类别名

category_map: 
	编程: programming
	生活: life
	其他: other  
	
# 标签别名
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination 分页
## Set per_page to 0 to disable pagination
# 每页显示的文章量 (0 = 关闭分页功能)
per_page: 10
# 分页目录
pagination\dir: page

# Extensions 扩展
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
# 当前主题名称
theme: TKL-REVISIONZJ

plugins:
 #- hexo-generator-feed
 #- hexo-generator-sitemap
 #- hexo-generator-baidu-sitemap

# sitemap:
# sitemap:
# path: sitemap.xml

# baidusitemap:
# path: baidusitemap.xml

# Feed Atom
# feed:
  #type: atom
  #path: atom.xml
  #limit: 20

# Deployment  #部署到github
## Docs: https://hexo.io/docs/deployment.html

deploy:
  type: git
  repo:
	  github: https://github.com/your_user_name/your_user_name.github.io.git,master
	  #coding: git@git.coding.net:your_user_name/your_user_name.git,coding-pages
	
```
**yml语法，在冒号后面有一个空格，注意**
### 4.2安装主题
[主题列表][2]
我自己使用的试基于TLK和TKL-REVISION的改进版本

这里以Pacman为例：
 1.将Git Shell 切到MyBlog目录下，然后执行下面的命令，将pacman下载到 themes/pacman 目录下。
`$ git clone https://github.com/A-limon/pacman.git themes/pacman`
2. 修改你的博客根目录MyBlog下的config.yml配置文件中的theme属性，将其设置为pacman。
3. 更新pacman主题
```bash
cd themes/pacman
git pull
```

**NOTE：先备份\config.yml 文件后再升级**
如果模版不能满足要求，请自行修改配置文件，修改CSS文件等

### 4.3自定义About界面
About界面比较简单，直接在MyBlog/source下创建about.md【或者放在about文件夹中】

### 4.4自定义404界面
404页面同About页面，建立404.md，自定义文件即可
刚开始我采用了腾讯公益404(具体实现自己百度)，后来改用了自定义404界面可以[效果点这里](http://chuyun.github.io/404)
### 4.5 评论框
本人开始开用的多说评论，不过后来一时兴起，将其[Disqus评论框架](http://disqus.com)，具体设置根据你自己选取的主题设置。【近期由于GFW原因，导致网页加载太慢，后又再次改用[多说评论](http://http://duoshuo.com)（方便国内用户的同时，多说团队的安全性有待商榷）】
此外，插件的配置请自行Google，也不是很复杂，今天就写到这了，有什么问题可以直接留言。

对于Coding的配置我好像忘记说了，哈哈，比较简单，作业有点多，抽时间再完善一下。
### 4.6 sitemap和Rss订阅
插件部分，请自自行安装

[1]:	http://markeditor.com/app/markeditor
[2]:	https://github.com/hexojs/hexo/wiki/Themes

[image-1]:	http://chuyun.github.io/image/articles-img/pre.png