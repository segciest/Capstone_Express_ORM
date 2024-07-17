/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `photo_id` int DEFAULT NULL,
  `comment_date` datetime DEFAULT NULL,
  `content` text,
  `comment_status` tinyint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `photo_id` (`photo_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `photos` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `photo_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` text,
  `user_id` int DEFAULT NULL,
  `photo_status` tinyint NOT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `saved_photos` (
  `user_id` int NOT NULL,
  `photo_id` int NOT NULL,
  `save_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`photo_id`),
  KEY `photo_id` (`photo_id`),
  CONSTRAINT `saved_photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `saved_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_id`, `user_id`, `photo_id`, `comment_date`, `content`, `comment_status`) VALUES
(1, 1, 1, '2024-05-21 00:00:00', 'Ảnh đẹp lắm. I Like it!!', 1);
INSERT INTO `comments` (`comment_id`, `user_id`, `photo_id`, `comment_date`, `content`, `comment_status`) VALUES
(2, 1, 1, '2024-05-21 13:15:59', 'Wowww', 1);
INSERT INTO `comments` (`comment_id`, `user_id`, `photo_id`, `comment_date`, `content`, `comment_status`) VALUES
(3, 1, 1, '2024-05-21 13:16:24', 'I Like it!!', 1);
INSERT INTO `comments` (`comment_id`, `user_id`, `photo_id`, `comment_date`, `content`, `comment_status`) VALUES
(5, 1, 2, '2024-05-21 13:17:21', 'T1 mãi đỉnh', 1),
(6, 1, 2, '2024-05-21 13:18:31', 'Tuyệt vời', 1);

INSERT INTO `photos` (`photo_id`, `photo_name`, `url`, `description`, `user_id`, `photo_status`) VALUES
(1, 'Anh1', 'localhost:8080/public/img/1716291933606_732703441_51944273382_7a68ab7bcf_o.jpg', 'Heheh', 1, 0);
INSERT INTO `photos` (`photo_id`, `photo_name`, `url`, `description`, `user_id`, `photo_status`) VALUES
(2, 'Ảnh 1', 'localhost:8080/public/img/1716292492208_940309532_51944273382_7a68ab7bcf_o.jpg', 'Hehehehe', 1, 1);


INSERT INTO `saved_photos` (`user_id`, `photo_id`, `save_date`) VALUES
(1, 1, '2024-05-21 00:00:00');


INSERT INTO `users` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`, `refresh_token`) VALUES
(1, 'admin@gmail.com', '$2b$10$9XAxeqr5yythEuJGDyYoceviNEIKu//LAa6XVcOZKB2Tqb3eK3Q5O', 'Admin', 24, '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJrZXkiOiJIS2tqWU4iLCJpYXQiOjE3MTYyOTk3MTgsImV4cCI6MTcxODg5MTcxOH0.VoerWTIC_wWIG9FHsn7jCmST6zVzhxw12nH_yk0QoLI');
INSERT INTO `users` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`, `refresh_token`) VALUES
(2, 'caoson@gmail.com', '$2b$10$QBqfTxqbLHJQdHl/UEBnYuai0fXD/G1Y32iYsVslnS9IJ.0tU6Fvy', 'Cao Sơn', 20, '1716287968840_607497607_T1.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJrZXkiOiJJcU9XVVUiLCJpYXQiOjE3MTYyOTgxOTgsImV4cCI6MTcxODg5MDE5OH0.VkpIsByeYVEepJMyVF5PbxNmIPrmCrKRgNzPfSN31Yk');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;