/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : family_day

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 17/04/2020 09:40:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NULL DEFAULT NULL,
  `title` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `address` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `type` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `max_age` int(11) NULL DEFAULT NULL,
  `min_age` int(11) NULL DEFAULT NULL,
  `state` int(11) NULL DEFAULT NULL,
  `price` decimal(10, 0) NULL DEFAULT NULL,
  `start_time` datetime(0) NULL DEFAULT NULL,
  `end_time` datetime(0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`) USING BTREE,
  INDEX `FK_activity_shop`(`shop_id`) USING BTREE,
  CONSTRAINT `FK_activity_shop` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (1, 1, '骑行千岛湖', '沿排岭半骑行绿道【千岛湖骑行】,这条绿道按照春、夏、秋、冬设计成四种颜色,搭配不同季节的景观植被环境优美。骑行道一侧便是美丽的千岛湖,途中会有好些观的平台,供我们停下来眺望湖水,留下欢乐的合影。', '千岛湖', 1, 35, '/images/uploads/1.png', 16, 8, 1, 299, '2020-01-05 00:00:00', '2020-01-11 00:00:00', '2019-12-15 00:00:00');
INSERT INTO `activity` VALUES (2, 2, '日本北海道雪国童话之旅', '调查显示,85%的孩子喜爱滑雪,四天的时间让孩子学会一项运动。在自然学校体的滑雪课程,得到了全日本滑雪盟(SAJ)的认证,所有教练均有SAJ教练资格与丰富的教学经验,孩子们将接受安全无忧的专业滑雪指导。教孩子们循序渐进的掌握滑雪技5,在林海雪原中做小飞人', '日本北海道', 1, 20, '/images/uploads/2.png', 18, 5, 1, 199, '2020-01-10 00:00:00', '2020-01-19 00:00:00', '2019-12-24 00:00:00');
INSERT INTO `activity` VALUES (3, 3, '十里梅花香雪海', '杭州美在西湖,秀在河,壮在钱塘。但是资深些的游客,则会沿着运河北上,一直到塘栖,这座当年的江南十大名镇之首。塘栖古镇是江南水乡的一处精华,恰如幅画中的焦点,而周边成片的水田、水塘、农居,才占据了画卷的绝大部分。在这里,藏着另一处水乡小径,一头连着塘镇,一头连着江南三大赏梅胜地超山。', '江苏杭州超山', 1, 30, '/images/uploads/3.png', 16, 8, 1, 189, '2020-01-07 00:00:00', '2020-01-11 00:00:00', '2019-12-27 00:00:00');
INSERT INTO `activity` VALUES (4, 4, '徒步-苏州灵白线', '苏州的山其实不能称之为山,秀丽有灵气少巍挺拔。灵白线对于苏州的登山爱好者来说是人人皆的,据说这是一条入门线路,各种路况都有是难度不大,比较适合平时不怎么锻炼但又想挑战一下自我的懒懒们。', '江苏苏州', 1, 40, '/images/uploads/4.png', 18, 7, 1, 129, '2020-01-07 00:00:00', '2020-01-20 00:00:00', '2019-12-10 00:00:00');
INSERT INTO `activity` VALUES (5, 5, '闲逛溪口老街—春天花事', '溪口老街,又名“西木老街,建成于清朝乾隆年,座落于万源市溪口乡鸡寺庙梁山脊之上,镶嵌在青山绿水之间,是万源市目前保存最完整最长的古场镇。在这里依然保留着原本的生活节奏悠长的小径从眼前开去,小径两旁是宅大院,斑驳墙面,乌黑砖瓦,高低错落,看似随心所欲的一番布局却极具有精巧的和谐之美，再现了旧时代的那一种悠久画面。', '宁波溪口', 1, 50, '/images/uploads/5.png', 12, 6, 1, 200, '2020-01-09 00:00:00', '2020-01-11 00:00:00', '2019-12-25 00:00:00');
INSERT INTO `activity` VALUES (6, 6, '双溪竹海漂流', '杭州双溪漂流景区,里满山茶园,遍地竹林,苍翠欲滴,四季如春; \n这里清流潺潺,竹回路转,清凉逼人,妙趣横生;这里空气清新,气候宜人,森林覆盖率为93.%,有竹海氧吧之美誉。', '江苏苏州', 1, 60, '/images/uploads/6.png', 18, 8, 1, 219, '2020-01-07 00:00:00', '2020-01-19 00:00:00', '2019-12-22 00:00:00');
INSERT INTO `activity` VALUES (7, 7, '人文地质大寻访', ' \n镇江竟然藏着一处小众而漂亮的山脉一山、五峰山自古就有逆流而障东逝之波”、“凿石排南连峰出大川的美誉。匿山雄峙江浒,扼锁大江,是江南地区极其罕见的临江名山!当年始皇东巡来到这里,见长江之滨竟有如此奇:山峰耸峙,形如巨龙瑞气升腾!心中大悦,为锁住这份瑞气,便赐名(chui)山。', '江苏镇江', 1, 30, '/images/uploads/7.png', 17, 3, 1, 259, '2020-01-10 00:00:00', '2020-01-12 00:00:00', '2019-12-29 00:00:00');
INSERT INTO `activity` VALUES (8, 8, '我们的青春纪念册', ' \n这里没有璀璨夺目的明星,但是有青春洋溢的我们:这里没有华丽绚烂的场景,但是有绿意然的健康小道:这里没有专业大牌的导演,但是有认真服务的我们。一段段精彩的演出将会由来呈现,这将会是你的专属 show time!!', '上海', 1, 25, '/images/uploads/8.png', 18, 9, 1, 269, '2020-01-06 00:00:00', '2020-01-18 00:00:00', '2019-12-12 00:00:00');
INSERT INTO `activity` VALUES (9, 9, '大帆船体验—宜兴', '在教练的陪同下,团队合作亲自驾驶大帆教学(教练:学员)比例1:8,近距离教学,团队成员分工配合,舵手(船长)、前帆手、主帆手、甲板手、瞭望员,每个岗位都会轮流体验!小游戏每个小孩更可以配备一把水枪和家长教练一起体验活力四射的水上游戏利用水枪在船上跟其他的船队展开对战。', NULL, 1, 50, '/images/uploads/9.png', 12, 5, 1, 169, '2020-01-08 00:00:00', '2020-01-18 00:00:00', '2019-12-14 00:00:00');
INSERT INTO `activity` VALUES (10, 10, '大美河南-四大世界遗产之旅', '小时候一直喜欢翻看历史书,古代史书别的可以不写,却不得不提“河南”这两个字。从中国第一个王朝夏朝开始,先后有夏朝、商朝、西周、东周、东汉、曹魏、西晋、北魏、隋朝、唐朝、后梁、后汉、后唐、后晋、后周、北宋、金朝十多个王朝在此建都,这里是甲骨文的发源地,也是华夏文化的发源地。', NULL, 1, 30, '/images/uploads/10.png', 17, 6, 1, 189, '2020-01-05 00:00:00', '2020-01-20 00:00:00', '2019-12-13 00:00:00');
INSERT INTO `activity` VALUES (11, 11, '马背上的时光', '属于亲子的美好时光，对自然观察的强烈好奇心和探索欲，是亲子信任建立的桥梁。', '南澳田园农庄', 1, 30, '/images/uploads/art1.jpg', 8, 3, 1, 49, '2020-01-06 00:00:00', '2020-01-18 00:00:00', '2019-12-16 00:00:00');
INSERT INTO `activity` VALUES (12, 12, '未来视界', '全家护眼总动员！体验眼科界的“迪士尼”，1大1小眼科亲子检查！', '未来视界', 1, 60, '/images/uploads/art2.jpg', 16, 4, 1, 99, '2020-01-09 00:00:00', '2020-01-12 00:00:00', '2019-12-23 00:00:00');
INSERT INTO `activity` VALUES (13, 13, '徒步行者', '周末徒步 、登山、野炊、攀岩...提升毅力与勇气双重挑战！', '雁荡山国家森林公园', 1, 60, '/images/uploads/art3.jpg', 18, 6, 1, 318, '2020-01-06 00:00:00', '2020-01-15 00:00:00', '2019-12-03 00:00:00');
INSERT INTO `activity` VALUES (14, 14, '不嗨不周末', '不嗨不周末！发现金色亲子季！便当盒蛋糕DIY、亲子互动 定格温暖瞬间！', '瓯海蛋糕园', 1, 20, '/images/uploads/art4.jpg', 18, 5, 1, 59, '2020-01-07 00:00:00', '2020-01-16 00:00:00', '2019-12-20 00:00:00');
INSERT INTO `activity` VALUES (15, 15, '探秘', '探秘藏在峡谷乐园中的军事基地！火箭筒、萨姆导弹、陆战坦克车...孩子玩了完全不想走！', '九鲤溪瀑景区', 1, 50, '/images/uploads/art5.jpg', 16, 6, 1, 198, '2020-01-07 00:00:00', '2020-01-18 00:00:00', '2019-12-01 00:00:00');
INSERT INTO `activity` VALUES (16, 16, '拾忆', '带孩子回到80后的童年。稻田抓鱼、竹筒饭、夜探昆虫、篝火派对、亲子运动会...', '蓝美庄园', 1, 50, '/images/uploads/art6.jpg', 18, 3, 1, 588, '2020-01-10 00:00:00', '2020-01-20 00:00:00', '2019-12-24 00:00:00');
INSERT INTO `activity` VALUES (17, 17, '生存挑战', '城市生存挑战赛 ！财商、情商、智商の全面考验！', '九山公园松台广场', 1, 30, '/images/uploads/art7.jpg', 10, 7, 1, 150, '2020-01-09 00:00:00', '2020-01-15 00:00:00', '2019-12-15 00:00:00');
INSERT INTO `activity` VALUES (18, 18, '秋季野餐', '温州有一场秋季百人野餐party！水果美食、咖啡讲堂、手绘牛仔帽....太想参加了~', '云岚牧场', 1, 100, '/images/uploads/art8.jpg', 18, 3, 1, 338, '2020-01-06 00:00:00', '2020-01-18 00:00:00', '2019-12-05 00:00:00');
INSERT INTO `activity` VALUES (19, 19, '粉黛采橘', '乐清赏粉黛乱子、采摘橘子1日游', '筋竹涧农业观光园', 1, 100, '/images/uploads/art9.jpg', 18, 5, 1, 99, '2020-01-08 00:00:00', '2020-01-19 00:00:00', '2019-12-26 00:00:00');
INSERT INTO `activity` VALUES (20, 20, '滑雪营', '2020亲子滑雪营！不出国门，国内就有不输日本的亲子滑雪体验', '亚布力滑雪场', 1, 25, '/images/uploads/art10.jpg', 18, 6, 1, 998, '2020-01-05 00:00:00', '2020-01-16 00:00:00', '2019-12-24 00:00:00');

-- ----------------------------
-- Table structure for activity_comment
-- ----------------------------
DROP TABLE IF EXISTS `activity_comment`;
CREATE TABLE `activity_comment`  (
  `activity_comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NULL DEFAULT NULL,
  `activity_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `score` int(11) NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reply_time` datetime(0) NULL DEFAULT NULL,
  `reply_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`activity_comment_id`) USING BTREE,
  INDEX `FK_activity_comment_activity`(`activity_id`) USING BTREE,
  INDEX `FK_activity_comment_order`(`order_id`) USING BTREE,
  INDEX `FK_activity_comment_user`(`user_id`) USING BTREE,
  CONSTRAINT `FK_activity_comment_activity` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_activity_comment_order` FOREIGN KEY (`order_id`) REFERENCES `t_order` (`order_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_activity_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_comment
-- ----------------------------
INSERT INTO `activity_comment` VALUES (1, NULL, NULL, 1, '海底世界城真是一场精彩绝伦的视觉盛宴，与海洋生物的亲\n密接触增长了孩子的知识，很值得的一次体验！', 5, '/images/default_activity_img2.png', '2020-01-01 00:00:00', '小店十分感谢贵客的高度肯定！以后一定会更加努力，创造\n出更多更好的亲子活动！', '2015-01-01 00:00:00');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `title` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `isview` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`article_id`) USING BTREE,
  INDEX `FK_article_user`(`user_id`) USING BTREE,
  CONSTRAINT `FK_article_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 162 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 1, '骑行千岛湖', '沿排岭半骑行绿道【千岛湖骑行】,这条绿道按照春、夏、秋、冬设计成四种颜色,搭配不同季节的景观植被环境优美。骑行道一侧便是美丽的千岛湖,途中会有好些观的平台,供我们停下来眺望湖水,留下欢乐的合影。', '/images/uploads/1.png', '2020-02-27 00:00:00', 1);
INSERT INTO `article` VALUES (2, 2, '日本北海道雪国童话之旅', '调查显示,85%的孩子喜爱滑雪,四天的时间让孩子学会一项运动。在自然学校体的滑雪课程,得到了全日本滑雪盟(SAJ)的认证,所有教练均有SAJ教练资格与丰富的教学经验,孩子们将接受安全无忧的专业滑雪指导。教孩子们循序渐进的掌握滑雪技5,在林海雪原中做小飞人', '/images/uploads/2.png', '2020-03-13 00:00:00', 1);
INSERT INTO `article` VALUES (3, 3, '十里梅花香雪海', '杭州美在西湖,秀在河,壮在钱塘。但是资深些的游客,则会沿着运河北上,一直到塘栖,这座当年的江南十大名镇之首。塘栖古镇是江南水乡的一处精华,恰如幅画中的焦点,而周边成片的水田、水塘、农居,才占据了画卷的绝大部分。在这里,藏着另一处水乡小径,一头连着塘镇,一头连着江南三大赏梅胜地超山。', '/images/uploads/3.png', '2020-04-22 00:00:00', 1);
INSERT INTO `article` VALUES (4, 4, '徒步-苏州灵白线', '苏州的山其实不能称之为山,秀丽有灵气少巍挺拔。灵白线对于苏州的登山爱好者来说是人人皆的,据说这是一条入门线路,各种路况都有是难度不大,比较适合平时不怎么锻炼但又想挑战一下自我的懒懒们。', '/images/uploads/4.png', '2020-02-15 00:00:00', 1);
INSERT INTO `article` VALUES (5, 5, '闲逛溪口老街—春天花事', '溪口老街,又名“西木老街,建成于清朝乾隆年,座落于万源市溪口乡鸡寺庙梁山脊之上,镶嵌在青山绿水之间,是万源市目前保存最完整最长的古场镇。在这里依然保留着原本的生活节奏悠长的小径从眼前开去,小径两旁是宅大院,斑驳墙面,乌黑砖瓦,高低错落,看似随心所欲的一番布局却极具有精巧的和谐之美，再现了旧时代的那一种悠久画面。', '/images/uploads/5.png', '2020-04-16 00:00:00', 1);
INSERT INTO `article` VALUES (6, 6, '双溪竹海漂流', '杭州双溪漂流景区,里满山茶园,遍地竹林,苍翠欲滴,四季如春; \n这里清流潺潺,竹回路转,清凉逼人,妙趣横生;这里空气清新,气候宜人,森林覆盖率为93.%,有竹海氧吧之美誉。', '/images/uploads/6.png', '2020-04-28 00:00:00', 1);
INSERT INTO `article` VALUES (7, 7, '人文地质大寻访', ' \n镇江竟然藏着一处小众而漂亮的山脉一山、五峰山自古就有逆流而障东逝之波”、“凿石排南连峰出大川的美誉。匿山雄峙江浒,扼锁大江,是江南地区极其罕见的临江名山!当年始皇东巡来到这里,见长江之滨竟有如此奇:山峰耸峙,形如巨龙瑞气升腾!心中大悦,为锁住这份瑞气,便赐名(chui)山。', '/images/uploads/7.png', '2020-02-28 00:00:00', 1);
INSERT INTO `article` VALUES (8, 8, '我们的青春纪念册', ' \n这里没有璀璨夺目的明星,但是有青春洋溢的我们:这里没有华丽绚烂的场景,但是有绿意然的健康小道:这里没有专业大牌的导演,但是有认真服务的我们。一段段精彩的演出将会由来呈现,这将会是你的专属 show time!!', '/images/uploads/8.png', '2019-12-16 00:00:00', 1);
INSERT INTO `article` VALUES (9, 9, '大帆船体验—宜兴', '在教练的陪同下,团队合作亲自驾驶大帆教学(教练:学员)比例1:8,近距离教学,团队成员分工配合,舵手(船长)、前帆手、主帆手、甲板手、瞭望员,每个岗位都会轮流体验!小游戏每个小孩更可以配备一把水枪和家长教练一起体验活力四射的水上游戏利用水枪在船上跟其他的船队展开对战。', '/images/uploads/9.png', '2019-12-19 00:00:00', 1);
INSERT INTO `article` VALUES (10, 10, '大美河南，四大世界遗产之旅', '小时候一直喜欢翻看历史书,古代史书别的可以不写,却不得不提“河南”这两个字。从中国第一个王朝夏朝开始,先后有夏朝、商朝、西周、东周、东汉、曹魏、西晋、北魏、隋朝、唐朝、后梁、后汉、后唐、后晋、后周、北宋、金朝十多个王朝在此建都,这里是甲骨文的发源地,也是华夏文化的发源地。', '/images/uploads/10.png', '2020-02-15 00:00:00', 1);
INSERT INTO `article` VALUES (11, 11, '马背上的时光', '属于亲子的美好时光，对自然观察的强烈好奇心和探索欲，是亲子信任建立的桥梁。', '/images/uploads/art1.jpg', '2020-03-25 00:00:00', 1);
INSERT INTO `article` VALUES (12, 12, '未来视界', '全家护眼总动员！体验眼科界的“迪士尼”，1大1小眼科亲子检查！', '/images/uploads/art2.jpg', '2020-03-03 00:00:00', 1);
INSERT INTO `article` VALUES (13, 13, '徒步行者', '周末徒步 、登山、野炊、攀岩...提升毅力与勇气双重挑战！', '/images/uploads/art3.jpg', '2020-02-10 00:00:00', 1);
INSERT INTO `article` VALUES (14, 14, '不嗨不周末', '不嗨不周末！发现金色亲子季！便当盒蛋糕DIY、亲子互动 定格温暖瞬间！', '/images/uploads/art4.jpg', '2020-03-27 00:00:00', 1);
INSERT INTO `article` VALUES (15, 15, '探秘', '探秘藏在峡谷乐园中的军事基地！火箭筒、萨姆导弹、陆战坦克车...孩子玩了完全不想走！', '/images/uploads/art5.jpg', '2020-03-06 00:00:00', 1);
INSERT INTO `article` VALUES (16, 16, '拾忆', '带孩子回到80后的童年。稻田抓鱼、竹筒饭、夜探昆虫、篝火派对、亲子运动会...', '/images/uploads/art6.jpg', '2020-04-22 00:00:00', 1);
INSERT INTO `article` VALUES (17, 17, '生存挑战', '城市生存挑战赛 ！财商、情商、智商の全面考验！', '/images/uploads/art7.jpg', '2019-12-09 00:00:00', 1);
INSERT INTO `article` VALUES (18, 18, '秋季野餐', '温州有一场秋季百人野餐party！水果美食、咖啡讲堂、手绘牛仔帽....太想参加了~', '/images/uploads/art8.jpg', '2020-02-28 00:00:00', 1);
INSERT INTO `article` VALUES (19, 19, '粉黛采橘', '乐清赏粉黛乱子、采摘橘子1日游', '/images/uploads/art9.jpg', '2020-01-17 00:00:00', 1);
INSERT INTO `article` VALUES (20, 20, '滑雪营', '2020亲子滑雪营！不出国门，国内就有不输日本的亲子滑雪体验', '/images/uploads/art10.jpg', '2020-03-06 00:00:00', 1);
INSERT INTO `article` VALUES (21, 51, '', '第一次使用这个平台，看到了好多好玩的，穿上我的新雨衣出去玩啦', '/images/uploads/20200327152736.jpeg', '2020-03-27 16:02:09', 1);

-- ----------------------------
-- Table structure for article_comment
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment`  (
  `article_comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `article_id` int(11) NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`article_comment_id`) USING BTREE,
  INDEX `FK_article_comment_user`(`user_id`) USING BTREE,
  INDEX `FK_comment_article`(`article_id`) USING BTREE,
  CONSTRAINT `FK_article_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_comment_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
INSERT INTO `article_comment` VALUES (1, 1, NULL, '真好玩', '/images/default_comment_img1.png', '2020-01-01 00:00:00');

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `bill_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `money` decimal(10, 0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`bill_id`) USING BTREE,
  INDEX `FK_money_shop`(`shop_id`) USING BTREE,
  CONSTRAINT `FK_money_shop` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bill
-- ----------------------------
INSERT INTO `bill` VALUES (1, 1, 1, 99, '2020-02-02 00:00:00');
INSERT INTO `bill` VALUES (2, 2, 2, 199, '2020-03-20 00:00:00');
INSERT INTO `bill` VALUES (3, 3, 1, 49, '2020-02-28 00:00:00');
INSERT INTO `bill` VALUES (4, 4, 2, 50, '2020-04-07 00:00:00');
INSERT INTO `bill` VALUES (5, 5, 1, 66, '2020-01-01 00:00:00');
INSERT INTO `bill` VALUES (6, 6, 2, 89, '2020-03-26 00:00:00');
INSERT INTO `bill` VALUES (7, 7, 1, 39, '2020-02-29 00:00:00');
INSERT INTO `bill` VALUES (8, 8, 2, 79, '2020-04-13 00:00:00');
INSERT INTO `bill` VALUES (9, 9, 1, 89, '2020-04-19 00:00:00');
INSERT INTO `bill` VALUES (10, 10, 2, 66, '2019-12-04 00:00:00');
INSERT INTO `bill` VALUES (11, 11, 1, 149, '2020-04-12 00:00:00');
INSERT INTO `bill` VALUES (12, 12, 2, 68, '2020-03-30 00:00:00');
INSERT INTO `bill` VALUES (13, 13, 1, 159, '2020-04-10 00:00:00');
INSERT INTO `bill` VALUES (14, 14, 2, 89, '2019-12-21 00:00:00');
INSERT INTO `bill` VALUES (15, 15, 1, 68, '2020-02-20 00:00:00');
INSERT INTO `bill` VALUES (16, 16, 2, 159, '2020-03-07 00:00:00');
INSERT INTO `bill` VALUES (17, 17, 1, 66, '2020-01-19 00:00:00');
INSERT INTO `bill` VALUES (18, 18, 2, 68, '2020-04-01 00:00:00');
INSERT INTO `bill` VALUES (19, 19, 1, 159, '2020-01-21 00:00:00');
INSERT INTO `bill` VALUES (20, 20, 2, 149, '2020-04-10 00:00:00');
INSERT INTO `bill` VALUES (21, 21, 1, 68, '2020-03-04 00:00:00');
INSERT INTO `bill` VALUES (22, 22, 2, 159, '2020-03-07 00:00:00');
INSERT INTO `bill` VALUES (23, 23, 1, 49, '2019-12-11 00:00:00');
INSERT INTO `bill` VALUES (24, 24, 2, 68, '2019-12-05 00:00:00');
INSERT INTO `bill` VALUES (25, 25, 1, 159, '2020-02-11 00:00:00');
INSERT INTO `bill` VALUES (26, 26, 2, 66, '2020-02-12 00:00:00');
INSERT INTO `bill` VALUES (27, 27, 1, 68, '2020-01-02 00:00:00');
INSERT INTO `bill` VALUES (28, 28, 2, 159, '2019-12-17 00:00:00');
INSERT INTO `bill` VALUES (29, 29, 1, 149, '2019-12-22 00:00:00');
INSERT INTO `bill` VALUES (30, 30, 2, 68, '2020-01-11 00:00:00');

-- ----------------------------
-- Table structure for business
-- ----------------------------
DROP TABLE IF EXISTS `business`;
CREATE TABLE `business`  (
  `business_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nick` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` datetime(0) NULL DEFAULT NULL,
  `state` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `qualification_front` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qualification_back` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `idcard_front` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `idcard_back` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cooperation_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_qualification` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`business_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of business
-- ----------------------------
INSERT INTO `business` VALUES (1, '17759991111', '41543f13b1de57f6e02a2eb519d8d47d', '林锟锟', '/images/uploads/51.jpg', '男', '2018-01-01 00:00:00', 1, '2020-02-02 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (2, '18759333687', '41543f13b1de57f6e02a2eb519d8d48d', '杨芤蔻', '/images/uploads/52.jpg', '女', '2009-06-01 00:00:00', 1, '2020-03-20 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (3, '18344994134', '41543f13b1de57f6e02a2eb519d8d49d', '胡安安', '/images/uploads/53.jpg', '女', '2005-03-01 00:00:00', 1, '2020-02-28 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (4, '14641494903', '41543f13b1de57f6e02a2eb519d8d50d', '选择性死亡', '/images/uploads/54.jpg', '女', '2019-06-01 00:00:00', 1, '2020-04-07 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (5, '13217002413', '41543f13b1de57f6e02a2eb519d8d51d', '别拿经历谈人生', '/images/uploads/55.jpg', '女', '2018-06-01 00:00:00', 1, '2020-01-01 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (6, '18188146132', '41543f13b1de57f6e02a2eb519d8d52d', '심장 마비°（失心）', '/images/uploads/56.jpg', '女', '2015-09-01 00:00:00', 1, '2020-03-26 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (7, '14136045343', '41543f13b1de57f6e02a2eb519d8d53d', '捏碎你的虚伪', '/images/uploads/57.jpg', '女', '2009-06-01 00:00:00', 1, '2020-02-29 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (8, '14607775240', '41543f13b1de57f6e02a2eb519d8d54d', '自我主宰&', '/images/uploads/58.jpg', '女', '2029-03-01 00:00:00', 1, '2020-04-13 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (9, '15969854929', '41543f13b1de57f6e02a2eb519d8d55d', '시간（时光）', '/images/uploads/59.jpg', '女', '2010-07-01 00:00:00', 1, '2020-04-19 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (10, '17350849747', '41543f13b1de57f6e02a2eb519d8d56d', '(绝不伪装)', '/images/uploads/60.jpg', '男', '2003-02-01 00:00:00', 1, '2019-12-04 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (11, '13337651721', '41543f13b1de57f6e02a2eb519d8d57d', '此生不换。', '/images/uploads/61.jpg', '女', '2011-02-01 00:00:00', 1, '2020-04-12 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (12, '15268375548', '41543f13b1de57f6e02a2eb519d8d58d', 'fireworks', '/images/uploads/62.jpg', '男', '2009-04-01 00:00:00', 1, '2020-03-30 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (13, '17190190655', '41543f13b1de57f6e02a2eb519d8d59d', 'delete', '/images/uploads/63.jpg', '男', '2013-07-01 00:00:00', 1, '2020-04-10 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (14, '15192654360', '41543f13b1de57f6e02a2eb519d8d60d', '胭脂红', '/images/uploads/64.jpg', '女', '2028-08-01 00:00:00', 1, '2019-12-21 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (15, '18808869873', '41543f13b1de57f6e02a2eb519d8d61d', '一生何求', '/images/uploads/65.jpg', '男', '2014-03-01 00:00:00', 1, '2020-02-20 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (16, '17900254128', '41543f13b1de57f6e02a2eb519d8d62d', '你是不归路', '/images/uploads/66.jpg', '女', '2017-12-01 00:00:00', 1, '2020-03-07 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (17, '17588015109', '41543f13b1de57f6e02a2eb519d8d63d', '若、不曾相恋', '/images/uploads/67.jpg', '女', '2028-06-01 00:00:00', 1, '2020-01-19 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (18, '13933062700', '41543f13b1de57f6e02a2eb519d8d64d', '如初太难', '/images/uploads/68.jpg', '男', '2003-05-01 00:00:00', 1, '2020-04-01 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (19, '18284833852', '41543f13b1de57f6e02a2eb519d8d65d', '老子最可爱', '/images/uploads/69.jpg', '女', '2013-05-01 00:00:00', 1, '2020-01-21 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (20, '17212497211', '41543f13b1de57f6e02a2eb519d8d66d', '亏欠', '/images/uploads/70.jpg', '女', '2009-04-01 00:00:00', 1, '2020-04-10 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (21, '18994651013', '41543f13b1de57f6e02a2eb519d8d67d', '别太难过你还有我', '/images/uploads/71.jpg', '女', '1994-01-18 00:00:00', 1, '2020-03-04 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (22, '14181989341', '41543f13b1de57f6e02a2eb519d8d68d', '怕孤厌闹', '/images/uploads/72.jpg', '男', '1987-06-09 00:00:00', 1, '2020-03-07 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (23, '15780196187', '41543f13b1de57f6e02a2eb519d8d69d', '久而久之', '/images/uploads/73.jpg', '女', '1991-03-05 00:00:00', 1, '2019-12-11 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (24, '14822259651', '41543f13b1de57f6e02a2eb519d8d70d', '暖栀', '/images/uploads/74.jpg', '男', '1992-06-19 00:00:00', 1, '2019-12-05 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (25, '13616933975', '41543f13b1de57f6e02a2eb519d8d71d', '暗殇', '/images/uploads/75.jpg', '男', '1990-06-18 00:00:00', 1, '2020-02-11 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (26, '15997356286', '41543f13b1de57f6e02a2eb519d8d72d', '你挺瘠薄浪的', '/images/uploads/76.jpg', '女', '1989-09-15 00:00:00', 1, '2020-02-12 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (27, '18107533725', '41543f13b1de57f6e02a2eb519d8d73d', '时间嘲笑了誓言', '/images/uploads/77.jpg', '男', '1987-06-09 00:00:00', 1, '2020-01-02 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (28, '14968078220', '41543f13b1de57f6e02a2eb519d8d74d', '予你心安', '/images/uploads/78.jpg', '女', '1988-03-29 00:00:00', 1, '2019-12-17 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (29, '14401007570', '41543f13b1de57f6e02a2eb519d8d75d', '无人像你', '/images/uploads/79.jpg', '女', '1987-07-10 00:00:00', 1, '2019-12-22 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (30, '15945285999', '41543f13b1de57f6e02a2eb519d8d76d', '愿与君执手', '/images/uploads/80.jpg', '男', '1987-02-03 00:00:00', 1, '2020-01-11 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (31, '14362145571', '41543f13b1de57f6e02a2eb519d8d77d', '钭潇娅', '/images/uploads/81.jpg', '女', '1989-02-11 00:00:00', 1, '2020-04-15 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (32, '13694983841', '41543f13b1de57f6e02a2eb519d8d78d', '吉桂希', '/images/uploads/82.jpg', '男', '1993-04-09 00:00:00', 1, '2020-03-24 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (33, '13903363417', '41543f13b1de57f6e02a2eb519d8d79d', '匡瑗正', '/images/uploads/83.jpg', '男', '1994-07-13 00:00:00', 1, '2020-02-04 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (34, '18412798791', '41543f13b1de57f6e02a2eb519d8d80d', '池岑学', '/images/uploads/84.jpg', '男', '1992-08-28 00:00:00', 1, '2020-04-23 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (35, '14471501800', '41543f13b1de57f6e02a2eb519d8d81d', '麻新洁', '/images/uploads/85.jpg', '女', '1993-03-14 00:00:00', 1, '2020-04-21 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (36, '13665266075', '41543f13b1de57f6e02a2eb519d8d82d', '井行纶', '/images/uploads/86.jpg', '女', '1992-12-17 00:00:00', 1, '2020-01-23 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (37, '13906301929', '41543f13b1de57f6e02a2eb519d8d83d', '柳荣旻', '/images/uploads/87.jpg', '男', '1993-06-28 00:00:00', 1, '2019-12-12 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (38, '15262784286', '41543f13b1de57f6e02a2eb519d8d84d', '俞石羽', '/images/uploads/88.jpg', '男', '1988-05-03 00:00:00', 1, '2020-01-07 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (39, '14623629986', '41543f13b1de57f6e02a2eb519d8d85d', '井妤美', '/images/uploads/89.jpg', '女', '1988-05-13 00:00:00', 1, '2020-04-29 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (40, '15900732270', '41543f13b1de57f6e02a2eb519d8d86d', '余天皓', '/images/uploads/90.jpg', '女', '1988-04-09 00:00:00', 1, '2020-03-23 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (41, '14643427738', '41543f13b1de57f6e02a2eb519d8d87d', '井颖棠', '/images/uploads/91.jpg', '女', '1992-05-31 00:00:00', 1, '2020-04-12 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (42, '15667152301', '41543f13b1de57f6e02a2eb519d8d88d', '席然丁', '/images/uploads/92.jpg', '男', '1993-05-23 00:00:00', 1, '2020-04-12 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (43, '13174819865', '41543f13b1de57f6e02a2eb519d8d89d', '度宇继', '/images/uploads/93.jpg', '女', '1990-11-26 00:00:00', 1, '2020-04-12 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (44, '18719870189', '41543f13b1de57f6e02a2eb519d8d90d', '诸彦方', '/images/uploads/94.jpg', '女', '1989-01-18 00:00:00', 1, '2020-02-16 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (45, '18566326232', '41543f13b1de57f6e02a2eb519d8d91d', '施绅妤', '/images/uploads/95.jpg', '男', '1988-10-26 00:00:00', 1, '2020-03-31 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (46, '14940274441', '41543f13b1de57f6e02a2eb519d8d92d', '银冰政', '/images/uploads/96.jpg', '男', '1991-08-06 00:00:00', 1, '2020-01-15 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (47, '14709502737', '41543f13b1de57f6e02a2eb519d8d93d', '牧峰维', '/images/uploads/97.jpg', '女', '1985-10-27 00:00:00', 1, '2020-02-03 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (48, '14981057487', '41543f13b1de57f6e02a2eb519d8d94d', '梁又天', '/images/uploads/98.jpg', '男', '1991-01-31 00:00:00', 1, '2020-04-17 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (49, '15708583632', '41543f13b1de57f6e02a2eb519d8d95d', '皮君克', '/images/uploads/99.jpg', '男', '1986-03-22 00:00:00', 1, '2020-04-09 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);
INSERT INTO `business` VALUES (50, '14440339852', '41543f13b1de57f6e02a2eb519d8d96d', '訾煜雪', '/images/uploads/100.jpg', '男', '1991-11-19 00:00:00', 1, '2020-03-15 00:00:00', '/images/uploads/yyzz1.jpg', '/images/uploads/yyzz2.jpg', '/images/uploads/sfz1.jpg', '/images/uploads/sfz2.jpg', '1', 1);

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `type` int(11) NULL DEFAULT NULL,
  `send_time` datetime(0) NULL DEFAULT NULL,
  `receive_id` int(11) NULL DEFAULT NULL,
  `sender_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (1, '这个活动安全么', 2, '2019-12-16 10:31:29', 2, 1);
INSERT INTO `chat` VALUES (2, '这个活动安全么', 1, '2019-12-16 10:32:55', 2, 1);
INSERT INTO `chat` VALUES (3, '哈哈哈哈', 1, '2019-12-16 10:32:55', 3, 2);
INSERT INTO `chat` VALUES (4, '好的呢亲', 3, '2019-12-16 11:29:06', 1, 3);

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NULL DEFAULT NULL,
  `nick` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` int(11) NULL DEFAULT NULL,
  `permissions` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`employee_id`) USING BTREE,
  INDEX `FK_employees_shop`(`shop_id`) USING BTREE,
  CONSTRAINT `FK_employees_shop` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES (1, 1, '依波', 'nms', '123456', '/images/uploads/61.jpg', 1, 1, '2020-03-06 00:00:00');
INSERT INTO `employees` VALUES (2, 2, '曜曦', 'lvy', '123456', '/images/uploads/62.jpg', 1, 2, '2019-12-18 00:00:00');
INSERT INTO `employees` VALUES (3, 3, '爱笑的眼睛', 'kvp', '123456', '/images/uploads/63.jpg', 1, 1, '2020-03-08 00:00:00');
INSERT INTO `employees` VALUES (4, 4, '暖风撩人.', 'wjz', '123456', '/images/uploads/64.jpg', 1, 2, '2020-04-14 00:00:00');
INSERT INTO `employees` VALUES (5, 5, '≈一朵向阳花', 'zif', '123456', '/images/uploads/65.jpg', 1, 2, '2020-01-20 00:00:00');
INSERT INTO `employees` VALUES (6, 6, '微风不燥阳光正好', 'qkq', '123456', '/images/uploads/66.jpg', 1, 1, '2020-01-22 00:00:00');
INSERT INTO `employees` VALUES (7, 7, '深拥你入怀', 'tqa', '123456', '/images/uploads/67.jpg', 1, 1, '2020-02-04 00:00:00');
INSERT INTO `employees` VALUES (8, 8, '东风敬我桃花酒', 'vxs', '123456', '/images/uploads/68.jpg', 1, 2, '2020-01-01 00:00:00');
INSERT INTO `employees` VALUES (9, 9, '孤舟放鹤', 'dmt', '123456', '/images/uploads/69.jpg', 1, 1, '2020-01-07 00:00:00');
INSERT INTO `employees` VALUES (10, 10, '余生没有北方', 'wev', '123456', '/images/uploads/70.jpg', 1, 1, '2020-04-09 00:00:00');
INSERT INTO `employees` VALUES (11, 11, '时间从来不等侯', 'ubi', '123456', '/images/uploads/71.jpg', 1, 2, '2020-03-29 00:00:00');
INSERT INTO `employees` VALUES (12, 12, '风雅中带野', 'kss', '123456', '/images/uploads/72.jpg', 1, 2, '2020-03-04 00:00:00');
INSERT INTO `employees` VALUES (13, 13, '一辈子不离不弃', 'xqw', '123456', '/images/uploads/73.jpg', 1, 1, '2020-02-15 00:00:00');
INSERT INTO `employees` VALUES (14, 14, '在你心上偷渡', 'rft', '123456', '/images/uploads/74.jpg', 1, 1, '2020-01-20 00:00:00');
INSERT INTO `employees` VALUES (15, 15, '阳光穿透泛白旳记忆', 'rhi', '123456', '/images/uploads/75.jpg', 1, 2, '2020-02-25 00:00:00');
INSERT INTO `employees` VALUES (16, 16, '樱花树下的约定', 'dul', '123456', '/images/uploads/76.jpg', 1, 1, '2020-04-10 00:00:00');
INSERT INTO `employees` VALUES (17, 17, '一千米的孤独深海', 'ksc', '123456', '/images/uploads/77.jpg', 1, 1, '2020-04-24 00:00:00');
INSERT INTO `employees` VALUES (18, 18, '夏沫离殇', 'kau', '123456', '/images/uploads/78.jpg', 1, 2, '2020-04-27 00:00:00');
INSERT INTO `employees` VALUES (19, 19, '任心荒芜', 'smh', '123456', '/images/uploads/79.jpg', 1, 2, '2020-02-07 00:00:00');
INSERT INTO `employees` VALUES (20, 20, '才是最重要的。', 'sdd', '123456', '/images/uploads/80.jpg', 1, 1, '2019-12-04 00:00:00');
INSERT INTO `employees` VALUES (21, 21, '梦里梦外都是你', 'mli', '123456', '/images/uploads/81.jpg', 1, 1, '2020-02-27 00:00:00');
INSERT INTO `employees` VALUES (22, 22, '岛与暮歌', 'sxt', '123456', '/images/uploads/82.jpg', 1, 2, '2020-02-02 00:00:00');
INSERT INTO `employees` VALUES (23, 23, '折枝翘首盼君归', 'xqm', '123456', '/images/uploads/83.jpg', 1, 1, '2020-02-18 00:00:00');
INSERT INTO `employees` VALUES (24, 24, '果绿森裙抱走', 'gpd', '123456', '/images/uploads/84.jpg', 1, 2, '2020-04-01 00:00:00');
INSERT INTO `employees` VALUES (25, 25, '唯爱丶小艺', 'pbm', '123456', '/images/uploads/85.jpg', 1, 1, '2020-01-05 00:00:00');
INSERT INTO `employees` VALUES (26, 26, '外向的孤独患者', 'qpj', '123456', '/images/uploads/86.jpg', 1, 2, '2020-02-03 00:00:00');
INSERT INTO `employees` VALUES (27, 27, '梦晓ヶ微光ヅ倾城', 'dvh', '123456', '/images/uploads/87.jpg', 1, 1, '2019-12-17 00:00:00');
INSERT INTO `employees` VALUES (28, 28, '一纸枕书', 'vud', '123456', '/images/uploads/88.jpg', 1, 2, '2020-01-27 00:00:00');
INSERT INTO `employees` VALUES (29, 29, '半夏っ微伤', 'wwb', '123456', '/images/uploads/89.jpg', 1, 1, '2020-04-17 00:00:00');
INSERT INTO `employees` VALUES (30, 30, '陌道红颜依何处', 'cjk', '123456', '/images/uploads/90.jpg', 1, 2, '2020-02-06 00:00:00');

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `follow_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `firend_id` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `forward_account` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`follow_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES (1, 1, 5, 1, '2019-12-13 14:36:59', NULL);
INSERT INTO `follow` VALUES (2, 2, 6, 2, '2019-12-15 19:16:02', NULL);
INSERT INTO `follow` VALUES (3, 3, 7, 3, '2019-12-13 15:00:48', NULL);
INSERT INTO `follow` VALUES (4, 4, 8, 1, '2019-12-13 15:00:52', NULL);
INSERT INTO `follow` VALUES (5, 5, 9, 2, '2019-12-13 15:02:46', NULL);
INSERT INTO `follow` VALUES (6, 6, 10, 1, '2019-12-13 15:02:48', NULL);
INSERT INTO `follow` VALUES (7, 7, 11, 4, '2019-12-13 15:02:50', NULL);
INSERT INTO `follow` VALUES (8, 8, 12, 2, '2019-12-13 15:03:27', NULL);
INSERT INTO `follow` VALUES (9, 9, 13, 5, '2019-12-13 15:03:33', NULL);
INSERT INTO `follow` VALUES (10, 10, 14, 5, '2019-12-13 15:03:49', NULL);
INSERT INTO `follow` VALUES (11, 11, 15, 5, '2019-12-13 15:03:53', NULL);
INSERT INTO `follow` VALUES (12, 12, 2, 4, '2019-12-13 15:19:14', NULL);
INSERT INTO `follow` VALUES (13, 13, 3, 5, '2019-12-14 19:31:04', NULL);
INSERT INTO `follow` VALUES (14, 14, 4, 4, '2019-12-14 19:34:14', NULL);
INSERT INTO `follow` VALUES (15, 15, 5, 4, '2019-12-14 19:34:18', NULL);
INSERT INTO `follow` VALUES (16, 16, 6, 5, '2019-12-27 14:48:20', '转发理由是这个');
INSERT INTO `follow` VALUES (17, 17, 7, 5, '2019-12-27 14:48:20', '哎呦不错哦~');
INSERT INTO `follow` VALUES (18, 18, 8, 5, '2019-12-27 14:48:20', '转发转发');
INSERT INTO `follow` VALUES (19, 19, 2, 4, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (20, 20, 3, 5, '2019-12-27 14:48:20', '挺有趣的');
INSERT INTO `follow` VALUES (21, 21, 4, 4, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (22, 22, 5, 4, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (23, 23, 6, 5, '2019-12-27 14:48:20', '赞');
INSERT INTO `follow` VALUES (24, 24, 7, 5, '2019-12-27 14:48:20', '666666');
INSERT INTO `follow` VALUES (25, 25, 8, 5, '2019-12-27 14:48:20', '优秀呀');
INSERT INTO `follow` VALUES (26, 26, 2, 4, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (27, 27, 3, 5, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (28, 28, 4, 4, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (29, 29, 5, 4, '2019-12-27 14:48:20', NULL);
INSERT INTO `follow` VALUES (30, 30, 6, 5, '2019-12-27 14:48:20', NULL);

-- ----------------------------
-- Table structure for manage
-- ----------------------------
DROP TABLE IF EXISTS `manage`;
CREATE TABLE `manage`  (
  `manage_id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`manage_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manage
-- ----------------------------
INSERT INTO `manage` VALUES (1, 'admin', 'admin', '494c5057e5c51f95e4d7508e2cad242a', '/images/uploads/101.jpg', '2020-02-26 22:29:49');
INSERT INTO `manage` VALUES (2, 'Administrator', 'administrator', 'cd4c36c1a82db94f891d28399fd185e1', '/images/uploads/102.jpg', '2020-01-07 09:36:45');
INSERT INTO `manage` VALUES (3, 'Manager  ', 'manager  ', 'c1de0580548181aa7b2e2fa4611e92a3', '/images/uploads/103.jpg', '2019-12-25 14:36:24');
INSERT INTO `manage` VALUES (4, 'System    ', 'system    ', 'd4de0b00197343e6ba7d61dcb3aa7c48    ', '/images/uploads/104.jpg', '2020-02-26 22:29:49');
INSERT INTO `manage` VALUES (5, '宋劭抒', '3835617914@qq.com', '41543f13b1de57f6e02a2eb519d8d47d', '/images/uploads/105.jpg', '2020-02-26 16:13:04');
INSERT INTO `manage` VALUES (6, '雍凯皓', '423836631@qq.com', '41543f13b1de57f6e02a2eb519d8d48d', '/images/uploads/106.jpg', '2020-02-26 16:14:00');
INSERT INTO `manage` VALUES (7, '巫明嵘', '2343372917@qq.com', '41543f13b1de57f6e02a2eb519d8d49d', '/images/uploads/107.jpg', '2020-02-26 16:53:58');
INSERT INTO `manage` VALUES (8, '印书富', '4034585560@qq.com', '41543f13b1de57f6e02a2eb519d8d50d', '/images/uploads/108.jpg', '2020-02-26 16:54:07');
INSERT INTO `manage` VALUES (9, '7719685014@qq.com', '7719685014@qq.com', '41543f13b1de57f6e02a2eb519d8d51d', '/images/uploads/109.jpg', '2020-02-27 14:44:19');
INSERT INTO `manage` VALUES (10, '6037706945@qq.com', '6037706945@qq.com', '41543f13b1de57f6e02a2eb519d8d52d', '/images/uploads/110.jpg', '2020-02-27 16:14:19');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NULL DEFAULT NULL,
  `title` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `send_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, 1, '[官方公告] 内测来啦！乐旅亲子系统内测成员招募启动', '一、申请条件\n1、下载乐旅亲子APP；\n2、喜欢乐旅亲子，对乐旅亲子功能比较熟悉；\n3、每周使用手机时间超 30 小时；\n4、热爱乐旅，能够接受较为频繁的升级频率；\n5、有评测和 APP 内测经验者或开发者优先；\n6、有积极向上，乐观开朗，求同存异的心态。\n7、在社区等平台表现良好，没有违规行为。\n\n二、享有福利\n1、第一时间体验乐旅最新内测版本及其它新功能；\n2、表现优秀者将有机会获得乐旅周边产品；\n3、满足条件即可有机会获得乐旅币抵扣现金。\n\n三、相关义务\n1、能及时提交功能需求建议和 BUG 反馈；\n2、签订《内测保密协议》，严格保密内测期间的相关资源及内测群组内信息，严禁泄露内测包；\n3、内测组加油需热心帮助论坛上的乐友解答相关问题，以及协助版主及管理员维护好乐旅社区的秩序。\n\n四、审核流程\n1、2019年12月31日 23：59截止报名\n2、我们将会于截止后两周内对报名加油进行筛选，并通过QQ邮件或者是添加您的QQ邀请您进入内测预备群，请您及时关注信息。\n3、若截止报名后两周内未加入内测预备群，则视为自动放弃内测机会', '2019-12-15 18:16:30');
INSERT INTO `notice` VALUES (2, 1, '[官方公告] 【乐旅亲子公测版】第1版更新公告', '【更新日志】\n- 完善数据类型 \n- 邮箱验证码\n- redis数据缓存\n\n【更新方法】\n下载地址：https://www.lanzous.com/b0ejjm3eh', '2020-01-01 00:00:00');
INSERT INTO `notice` VALUES (3, 1, '[官方公告] 【乐旅亲子公测版】第2版更新公告', '【更新日志】\n- 完善APP筛选  活动详情天数计算\n- 修复部分vue :key导致的警告\n- 修复home左边不能对商家发送消息\n- 修复点赞\n- 修复亲子发布文章\n- 添加适配启动页 app 小程序好像关不掉\n- 聊天显示最后一条 无解\n- 修复时间显示null\n- 亲子登录正则验证\n\n【更新方法】\n下载地址：https://www.lanzous.com/b0ejjm3eh', '2020-01-15 00:00:00');

-- ----------------------------
-- Table structure for resources
-- ----------------------------
DROP TABLE IF EXISTS `resources`;
CREATE TABLE `resources`  (
  `resource_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) NULL DEFAULT NULL,
  `title` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `is_sell` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`resource_id`) USING BTREE,
  INDEX `FK_rec_business`(`business_id`) USING BTREE,
  CONSTRAINT `FK_rec_business` FOREIGN KEY (`business_id`) REFERENCES `business` (`business_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resources
-- ----------------------------
INSERT INTO `resources` VALUES (1, 1, '骑行千岛湖', '/images/uploads/1.png', 1, 0, '2019-12-15 18:51:21');
INSERT INTO `resources` VALUES (2, 2, '日本北海道雪国童话之旅', '/images/uploads/2.png', 1, 0, '2020-01-01 00:00:00');
INSERT INTO `resources` VALUES (3, 3, '十里梅花香雪海', '/images/uploads/3.png', 1, 1, '2020-01-02 15:00:00');
INSERT INTO `resources` VALUES (4, 4, '徒步-苏州灵白线', '/images/uploads/4.png', 1, 0, '2020-01-02 15:00:00');
INSERT INTO `resources` VALUES (5, 5, '闲逛溪口老街—春天花事', '/images/uploads/5.png', 1, 1, '2020-01-03 09:00:00');
INSERT INTO `resources` VALUES (6, 6, '双溪竹海漂流', '/images/uploads/6.png', 1, 0, '2020-01-03 12:00:00');
INSERT INTO `resources` VALUES (7, 7, '人文地质大寻访', '/images/uploads/7.png', 1, 1, '2020-01-05 15:00:00');
INSERT INTO `resources` VALUES (8, 8, '我们的青春纪念册', '/images/uploads/8.png', 1, 0, '2020-01-06 09:00:00');
INSERT INTO `resources` VALUES (9, 9, '大帆船体验—宜兴', '/images/uploads/9.png', 1, 1, '2020-01-06 00:00:00');
INSERT INTO `resources` VALUES (10, 10, '大美河南-四大世界遗产之旅', '/images/uploads/10.png', 1, 0, '2020-01-07 15:00:00');
INSERT INTO `resources` VALUES (11, 11, '室外场地，适合举办休闲或运动类亲子活动。', '/images/uploads/art11.jpg', 1, 1, '2019-12-16 18:51:21');
INSERT INTO `resources` VALUES (12, 12, '室内场地，适合举办团体亲子类活动。', '/images/uploads/art12.jpg', 1, 0, '2019-12-17 18:51:21');
INSERT INTO `resources` VALUES (13, 13, '室外场地，适合举办运动类型的亲子活动。', '/images/uploads/art13.jpg', 1, 1, '2019-12-18 18:51:21');
INSERT INTO `resources` VALUES (14, 14, '室内场地，适合举办团体亲子类活动。', '/images/uploads/art14.jpg', 1, 0, '2019-12-19 18:51:21');
INSERT INTO `resources` VALUES (15, 15, '室外场地，适合举办运动类型的亲子活动。', '/images/uploads/art15.jpg', 1, 1, '2019-12-20 18:51:21');
INSERT INTO `resources` VALUES (16, 16, '室外场地，适合举办休闲或运动类亲子活动。', '/images/uploads/art16.jpg', 1, 0, '2019-12-21 18:51:21');
INSERT INTO `resources` VALUES (17, 17, '室外场地，适合举办运动类型的亲子活动。', '/images/uploads/art17.jpg', 1, 1, '2019-12-22 18:51:21');
INSERT INTO `resources` VALUES (18, 18, '室外场地，适合举办休闲或运动类亲子活动。', '/images/uploads/art18.jpg', 1, 0, '2019-12-23 18:51:21');
INSERT INTO `resources` VALUES (19, 19, '室外场地，适合举办休闲类亲子活动。', '/images/uploads/art19.jpg', 1, 1, '2019-12-24 18:51:21');
INSERT INTO `resources` VALUES (20, 20, '室外场地，适合举办运动类型的亲子活动。', '/images/uploads/art20.jpg', 1, 0, '2019-12-25 18:51:21');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) NULL DEFAULT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` decimal(10, 0) NULL DEFAULT NULL,
  PRIMARY KEY (`shop_id`) USING BTREE,
  INDEX `FK_shop_business`(`business_id`) USING BTREE,
  CONSTRAINT `FK_shop_business` FOREIGN KEY (`business_id`) REFERENCES `business` (`business_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES (1, 1, '林锟锟的店铺', '2020-02-02 00:00:00', '福建省福州市阳光学院', 81060);
INSERT INTO `shop` VALUES (2, 2, '杨芤蔻的店铺', '2020-03-20 00:00:00', '福建省福州市福建师范学院', 49584);
INSERT INTO `shop` VALUES (3, 3, '胡安安的店铺', '2020-02-28 00:00:00', '福建省福州市福州大学', 16331);
INSERT INTO `shop` VALUES (4, 4, '选择性死亡的店铺', '2020-04-07 00:00:00', '福建省福州市马尾区', 85576);
INSERT INTO `shop` VALUES (5, 5, '别拿经历谈人生的店铺', '2020-01-01 00:00:00', '福建省福州市鼓楼区鼓东路38号弄', 91928);
INSERT INTO `shop` VALUES (6, 6, '심장 마비°（失心）的店铺', '2020-03-26 00:00:00', '福建省厦门市海沧区海景中路', 75588);
INSERT INTO `shop` VALUES (7, 7, '捏碎你的虚伪的店铺', '2020-02-29 00:00:00', '福建省福州市鼓楼区湾里村陈家大院', 28554);
INSERT INTO `shop` VALUES (8, 8, '自我主宰&的店铺', '2020-04-13 00:00:00', '福建省福州市台江区新港里2弄', 22633);
INSERT INTO `shop` VALUES (9, 9, '시간（时光）的店铺', '2020-04-19 00:00:00', '福建省福州市台江区宁化路', 45864);
INSERT INTO `shop` VALUES (10, 10, '(绝不伪装)的店铺', '2019-12-04 00:00:00', '福建省厦门市海沧区新安村东社', 12788);
INSERT INTO `shop` VALUES (11, 11, '此生不换。的店铺', '2020-04-12 00:00:00', '福建省厦门市思明区曾厝安', 66951);
INSERT INTO `shop` VALUES (12, 12, 'fireworks的店铺', '2020-03-30 00:00:00', '福建省厦门市海沧区阳安路', 37175);
INSERT INTO `shop` VALUES (13, 13, 'delete的店铺', '2020-04-10 00:00:00', '福建省三明市梅列区龙岗新村', 38020);
INSERT INTO `shop` VALUES (14, 14, '胭脂红的店铺', '2019-12-21 00:00:00', '福建省三明市梅列区龙岗水榭坊', 11818);
INSERT INTO `shop` VALUES (15, 15, '一生何求的店铺', '2020-02-20 00:00:00', '福建省厦门市集美区后溪镇新村官地社', 46206);
INSERT INTO `shop` VALUES (16, 16, '你是不归路的店铺', '2020-03-07 00:00:00', '福建省厦门市集美区董任西二路', 62463);
INSERT INTO `shop` VALUES (17, 17, '若、不曾相恋的店铺', '2020-01-19 00:00:00', '福建省厦门市集美区内茂二里', 58871);
INSERT INTO `shop` VALUES (18, 18, '如初太难的店铺', '2020-04-01 00:00:00', '福建省厦门市集美区永泰路', 19066);
INSERT INTO `shop` VALUES (19, 19, '老子最可爱的店铺', '2020-01-21 00:00:00', '福建省厦门市思明区斗西路202-9998号(双号)', 91968);
INSERT INTO `shop` VALUES (20, 20, '亏欠的店铺', '2020-04-10 00:00:00', '福建省厦门市思明区演武路', 80259);
INSERT INTO `shop` VALUES (21, 21, '别太难过你还有我的店铺', '2020-03-04 00:00:00', '四川省成都市锦江区琉璃场一街的邮政编码是610023', 42433);
INSERT INTO `shop` VALUES (22, 22, '怕孤厌闹的店铺', '2020-03-07 00:00:00', '江西省南昌市东湖区文教路139-801(单号)', 53838);
INSERT INTO `shop` VALUES (23, 23, '久而久之的店铺', '2019-12-11 00:00:00', '江西省南昌市东湖区', 57132);
INSERT INTO `shop` VALUES (24, 24, '暖栀的店铺', '2019-12-05 00:00:00', '马甸桥东德盛饭店一层', 49446);
INSERT INTO `shop` VALUES (25, 25, '暗殇的店铺', '2020-02-11 00:00:00', '海淀区双榆树华星影院一层(双安商场对面)', 50235);
INSERT INTO `shop` VALUES (26, 26, '你挺瘠薄浪的的店铺', '2020-02-12 00:00:00', '城区张自忠路10号华人一品大厦1003号', 56963);
INSERT INTO `shop` VALUES (27, 27, '时间嘲笑了誓言的店铺', '2020-01-02 00:00:00', '崇文门地铁西南口(崇文门饭店西侧) ', 88272);
INSERT INTO `shop` VALUES (28, 28, '予你心安的店铺', '2019-12-17 00:00:00', '崇文区建内大街18号', 38115);
INSERT INTO `shop` VALUES (29, 29, '无人像你的店铺', '2019-12-22 00:00:00', '宣武区白广路北口麦当劳西侧  ', 47597);
INSERT INTO `shop` VALUES (30, 30, '愿与君执手的店铺', '2020-01-11 00:00:00', '海淀区北三环中路67号', 12633);
INSERT INTO `shop` VALUES (31, 31, '钭潇娅的店铺', '2020-04-15 00:00:00', '新疆维吾尔自治区昌吉回族自治州吉木萨尔县二工乡西沟村', 14045);
INSERT INTO `shop` VALUES (32, 32, '吉桂希的店铺', '2020-03-24 00:00:00', '浙江省绍兴市越城区翠苑新村', 25157);
INSERT INTO `shop` VALUES (33, 33, '匡瑗正的店铺', '2020-02-04 00:00:00', '内蒙古自治区呼和浩特市新城区车站后街17-17号(单号)', 84373);
INSERT INTO `shop` VALUES (34, 34, '池岑学的店铺', '2020-04-23 00:00:00', '重庆市巫溪县古路镇前进街', 74637);
INSERT INTO `shop` VALUES (35, 35, '麻新洁的店铺', '2020-04-21 00:00:00', '辽宁省葫芦岛市连山区杨家杖子经济开发区大北社区', 15846);
INSERT INTO `shop` VALUES (36, 36, '井行纶的店铺', '2020-01-23 00:00:00', '浙江省宁波市海曙区南苑街127弄南塘花园', 91005);
INSERT INTO `shop` VALUES (37, 37, '柳荣旻的店铺', '2019-12-12 00:00:00', '河南省商丘市梁园区建设办事处张柿园村', 60344);
INSERT INTO `shop` VALUES (38, 38, '俞石羽的店铺', '2020-01-07 00:00:00', '安徽省马鞍山市花山区雨山东路88-88号(双号)', 61380);
INSERT INTO `shop` VALUES (39, 39, '井妤美的店铺', '2020-04-29 00:00:00', '福建省三明市梅列区陈大镇瑞溪新村', 36460);
INSERT INTO `shop` VALUES (40, 40, '余天皓的店铺', '2020-03-23 00:00:00', '天津市武清区陈嘴镇渔坝口一街村', 89688);
INSERT INTO `shop` VALUES (41, 41, '井颖棠的店铺', '2020-04-12 00:00:00', '江苏省南通市崇川区外环西路102-450号(双号)', 36089);
INSERT INTO `shop` VALUES (42, 42, '席然丁的店铺', '2020-04-12 00:00:00', '河南省焦作市解放区卫校西街果园新村', 66158);
INSERT INTO `shop` VALUES (43, 43, '度宇继的店铺', '2020-04-12 00:00:00', '广东省中山市中山市板芙镇子子冲村上巷二巷一横巷', 81146);
INSERT INTO `shop` VALUES (44, 44, '诸彦方的店铺', '2020-02-16 00:00:00', '山东省淄博市淄川区龙泉镇尚庄村', 49572);
INSERT INTO `shop` VALUES (45, 45, '施绅妤的店铺', '2020-03-31 00:00:00', '浙江省湖州市吴兴区菱湖世德堂', 36778);
INSERT INTO `shop` VALUES (46, 46, '银冰政的店铺', '2020-01-15 00:00:00', '广东省佛山市禅城区南庄镇河窖桥北村福里坊街六巷', 30790);
INSERT INTO `shop` VALUES (47, 47, '牧峰维的店铺', '2020-02-03 00:00:00', '河南省商丘市梁园区株州路1胡同', 95988);
INSERT INTO `shop` VALUES (48, 48, '梁又天的店铺', '2020-04-17 00:00:00', '河北省廊坊市安次区仇庄乡大王务四村', 18764);
INSERT INTO `shop` VALUES (49, 49, '皮君克的店铺', '2020-04-09 00:00:00', '湖南省常德市武陵区大高山街光辉路', 21409);
INSERT INTO `shop` VALUES (50, 50, '訾煜雪的店铺', '2020-03-15 00:00:00', '广东省东莞市东莞市大岭山镇连平管理区信立农产品市场横一路', 57006);

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order`  (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `shop_id` int(11) NULL DEFAULT NULL,
  `activity_id` int(11) NULL DEFAULT NULL,
  `serial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` int(11) NULL DEFAULT NULL,
  `pay_type` int(11) NULL DEFAULT NULL,
  `pay_time` datetime(0) NULL DEFAULT NULL,
  `money` decimal(10, 0) NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  `price` decimal(10, 0) NULL DEFAULT NULL,
  `total` decimal(10, 0) NULL DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  `close_time` datetime(0) NULL DEFAULT NULL,
  `done_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `FK_order_activity`(`activity_id`) USING BTREE,
  INDEX `FK_order_shop`(`shop_id`) USING BTREE,
  INDEX `FK_order_user`(`user_id`) USING BTREE,
  CONSTRAINT `FK_order_activity` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_order_shop` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_order
-- ----------------------------
INSERT INTO `t_order` VALUES (1, 1, 1, 1, '20191212001751', 1, 2, '2020-02-13 00:00:00', 598, 2, 299, 598, '无', '2014-02-01 00:00:00', '2013-02-01 00:00:00', '2008-02-01 00:00:00', '2011-02-01 00:00:00');
INSERT INTO `t_order` VALUES (2, 11, 2, 2, '20191212101751', 2, 1, '2020-02-06 00:00:00', 199, 2, 199, 398, '打印发票', '2006-02-01 00:00:00', '2009-02-01 00:00:00', '2011-02-01 00:00:00', '2007-02-01 00:00:00');
INSERT INTO `t_order` VALUES (3, 29, 3, 3, '20191212135143', 2, 1, '2020-02-14 00:00:00', 189, 1, 189, 189, '打印发票', '2006-02-01 00:00:00', '2008-02-01 00:00:00', '2010-02-01 00:00:00', '2011-02-01 00:00:00');
INSERT INTO `t_order` VALUES (4, 25, 4, 4, '20191219103471', 3, 2, '2020-02-15 00:00:00', 129, 3, 129, 387, '无', '2013-02-01 00:00:00', '2008-02-01 00:00:00', '2015-02-01 00:00:00', '2013-02-01 00:00:00');
INSERT INTO `t_order` VALUES (5, 5, 5, 5, '20191219126424', 3, 1, '2020-02-13 00:00:00', 200, 3, 200, 600, '打印发票', '2020-02-14 00:00:00', '2020-02-13 00:00:00', '2020-02-08 00:00:00', '2020-02-11 00:00:00');
INSERT INTO `t_order` VALUES (6, 15, 6, 6, '20191219107341', 1, 2, '2020-02-12 00:00:00', 219, 1, 219, 219, '无', '2020-02-06 00:00:00', '2020-02-09 00:00:00', '2020-02-11 00:00:00', '2020-02-07 00:00:00');
INSERT INTO `t_order` VALUES (7, 7, 7, 7, '20191219128410', 2, 2, '2020-02-08 00:00:00', 259, 2, 259, 518, '希望能度过一次愉快的活动', '2020-02-06 00:00:00', '2020-02-08 00:00:00', '2020-02-10 00:00:00', '2020-02-11 00:00:00');
INSERT INTO `t_order` VALUES (8, 8, 8, 8, '20191219150238', 1, 2, '2020-02-09 00:00:00', 269, 1, 269, 269, '无', '2020-02-13 00:00:00', '2020-02-08 00:00:00', '2020-02-15 00:00:00', '2020-02-13 00:00:00');
INSERT INTO `t_order` VALUES (9, 9, 9, 9, '20191219133719', 0, 1, '2020-02-13 00:00:00', 169, 3, 169, 507, '无', '2020-02-05 00:00:00', '2020-02-09 00:00:00', '2020-02-10 00:00:00', '2020-02-06 00:00:00');
INSERT INTO `t_order` VALUES (10, 10, 10, 10, '20191219128473', 3, 1, '2020-02-14 00:00:00', 189, 1, 189, 189, '无', '2020-02-06 00:00:00', '2020-02-05 00:00:00', '2020-02-11 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (11, 11, 11, 11, '20191219130719', 2, 2, '2020-02-15 00:00:00', 756, 2, 756, 1512, '无', '2020-02-15 00:00:00', '2020-02-13 00:00:00', '2020-02-09 00:00:00', '2020-02-07 00:00:00');
INSERT INTO `t_order` VALUES (12, 12, 12, 12, '20191219134340', 3, 2, '2020-02-08 00:00:00', 99, 1, 99, 99, '无', '2020-02-06 00:00:00', '2020-02-07 00:00:00', '2020-02-06 00:00:00', '2020-02-08 00:00:00');
INSERT INTO `t_order` VALUES (13, 13, 13, 13, '20191219172582', 1, 1, '2020-02-08 00:00:00', 318, 2, 318, 636, '无', '2020-02-08 00:00:00', '2020-02-10 00:00:00', '2020-02-06 00:00:00', '2020-02-14 00:00:00');
INSERT INTO `t_order` VALUES (14, 28, 14, 14, '20191219193278', 1, 2, '2020-02-13 00:00:00', 59, 1, 59, 59, '无', '2020-02-08 00:00:00', '2020-02-06 00:00:00', '2020-02-05 00:00:00', '2020-02-09 00:00:00');
INSERT INTO `t_order` VALUES (15, 15, 15, 15, '20191219186048', 3, 1, '2020-02-11 00:00:00', 198, 4, 198, 792, '无', '2020-02-14 00:00:00', '2020-02-09 00:00:00', '2020-02-06 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (16, 20, 16, 16, '20191219111671', 1, 2, '2020-02-11 00:00:00', 588, 2, 588, 1176, '无', '2020-02-08 00:00:00', '2020-02-08 00:00:00', '2020-02-15 00:00:00', '2020-02-06 00:00:00');
INSERT INTO `t_order` VALUES (17, 17, 17, 17, '20191219188137', 1, 2, '2020-02-15 00:00:00', 150, 1, 150, 150, '无', '2020-02-13 00:00:00', '2020-02-06 00:00:00', '2020-02-14 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (18, 18, 18, 18, '20191219192377', 0, 2, '2020-02-07 00:00:00', 338, 1, 338, 338, '无', '2020-02-14 00:00:00', '2020-02-11 00:00:00', '2020-02-09 00:00:00', '2020-02-09 00:00:00');
INSERT INTO `t_order` VALUES (19, 19, 19, 19, '20191219131818', 1, 1, '2020-02-13 00:00:00', 99, 1, 99, 99, '无', '2020-02-08 00:00:00', '2020-02-14 00:00:00', '2020-02-09 00:00:00', '2020-02-13 00:00:00');
INSERT INTO `t_order` VALUES (20, 20, 20, 20, '20191219176958', 2, 2, '2020-02-08 00:00:00', 998, 2, 998, 1996, '无', '2020-02-09 00:00:00', '2020-02-12 00:00:00', '2020-02-05 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (21, 3, 3, 3, '20191219172132', 1, 2, '2020-02-12 00:00:00', 199, 1, 199, 199, '无', '2020-02-05 00:00:00', '2020-02-15 00:00:00', '2020-02-12 00:00:00', '2020-02-13 00:00:00');
INSERT INTO `t_order` VALUES (22, 20, 4, 4, '20191219175432', 0, 1, '2020-02-14 00:00:00', 169, 3, 169, 507, '无', '2020-02-05 00:00:00', '2020-02-10 00:00:00', '2020-02-09 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (23, 5, 5, 5, '20191219172263', 3, 1, '2020-02-15 00:00:00', 189, 1, 189, 189, '无', '2020-02-06 00:00:00', '2020-02-05 00:00:00', '2020-02-14 00:00:00', '2020-02-08 00:00:00');
INSERT INTO `t_order` VALUES (24, 6, 6, 6, '20200106164089', 2, 2, '2020-02-12 00:00:00', 756, 2, 756, 1512, '无', '2020-02-06 00:00:00', '2020-02-07 00:00:00', '2020-02-10 00:00:00', '2020-02-10 00:00:00');
INSERT INTO `t_order` VALUES (25, 4, 7, 7, '20200106131653', 3, 2, '2020-02-09 00:00:00', 99, 1, 99, 99, '无', '2020-02-05 00:00:00', '2020-02-09 00:00:00', '2020-02-07 00:00:00', '2020-02-09 00:00:00');
INSERT INTO `t_order` VALUES (26, 5, 8, 8, '20200106100789', 1, 1, '2020-02-09 00:00:00', 318, 2, 318, 636, '无', '2020-02-11 00:00:00', '2020-02-12 00:00:00', '2020-02-05 00:00:00', '2020-02-09 00:00:00');
INSERT INTO `t_order` VALUES (27, 25, 9, 9, '20200106104773', 1, 2, '2020-02-06 00:00:00', 59, 1, 59, 59, '无', '2020-02-11 00:00:00', '2020-02-08 00:00:00', '2020-02-14 00:00:00', '2020-02-06 00:00:00');
INSERT INTO `t_order` VALUES (28, 7, 10, 10, '20200106115401', 3, 1, '2020-02-09 00:00:00', 198, 4, 198, 792, '无', '2020-02-14 00:00:00', '2020-02-08 00:00:00', '2020-02-12 00:00:00', '2020-02-15 00:00:00');
INSERT INTO `t_order` VALUES (29, 8, 11, 11, '20200106194510', 1, 2, '2020-02-13 00:00:00', 588, 2, 588, 1176, '无', '2020-02-08 00:00:00', '2020-02-06 00:00:00', '2020-02-14 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (30, 30, 12, 12, '20200106101966', 1, 2, '2020-02-14 00:00:00', 150, 1, 150, 150, '无', '2020-02-14 00:00:00', '2020-02-14 00:00:00', '2020-02-08 00:00:00', '2020-02-13 00:00:00');
INSERT INTO `t_order` VALUES (31, 2, 13, 13, '20200106199334', 0, 2, '2020-02-13 00:00:00', 338, 1, 338, 338, '无', '2020-02-09 00:00:00', '2020-02-06 00:00:00', '2020-02-12 00:00:00', '2020-02-10 00:00:00');
INSERT INTO `t_order` VALUES (32, 3, 14, 14, '20200106146414', 1, 1, '2020-02-12 00:00:00', 99, 1, 99, 99, '无', '2020-02-13 00:00:00', '2020-02-12 00:00:00', '2020-02-11 00:00:00', '2020-02-05 00:00:00');
INSERT INTO `t_order` VALUES (33, 26, 15, 15, '20200106106501', 2, 2, '2020-02-10 00:00:00', 998, 2, 998, 1996, '无', '2020-02-10 00:00:00', '2020-02-05 00:00:00', '2020-02-14 00:00:00', '2020-02-11 00:00:00');
INSERT INTO `t_order` VALUES (34, 27, 16, 16, '20200106187332', 1, 2, '2020-02-06 00:00:00', 199, 1, 199, 199, '无', '2020-02-15 00:00:00', '2020-02-10 00:00:00', '2020-02-15 00:00:00', '2020-02-06 00:00:00');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nick` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pay_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qq` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `coin` int(11) NULL DEFAULT NULL,
  `state` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '17759335555', '41543f13b1de57f6e02a2eb519d8d47d', '小锟', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1997-12-21 00:00:00', '/images/uploads/1.jpg', '5717289935', 99999, 1, '2020-01-24 00:00:00');
INSERT INTO `user` VALUES (2, '18344994134', '41543f13b1de57f6e02a2eb519d8d47d', '胡小安', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1986-06-05 00:00:00', '/images/uploads/2.jpg', '4097851145', 88888, 1, '2019-12-04 00:00:00');
INSERT INTO `user` VALUES (3, '18759333687', '41543f13b1de57f6e02a2eb519d8d47d', '杨小青', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1987-03-28 00:00:00', '/images/uploads/3.jpg', '2019904816', 66666, 1, '2020-02-27 00:00:00');
INSERT INTO `user` VALUES (4, '15174647235', '41543f13b1de57f6e02a2eb519d8d47d', '无眠兔', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1991-09-10 00:00:00', '/images/uploads/4.jpg', '5614129528', 100, 1, '2019-12-28 00:00:00');
INSERT INTO `user` VALUES (5, '17165504406', '41543f13b1de57f6e02a2eb519d8d47d', '甜蜜且乖', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1990-07-21 00:00:00', '/images/uploads/5.jpg', '5053079896', 200, 1, '2020-01-18 00:00:00');
INSERT INTO `user` VALUES (6, '15705870011', '41543f13b1de57f6e02a2eb519d8d47d', '萌音草莓', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1987-07-04 00:00:00', '/images/uploads/6.jpg', '780657862', 100, 1, '2020-03-12 00:00:00');
INSERT INTO `user` VALUES (7, '17875540989', '41543f13b1de57f6e02a2eb519d8d47d', '猫腻仙女抱', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1990-08-05 00:00:00', '/images/uploads/7.jpg', '2889544145', 100, 1, '2020-04-17 00:00:00');
INSERT INTO `user` VALUES (8, '14203467053', '41543f13b1de57f6e02a2eb519d8d47d', '你还是我、的最爱', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1988-09-21 00:00:00', '/images/uploads/8.jpg', '7216949478', 100, 1, '2020-03-28 00:00:00');
INSERT INTO `user` VALUES (9, '18889793866', '41543f13b1de57f6e02a2eb519d8d47d', '再动我咬你', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1988-10-07 00:00:00', '/images/uploads/9.jpg', '5002563482', 100, 1, '2019-12-26 00:00:00');
INSERT INTO `user` VALUES (10, '15923924309', '41543f13b1de57f6e02a2eb519d8d47d', '兴旺发达通四海', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1991-11-21 00:00:00', '/images/uploads/10.jpg', '9169870153', 100, 1, '2019-12-09 00:00:00');
INSERT INTO `user` VALUES (11, '15277264382', '41543f13b1de57f6e02a2eb519d8d47d', '猫腻仙女抱', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1992-02-07 00:00:00', '/images/uploads/11.jpg', '9454231299', 100, 1, '2020-02-14 00:00:00');
INSERT INTO `user` VALUES (12, '14140948006', '41543f13b1de57f6e02a2eb519d8d47d', '説减肥呮諟吓吓肉', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1992-09-20 00:00:00', '/images/uploads/12.jpg', '4840439019', 100, 1, '2020-03-23 00:00:00');
INSERT INTO `user` VALUES (13, '13125502593', '41543f13b1de57f6e02a2eb519d8d47d', '转身、未来', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1987-08-06 00:00:00', '/images/uploads/13.jpg', '9260589953', 100, 1, '2020-04-13 00:00:00');
INSERT INTO `user` VALUES (14, '15336926259', '41543f13b1de57f6e02a2eb519d8d47d', '青春永不言弃', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1991-06-21 00:00:00', '/images/uploads/14.jpg', '8957962444', 100, 1, '2020-01-23 00:00:00');
INSERT INTO `user` VALUES (15, '13606139499', '41543f13b1de57f6e02a2eb519d8d47d', '天会亮、心会暖', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1988-10-28 00:00:00', '/images/uploads/15.jpg', '1948536345', 100, 1, '2020-02-26 00:00:00');
INSERT INTO `user` VALUES (16, '15635195935', '41543f13b1de57f6e02a2eb519d8d47d', '该猖狂何必忍耐', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1986-11-23 00:00:00', '/images/uploads/16.jpg', '4598118402', 100, 1, '2020-02-19 00:00:00');
INSERT INTO `user` VALUES (17, '18137678010', '41543f13b1de57f6e02a2eb519d8d47d', '守住本真的自我', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1990-02-19 00:00:00', '/images/uploads/17.jpg', '3921075387', 100, 1, '2020-04-11 00:00:00');
INSERT INTO `user` VALUES (18, '15266134255', '41543f13b1de57f6e02a2eb519d8d47d', '破茧。幻化成蝶', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1985-12-10 00:00:00', '/images/uploads/18.jpg', '444385592', 100, 1, '2020-01-08 00:00:00');
INSERT INTO `user` VALUES (19, '17604872680', '41543f13b1de57f6e02a2eb519d8d47d', '不经历风雨，怎能见彩红。', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1992-12-29 00:00:00', '/images/uploads/19.jpg', '4168860123', 100, 1, '2020-01-01 00:00:00');
INSERT INTO `user` VALUES (20, '15566220072', '41543f13b1de57f6e02a2eb519d8d47d', '吃苦耐勞ヽゝ', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1993-07-18 00:00:00', '/images/uploads/20.jpg', '1096200751', 100, 1, '2020-04-07 00:00:00');
INSERT INTO `user` VALUES (21, '17576107149', '41543f13b1de57f6e02a2eb519d8d47d', '且听风吟', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1992-01-22 00:00:00', '/images/uploads/21.jpg', '5881371041', 100, 1, '2020-01-18 00:00:00');
INSERT INTO `user` VALUES (22, '15281627917', '41543f13b1de57f6e02a2eb519d8d47d', '姐是你穿不起的名牌', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1992-01-21 00:00:00', '/images/uploads/22.jpg', '2329367646', 100, 1, '2019-12-28 00:00:00');
INSERT INTO `user` VALUES (23, '14348857929', '41543f13b1de57f6e02a2eb519d8d47d', '予你心安', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1992-04-24 00:00:00', '/images/uploads/23.jpg', '9196587653', 100, 1, '2019-12-24 00:00:00');
INSERT INTO `user` VALUES (24, '18595461068', '41543f13b1de57f6e02a2eb519d8d47d', '时间嘲笑了誓言', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1989-07-07 00:00:00', '/images/uploads/24.jpg', '1632986379', 100, 1, '2020-03-23 00:00:00');
INSERT INTO `user` VALUES (25, '14229170318', '41543f13b1de57f6e02a2eb519d8d47d', '萌果果', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1994-03-07 00:00:00', '/images/uploads/25.jpg', '2165015451', 100, 1, '2019-12-24 00:00:00');
INSERT INTO `user` VALUES (26, '13343820661', '41543f13b1de57f6e02a2eb519d8d47d', '永不停息', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1992-01-15 00:00:00', '/images/uploads/26.jpg', '3599545388', 100, 1, '2020-03-18 00:00:00');
INSERT INTO `user` VALUES (27, '17799229989', '41543f13b1de57f6e02a2eb519d8d47d', '云深不知处', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1990-09-12 00:00:00', '/images/uploads/27.jpg', '3195079715', 100, 1, '2020-03-06 00:00:00');
INSERT INTO `user` VALUES (28, '17185071224', '41543f13b1de57f6e02a2eb519d8d47d', '落花人独立', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1991-03-09 00:00:00', '/images/uploads/28.jpg', '5569185600', 100, 1, '2019-12-03 00:00:00');
INSERT INTO `user` VALUES (29, '15873533783', '41543f13b1de57f6e02a2eb519d8d47d', '执意画红尘', '男', '41543f13b1de57f6e02a2eb519d8d47d', '1985-03-18 00:00:00', '/images/uploads/29.jpg', '870177414', 100, 1, '2020-03-16 00:00:00');
INSERT INTO `user` VALUES (30, '13119935861', '41543f13b1de57f6e02a2eb519d8d47d', '陌上花开迟', '女', '41543f13b1de57f6e02a2eb519d8d47d', '1987-01-30 00:00:00', '/images/uploads/30.jpg', '3218207566', 100, 1, '2020-03-05 00:00:00');
INSERT INTO `user` VALUES (31, '14292555492', '41543f13b1de57f6e02a2eb519d8d48d', '包媛富', '女', '41543f13b1de57f6e02a2eb519d8d48d', '1992-07-09 00:00:00', '/images/uploads/31.jpg', '646871601', 100, 1, '2020-01-18 00:00:00');
INSERT INTO `user` VALUES (32, '18988829773', '41543f13b1de57f6e02a2eb519d8d49d', '翁甫丘', '女', '41543f13b1de57f6e02a2eb519d8d49d', '1985-09-01 00:00:00', '/images/uploads/32.jpg', '4999690285', 100, 1, '2020-01-08 00:00:00');
INSERT INTO `user` VALUES (33, '17759543816', '41543f13b1de57f6e02a2eb519d8d50d', '鲍臻琳', '女', '41543f13b1de57f6e02a2eb519d8d50d', '1992-02-29 00:00:00', '/images/uploads/33.jpg', '8682944581', 100, 1, '2020-04-22 00:00:00');
INSERT INTO `user` VALUES (34, '13357173884', '41543f13b1de57f6e02a2eb519d8d51d', '鄂程佳', '男', '41543f13b1de57f6e02a2eb519d8d51d', '1994-10-13 00:00:00', '/images/uploads/34.jpg', '9280391074', 100, 1, '2020-01-16 00:00:00');
INSERT INTO `user` VALUES (35, '15611479243', '41543f13b1de57f6e02a2eb519d8d52d', '高予睿', '女', '41543f13b1de57f6e02a2eb519d8d52d', '1992-07-13 00:00:00', '/images/uploads/35.jpg', '6966315809', 100, 1, '2020-02-17 00:00:00');
INSERT INTO `user` VALUES (36, '14675198643', '41543f13b1de57f6e02a2eb519d8d53d', '权键祺', '女', '41543f13b1de57f6e02a2eb519d8d53d', '1990-12-25 00:00:00', '/images/uploads/36.jpg', '6034188916', 100, 1, '2019-12-28 00:00:00');
INSERT INTO `user` VALUES (37, '13247171773', '41543f13b1de57f6e02a2eb519d8d54d', '原艳沛', '男', '41543f13b1de57f6e02a2eb519d8d54d', '1994-09-15 00:00:00', '/images/uploads/37.jpg', '4131535917', 100, 1, '2020-01-08 00:00:00');
INSERT INTO `user` VALUES (38, '18377333930', '41543f13b1de57f6e02a2eb519d8d55d', '门贞圩', '女', '41543f13b1de57f6e02a2eb519d8d55d', '1993-07-22 00:00:00', '/images/uploads/38.jpg', '5759641899', 100, 1, '2020-04-23 00:00:00');
INSERT INTO `user` VALUES (39, '15421286656', '41543f13b1de57f6e02a2eb519d8d56d', '关伶颐', '男', '41543f13b1de57f6e02a2eb519d8d56d', '1988-08-05 00:00:00', '/images/uploads/39.jpg', '705350722', 100, 1, '2020-01-23 00:00:00');
INSERT INTO `user` VALUES (40, '13354881171', '41543f13b1de57f6e02a2eb519d8d57d', '骆杰睿', '男', '41543f13b1de57f6e02a2eb519d8d57d', '1985-07-08 00:00:00', '/images/uploads/40.jpg', '9411003243', 100, 1, '2020-03-13 00:00:00');
INSERT INTO `user` VALUES (41, '13690485595', '41543f13b1de57f6e02a2eb519d8d58d', '孟杰松', '男', '41543f13b1de57f6e02a2eb519d8d58d', '1992-12-23 00:00:00', '/images/uploads/41.jpg', '6200384822', 100, 1, '2019-12-06 00:00:00');
INSERT INTO `user` VALUES (42, '13125095348', '41543f13b1de57f6e02a2eb519d8d59d', '左洋仁', '女', '41543f13b1de57f6e02a2eb519d8d59d', '1994-02-02 00:00:00', '/images/uploads/42.jpg', '5061184232', 100, 1, '2020-03-28 00:00:00');
INSERT INTO `user` VALUES (43, '15124309453', '41543f13b1de57f6e02a2eb519d8d60d', '封劭栩', '男', '41543f13b1de57f6e02a2eb519d8d60d', '1990-01-14 00:00:00', '/images/uploads/43.jpg', '7126516674', 100, 1, '2020-04-11 00:00:00');
INSERT INTO `user` VALUES (44, '14859791538', '41543f13b1de57f6e02a2eb519d8d61d', '段鑫君', '女', '41543f13b1de57f6e02a2eb519d8d61d', '1991-04-17 00:00:00', '/images/uploads/44.jpg', '5041864360', 100, 1, '2020-01-17 00:00:00');
INSERT INTO `user` VALUES (45, '17615774492', '41543f13b1de57f6e02a2eb519d8d62d', '党博天', '男', '41543f13b1de57f6e02a2eb519d8d62d', '1993-04-04 00:00:00', '/images/uploads/45.jpg', '2074058572', 100, 1, '2019-12-23 00:00:00');
INSERT INTO `user` VALUES (46, '13549707273', '41543f13b1de57f6e02a2eb519d8d63d', '陶梦意', '男', '41543f13b1de57f6e02a2eb519d8d63d', '1993-01-31 00:00:00', '/images/uploads/46.jpg', '7468678048', 100, 1, '2020-04-10 00:00:00');
INSERT INTO `user` VALUES (47, '13543987404', '41543f13b1de57f6e02a2eb519d8d64d', '靖澜青', '男', '41543f13b1de57f6e02a2eb519d8d64d', '1985-05-05 00:00:00', '/images/uploads/47.jpg', '384024412', 100, 1, '2020-03-03 00:00:00');
INSERT INTO `user` VALUES (48, '15403666391', '41543f13b1de57f6e02a2eb519d8d65d', '强忠乐', '男', '41543f13b1de57f6e02a2eb519d8d65d', '1986-03-03 00:00:00', '/images/uploads/48.jpg', '4550549169', 100, 1, '2019-12-02 00:00:00');
INSERT INTO `user` VALUES (49, '17668758746', '41543f13b1de57f6e02a2eb519d8d66d', '刘宏滨', '男', '41543f13b1de57f6e02a2eb519d8d66d', '1985-01-21 00:00:00', '/images/uploads/49.jpg', '9908143337', 100, 1, '2020-01-15 00:00:00');
INSERT INTO `user` VALUES (50, '17923175440', '41543f13b1de57f6e02a2eb519d8d67d', '应贞爱', '女', '41543f13b1de57f6e02a2eb519d8d67d', '1985-11-13 00:00:00', '/images/uploads/50.jpg', '4745036337', 100, 1, '2020-03-10 00:00:00');
INSERT INTO `user` VALUES (51, '18159271000', '63519bf6be9c78516f07d32d946aeb79', '小小樱桃', '女', '', '2000-01-01 00:00:00', '/images/uploads/20200327196958.jpeg', '', 50000, 1, '2020-03-27 15:38:17');

-- ----------------------------
-- View structure for v_chat_business2user
-- ----------------------------
DROP VIEW IF EXISTS `v_chat_business2user`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_chat_business2user` AS select `a`.`message_id` AS `message_id`,`a`.`content` AS `content`,`a`.`type` AS `type`,`a`.`send_time` AS `send_time`,`a`.`receive_id` AS `receive_id`,`a`.`sender_id` AS `sender_id`,`b`.`nick` AS `sender_nick`,`b`.`avatar` AS `sender_avatar`,`c`.`nick` AS `receive_nick`,`c`.`avatar` AS `receive_avatar` from ((`chat` `a` join `business` `b` on(((`a`.`type` = 3) and (`a`.`sender_id` = `b`.`business_id`)))) join `user` `c` on(((`a`.`type` = 3) and (`a`.`receive_id` = `c`.`user_id`))));

-- ----------------------------
-- View structure for v_chat_user2business
-- ----------------------------
DROP VIEW IF EXISTS `v_chat_user2business`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_chat_user2business` AS select `a`.`message_id` AS `message_id`,`a`.`content` AS `content`,`a`.`type` AS `type`,`a`.`send_time` AS `send_time`,`a`.`receive_id` AS `receive_id`,`a`.`sender_id` AS `sender_id`,`b`.`nick` AS `sender_nick`,`b`.`avatar` AS `sender_avatar`,`c`.`nick` AS `receive_nick`,`c`.`avatar` AS `receive_avatar` from ((`chat` `a` join `user` `b` on(((`a`.`type` = 2) and (`a`.`sender_id` = `b`.`user_id`)))) join `business` `c` on(((`a`.`type` = 2) and (`a`.`receive_id` = `c`.`business_id`))));

-- ----------------------------
-- View structure for v_chat_user2user
-- ----------------------------
DROP VIEW IF EXISTS `v_chat_user2user`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_chat_user2user` AS select `a`.`message_id` AS `message_id`,`a`.`content` AS `content`,`a`.`type` AS `type`,`a`.`send_time` AS `send_time`,`a`.`receive_id` AS `receive_id`,`a`.`sender_id` AS `sender_id`,`b`.`nick` AS `sender_nick`,`c`.`nick` AS `receive_nick` from ((`chat` `a` join `user` `b` on(((`a`.`type` = 1) and (`a`.`sender_id` = `b`.`user_id`)))) join `user` `c` on(((`a`.`type` = 1) and (`a`.`receive_id` = `c`.`user_id`))));

-- ----------------------------
-- View structure for v_notice_manage
-- ----------------------------
DROP VIEW IF EXISTS `v_notice_manage`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_notice_manage` AS select `a`.`notice_id` AS `notice_id`,`a`.`sender_id` AS `sender_id`,`a`.`title` AS `title`,`a`.`content` AS `content`,`a`.`send_time` AS `sender_time`,`b`.`username` AS `sender_username`,`b`.`nick` AS `sender_nick`,`b`.`avatar` AS `sender_avatar` from (`notice` `a` left join `manage` `b` on((`a`.`sender_id` = `b`.`manage_id`)));

-- ----------------------------
-- View structure for v_order_details
-- ----------------------------
DROP VIEW IF EXISTS `v_order_details`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_order_details` AS select `a`.`order_id` AS `order_id`,`a`.`user_id` AS `user_id`,`a`.`shop_id` AS `shop_id`,`a`.`activity_id` AS `activity_id`,`a`.`serial` AS `serial`,`a`.`state` AS `state`,`a`.`pay_type` AS `pay_type`,`a`.`pay_time` AS `pay_time`,`a`.`money` AS `money`,`a`.`count` AS `count`,`a`.`price` AS `price`,`a`.`total` AS `total`,`a`.`note` AS `note`,`a`.`create_time` AS `create_time`,`a`.`update_time` AS `update_time`,`a`.`close_time` AS `close_time`,`a`.`done_time` AS `done_time`,`b`.`nick` AS `nick`,`b`.`avatar` AS `user_avatar`,`c`.`shop_name` AS `shop_name`,`c`.`address` AS `shop_address`,`d`.`title` AS `title`,`d`.`content` AS `content`,`d`.`address` AS `activity_address`,`d`.`type` AS `type`,`d`.`number` AS `number`,`d`.`image_url` AS `image_url`,`d`.`max_age` AS `max_age`,`d`.`min_age` AS `min_age`,`d`.`state` AS `activity_state`,`d`.`start_time` AS `start_time`,`d`.`end_time` AS `end_time` from (((`t_order` `a` left join `user` `b` on((`a`.`user_id` = `b`.`user_id`))) left join `shop` `c` on((`a`.`shop_id` = `c`.`shop_id`))) left join `activity` `d` on((`a`.`activity_id` = `d`.`activity_id`)));

-- ----------------------------
-- View structure for v_resoutces_business
-- ----------------------------
DROP VIEW IF EXISTS `v_resoutces_business`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_resoutces_business` AS select `a`.`resource_id` AS `resource_id`,`a`.`business_id` AS `business_id`,`a`.`title` AS `title`,`a`.`image_url` AS `image_url`,`a`.`type` AS `type`,`a`.`is_sell` AS `is_sell`,`a`.`create_time` AS `create_time`,`b`.`avatar` AS `avatar`,`b`.`nick` AS `nick`,`b`.`phone` AS `phone` from (`resources` `a` left join `business` `b` on((`a`.`business_id` = `b`.`business_id`)));

-- ----------------------------
-- View structure for v_shopinfo
-- ----------------------------
DROP VIEW IF EXISTS `v_shopinfo`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_shopinfo` AS select `a`.`shop_id` AS `shop_id`,`a`.`business_id` AS `business_id`,`a`.`shop_name` AS `shop_name`,`a`.`create_time` AS `create_time`,`a`.`address` AS `address`,`a`.`money` AS `money`,`b`.`avatar` AS `avatar`,`b`.`nick` AS `nick` from (`shop` `a` left join `business` `b` on((`a`.`business_id` = `b`.`business_id`)));

-- ----------------------------
-- View structure for v_shop_active
-- ----------------------------
DROP VIEW IF EXISTS `v_shop_active`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_shop_active` AS select `a`.`activity_id` AS `activity_id`,`a`.`shop_id` AS `shop_id`,`a`.`title` AS `title`,`a`.`content` AS `content`,`a`.`address` AS `address`,`a`.`type` AS `type`,`a`.`number` AS `number`,`a`.`image_url` AS `image_url`,`a`.`max_age` AS `max_age`,`a`.`min_age` AS `min_age`,`a`.`state` AS `state`,`a`.`price` AS `price`,`a`.`start_time` AS `start_time`,`a`.`end_time` AS `end_time`,`a`.`create_time` AS `create_time`,`b`.`business_id` AS `business_id`,`b`.`shop_name` AS `shop_name`,`b`.`address` AS `shop_address`,`c`.`avatar` AS `avatar`,`c`.`nick` AS `nick` from ((`activity` `a` left join `shop` `b` on((`a`.`shop_id` = `b`.`shop_id`))) left join `business` `c` on((`b`.`business_id` = `c`.`business_id`)));

-- ----------------------------
-- View structure for v_user_article
-- ----------------------------
DROP VIEW IF EXISTS `v_user_article`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_user_article` AS select `a`.`article_id` AS `article_id`,`a`.`user_id` AS `user_id`,`a`.`title` AS `article_title`,`a`.`content` AS `article_content`,`a`.`image_url` AS `article_image`,`a`.`create_time` AS `article_time`,`b`.`nick` AS `nick`,`b`.`avatar` AS `avatar` from (`article` `a` left join `user` `b` on((`a`.`user_id` = `b`.`user_id`)));

-- ----------------------------
-- View structure for v_user_article_comment
-- ----------------------------
DROP VIEW IF EXISTS `v_user_article_comment`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_user_article_comment` AS select `a`.`article_id` AS `article_id`,`a`.`user_id` AS `user_id`,`a`.`title` AS `article_title`,`a`.`content` AS `article_content`,`a`.`image_url` AS `article_image`,`a`.`create_time` AS `article_time`,`b`.`nick` AS `nick`,`b`.`avatar` AS `avatar`,`c`.`article_comment_id` AS `article_comment_id`,`c`.`content` AS `comment_content`,`c`.`image_url` AS `comment_image`,`c`.`create_time` AS `comment_time` from ((`article` `a` left join `user` `b` on((`a`.`user_id` = `b`.`user_id`))) left join `article_comment` `c` on((`a`.`article_id` = `c`.`article_id`)));

SET FOREIGN_KEY_CHECKS = 1;
