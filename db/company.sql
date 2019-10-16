/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : honeycomb

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2019-03-04 15:25:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `company`
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `regist_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `legal_person` char(255) DEFAULT NULL,
  `business_scope` char(255) DEFAULT NULL,
  `registered_capital` char(255) DEFAULT NULL,
  `official_website` char(100) DEFAULT NULL,
  `is_list` char(10) DEFAULT NULL,
  `headqurters` char(10) DEFAULT NULL,
  `industry` char(100) DEFAULT NULL,
  `employees` char(100) DEFAULT NULL,
  `products` text,
  `note` text,
  `modify_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `code` char(255) DEFAULT NULL,
  `source` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('1', '赤狐', '2019-03-04 14:40:59', '郭菁菁', '通信、开发、电子通信', '100万', 'https://www.foxsaas.com', 'false', '深圳', '数据分析', null, '赤狐CRM系统', null, '2019-03-04 14:40:59', '91440300MA5DFLLT8U', '百度');
