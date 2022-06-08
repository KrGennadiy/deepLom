-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 08 2020 г., 14:46
-- Версия сервера: 10.1.36-MariaDB
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `prg_kp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `chief`
--

CREATE TABLE `chief` (
  `document` varchar(9) NOT NULL,
  `rank` tinyint(4) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `commendation`
--

CREATE TABLE `commendation` (
  `idCommendation` tinyint(4) NOT NULL,
  `documentChief` varchar(9) NOT NULL,
  `documentServiceman` varchar(9) NOT NULL,
  `rankChief` tinyint(4) NOT NULL,
  `rankServiceman` tinyint(4) NOT NULL,
  `positionChief` tinyint(4) NOT NULL,
  `positionServiceman` tinyint(4) NOT NULL,
  `reason` tinytext NOT NULL,
  `date` date NOT NULL,
  `nameCommendation` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `militaryrank`
--

CREATE TABLE `militaryrank` (
  `idRank` tinyint(4) NOT NULL,
  `nameRank` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `militaryrank`
--

INSERT INTO `militaryrank` (`idRank`, `nameRank`) VALUES
(1, 'рядовой'),
(3, 'ефрейтор'),
(4, 'младший сержант'),
(5, 'сержант'),
(6, 'старший сержант'),
(7, 'старшина'),
(8, 'прапорщик'),
(9, 'старший прапорщик'),
(10, 'младший лейтенант'),
(11, 'лейтенант'),
(12, 'старший лейтенант'),
(13, 'капитан'),
(14, 'майор'),
(15, 'подполковник'),
(16, 'полковник'),
(19, 'генерал-майор'),
(20, 'генерал-лейтенант'),
(21, 'генерал-полковник'),
(22, 'генерал армии');

-- --------------------------------------------------------

--
-- Структура таблицы `position`
--

CREATE TABLE `position` (
  `idPosition` tinyint(4) NOT NULL,
  `namePosition` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `position`
--

INSERT INTO `position` (`idPosition`, `namePosition`) VALUES
(1, 'Начальник кафедры'),
(2, 'Заместитель начальника кафедры'),
(3, 'Начальник лаборатории'),
(4, 'Старший преподаватель');

-- --------------------------------------------------------

--
-- Структура таблицы `punishment`
--

CREATE TABLE `punishment` (
  `idPunishment` int(11) NOT NULL,
  `documentChief` varchar(9) NOT NULL,
  `documentServiceman` varchar(9) NOT NULL,
  `rankChief` tinyint(4) NOT NULL,
  `rankServiceman` tinyint(4) NOT NULL,
  `positionChief` tinyint(4) NOT NULL,
  `positionServiceman` tinyint(4) NOT NULL,
  `reason` tinytext NOT NULL,
  `date` date NOT NULL,
  `actuality` tinyint(1) NOT NULL DEFAULT '1',
  `namePunishment` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `serviceman`
--

CREATE TABLE `serviceman` (
  `document` varchar(9) NOT NULL,
  `rank` tinyint(4) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `serviceman`
--

INSERT INTO `serviceman` (`document`, `rank`, `position`, `name`) VALUES
('АС1234567', 16, 1, 'Матвеев Антон Егорович');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `login` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `typeuser` tinyint(3) UNSIGNED NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`login`, `password`, `typeuser`) VALUES
('operator', '7110eda4d09e062aa5e4', 1),
('root', '7110eda4d09e062aa5e4', 0),
('user', '7110eda4d09e062aa5e4', 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `chief`
--
ALTER TABLE `chief`
  ADD PRIMARY KEY (`document`,`rank`,`position`),
  ADD KEY `rankChief` (`rank`),
  ADD KEY `positionChief` (`position`);

--
-- Индексы таблицы `commendation`
--
ALTER TABLE `commendation`
  ADD PRIMARY KEY (`idCommendation`,`documentChief`,`documentServiceman`,`rankChief`,`rankServiceman`,`positionChief`,`positionServiceman`),
  ADD KEY `documentChiefCommendation` (`documentChief`),
  ADD KEY `documentServicemanCommendation` (`documentServiceman`),
  ADD KEY `rankChiefCommendation` (`rankChief`),
  ADD KEY `rankServicemanCommendation` (`rankServiceman`),
  ADD KEY `positionChiefCommendation` (`positionChief`),
  ADD KEY `positionServicemanCommendation` (`positionServiceman`);

--
-- Индексы таблицы `militaryrank`
--
ALTER TABLE `militaryrank`
  ADD PRIMARY KEY (`idRank`);

--
-- Индексы таблицы `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`idPosition`);

--
-- Индексы таблицы `punishment`
--
ALTER TABLE `punishment`
  ADD PRIMARY KEY (`idPunishment`,`documentChief`,`documentServiceman`,`rankChief`,`rankServiceman`,`positionChief`,`positionServiceman`),
  ADD KEY `documentChiefPunishment` (`documentChief`),
  ADD KEY `documentServicemanPunishment` (`documentServiceman`),
  ADD KEY `rankChiefPunishment` (`rankChief`),
  ADD KEY `rankServicemanPunishment` (`rankServiceman`),
  ADD KEY `positionChiefPunishment` (`positionChief`),
  ADD KEY `positionServicemanPunishment` (`positionServiceman`);

--
-- Индексы таблицы `serviceman`
--
ALTER TABLE `serviceman`
  ADD PRIMARY KEY (`document`,`rank`,`position`),
  ADD KEY `rank` (`rank`),
  ADD KEY `position` (`position`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `commendation`
--
ALTER TABLE `commendation`
  MODIFY `idCommendation` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `militaryrank`
--
ALTER TABLE `militaryrank`
  MODIFY `idRank` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `position`
--
ALTER TABLE `position`
  MODIFY `idPosition` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `punishment`
--
ALTER TABLE `punishment`
  MODIFY `idPunishment` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `chief`
--
ALTER TABLE `chief`
  ADD CONSTRAINT `positionChief` FOREIGN KEY (`position`) REFERENCES `position` (`idPosition`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `rankChief` FOREIGN KEY (`rank`) REFERENCES `militaryrank` (`idRank`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `commendation`
--
ALTER TABLE `commendation`
  ADD CONSTRAINT `documentChiefCommendation` FOREIGN KEY (`documentChief`) REFERENCES `chief` (`document`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `documentServicemanCommendation` FOREIGN KEY (`documentServiceman`) REFERENCES `serviceman` (`document`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `positionChiefCommendation` FOREIGN KEY (`positionChief`) REFERENCES `chief` (`position`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `positionServicemanCommendation` FOREIGN KEY (`positionServiceman`) REFERENCES `serviceman` (`position`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `rankChiefCommendation` FOREIGN KEY (`rankChief`) REFERENCES `chief` (`rank`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `rankServicemanCommendation` FOREIGN KEY (`rankServiceman`) REFERENCES `serviceman` (`rank`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `punishment`
--
ALTER TABLE `punishment`
  ADD CONSTRAINT `documentChiefPunishment` FOREIGN KEY (`documentChief`) REFERENCES `chief` (`document`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `documentServicemanPunishment` FOREIGN KEY (`documentServiceman`) REFERENCES `serviceman` (`document`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `positionChiefPunishment` FOREIGN KEY (`positionChief`) REFERENCES `chief` (`rank`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `positionServicemanPunishment` FOREIGN KEY (`positionServiceman`) REFERENCES `serviceman` (`rank`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `serviceman`
--
ALTER TABLE `serviceman`
  ADD CONSTRAINT `position` FOREIGN KEY (`position`) REFERENCES `position` (`idPosition`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `rank` FOREIGN KEY (`rank`) REFERENCES `militaryrank` (`idRank`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
