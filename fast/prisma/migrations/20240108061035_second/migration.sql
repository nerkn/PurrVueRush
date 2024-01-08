-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_parent_id_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `picture` VARCHAR(250) NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
 
SET foreign_key_checks = 0; 
SET sql_mode='NO_AUTO_VALUE_ON_ZERO';

INSERT INTO `Category` (`id`, `name`, `picture`, `parent_id`, `created_at`, `updated_at`) VALUES
(0,	'All',	NULL,	0,	'2024-01-05 08:41:42.000',	'2024-01-05 08:41:42.000'),
(4,	'Computers',	NULL,	5,	'2024-01-05 08:43:30.000',	'2024-01-05 08:43:30.000'),
(5,	'Electronic',	NULL,	0,	'2024-01-05 08:54:39.172',	'2024-01-07 15:33:52.302'),
(7,	'Lenovo',	NULL,	4,	'2024-01-05 10:38:21.000',	'2024-01-06 11:00:30.179'),
(8,	'Samsung',	NULL,	4,	'2024-01-05 10:38:32.000',	'2024-01-05 10:38:32.000'),
(9,	'Pets',	'https://unsplash.com/photos/MUcxe_wDurE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8cGV0c3xlbnwwfHx8fDE3MDQ0ODAzOTh8MA&force=true&w=240',	0,	'2024-01-05 23:26:19.000',	'2024-01-05 23:26:19.000'),
(10,	'Cats',	'https://unsplash.com/photos/gt15WYd9nfc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHdpbGQlMjBjYXR8ZW58MHx8fHwxNzA0NDk3MzM4fDA&force=true&w=640',	9,	'2024-01-05 23:29:34.000',	'2024-01-05 23:29:34.000'),
(11,	'Dogies',	'https://unsplash.com/photos/Zqy-x7K5Qcg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cHVwfGVufDB8fHx8MTcwNDQ5NzQyN3ww&force=true&w=240',	9,	'2024-01-05 23:32:13.000',	'2024-01-05 23:32:13.000'),
(12,	'Rakuun',	'/images/products/11.webp',	9,	'2024-01-06 15:31:20.688',	'2024-01-06 15:31:20.688');
 
INSERT INTO `Product` (`id`, `name`, `picture`, `category_id`, `created_at`, `updated_at`) VALUES
(1,	'Lenovo IdeaPad',	'https://productimages.hepsiburada.net/s/257/375-375/110000240404392.jpg',	7,	'2024-01-06 12:12:27.000',	'2024-01-06 12:12:27.000'),
(2,	'Lenovo A101',	'https://akn-ayb.a-cdn.akinoncdn.com/products/2022/11/22/2227647/779d2f17-a6f7-42d3-b8f3-dc5f9b5b00f1_size780x780_quality60_cropCenter.jpg',	7,	'2024-01-06 12:13:09.000',	'2024-01-06 12:13:09.000'),
(3,	'Samsung',	'/images/products/3.webp',	8,	'2024-01-06 12:14:19.000',	'2024-01-06 12:14:19.000'),
(4,	'Yoga',	'https://www.zdnet.com/a/img/resize/00986e16e359895799b8e400df8fda3729ce4769/2023/01/27/0b3c9dc0-2024-4b42-997e-a0bbac157656/galaxy-book-3-series.jpg?auto=webp&fit=crop&height=1200&width=1200',	8,	'2024-01-06 12:14:59.000',	'2024-01-06 12:14:59.000'),
(5,	'Sonya',	'https://unsplash.com/photos/uy5t-CJuIK4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNhdHN8ZW58MHx8fHwxNzA0NjA3NjU2fDA&force=true&w=240',	10,	'2024-01-07 09:40:28.000',	'2024-01-07 09:40:28.000'),
(6,	'Futuristic Computer',	'/images/products/6.webp',	4,	'2024-01-07 12:09:44.688',	'2024-01-07 12:09:44.688'),
(7,	'Bossie',	'/images/products/7.webp',	11,	'2024-01-07 12:55:48.150',	'2024-01-07 12:55:48.150'),
(8,	'Mafia Cat',	'/images/products/8.webp',	10,	'2024-01-07 12:58:42.987',	'2024-01-07 12:58:42.987'),
(9,	'Dockowl',	'/images/products/9.webp',	9,	'2024-01-07 13:06:28.570',	'2024-01-07 13:06:28.570'),
(12,	'Johnaton',	'/images/products/12.webp',	12,	'2024-01-08 04:42:09.897',	'2024-01-08 04:57:38.319');
 