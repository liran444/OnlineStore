-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: mystoreschema
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `amount` int NOT NULL,
  `total_price` decimal(30,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_items_product_id_idx` (`product_id`),
  KEY `fk_cart_items_cart_id_idx` (`cart_id`),
  CONSTRAINT `fk_cart_items_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`id`),
  CONSTRAINT `fk_cart_items_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (3,7,1,20,200.00),(8,7,2,7,49.00),(9,7,3,6,24.00),(12,10,1,2,20.00),(13,10,2,1,7.00),(157,11,14,4,40.00),(158,11,6,3,12.00),(159,11,18,2,24.00),(160,11,5,8,32.00),(161,11,2,4,28.00),(162,11,15,1,3.90),(163,11,11,1,1.40),(164,11,1,4,40.00),(166,11,8,5,9.50),(167,11,13,1,12.00),(168,84,1,3,30.00),(169,84,2,2,14.00),(170,84,7,3,18.00),(171,85,7,1,6.00),(172,85,16,6,84.00),(173,86,5,1,4.00),(174,86,13,6,72.00),(175,87,16,7,98.00),(176,88,17,6,108.00),(177,89,9,4,56.00),(178,89,6,4,16.00),(179,89,3,4,16.00),(180,90,2,9,63.00),(181,91,1,7,70.00),(182,91,2,2,14.00),(183,92,16,7,98.00),(184,93,1,1,10.00),(185,93,2,9,63.00),(192,94,16,9,126.00),(193,94,2,4,28.00),(194,94,1,1,10.00),(196,95,2,1,7.00),(197,95,18,6,72.00),(198,96,2,1,7.00),(199,96,14,6,60.00),(203,97,2,4,28.00),(204,97,1,2,20.00),(205,97,5,1,4.00),(206,97,7,1,6.00),(207,97,9,1,14.00),(208,98,2,1,7.00),(209,98,18,2,24.00),(210,99,1,5,50.00),(211,100,16,8,112.00),(212,100,5,2,8.00),(213,100,7,6,36.00),(216,101,1,4,40.00),(217,101,16,3,42.00),(219,101,13,1,12.00),(220,101,17,1,18.00),(221,102,2,1,7.00),(222,102,1,6,60.00),(223,102,5,1,4.00),(224,102,8,1,1.90),(225,103,1,1,10.00),(226,103,13,6,72.00),(227,103,2,2,14.00),(238,104,3,1,4.00),(239,104,2,7,49.00),(240,105,16,1,14.00),(241,105,15,4,15.60),(242,105,12,5,75.00),(243,106,13,6,72.00),(244,107,1,6,60.00),(245,108,2,7,49.00),(246,108,1,1,10.00),(247,109,16,1,14.00),(248,109,18,5,60.00),(249,110,1,8,80.00),(250,111,5,8,32.00),(251,111,16,3,42.00),(252,112,7,7,42.00),(253,112,1,2,20.00),(254,113,18,7,84.00),(257,114,1,4,40.00),(258,114,2,1,10.00),(259,114,5,1,4.00),(260,114,16,3,50.40);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Drinks'),(1,'Meat & Fish'),(6,'Milk & Eggs'),(4,'Sweets & Snacks'),(5,'Vegetables & Fruits');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (6,'Ashdod'),(11,'Bat Yam'),(8,'Beersheba'),(9,'Bnei Brak'),(3,'Haifa'),(10,'Holon'),(2,'Jerusalem'),(7,'Netanya'),(5,'Petah Tikva'),(4,'Rishon LeZion'),(1,'Tel Aviv');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `cart_id` bigint NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `ship_city_id` bigint NOT NULL,
  `ship_address` varchar(45) NOT NULL,
  `ship_date` datetime NOT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_digits` decimal(4,0) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_id_UNIQUE` (`cart_id`),
  KEY `fk_cart_id_idx` (`cart_id`),
  KEY `fk_orders_user_id_idx` (`user_id`),
  KEY `fk_orders_cities_id_idx` (`ship_city_id`),
  CONSTRAINT `fk_orders_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`id`),
  CONSTRAINT `fk_orders_cities_id` FOREIGN KEY (`ship_city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `fk_orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1,0.00,1,'Hertzel 3','2020-08-28 00:00:00','2020-07-29 14:56:00',1234),(2,2,3,0.00,1,'Hertzel 22','2020-08-29 00:00:00','2020-07-29 14:56:00',1234),(6,2,7,96.00,11,'Bialik 21','2020-09-02 00:00:00','2020-07-29 15:08:56',1234),(15,1,10,27.00,11,'Bialik 21','2020-08-17 00:00:00','2020-08-12 19:31:44',1234),(16,2,11,202.80,11,'Bialik 21','2020-09-16 00:00:00','2020-08-27 16:41:34',6789),(18,2,84,62.00,11,'Bialik 21','2020-09-16 00:00:00','2020-08-27 16:49:22',1244),(20,2,85,90.00,11,'Bialik 21','2020-09-16 00:00:00','2020-08-27 16:52:05',7452),(21,2,86,76.00,11,'Bialik 21','2020-09-22 00:00:00','2020-08-27 16:56:47',1654),(23,2,87,98.00,11,'Bialik 21','2020-09-22 00:00:00','2020-08-27 16:58:24',3123),(25,2,88,108.00,11,'Bialik 21','2020-09-22 00:00:00','2020-08-27 17:00:41',3123),(26,2,89,88.00,11,'Bialik 21','2020-09-25 00:00:00','2020-08-27 17:02:04',3123),(28,2,90,63.00,11,'Bialik 21','2020-08-28 00:00:00','2020-08-27 17:03:22',3123),(30,2,91,84.00,11,'Bialik 21','2020-08-28 00:00:00','2020-08-27 17:08:11',3123),(31,2,92,98.00,11,'Bialik 21','2020-08-31 00:00:00','2020-08-27 17:11:13',3123),(32,2,93,73.00,11,'Bialik 21','2020-08-30 00:00:00','2020-08-27 17:11:27',1412),(33,2,94,164.00,11,'Bialik 21','2020-09-18 00:00:00','2020-08-27 18:52:41',3123),(34,2,95,79.00,11,'Bialik 21','2020-09-20 00:00:00','2020-08-27 20:15:44',1155),(35,2,96,67.00,11,'Bialik 21','2020-09-26 00:00:00','2020-08-27 20:25:15',3123),(36,2,97,72.00,11,'Bialik 21','2020-08-30 00:00:00','2020-08-29 13:02:08',5152),(37,2,99,50.00,11,'Bialik 21','2020-08-30 00:00:00','2020-08-29 13:04:20',6485),(38,2,100,156.00,11,'Bialik 21','2020-08-31 00:00:00','2020-08-29 13:07:24',7345),(39,2,101,112.00,11,'Bialik 21','2020-09-18 00:00:00','2020-08-29 15:00:13',3123),(40,2,102,72.90,11,'Bialik 21','2020-08-31 00:00:00','2020-08-29 23:00:57',3132),(41,2,103,96.00,11,'Bialik 21','2020-09-01 00:00:00','2020-08-29 23:01:26',4123),(42,2,104,53.00,11,'Bialik 21','2020-09-01 00:00:00','2020-08-31 16:50:59',3123),(43,2,105,104.60,11,'Bialik 21','2020-09-02 00:00:00','2020-08-31 18:11:16',1123),(44,2,106,72.00,11,'Bialik 21','2020-09-01 00:00:00','2020-08-31 18:14:29',3123),(45,2,107,60.00,11,'Bialik 21','2020-09-29 00:00:00','2020-08-31 18:16:02',3123),(46,2,108,59.00,11,'Bialik 21','2020-09-29 00:00:00','2020-08-31 18:16:28',3123),(47,2,109,74.00,11,'Bialik 21','2020-09-20 00:00:00','2020-08-31 18:18:13',3123),(48,2,110,80.00,11,'Bialik 21','2020-09-03 00:00:00','2020-08-31 18:20:20',3123),(49,2,111,74.00,11,'Bialik 21','2020-09-04 00:00:00','2020-08-31 18:21:29',3123),(50,2,112,62.00,11,'Bialik 21','2020-09-05 00:00:00','2020-08-31 18:25:21',3123),(51,2,113,84.00,11,'Bialik 21','2020-09-05 00:00:00','2020-08-31 18:26:07',2345);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `category_id` bigint NOT NULL,
  `image_file_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_products_category_id_idx` (`category_id`),
  CONSTRAINT `fk_products_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Cola',10.00,3,'g-3a2ma1m298g-3a2m91j2fmaw3f-a3h5433.png'),(2,'Sprite',10.00,3,'af30j32fa02j-jg-2na-23gib-aksdvacm-320ma91213sd.png'),(3,'Bamba Nougat',4.00,4,'asdoij2393f2-3k23f-23f-23fo-9we.png'),(5,'Water Bottle',4.00,3,'23-f0j-a30fma-30fjaw-0fai3-0fkaw39rfsdf931532.png'),(6,'Chips',4.00,4,'a0932nf-0a3-fa3v-0mmav-s-0asdfa-w0efjasd-0fiewa-0fa.png'),(7,'Iced Coffee',6.00,3,'0289f3j-2mf3-230f-30ma-0dak3af0-awefm3afsadffbvcxfb.png'),(8,'Banana',1.90,5,'asd-6rhjdfkj6t5fjitd5-cd5rna-981524754691zm7fp.png'),(9,'Ice Cream',14.00,4,'023894jhf0293jf-asdfa-3f3a-3ajf-3mv3-c.png'),(10,'KitKat',4.00,4,'e92d0879-55f5-4685-b49d-a323f4529183.png'),(11,'Apple',1.40,5,'aeoriun93j203f-f3a-3af-3af-ma3-09.png'),(12,'Watermelon',15.00,5,'asdfashgas-32f3as278a649gag-9815251818421yuvm.png'),(13,'Eggs Pack',12.00,6,'8392hffd98hf23fho23jhf-f3af0a3fka3f-ka3fa-3fkj3.png'),(14,'Milk',10.00,6,'23809nf93298n-32f239fj32-3fd2K0dkd3-das.png'),(15,'Yogurt',3.90,6,'sdoifimnoinmokm4f2234214-12ED!2d12-d12d21aksd-fWE.png'),(16,'Salmon Fillet',16.80,1,'o3iomnoi32n14-f1k2k-f12e-1m2dm12doDM-g.png'),(17,'Beef Rib',18.00,1,'opierjpsdfgj321341-2354-32-g32g-g32k-mdfa-dslf-3.png'),(18,'Chicken Breast',14.00,1,'oirewhjg-23423459j0gff-31f-k1tfg1-k1sd-1mak-2-a2.png'),(19,'Fuze Tea',10.00,3,'2f5b024e-5130-4acc-a4d3-f583ad77fba6.png'),(20,'Melon',11.00,5,'c8761642-64e3-4d79-89fd-fd73e95ee6fe.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_checked_out` tinyint DEFAULT '0',
  `cart_total_price` decimal(30,2) NOT NULL DEFAULT '0.00',
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shopping_carts_user_id_idx` (`user_id`),
  CONSTRAINT `fk_shopping_carts_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
INSERT INTO `shopping_carts` VALUES (1,'2020-07-19 12:25:45',1,0.00,2),(3,'2020-07-20 18:44:29',1,0.00,2),(7,'2020-07-29 15:08:56',1,273.00,2),(10,'2020-08-01 10:35:36',1,27.00,1),(11,'2020-08-05 14:50:48',1,202.80,2),(82,'2020-08-20 21:02:52',0,0.00,19),(83,'2020-08-21 01:55:06',0,0.00,20),(84,'2020-08-27 16:48:38',1,62.00,2),(85,'2020-08-27 16:49:22',1,90.00,2),(86,'2020-08-27 16:52:05',1,76.00,2),(87,'2020-08-27 16:56:47',1,98.00,2),(88,'2020-08-27 16:58:24',1,108.00,2),(89,'2020-08-27 17:00:42',1,88.00,2),(90,'2020-08-27 17:02:04',1,63.00,2),(91,'2020-08-27 17:03:22',1,84.00,2),(92,'2020-08-27 17:08:11',1,98.00,2),(93,'2020-08-27 17:11:13',1,73.00,2),(94,'2020-08-27 17:11:27',1,164.00,2),(95,'2020-08-27 18:52:41',1,79.00,2),(96,'2020-08-27 20:15:44',1,67.00,2),(97,'2020-08-27 20:25:15',1,72.00,2),(98,'2020-08-29 12:52:43',0,31.00,21),(99,'2020-08-29 13:02:08',1,50.00,2),(100,'2020-08-29 13:04:20',1,156.00,2),(101,'2020-08-29 13:07:24',1,112.00,2),(102,'2020-08-29 15:00:13',1,72.90,2),(103,'2020-08-29 23:00:57',1,96.00,2),(104,'2020-08-29 23:01:26',1,53.00,2),(105,'2020-08-31 16:50:59',1,104.60,2),(106,'2020-08-31 18:11:16',1,72.00,2),(107,'2020-08-31 18:14:29',1,60.00,2),(108,'2020-08-31 18:16:02',1,59.00,2),(109,'2020-08-31 18:16:28',1,74.00,2),(110,'2020-08-31 18:18:13',1,80.00,2),(111,'2020-08-31 18:20:20',1,74.00,2),(112,'2020-08-31 18:21:29',1,62.00,2),(113,'2020-08-31 18:25:21',1,84.00,2),(114,'2020-08-31 18:26:07',0,104.40,2),(115,'2020-09-20 12:50:56',0,0.00,22);
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `city_id` bigint NOT NULL,
  `street` varchar(45) NOT NULL,
  `social_number` bigint NOT NULL,
  `user_type` varchar(128) DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `social_number_UNIQUE` (`social_number`),
  KEY `fk_users_cities_id_idx` (`city_id`),
  CONSTRAINT `fk_users_cities_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Barak','Dekamhi','barak2kim@gmail.com','1234',11,'Bialik 21',211821715,'CUSTOMER'),(2,'Liran','Dekamhi','liran.kim@gmail.com','1234',11,'Bialik 21',999999999,'CUSTOMER'),(3,'daa','faa','g@g.df','1234',11,'Bialik',123123123,'CUSTOMER'),(4,'aaaa','rrrrr','g@a.c','1234',6,'Bebebe',414141414,'CUSTOMER'),(5,'asdg','gasdg','g@r.yh','1234',9,'asdfgasdg',414151511,'CUSTOMER'),(6,'asdfasdf','fdsafas','tt@y.g','1234',3,'sdfdhfgj',563467627,'CUSTOMER'),(7,'asdf','asdf','y@y6d.d','1234',2,'asdsf',828282822,'CUSTOMER'),(8,'wdfg','sjhshj','h@y.l','1234',9,'sfgnnfgs',436245666,'CUSTOMER'),(9,'Tata','Degh','gg@rr.r','1234',4,'Hertzel 31',515151511,'CUSTOMER'),(10,'Targ','Grath','g@rr.g','1234',3,'Bessil',414515222,'CUSTOMER'),(11,'Dart','Gart','tt@t.l','1234',9,'Fesfal',515122223,'CUSTOMER'),(12,'Radt','Tarf','yyy@g.y','1234',10,'Jel',517777776,'CUSTOMER'),(13,'Tast','Yart','jj@h.t','1234',11,'Rasga',661161612,'CUSTOMER'),(14,'Raasdt','Gasd','uu@ytw.l','1234',11,'Denen',882822284,'CUSTOMER'),(15,'Yas','Tas','gggg.g@g.g','1234',6,'Ras',661161611,'CUSTOMER'),(16,'Has','Gas','uu@yyds.l','1234',8,'Ras',123553213,'CUSTOMER'),(17,'Asdf','Fasd','yyy@yy.k','1234',3,'Asdf',123454541,'CUSTOMER'),(18,'asd','asd','yy@ud.kk','1234',11,'asd',771711123,'CUSTOMER'),(19,'TRasd','Fasd','ert@tre.lk','1234',6,'Fas',414122334,'CUSTOMER'),(20,'Liran','Dekamhi','online@market.email.com','1234',11,'Bialik',515123796,'ADMIN'),(21,'Steve','Garth','g@mdsdfs.sf','1234',3,'Hetz21',414233223,'CUSTOMER'),(22,'Rodrik','Terts','uuu@yrts.g','123456',10,'Hash 2',611778996,'CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-23 20:43:22
