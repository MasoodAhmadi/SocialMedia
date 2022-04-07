-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Generation Time: Apr 07, 2022 at 08:12 AM
-- Server version: 10.5.15-MariaDB-1:10.5.15+maria~focal
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nextjs`
--

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20220317131721-create-user.js'),
('20220318140920-create-user.js'),
('20220318145012-create-user.js'),
('20220321144737-create-user.js'),
('20220321145416-create-user.js'),
('20220321145601-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `firstname`, `email`, `password`, `bio`, `createdAt`, `updatedAt`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'johndoe123', 'software developer', '2022-03-21 15:02:33', '2022-03-21 15:02:33'),
(2, 'masood', 'ahmadi', 'masood@example.com', '123456', 'software developer', '2022-03-21 15:02:33', '2022-03-21 15:02:33'),
(3, 'jannaten', 'nayem', 'nayem@example.com', '123456', 'software developer', '2022-03-28 09:47:22', '2022-03-28 09:47:22'),
(4, 'toni', 'ruusunnen', 'toni@example.com', '123456', 'software developer', '2022-03-28 09:48:42', '2022-03-28 09:48:42'),
(5, 'mafruha', 'nuhary', 'mafruha@example.com', '123456', 'software developer', '2022-03-28 10:29:22', '2022-03-28 10:29:22'),
(9, 'adnassssssssssssn', 'naseeryddddrrrryyyy', 'adnan@example.com', '123456', 'software developer', '2022-03-28 10:42:34', '2022-03-28 12:12:48'),
(10, 'adnan', 'naseeryddddyyyy', 'adnan@example.com', '123456', 'software developer', '2022-03-28 10:50:26', '2022-03-28 10:50:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
