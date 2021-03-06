const models = require('./db')
const express = require('express')
const router = express.Router()
const redis = require('redis')
const client = redis.createClient()


let titleArr = []
let myTitleArr = []
let tagArr = []
let myTagArr = []
let commonArr = []
let myCommonArr = []
// 从最新的数据开始展示
const args1 = ['myTitle', '+inf', '-inf']
client.zrevrangebyscore(args1, (err, response) => {
  if (err) throw err
  console.log('myTitle', response)
  titleArr = formatSearch(response)
})

const args2 = ['myTag', '+inf', '-inf']
client.zrevrangebyscore(args2, (err, response) => {
  if (err) throw err
  console.log('myTag', response)
  tagArr = formatSearch(response)
})

const args3 = ['myCommon', '+inf', '-inf']
client.zrevrangebyscore(args3, (err, response) => {
  if (err) throw err
  console.log('myCommon', response)
  commonArr = formatSearch(response)
})

// 清空redis
// client.flushall()
router.get('/api/search', (req, res) => {
  res.json({
    data: {
      title: titleArr,
      tags: tagArr,
      common: commonArr
    }
  })
})

// router.post('/api/search', (req, res) => {
//   console.log('request', req.body)
//   let _q = req.body
//   let params = {}
//   let titleReg
//   let commonReg
//   myTitleArr = ['myTitle']
//   myTagArr = ['myTag']
//   myCommonArr = ['myCommon']
//   let titleId = Math.floor(titleArr.length / 2)
//   let tagId = Math.floor(tagArr.length / 2)
//   let commonId = Math.floor(commonArr.length / 2)

//   if (_q.hasOwnProperty('title')) { // 输入菜名查询
//     titleReg = new RegExp(_q.title, 'ig')
//     params = Object.assign(params, {
//       title: {
//         $regex: _q.title,
//         $options: 'i'
//       }
//     })
//     if (!titleArr.find((a) => { return a.value === _q.title })) {
//       myTitleArr.push(titleId + 1)
//       myTitleArr.push(_q.title)
//       client.zadd(myTitleArr, (err, response) => {
//         if (err) throw err
//         console.log('titleArr added ' + response + ' items.')
//         client.zrevrangebyscore(args1, (err, response) => {
//           if (err) throw err
//           console.log('myTitle', response)
//         })
//       })
//     }
//   }
//   if (_q.hasOwnProperty('tags')) { // 输入标签查询
//     params = Object.assign(params, {
//       'tags.text': {
//         $regex: _q.tags,
//         $options: 'i'
//       }
//     })
//     if (!tagArr.find((a) => { return a.value === _q.tags })) {
//       myTagArr.push(tagId + 1)
//       myTagArr.push(_q.tags)
//       client.zadd(myTagArr, (err, response) => {
//         if (err) throw err
//         console.log('tagArr added ' + response + ' items.')
//         client.zrevrangebyscore(args2, (err, response) => {
//           if (err) throw err
//           console.log('myTag', response)
//         })
//       })
//     }
//   }
//   if (_q.hasOwnProperty('common')) { // 相关常识查询
//     commonReg = new RegExp(_q.common, 'ig')
//     params = Object.assign(params, {
//       'common.txt': {
//         $regex: _q.common,
//         $options: 'i'
//       }
//     })
//     if (!commonArr.find((a) => { return a.value === _q.common })) {
//       myCommonArr.push(commonId + 1)
//       myCommonArr.push(_q.common)
//       console.log('commonArr: ', commonArr)
//       client.zadd(myCommonArr, (err, response) => {
//         if (err) throw err
//         console.log('commonArr added ' + response + ' items.')
//         client.zrevrangebyscore(args3, (err, response) => {
//           if (err) throw err
//           console.log('myCommon', response)
//         })
//       })
//     }
//   }

//   client.on('error', (err) => {
//     console.log('Error: ' + err)
//   })
//   try {
//     models.food.find(params, null, {}, (err, result) => {
//       if (_q.hasOwnProperty('title')) {
//         for (let i = 0, len = result.length; i < len; i++) {
//           result[i].title = result[i].title.replace(titleReg, '<em style="color: #dd4b39">$&</em>')
//         }
//       }
//       if (_q.hasOwnProperty('common')) {
//         for (let i = 0, len = result.length; i < len; i++) {
//           result[i].common.txt = result[i].common.txt.trim().replace(commonReg, '<em style="color: #dd4b39">$&</em>')
//         }
//       }
//       res.json({
//         data: result
//       })
//     })
//   } catch (err) {
//     console.log('ERR:', err)
//   }
// })

/* For Test */
router.post('/api/search', (req, res) => {
  res.json({ "data": [{ "dishes_id": 3682, "steps": [{ "title": "1  将洗净的蕨菜切段。", "img": "http://img.szzhangchu.com/20130323170250_0.jpg" }, { "title": "2  洗好的苦瓜切段。", "img": "http://img.szzhangchu.com/20130323170250_1.jpg" }, { "title": "3  锅中加清水烧开，加食粉，倒入苦瓜。", "img": "http://img.szzhangchu.com/20130323170250_2.jpg" }, { "title": "4  煮约1分钟至熟捞出。", "img": "http://img.szzhangchu.com/20130323170250_3.jpg" }, { "title": "5  用油起锅，倒入蒜末、蕨菜炒香。", "img": "http://img.szzhangchu.com/20130323170250_4.jpg" }, { "title": "6  倒入苦瓜、蚝油、盐、味精、白糖、鸡粉炒入味。", "img": "http://img.szzhangchu.com/20130323170250_5.jpg" }, { "title": "7  加水淀粉勾芡，淋入熟油拌匀。", "img": "http://img.szzhangchu.com/20130323170250_6.jpg" }, { "title": "8  盛出即可。", "img": "http://img.szzhangchu.com/20130323170250_7.jpg" }], "ingredients": ["150克  蕨菜", "200克  苦瓜", " 蒜末少许", "各适量  蚝油、盐、味精、白糖、鸡粉、水淀粉、食粉"], "suits": ["洋葱:增强免疫力", "茄子:清心明目，可防治心血管疾病", "猪肝:清热解毒，补肝明目", "鸡翅:补脾健胃", "辣椒:排毒瘦身", "猪肉:清热解毒", "鸡蛋:对骨骼、牙齿的健康有帮助"], "restraints": ["胡萝卜:降低营养价值", "黄瓜:降低营养价值", "南瓜:破坏维生素C", "豆腐:易形成结石", "牛奶:不利营养物质的吸收"], "tags": [{ "id": 289, "text": "增强免疫力", "type": 2 }, { "id": 340, "text": "家庭主妇", "type": 2 }, { "id": 326, "text": "炒", "type": 2 }, { "id": 144, "text": "蔬菜", "type": 2 }, { "id": 123, "text": "素菜", "type": 2 }], "_id": "5a94cfcbeefce01d3019d536", "title": "蕨菜炒苦瓜", "subtitle": "夏天食苦，胜过大补。苦瓜与蕨菜的清香合二为一，有菜园子的味道哟~", "category": "3分钟小炒-> 素菜 ", "image": "http://img.szzhangchu.com/1439346681737_8487308714.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        苦瓜味苦，性寒，归心、肺、脾、胃经，具有消暑清热，解毒健胃，除邪热，聪耳明目，润泽肌肤，强身，使人精力旺盛，不易衰老的功效，还有降血糖、抗肿瘤、抗病毒、抗菌、促进免疫力等作用。                                    " }, "guide": { "title": "制作指导", "txt": "煮制苦瓜时，可撒上少许盐，这样既可以减轻苦味，而且也不会破坏苦瓜原有的风味。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将去皮洗净的土豆切块。", "img": "http://img.szzhangchu.com/20130326143059_0.jpg" }, { "title": "2  洗好的胡萝卜切块。", "img": "http://img.szzhangchu.com/20130326143059_1.jpg" }, { "title": "3  洗净的黄瓜切块。", "img": "http://img.szzhangchu.com/20130326143059_2.jpg" }, { "title": "4  紫苏叶切碎。", "img": "http://img.szzhangchu.com/20130326143059_3.jpg" }, { "title": "5  锅中加清水烧开，加盐、食用油，倒入胡萝卜、土豆略煮。", "img": "http://img.szzhangchu.com/20130326143059_4.jpg" }, { "title": "6  再倒入黄瓜。", "img": "http://img.szzhangchu.com/20130326143059_5.jpg" }, { "title": "7  焯熟后捞出。", "img": "http://img.szzhangchu.com/20130326143059_6.jpg" }, { "title": "8  用油起锅，倒入蒜末、姜片、葱白爆香。", "img": "http://img.szzhangchu.com/20130326143059_7.jpg" }, { "title": "9  加入胡萝卜、土豆和黄瓜炒香。", "img": "http://img.szzhangchu.com/20130326143059_8.jpg" }, { "title": "10  加盐、味精、鸡粉、蚝油调味。", "img": "http://img.szzhangchu.com/20130326143059_9.jpg" }, { "title": "11  再放入紫苏叶。", "img": "http://img.szzhangchu.com/20130326143059_10.jpg" }, { "title": "12  用水淀粉勾芡。", "img": "http://img.szzhangchu.com/20130326143059_11.jpg" }, { "title": "13  淋入熟油拌匀。", "img": "http://img.szzhangchu.com/20130326143059_12.jpg" }, { "title": "14  盛出装入盘中即成。", "img": "http://img.szzhangchu.com/20130326143059_13.jpg" }], "ingredients": ["150克  土豆", "100克  黄瓜", "100克  胡萝卜", "30克  紫苏叶", "各少许  蒜末、姜片、葱白", "各适量  盐、味精、鸡粉、蚝油、水淀粉"], "suits": ["豆角:调理肠胃，可防治肠胃炎", "蜂蜜:可缓解胃部疼痛", "青辣椒:营养互补", "辣椒:健脾开胃", "醋:醋可清除土豆中的龙葵素", "牛奶:营养均衡"], "restraints": ["柿子:易形成胃结石", "石榴:易引起身体不适"], "tags": [{ "id": 314, "text": "健胃消食", "type": 2 }, { "id": 232, "text": "晚餐", "type": 2 }, { "id": 144, "text": "蔬菜", "type": 2 }, { "id": 159, "text": "根茎类", "type": 2 }, { "id": 123, "text": "素菜", "type": 2 }], "_id": "5a94cfcbeefce01d3019d537", "title": "紫苏炒三丁", "subtitle": "紫苏的味道不知道怎么形容，无论怎么烹制，都有一种“草”的味道，而这种“草”的味道总让人想起百花盛开的春天～", "category": "3分钟小炒-> 素菜 ", "image": "http://img.szzhangchu.com/1439346854157_5219501336.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        土豆含有丰富的维生素A、维生素C以及矿物质，能健脾和胃、益气调中、通利大便，对脾胃虚弱、消化不良、肠胃不和、大便不畅有食疗作用。                                    " }, "guide": { "title": "制作指导", "txt": "翻炒前将土豆、胡萝卜、黄瓜焯熟，再用大火快速翻炒，这样使口感更鲜脆，色泽诱人。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  西葫芦洗净，切丝。", "img": "http://img.szzhangchu.com/20130326184510_0.jpg" }, { "title": "2  红椒洗净切丝。", "img": "http://img.szzhangchu.com/20130326184510_1.jpg" }, { "title": "3  用植之元大豆油起锅。", "img": "http://img.szzhangchu.com/20130326184510_2.jpg" }, { "title": "4  倒入西葫芦。", "img": "http://img.szzhangchu.com/20130326184510_3.jpg" }, { "title": "5  再放入红椒丝。", "img": "http://img.szzhangchu.com/20130326184510_4.jpg" }, { "title": "6  将西葫芦和红椒丝翻炒至熟。", "img": "http://img.szzhangchu.com/20130326184510_5.jpg" }, { "title": "7  加盐、鸡粉调味，用少许水淀粉勾薄芡。", "img": "http://img.szzhangchu.com/20130326184510_6.jpg" }, { "title": "8  出锅装盘即可。", "img": "http://img.szzhangchu.com/20130326184510_7.jpg" }], "ingredients": ["300克  西葫芦", "20克   红椒", "各适量  盐、鸡粉、水淀粉"], "suits": ["洋葱:增强免疫力", "鸡蛋:补充动物蛋白"], "restraints": [], "tags": [{ "id": 163, "text": "瓜果类", "type": 2 }, { "id": 309, "text": "防癌抗癌", "type": 2 }, { "id": 144, "text": "蔬菜", "type": 2 }, { "id": 231, "text": "简易午餐", "type": 2 }, { "id": 123, "text": "素菜", "type": 2 }], "_id": "5a94cfcbeefce01d3019d538", "title": "红椒炒西葫芦丝", "subtitle": "每次吃这道菜，总想到家里的瓜棚豆架。家的感觉，菜园的感觉油然而生。", "category": "3分钟小炒-> 素菜 ", "image": "http://img.szzhangchu.com/1439347965640_7126084420.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        西葫芦含有丰富的维生素C、葡萄糖等营养物质，是餐桌上常见的蔬菜之一。其还含有一种干扰素的诱生剂，可刺激机体产生干扰素，提高免疫力，发挥抗病毒、肿瘤的作用。西葫芦对糖尿病和肝、肾疾病有一定的防治作用。                                    " }, "guide": { "title": "制作指导", "txt": "烹饪时可以加一点水，也可以不加，因为西葫芦炒软后也会产生水分。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将洗净的年糕切块备用。", "img": "http://img.szzhangchu.com/20130326193119_0.jpg" }, { "title": "2  锅中加适量清水烧开，倒入年糕。", "img": "http://img.szzhangchu.com/20130326193119_1.jpg" }, { "title": "3  大火煮约4分钟至熟软后捞出煮好的年糕，沥干水分。", "img": "http://img.szzhangchu.com/20130326193119_2.jpg" }, { "title": "4  起油锅，倒入葱白、泡菜。", "img": "http://img.szzhangchu.com/20130326193119_3.jpg" }, { "title": "5  再倒入年糕，拌炒约2分钟至熟。", "img": "http://img.szzhangchu.com/20130326193119_4.jpg" }, { "title": "6  加入盐、鸡粉、白糖，炒匀调味。", "img": "http://img.szzhangchu.com/20130326193119_5.jpg" }, { "title": "7  用少许水淀粉勾芡，再淋入香油炒匀。", "img": "http://img.szzhangchu.com/20130326193119_6.jpg" }, { "title": "8  撒入葱段，拌炒匀。", "img": "http://img.szzhangchu.com/20130326193119_7.jpg" }, { "title": "9  盛入盘内即成。", "img": "http://img.szzhangchu.com/20130326193119_8.jpg" }], "ingredients": ["200克  泡菜", "100克  年糕", "各15克  葱白、葱段", "各适量  盐、鸡粉、白糖、水淀粉、香油"], "suits": ["猪肉:营养均衡", "牛肉:开胃消食"], "restraints": [], "tags": [{ "id": 326, "text": "炒", "type": 2 }, { "id": 123, "text": "素菜", "type": 2 }, { "id": 406, "text": "吃遍世界", "type": 2 }, { "id": 316, "text": "酸", "type": 2 }, { "id": 267, "text": "韩国料理", "type": 2 }], "_id": "5a94cfcbeefce01d3019d53a", "title": "泡菜炒年糕", "subtitle": "韩国味道，不是非要去韩国才会拥有，有掌厨，就有了创造世界美味的神器。", "category": "3分钟小炒-> 素菜 ", "image": "http://img.szzhangchu.com/1439455979104_8951340193.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        泡菜含有较多的维生素、钙、磷及多种氨基酸，富含活性乳酸菌，能够抑制肠道腐败菌的生长，具有促进消化、降低胆固醇等功效。                                    " }, "guide": { "title": "制作指导", "txt": "泡菜本身含有较多的盐分，在炒制过程中加少许盐调味即可。喜欢吃辣的朋友们，还可在调味时加入少许的韩式红辣酱，这样炒出来的年糕酸味浓郁，又不失辣味。\r\n年糕受热就容易粘锅，入锅后需要不断地翻炒。炒时还应改用小火，使年糕不粘锅的同时还能吸饱浓稠的汤汁。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将洗净的韭黄切成约4厘米长的段。", "img": "http://img.szzhangchu.com/20130410143717_0.jpg" }, { "title": "2  洗好的青椒、红椒均切成丝。", "img": "http://img.szzhangchu.com/20130410143717_1.jpg" }, { "title": "3  再把洗净的瘦肉切成薄片，然后切成丝。", "img": "http://img.szzhangchu.com/20130410143717_2.jpg" }, { "title": "4  肉丝装入容器中，加入盐、味精拌匀。", "img": "http://img.szzhangchu.com/20130410143717_3.jpg" }, { "title": "5  再加入少许水淀粉拌匀，腌渍10分钟入味。", "img": "http://img.szzhangchu.com/20130410143717_4.jpg" }, { "title": "6  锅中注水烧开后倒入腌渍好的肉丝，用锅勺搅散。", "img": "http://img.szzhangchu.com/20130410143717_5.jpg" }, { "title": "7  汆煮1分钟至肉丝发白捞出。", "img": "http://img.szzhangchu.com/20130410143717_6.jpg" }, { "title": "8  热锅注油，烧至四成热，放入肉丝。", "img": "http://img.szzhangchu.com/20130410143717_7.jpg" }, { "title": "9  滑油片刻后捞出。", "img": "http://img.szzhangchu.com/20130410143717_8.jpg" }, { "title": "10  锅留底油，倒入青椒、红椒炒香。", "img": "http://img.szzhangchu.com/20130410143717_9.jpg" }, { "title": "11  倒入韭黄。", "img": "http://img.szzhangchu.com/20130410143717_10.jpg" }, { "title": "12  加入白糖、盐。", "img": "http://img.szzhangchu.com/20130410143717_11.jpg" }, { "title": "13  倒入肉丝。", "img": "http://img.szzhangchu.com/20130410143717_12.jpg" }, { "title": "14  加鸡粉拌炒约1分钟入味。", "img": "http://img.szzhangchu.com/20130410143717_13.jpg" }, { "title": "15  加入水淀粉勾芡。", "img": "http://img.szzhangchu.com/20130410143717_14.jpg" }, { "title": "16  快速拌炒均匀。", "img": "http://img.szzhangchu.com/20130410143717_15.jpg" }, { "title": "17  盛入盘中即成。", "img": "http://img.szzhangchu.com/20130410143717_16.jpg" }], "ingredients": ["200克  瘦肉", "100克  韭黄", "各20克  青椒、红椒", "2克  盐", "1克  鸡粉", "各适量  白糖、水淀粉、味精、食用油"], "suits": ["白萝卜:消食、除胀、通便", "红薯:降低胆固醇", "芦笋:有利于维生素B12的吸收和利用", "莴笋:促进食欲、补脾益气", "芋头:可滋阴润燥、养胃益气", "茄子:减少人体对猪肉中胆固醇的吸收", "香菇:保持营养均衡", "白菜:开胃消食"], "restraints": ["田螺:容易伤肠胃", "鲫鱼:会降低鲫鱼的利湿功效", "鸽子:易使人滞气", "驴肉:易导致腹泻", "茶:易引发恶心、呕吐、腹痛"], "tags": [{ "id": 398, "text": "肉类", "type": 2 }, { "id": 397, "text": "肉类", "type": 2 }, { "id": 151, "text": "猪肉", "type": 2 }, { "id": 322, "text": "淡", "type": 2 }, { "id": 326, "text": "炒", "type": 2 }], "_id": "5a94cfcbeefce01d3019d53b", "title": "韭黄炒肉丝", "subtitle": "韭黄炒鸡蛋是比较常见的菜，今天就把韭黄和瘦肉一起炒，都切成条状，再配上青红椒条，非常养眼，清淡适口，很开胃呢！", "category": "3分钟小炒-> 肉类 ", "image": "http://img.szzhangchu.com/1439349823500_3551409860.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        瘦肉营养丰富，蛋白质含量高，还含有丰富的脂肪、维生素B1、钙、磷、铁等成分，具有补肾养血、滋阴润燥、丰肌泽肤等功效。凡病后体弱、产后血虚、面黄羸瘦者，皆可用之作营养滋补之品。                                    " }, "guide": { "title": "制作指导", "txt": "烹饪此菜时，可先将猪肉腌渍入味，然后再加入水淀粉拌匀，这样炒出的菜肴口感更佳。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  锅中倒入适量清水烧开，放入洗净的猪皮。", "img": "http://img.szzhangchu.com/20130718163709_0.jpg" }, { "title": "2  盖上盖，小火煮10分钟至猪皮熟软。", "img": "http://img.szzhangchu.com/20130718163709_1.jpg" }, { "title": "3  揭盖，把煮熟的猪皮捞出，凉凉备用。", "img": "http://img.szzhangchu.com/20130718163709_2.jpg" }, { "title": "4  把猪皮切成条。", "img": "http://img.szzhangchu.com/20130718163709_3.jpg" }, { "title": "5  洗净的青椒切开，去籽，切成条。", "img": "http://img.szzhangchu.com/20130718163709_4.jpg" }, { "title": "6  洗净的红椒切开，去籽，切成条。", "img": "http://img.szzhangchu.com/20130718163709_5.jpg" }, { "title": "7  炒锅注油烧热，放入蒜末、姜片、葱白，爆香。", "img": "http://img.szzhangchu.com/20130718163709_6.jpg" }, { "title": "8  放入切好的猪皮，拌炒匀。", "img": "http://img.szzhangchu.com/20130718163709_7.jpg" }, { "title": "9  淋入少许老抽，炒匀上色。", "img": "http://img.szzhangchu.com/20130718163709_8.jpg" }, { "title": "10  加入适量豆瓣酱，淋入料酒，炒香。", "img": "http://img.szzhangchu.com/20130718163709_9.jpg" }, { "title": "11  放入青椒、红椒，翻炒均匀。", "img": "http://img.szzhangchu.com/20130718163709_10.jpg" }, { "title": "12  淋入少许清水，翻炒片刻。", "img": "http://img.szzhangchu.com/20130718163709_11.jpg" }, { "title": "13  加盐、鸡粉、生抽，炒匀调味。", "img": "http://img.szzhangchu.com/20130718163709_12.jpg" }, { "title": "14  大火收汁，倒入适量水淀粉。", "img": "http://img.szzhangchu.com/20130718163709_13.jpg" }, { "title": "15  将锅中材料炒匀。", "img": "http://img.szzhangchu.com/20130718163709_14.jpg" }, { "title": "16  盛出装盘即可。", "img": "http://img.szzhangchu.com/20130718163709_15.jpg" }], "ingredients": ["50克  青椒", "30克  红椒", "150克  猪皮", "各少许  姜片、蒜末、葱白", "2克  盐", "10克  豆瓣酱", "2毫升  老抽", "4毫升  料酒", "3毫升  生抽", "各适量  鸡粉、水淀粉、食用油"], "suits": ["红枣:美容养颜", "红糖:养虚补血"], "restraints": ["田螺:容易伤肠胃", "鲫鱼:会降低鲫鱼的利湿功效"], "tags": [{ "id": 319, "text": "辣", "type": 2 }, { "id": 260, "text": "湘菜", "type": 2 }, { "id": 232, "text": "晚餐", "type": 2 }, { "id": 398, "text": "肉类", "type": 2 }, { "id": 397, "text": "肉类", "type": 2 }], "_id": "5a94cfcbeefce01d3019d53c", "title": "青红椒炒猪皮", "subtitle": "青椒红椒与粉红的猪皮伴炒，青红惹眼，好看又好吃，果然是家常必备。", "category": "3分钟小炒-> 肉类 ", "image": "http://img.szzhangchu.com/1439367255881_2385880496.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        猪皮含丰富的胶原蛋白、脂肪，胶原蛋白在烹调过程中可转化成明胶，从而增强细胞的生理代谢，改善机体生理功能和皮肤组织细胞的储水功能，使细胞得到滋润，保持湿润状态，有美容养颜，滋润的作用。                                    " }, "guide": { "title": "制作指导", "txt": "烹饪此菜时，豆瓣酱不宜放太多，以免过咸过辣，影响成菜口感。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将洗净的蒜薹切成4厘米长的段。", "img": "http://img.szzhangchu.com/20130718175914_0.jpg" }, { "title": "2  洗净的猪心切成块。", "img": "http://img.szzhangchu.com/20130718175914_1.jpg" }, { "title": "3  把猪心片装入碗中，加盐、生抽、鸡粉、料酒。", "img": "http://img.szzhangchu.com/20130718175914_2.jpg" }, { "title": "4  再倒入少许水淀粉，抓匀，腌渍10分钟至入味。", "img": "http://img.szzhangchu.com/20130718175914_3.jpg" }, { "title": "5  锅中倒入适量清水烧开，加少许食用油，放入蒜薹，煮约半分钟。", "img": "http://img.szzhangchu.com/20130718175914_4.jpg" }, { "title": "6  把焯好的蒜薹捞出备用。", "img": "http://img.szzhangchu.com/20130718175914_5.jpg" }, { "title": "7  热锅注油，放入姜片、蒜末、葱白爆香。", "img": "http://img.szzhangchu.com/20130718175914_6.jpg" }, { "title": "8  放入猪心，翻炒匀。", "img": "http://img.szzhangchu.com/20130718175914_7.jpg" }, { "title": "9  淋入料酒，拌炒香。", "img": "http://img.szzhangchu.com/20130718175914_8.jpg" }, { "title": "10  放入焯过水的蒜薹，炒匀。", "img": "http://img.szzhangchu.com/20130718175914_9.jpg" }, { "title": "11  加入适量生抽、盐、鸡粉。", "img": "http://img.szzhangchu.com/20130718175914_10.jpg" }, { "title": "12  再放入少许辣椒酱。", "img": "http://img.szzhangchu.com/20130718175914_11.jpg" }, { "title": "13  将锅中食材拌炒至入味。", "img": "http://img.szzhangchu.com/20130718175914_12.jpg" }, { "title": "14  盛出装盘即可。", "img": "http://img.szzhangchu.com/20130718175914_13.jpg" }], "ingredients": ["150克  蒜薹", "200克  猪心", "各少许  姜片、蒜末、葱白", "3克  盐", "3克  鸡粉", "10克  辣椒酱", "4毫升  生抽", "8毫升  料酒", "4毫升  水淀粉", " 食用油适量"], "suits": ["韭菜:补血，滋阴", "茭白:补血润燥", "辣椒:养血补气", "蒜:滋阴润燥"], "restraints": ["甘草:易对身体不利", "茶叶:不易溶解的物质，造成便秘"], "tags": [{ "id": 397, "text": "肉类", "type": 2 }, { "id": 296, "text": "益气补血", "type": 2 }, { "id": 232, "text": "晚餐", "type": 2 }, { "id": 326, "text": "炒", "type": 2 }, { "id": 151, "text": "猪肉", "type": 2 }], "_id": "5a94cfcbeefce01d3019d53d", "title": "蒜薹炒猪心", "subtitle": "味道鲜美、口感丰富、营养全面、下酒下饭。平常家里聚餐选这一道菜绝对没错。", "category": "3分钟小炒-> 肉类 ", "image": "http://img.szzhangchu.com/1439367316795_9080911596.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        猪心的蛋白质含量是猪肉的2倍，脂肪含量却极少。猪心还富含钙、磷、铁、维生素等成分，具有安神定惊、养心补血之功效，常食可缓解妇女绝经后阴虚心亏、心神失养所致诸症。                                    " }, "guide": { "title": "制作指导", "txt": "猪心通常有股异味，用少量面粉抓匀，放置1小时左右，再用清水洗净，这样烹炒出来的猪心不仅无异味，而且味道鲜美。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将洗好的春笋切丁。", "img": "http://img.szzhangchu.com/20130326153018_0.jpg" }, { "title": "2  锅中注入清水，加入盐和食用油烧热。", "img": "http://img.szzhangchu.com/20130326153018_1.jpg" }, { "title": "3  倒入笋丁，烧开后捞出。", "img": "http://img.szzhangchu.com/20130326153018_2.jpg" }, { "title": "4  锅置旺火，注油烧热，倒入肉末炒散。", "img": "http://img.szzhangchu.com/20130326153018_3.jpg" }, { "title": "5  加入盐、生抽、料酒炒匀。", "img": "http://img.szzhangchu.com/20130326153018_4.jpg" }, { "title": "6  倒入红椒末、蒜末、葱段、姜片拌炒匀。", "img": "http://img.szzhangchu.com/20130326153018_5.jpg" }, { "title": "7  再倒入笋丁、洗好的芽菜炒匀。", "img": "http://img.szzhangchu.com/20130326153018_6.jpg" }, { "title": "8  加入少许水淀粉勾芡。", "img": "http://img.szzhangchu.com/20130326153018_7.jpg" }, { "title": "9  将勾芡后的菜炒匀。", "img": "http://img.szzhangchu.com/20130326153018_8.jpg" }, { "title": "10  盛入盘内即可。", "img": "http://img.szzhangchu.com/20130326153018_9.jpg" }], "ingredients": ["250克  春笋", "120克  猪肉末", "150克  芽菜", "各适量  姜片、蒜末、葱段、红椒末", "2克  盐", "各适量  水淀粉、生抽、料酒、食用油"], "suits": ["白萝卜:消食、除胀、通便", "泥蒿:降低血压", "红薯:降低胆固醇", "芦笋:有利于维生素B12的吸收和利用", "莴笋:促进食欲、补脾益气", "芋头:可滋阴润燥、养胃益气", "竹笋:清热化痰、解渴益气", "冬瓜:开胃消食", "茄子:减少人体对猪肉中胆固醇的吸收", "丝瓜:对大便出血、痔疮有很好的疗效", "黑木耳:降低心血管病发病率", "香菇:保持营养均衡", "鹌鹑:美白肌肤、消除疲劳", "海带:止痒", "山楂:祛斑消瘀", "白菜:开胃消食", "青辣椒:有益于糖尿病患者", "豆苗:利尿、消肿、止痛"], "restraints": ["田螺:容易伤肠胃", "鲫鱼:会降低鲫鱼的利湿功效", "鸽子:易使人滞气", "驴肉:易导致腹泻", "茶:易引发恶心、呕吐、腹痛"], "tags": [{ "id": 397, "text": "肉类", "type": 2 }, { "id": 340, "text": "家庭主妇", "type": 2 }, { "id": 289, "text": "增强免疫力", "type": 2 }, { "id": 398, "text": "肉类", "type": 2 }, { "id": 326, "text": "炒", "type": 2 }], "_id": "5a94cfcbeefce01d3019d53f", "title": "芽菜肉末炒春笋", "subtitle": "简单的家常菜，想不到吃什么，就可以做，方便快捷又下饭。", "category": "3分钟小炒-> 肉类 ", "image": "http://img.szzhangchu.com/1439346879563_9374409750.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        猪肉是人们餐桌上重要的动物性食品之一，它也是人类摄取动物类脂肪和蛋白质的主要来源。猪肉营养丰富，蛋白质和胆固醇含量较高，还富含维生素B1和锌等，有滋养脏腑、润滑肌肤、补中益气、滋阴养胃等功效。儿童经常适量食用可促进智力的发育。                                    " }, "guide": { "title": "制作指导", "txt": "勾芡时，水淀粉不宜太多，否则芡汁太稠，菜肴的口感不够嫩滑。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将洗净的韭黄切段。", "img": "http://img.szzhangchu.com/20130326164253_0.jpg" }, { "title": "2  再把洗好的虾仁从背部划开。", "img": "http://img.szzhangchu.com/20130326164253_1.jpg" }, { "title": "3  虾仁加盐、味精、水淀粉抓匀，倒入少许油腌渍3～5分钟入味。", "img": "http://img.szzhangchu.com/20130326164253_2.jpg" }, { "title": "4  锅置旺火，注油烧热，倒入虾仁滑油片刻捞出。", "img": "http://img.szzhangchu.com/20130326164253_3.jpg" }, { "title": "5  锅留底油，倒入青蒜苗、红椒丝炒。", "img": "http://img.szzhangchu.com/20130326164253_4.jpg" }, { "title": "6  再倒入韭黄和虾仁炒匀。", "img": "http://img.szzhangchu.com/20130326164253_5.jpg" }, { "title": "7  加入盐、味精、料酒。", "img": "http://img.szzhangchu.com/20130326164253_6.jpg" }, { "title": "8  炒至入味。", "img": "http://img.szzhangchu.com/20130326164253_7.jpg" }, { "title": "9  盛入盘内即可。", "img": "http://img.szzhangchu.com/20130326164253_8.jpg" }], "ingredients": ["250克  韭黄", "150克  虾仁", "20克  青蒜苗段", " 红椒丝少许", "2克  盐", "1克  味精", "各适量  水淀粉、料酒"], "suits": ["韭菜花:治夜盲、干眼、便秘", "葱:益气、下乳", "香菜:补脾益气", "猪肝:治肾虚、月经过多", "鹌鹑:补脾和胃、补肾固精", "枸杞:补肾壮阳", "燕麦:有利牛磺酸的合成", "豆苗:增强体质、促进食欲", "白菜:增强机体免疫力"], "restraints": ["南瓜:引起腹泻、腹胀", "猪肉:易耗人阴精", "西瓜:降低免疫力", "百合:降低营养", "茶:引起结石", "猕猴桃:对人体不利"], "tags": [{ "id": 326, "text": "炒", "type": 2 }, { "id": 167, "text": "虾", "type": 2 }, { "id": 294, "text": "保肝护肾", "type": 2 }, { "id": 261, "text": "粤菜", "type": 2 }, { "id": 322, "text": "淡", "type": 2 }], "_id": "5a94cfd5eefce01d3019d540", "title": "韭黄炒虾仁", "subtitle": "韭菜称为“起阳草”，和虾黄一起，补肾功效加倍。", "category": "3分钟小炒-> 河鲜海鲜 ", "image": "http://img.szzhangchu.com/1439346931917_9199781762.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        虾仁营养丰富，其中钙的含量为各种动植物食品之冠。其蛋白质含量也相当高，还富含钾、碘等矿物质及维生素A等营养成分，且其肉质松软、味道鲜美，还易消化，对身体虚弱以及病后需要调养的人是极好的营养食物。                                    " }, "guide": { "title": "制作指导", "txt": "虾仁入锅炒制时火不要太大，而且时间不要太长，这样炒出的虾仁才够嫩。" } }, { "dishes_id": 3682, "steps": [{ "title": "1  将宰杀处理好的生鱼剔去鱼骨，片取鱼肉，再片成薄片。", "img": "http://img.szzhangchu.com/20130327085044_0.jpg" }, { "title": "2  青、红椒洗净，去籽切片。", "img": "http://img.szzhangchu.com/20130327085044_1.jpg" }, { "title": "3  大蒜去皮切片。", "img": "http://img.szzhangchu.com/20130327085044_2.jpg" }, { "title": "4  生姜去皮切片。葱洗净切段。", "img": "http://img.szzhangchu.com/20130327085044_3.jpg" }, { "title": "5  鱼片先加少许盐、味精抓匀，再加水淀粉抓匀，然后倒入少许食用油腌渍入味。", "img": "http://img.szzhangchu.com/20130327085044_4.jpg" }, { "title": "6  锅中注水，加少许油搅匀煮沸，放入青、红椒焯烫片刻后捞出。", "img": "http://img.szzhangchu.com/20130327085044_5.jpg" }, { "title": "7  炒锅热油，倒入生鱼片滑油，捞出沥油。", "img": "http://img.szzhangchu.com/20130327085044_6.jpg" }, { "title": "8  锅留底油，入姜、蒜和辣椒酱炒香。", "img": "http://img.szzhangchu.com/20130327085044_7.jpg" }, { "title": "9  倒入青红椒、葱白炒匀。", "img": "http://img.szzhangchu.com/20130327085044_8.jpg" }, { "title": "10  倒入生鱼片。", "img": "http://img.szzhangchu.com/20130327085044_9.jpg" }, { "title": "11  加盐、味精、白糖和料酒炒入味。", "img": "http://img.szzhangchu.com/20130327085044_10.jpg" }, { "title": "12  盛入盘中即可。", "img": "http://img.szzhangchu.com/20130327085044_11.jpg" }], "ingredients": ["550克  生鱼", "各15克  青椒、红椒", "10克  葱", "15克  生姜", " 大蒜少许", "3克  盐", "各少许  味精、水淀粉、白糖、料酒、辣椒酱"], "suits": [], "restraints": [], "tags": [{ "id": 326, "text": "炒", "type": 2 }, { "id": 294, "text": "保肝护肾", "type": 2 }, { "id": 321, "text": "鲜", "type": 2 }, { "id": 150, "text": "河鲜海鲜", "type": 2 }, { "id": 341, "text": "大叔", "type": 2 }], "_id": "5a94cfd5eefce01d3019d542", "title": "爆炒生鱼片", "subtitle": "生猛的食材当然需要粗暴的烹饪方法。手法暴烈，但是口味一流。", "category": "3分钟小炒-> 河鲜海鲜 ", "image": "http://img.szzhangchu.com/1439537271088_1219750960.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        生鱼肉质细腻，肉味鲜美，刺少。其营养价值很高，含有蛋白质、脂肪、碳水化合物和18种氨基酸，还含有人体必需的钙、磷、铁及多种维生素，有补脾、清热、补肝等功能，是病后康复和体虚者的滋补珍品。                                    " }, "guide": { "title": "制作指导", "txt": "生鱼片放入清水中浸泡20分钟可使鱼肉色泽更白。" } }] });
})

/*
 Edit page function start
*/
router.get('/api/edit', (req, res) => {
  console.log(req)
  res.json({ "dishes_id": 3682, "steps": [{ "title": "1  将洗净的蕨菜切段。", "img": "http://img.szzhangchu.com/20130323170250_0.jpg" }, { "title": "2  洗好的苦瓜切段。", "img": "http://img.szzhangchu.com/20130323170250_1.jpg" }, { "title": "3  锅中加清水烧开，加食粉，倒入苦瓜。", "img": "http://img.szzhangchu.com/20130323170250_2.jpg" }, { "title": "4  煮约1分钟至熟捞出。", "img": "http://img.szzhangchu.com/20130323170250_3.jpg" }, { "title": "5  用油起锅，倒入蒜末、蕨菜炒香。", "img": "http://img.szzhangchu.com/20130323170250_4.jpg" }, { "title": "6  倒入苦瓜、蚝油、盐、味精、白糖、鸡粉炒入味。", "img": "http://img.szzhangchu.com/20130323170250_5.jpg" }, { "title": "7  加水淀粉勾芡，淋入熟油拌匀。", "img": "http://img.szzhangchu.com/20130323170250_6.jpg" }, { "title": "8  盛出即可。", "img": "http://img.szzhangchu.com/20130323170250_7.jpg" }], "ingredients": ["150克  蕨菜", "200克  苦瓜", " 蒜末少许", "各适量  蚝油、盐、味精、白糖、鸡粉、水淀粉、食粉"], "suits": ["洋葱:增强免疫力", "茄子:清心明目，可防治心血管疾病", "猪肝:清热解毒，补肝明目", "鸡翅:补脾健胃", "辣椒:排毒瘦身", "猪肉:清热解毒", "鸡蛋:对骨骼、牙齿的健康有帮助"], "restraints": ["胡萝卜:降低营养价值", "黄瓜:降低营养价值", "南瓜:破坏维生素C", "豆腐:易形成结石", "牛奶:不利营养物质的吸收"], "tags": [{ "id": 289, "text": "增强免疫力", "type": 2 }, { "id": 340, "text": "家庭主妇", "type": 2 }, { "id": 326, "text": "炒", "type": 2 }, { "id": 144, "text": "蔬菜", "type": 2 }, { "id": 123, "text": "素菜", "type": 2 }], "_id": "5a94cfcbeefce01d3019d536", "title": "蕨菜炒苦瓜", "subtitle": "夏天食苦，胜过大补。苦瓜与蕨菜的清香合二为一，有菜园子的味道哟~", "category": "3分钟小炒-> 素菜 ", "image": "http://img.szzhangchu.com/1439346681737_8487308714.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        苦瓜味苦，性寒，归心、肺、脾、胃经，具有消暑清热，解毒健胃，除邪热，聪耳明目，润泽肌肤，强身，使人精力旺盛，不易衰老的功效，还有降血糖、抗肿瘤、抗病毒、抗菌、促进免疫力等作用。                                    " }, "guide": { "title": "制作指导", "txt": "煮制苦瓜时，可撒上少许盐，这样既可以减轻苦味，而且也不会破坏苦瓜原有的风味。" } })
})
/*
 Edit page function end.
*/

function formatSearch(arr) {
  return arr.map((item, index) => {
    return { id: index + 1, value: item }
  })
}

module.exports = router;
