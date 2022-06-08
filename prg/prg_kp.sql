-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 16 2020 г., 18:01
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

--
-- Дамп данных таблицы `chief`
--

INSERT INTO `chief` (`document`, `rank`, `position`, `name`) VALUES
('342534223', 15, 8, 'Fedos Nazarov'),
('AC7654321', 16, 2, 'Белкин Игорь Евгеньевич'),
('всампирто', 1, 1, ''),
('КЕ1234567', 3, 9, 'Костромин Евгений Олегович'),
('ПЕ1234567', 20, 10, 'Лежейко Александр Сергеевич'),
('РК1234567', 8, 8, 'Below Владимир Юрьевич');

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

--
-- Дамп данных таблицы `commendation`
--

INSERT INTO `commendation` (`idCommendation`, `documentChief`, `documentServiceman`, `rankChief`, `rankServiceman`, `positionChief`, `positionServiceman`, `reason`, `date`, `nameCommendation`) VALUES
(26, 'sdadasd', 'AC7654321', 1, 16, 1, 2, 'dfg', '2020-07-04', 'fdgdfg'),
(29, 'АС1234567', 'AC7654321', 16, 16, 1, 2, 'Отстой', '2020-07-17', 'Обычное поощрение'),
(30, 'РК1234567', 'АС1234567', 9, 16, 8, 1, 'Хочу', '2020-07-14', 'Благодарность'),
(36, 'AC7654321', 'КЕ1234567', 16, 3, 2, 9, 'Блеск очек', '2020-07-08', 'Благодарность'),
(37, 'РК1234567', 'ПЕ1234567', 8, 20, 8, 10, 'ХЗ', '2020-07-18', 'Благодарность');

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
(4, 'Старший преподаватель'),
(5, 'Преподаватель'),
(6, 'Доцент кафедры'),
(7, 'Профессор кафедры'),
(8, 'Самый старший преподаватель'),
(9, 'Менеджер по продажам'),
(10, 'Ответственный за попугая'),
(11, 'Почти старший преподаватель'),
(12, 'Лаборант');

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

--
-- Дамп данных таблицы `punishment`
--

INSERT INTO `punishment` (`idPunishment`, `documentChief`, `documentServiceman`, `rankChief`, `rankServiceman`, `positionChief`, `positionServiceman`, `reason`, `date`, `actuality`, `namePunishment`) VALUES
(2, 'АС1234567', 'AC7654321', 16, 16, 1, 2, 'Просто ', '2020-07-09', 0, 'Строгий выговор'),
(5, 'АС1234567', 'AC7654321', 16, 16, 1, 2, 'Отстой', '2020-07-17', 0, 'Мега взыскание'),
(6, 'ПЕ1234567', 'РК1234567', 20, 9, 10, 8, 'Плохо помыл лоток клетки', '2017-08-03', 0, 'Неполное служебное соответствие'),
(8, '342534223', 'AC7654321', 15, 16, 8, 2, 'Как-то так', '2020-07-10', 1, 'Взыскан'),
(9, 'КЕ1234567', '342534223', 3, 15, 9, 8, 'Чрезмерное использование толчка', '2020-07-06', 1, 'Взыскание');

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
('342534223', 15, 8, 'Fedos Nazarov'),
('AC7654321', 16, 2, 'Белкин Игорь Евгеньевич'),
('КЕ1234567', 3, 9, 'Костромин Евгений Олегович'),
('ПЕ1234567', 20, 10, 'Лежейко Александр Сергеевич'),
('РК1234567', 8, 8, 'Below Владимир Юрьевич');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `login` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `typeuser` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`login`, `password`, `typeuser`) VALUES
('admin', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 0),
('koster', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1),
('root', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 0),
('user', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1);

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
  MODIFY `idCommendation` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `militaryrank`
--
ALTER TABLE `militaryrank`
  MODIFY `idRank` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `position`
--
ALTER TABLE `position`
  MODIFY `idPosition` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `punishment`
--
ALTER TABLE `punishment`
  MODIFY `idPunishment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
-- Ограничения внешнего ключа таблицы `serviceman`
--
ALTER TABLE `serviceman`
  ADD CONSTRAINT `position` FOREIGN KEY (`position`) REFERENCES `position` (`idPosition`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `rank` FOREIGN KEY (`rank`) REFERENCES `militaryrank` (`idRank`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
