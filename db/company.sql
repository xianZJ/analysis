/*
 Navicat Premium Data Transfer

 Source Server         : zj
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : world

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 30/10/2019 16:14:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '公司名称',
  `regist_time` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '注册时间',
  `legal_person` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '公司法人',
  `business_scope` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '经营范围',
  `registered_capital` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '注册资金',
  `official_website` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '公司官网',
  `is_list` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否上市',
  `headqurters` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '总部地址',
  `industry` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所属行业',
  `scale` enum('100-500','501-1000','1001+') CHARACTER SET utf16le COLLATE utf16le_general_ci NULL DEFAULT NULL COMMENT '公司规模',
  `products` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '产品',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '备注',
  `modify_time` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '修改时间',
  `code` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '统一社会信用代码\r\n',
  `source` char(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '来源',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 251 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (245, '百度36', NULL, '李彦宏', '搜索引擎', NULL, 'www.baidu.com', NULL, NULL, NULL, NULL, '百度', NULL, NULL, NULL, NULL);
INSERT INTO `company` VALUES (247, '阿里巴巴', NULL, '刘强东', '电商', NULL, 'www.jd.com', NULL, NULL, NULL, NULL, 'jd', NULL, NULL, NULL, NULL);
INSERT INTO `company` VALUES (248, '阿里巴巴', NULL, '刘强东', '电商', NULL, 'www.jd.com', NULL, NULL, NULL, NULL, 'jd', NULL, NULL, NULL, '0');
INSERT INTO `company` VALUES (249, '阿里巴巴', NULL, '刘强东', '电商', NULL, 'www.jd.com', NULL, NULL, NULL, NULL, 'jd', NULL, NULL, NULL, '0');
INSERT INTO `company` VALUES (250, '阿里巴巴', NULL, '刘强东', '电商', NULL, 'www.jd.com', NULL, NULL, NULL, NULL, 'jd', NULL, NULL, NULL, '0');

SET FOREIGN_KEY_CHECKS = 1;
