# @lazebird/xliff-helper

## 介绍

- 本项目缘起于 google 翻译不支持 xliff 文件。
- [预览](https://lazebird.github.io/xliff-helper/){:target="_blank"}

## 依赖

`"vue": "^3.2.25"`

## 原理

- 解析 xliff/xml 文件中的待翻译字段，默认为 trans-unit 区域，源内容为 source 标签的值，翻译内容为 target 标签的值
- 抽取所有源内容作为待翻译字段，以 id 作为唯一标识符
- 在翻译后基于唯一标识符将翻译内容合并回源文件
- 下载合并后的源文件作为翻译结果文件

## 配置

- id：id
- unitName: trans-unit
- srcName: source
- tgtName: target

## 用法

- 点击左侧上传框上传 xliff 文件
- 点击 Extract Sources 下载抽取的待翻译字段文件
- 将待翻译文件进行翻译操作；**google 翻译注意如下**：
  - 需要使用 docx 类格式，需要手动转换下
  - 翻译后的文件至少存在2类问题，需要手动调整修复：
    - 嵌套引号不符合json格式
    - id="1"类信息实际是格式信息，但是被翻译后可能改变成id = " 1 "等，出现无效字符并破坏原义
- 点击右侧上传框上传翻译后的 json 格式文件；文件上传后会自动将信息合并到翻译结果字段
- 点击保存按钮下载合并后的 xliff 文件
