---
title: Hexo使用Aplayer插件
tags: Hexo
categories: Hexo
comments: true
description: hexo 使用Aplayer、DPlayer插件
thumbnail: '/image/pic/banner/Aplayer.png'
date: 2016-10-05 18:56:49
---
本文将讲解在Hexo中如何插入音乐和视频

### Markdown 通用音乐/视频插入方法
Markdown 作为轻量级的标记语言，兼容 html 语法，所以可以直接在 Markdown 文档中使用 html 语法。
#### **vedio** 标签：
```
<video width="480" height="320" controls>
<source src="movie.mp4">
</video>
```
其中src=音乐/视频链接。
Such as:
```
<video width="480" height="320" controls>
<source src="http://chuyun.github.io/image/video/me.mp4">
</video>

```
#### embed标签：
```
<embed src="http://player.youku.com/player.php/Type/Folder/Fid/27690810/Ob/1/sid/XMTY1MTI3NjMyNA==/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>
```
#### iframe标签：
```
<iframe height=498 width=510 src="http://player.youku.com/embed/XMTY1MTI3NjMyNA==" frameborder=0 allowfullscreen></iframe>
```
#### javascript标签:
```
<script type="text/javascript" src="http://www.xiami.com/widget/player-single?uid=32329501&sid=1776238762&mode=js"></script>
```
除vedio标签外，大部分音乐/视频网站都可以直接生成播放器代码，直接粘贴到 Markdown 文档中即可。
不过上述有些标签不支持 https 。

### 通过 Hexo 插件插入音乐/视频可以使用两款插件

> hexo-tag-aplayer:https://github.com/grzhan/hexo-tag-aplayer#upstream-issue
> hexo-tag-dplayer:https://github.com/NextMoe/hexo-tag-dplayer

两款插件基于 DIYgod 编写的 html5 播放器 APlayer 和 DPlayer 开发。
#### 安装两款插件
```
{% aplayer "Caffeine"  "Jeff Williams" "http://chuyun.github.io/love/music/xiaojiuwocut.mp3" ["http://chuyun.github.io/image/articles-img/Aplayer.png", "autoplay" %}
```


