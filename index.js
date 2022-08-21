import fetch from "node-fetch";
//同时使用import和require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
//创建证书
var rootCas = require("ssl-root-cas").create();
//导入域名对应的证书
rootCas.inject().addFile("./lynu.pem");//通过浏览器获得的leaf证书
require("https").globalAgent.options.ca = rootCas;

async function main_handler() {
  //建议自行抓包修改
  let user = process.env.MY_USER; //环境变量问题
  //登录后获取token
  let response = await fetch("https://apii.lynu.edu.cn/v1/accounts/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
  console.log(response.status);
  let result = await response.json();
  console.log(result.token);
  //建议自行抓包修改
  let data = process.env.MY_DATA; //环境变量问题

  let response2 = await fetch("https://apii.lynu.edu.cn/v1/temperatures/", {
    method: "post",
    headers: {
      authorization: "JWT " + result.token,
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  console.log(response2.status);
}
main_handler();
