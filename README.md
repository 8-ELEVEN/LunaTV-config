# 自用LunaTV-config源随缘更新

Luna TV 配置编辑器（自用）
https://hafrey1.github.io/LunaTV-config  
---   

# CORSAPI（API 代理 & JSON 订阅器）
这是一个基于 Cloudflare Workers 的中转代理 + JSON 配置前缀替换工具。 支持将 API 请求通过 Worker 转发，并自动为 JSON 配置中的 api 字段添加/替换前缀。 同时支持生成 Base58 编码的订阅格式，方便在外部应用中快速使用。部署到cf即可拥有自己的订阅链接，还能实现API代理！    
---   
## 🚀 部署方法
* **部署代码**     [（精简版代码）](https://raw.githubusercontent.com/hafrey1/LunaTV-config/refs/heads/main/CORSAPI/jingjian_worker.js) 和[（禁18版代码）](https://raw.githubusercontent.com/hafrey1/LunaTV-config/refs/heads/main/CORSAPI/jin18_worker.js)
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 新建一个 **Workers & Pages → Worker**
3. 将 `worker.js` 代码粘贴到编辑器中
4. 保存并部署   
---   
## 🔗 使用示例   
假设你的 Worker 部署在：   
```
https://api.example.workers.dev
```   
那么你可以这样使用：   
* **代理任意 API**
  ```
  https://api.example.workers.dev/?url=https://ikunzyapi.com/api.php/provide/vod
  ```
* **获取原始 JSON 配置**   
  ```
  https://api.example.workers.dev/?config=0
  ```
* **获取 JSON 配置并使用自己的API代理**
  ```
  https://api.example.workers.dev/?config=1
  ```
* **获取 Base58 订阅并使用自己的API代理**
  ```
  https://api.example.workers.dev/?config=1&encode=base58
  ```
---

## 🛠️ 参数说明

| 参数              | 说明                               | 示例                                               |
| --------------- | -------------------------------- | ------------------------------------------------ |
| `url`           | 代理任意 API 请求                      | `?url=https://...`                               |
| `config=0`      | 返回原始 JSON 配置                 | `?config=0`                                      |
| `config=1`      | 返回使用中转的 JSON 配置                 | `?config=1`                                      |
| `encode=base58` | 将 JSON 配置结果编码为 Base58            | `?config=1&encode=base58`                        |
| (可选)`prefix`    | 手动指定API代理，默认使用 `https://<域名>/?url=` | `?config=1&prefix=https://api.example.com/?url=` |    
---   
## 📌 注意事项    
* **Workers 免费额度**：每天 10 万次请求，适合轻量使用。
* **API代理替换逻辑**：如果 JSON 中 `api` 字段已包含 `?url=` 前缀，会先去掉旧前缀，再加上新前缀。
* **Base58 输出**：适合直接作为订阅链接在部分客户端中使用。
---

## 更新内容
- 📄 **Luna-TV配置编辑器**： 专业的JSON配置文件编辑器，专为本项目而设计。
- 📄 **自动检测API状态**： 每隔1小时自动检测API状态，并生成最近100次检测报告！   可根据API测试结果自行禁用可用率不高的源！
- 📄 **API名称添加图标**： API名称前添加图标以便更好区分成人源！
- 📄 **被墙的资源**： 如果你的API无效，可使用CF worker搭建CORSAPI接口，添加自定义域名，给源提供中转！
---   
## 测试
- 📄 **测试使用中转API**：使用CORSAPI中转提高视频源成功率!复活无法使用的API！
- 📄 **精简版源更新**：使用🎬虎牙资源、🔞丝袜资源、🔞色猫资源这几个源会污染搜索结果！还有多个源无搜索结果！精简版剔除了这些源！

### 精简版共61个源全部可用（必须要使用中转api，否则不能保证全部可用）
<img width="1025" height="486" alt="61" src="https://github.com/user-attachments/assets/81c80108-7c03-4583-87ab-b7b57cdfd3bd" />
---   
##  Luna-TV配置
订阅使用：复制下面链接  

👉 Base58编码订阅链接[精简版🎬源链接](https://raw.githubusercontent.com/hafrey1/LunaTV-config/refs/heads/main/jin18.txt)    （推荐使用）精简版禁18源

```bash
https://j18pz.hafrey.dpdns.org?config=0&encode=base58
```
```bash
https://raw.githubusercontent.com/hafrey1/LunaTV-config/refs/heads/main/jin18.txt
```
👉 Base58编码订阅链接[精简版🎬+🔞源链接](https://jjpz.hafrey.dpdns.org?config=0&encode=base58) （推荐使用）精简版剔除无搜索结果和污染搜索结果源                             
```bash
https://jjpz.hafrey.dpdns.org?config=0&encode=base58
```
```bash
https://raw.githubusercontent.com/hafrey1/LunaTV-config/refs/heads/main/jingjian.txt
```
---   
## API 健康报告（每日自动检测API状态）

## API 状态（最近更新：2025-10-08 23:20 CST）

- 总 API 数量：78
- 成功 API 数量：78
- 失败 API 数量：0
- 平均可用率：99.4%
- 完美可用率（100%）：50 个
- 高可用率（80%-99%）：28 个
- 中等可用率（50%-79%）：0 个
- 低可用率（<50%）：0 个

<div style="font-size: 11px;">

<!-- API_TABLE_START -->
| 状态 | API 名称 | API 地址 | 成功次数 | 失败次数 | 可用率 | 连续失败天数 |
|------|----------|----------|---------:|---------:|-------:|-------------:|
| ✅ | 🎬iKun资源 | https://ikunzyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬U酷88 | https://jjpz.hafrey.dpdns.org/?url=https://api.ukuapi88.com/api.php/provide/vod | 25 | 0 | 100.0% | 0 |
| ✅ | 🎬U酷资源 | https://jjpz.hafrey.dpdns.org/?url=https://api.ukuapi.com/api.php/provide/vod | 25 | 0 | 100.0% | 0 |
| ✅ | 🎬光速资源 | https://api.guangsuapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬最大点播 | https://zuidazy.me/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬最大资源 | https://api.zuidapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬卧龙资源 | https://wolongzyw.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬如意资源 | https://jjpz.hafrey.dpdns.org/?url=https://cj.rycjapi.com/api.php/provide/vod | 25 | 0 | 100.0% | 0 |
| ✅ | 🎬快车资源 | https://caiji.kuaichezy.org/api.php/provide/vod | 98 | 0 | 100.0% | 0 |
| ✅ | 🎬新浪资源 | https://api.xinlangapi.com/xinlangapi.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬无尽资源 | https://api.wujinapi.me/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬无尽资源1 | https://api.wujinapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬旺旺短剧 | https://wwzy.tv/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬旺旺资源 | https://api.wwzy.tv/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬暴风资源 | https://bfzyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬极速资源 | https://jszyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬樱花资源 | https://m3u8.apiyhzy.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬爱奇艺 | https://iqiyizyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬猫眼资源 | https://api.maoyanapi.top/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬索尼资源 | https://suoniapi.com/api.php/provide/vod | 30 | 0 | 100.0% | 0 |
| ✅ | 🎬豪华资源 | https://hhzyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬速播资源 | https://subocaiji.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬量子影视 | https://cj.lziapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬量子资源 | https://cj.lzcaiji.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬金鹰点播 | https://jinyingzy.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬金鹰资源 | https://jyzyapi.com/provide/vod/from/jinyingyun/at/json | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬闪电资源 | https://xsd.sdzyapi.com/api.php/provide/vod | 97 | 0 | 100.0% | 0 |
| ✅ | 🎬非凡影视 | https://cj.ffzyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬飘零资源 | https://p2100.net/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬魔爪资源 | https://jjpz.hafrey.dpdns.org/?url=https://mozhuazy.com/api.php/provide/vod | 25 | 0 | 100.0% | 0 |
| ✅ | 🎬魔都动漫 | https://caiji.moduapi.cc/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬魔都资源 | https://www.mdzyapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞155资源 | https://155api.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞AIvin | http://lbapiby.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞优优资源 | https://www.yyzywcj.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞最色资源 | https://api.zuiseapi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞大奶子 | https://apidanaizi.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞奶香资源 | https://Naixxzy.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞小鸡资源 | https://api.xiaojizy.live/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞幸资源 | https://xzybb2.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞杏吧资源 | https://xingba111.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞桃花资源 | https://thzy1.me/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞滴滴资源 | https://api.ddapi.cc/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞玉兔资源 | https://apiyutu.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞白嫖资源 | https://www.kxgav.com/api/json.php | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞精品资源 | https://www.jingpinx.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞美少女 | https://www.msnii.com/api/json.php | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞老色逼 | https://apilsbzy1.com/api.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞色猫资源 | https://caiji.semaozy.net/inc/apijson_vod.php/provide/vod | 100 | 0 | 100.0% | 0 |
| ✅ | 🔞黄AVZY | https://www.pgxdy.com/api/json.php | 100 | 0 | 100.0% | 0 |
| ✅ | 🎬360资源 | https://360zy.com/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🎬CK资源 | https://ckzy.me/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🎬卧龙资源1 | https://collect.wolongzyw.com/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🎬天涯影视 | https://tyyszy.com/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🎬红牛资源 | https://www.hongniuzy2.com/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🎬虎牙资源 | https://www.huyaapi.com/api.php/provide/vod/at/json | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞91麻豆 | https://91md.me/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞jkun资源 | https://jkunzyapi.com/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞souavZY | https://api.souavzy.vip/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞丝袜资源 | https://siwazyw.tv/api.php/provide/vod/at/json | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞百万资源 | https://api.bwzyz.com/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞豆豆资源 | https://api.douapi.cc/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🔞黄色仓库 | https://hsckzy.xyz/api.php/provide/vod | 99 | 1 | 99.0% | 0 |
| ✅ | 🎬优质资源 | https://api.yzzy-api.com/inc/apijson.php | 98 | 2 | 98.0% | 0 |
| ✅ | 🎬非凡资源 | https://api.ffzyapi.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞乐播资源 | https://lbapi9.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞大地资源 | https://dadiapi.com/feifei2 | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞森林资源 | https://beiyong.slapibf.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞番号资源 | http://fhapi9.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞细胞资源 | https://www.xxibaozyw.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞色南国 | https://api.sexnguon.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞辣椒资源 | https://apilj.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🔞鲨鱼资源 | https://shayuapi.com/api.php/provide/vod | 98 | 2 | 98.0% | 0 |
| ✅ | 🎬小猫咪 | https://zy.xmm.hk/api.php/provide/vod | 97 | 3 | 97.0% | 0 |
| ✅ | 🎬电影天堂 | http://caiji.dyttzyapi.com/api.php/provide/vod | 97 | 3 | 97.0% | 0 |
| ✅ | 🎬茅台资源 | https://caiji.maotaizy.cc/api.php/provide/vod | 97 | 3 | 97.0% | 0 |
| ✅ | 🎬豆瓣资源 | https://caiji.dbzy5.com/api.php/provide/vod | 97 | 3 | 97.0% | 0 |
| ✅ | 🔞奥斯卡 | https://aosikazy.com/api.php/provide/vod | 96 | 4 | 96.0% | 0 |
<!-- API_TABLE_END -->


































































































































