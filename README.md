自动打卡小脚本

本脚本中环境变量设置或许格式不对,只能将原信息写入index.js中才可执行,故此代码中user,和data仅为演示所用,若想使用可创建私有仓库保存自己的个人信息



用于洛师小筑的每日体温打卡.

先使用抓包软件httpdebugger pro(其它抓包软件应该也可以)进行打卡操作.

即可获取用户登录所需要的api(https://apii.lynu.edu.cn/v1/accounts/login/)

和用户信息格式{username:你的用户名大致是学号,password:你的密码,type:}.

使用fetch函数将本人信息传递到此api中,可获得token.

使用token可登录至体温打卡页面,获取体温打卡的api(https://apii.lynu.edu.cn/v1/temperatures/),

将自己的体温信息data(格式很长,需自己抓包获取)上传完成打卡.

在GitHub action(main.yml文件)设置每日运行此脚本时间,即可每日自动执行此打卡

我的 let user=process.env.MY_USER和let data=process.env.MY_DATA 使用的为GitHub提供的secrets功能,真实格式如上所言,需自行抓包


抓包页面如图所示,打开抓包软件,登录微信,使用小程序进行打卡
![a](https://user-images.githubusercontent.com/56098533/185290377-b6a59916-ad7c-4467-b13b-a1f85b0da611.jpg)

白色为api,红色为个人隐私,在底部与api通信的content中为上传所需信息,将content内容复制替换process.env.MY_DATA即可

此图为第二步的体温打卡抓包,第一步的登陆打卡类似.
