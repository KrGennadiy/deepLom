-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 08 2022 г., 12:04
-- Версия сервера: 10.3.16-MariaDB
-- Версия PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `plan`
--

-- --------------------------------------------------------

--
-- Структура таблицы `agreeder`
--

CREATE TABLE `agreeder` (
  `idAgreeder` int(11) NOT NULL,
  `idServicemanAgreeder` int(11) NOT NULL,
  `idRankAgreeder` int(11) NOT NULL,
  `idPositionAgreeder` int(11) NOT NULL,
  `idDevisionAgreeder` int(11) NOT NULL,
  `signatureAgreeder` text NOT NULL,
  `dateAgreed` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `agreeder`
--

INSERT INTO `agreeder` (`idAgreeder`, `idServicemanAgreeder`, `idRankAgreeder`, `idPositionAgreeder`, `idDevisionAgreeder`, `signatureAgreeder`, `dateAgreed`) VALUES
(1, 2, 16, 1, 1, 'подпись Арсения', '2022-05-04'),
(2, 1, 13, 2, 2, 'подпись Василия', '2022-05-14'),
(3, 14, 12, 4, 3, 'Подпись', '2022-06-16'),
(4, 15, 14, 6, 2, 'Подпись', '2022-06-11');

-- --------------------------------------------------------

--
-- Структура таблицы `approver`
--

CREATE TABLE `approver` (
  `idApprover` int(11) NOT NULL,
  `idServicemanApprover` int(11) NOT NULL,
  `idRankApprover` int(11) NOT NULL,
  `idPositionApprover` int(11) NOT NULL,
  `idDivisionApprover` int(11) NOT NULL,
  `signatureApprover` text NOT NULL,
  `dateApprove` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `approver`
--

INSERT INTO `approver` (`idApprover`, `idServicemanApprover`, `idRankApprover`, `idPositionApprover`, `idDivisionApprover`, `signatureApprover`, `dateApprove`) VALUES
(1, 2, 16, 1, 1, 'подпись Арсения', '2022-05-11'),
(2, 1, 13, 2, 2, 'подпись Василия', '2022-05-21'),
(3, 14, 12, 4, 3, 'подпись', '2022-06-24'),
(4, 15, 14, 6, 2, 'подпись', '2022-06-22');

-- --------------------------------------------------------

--
-- Структура таблицы `auth`
--

CREATE TABLE `auth` (
  `login` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `auth`
--

INSERT INTO `auth` (`login`, `password`) VALUES
('root', 'dc76e9f0c0006e8f919e0c515c66dbba3982f785');

-- --------------------------------------------------------

--
-- Структура таблицы `coexecutor`
--

CREATE TABLE `coexecutor` (
  `idCoExecutor` int(11) NOT NULL,
  `idServicemanCoExecutor` int(11) NOT NULL,
  `idRankCoExecutor` int(11) NOT NULL,
  `idPositionCoExecutor` int(11) NOT NULL,
  `idDivisionCoExecutor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `coexecutor`
--

INSERT INTO `coexecutor` (`idCoExecutor`, `idServicemanCoExecutor`, `idRankCoExecutor`, `idPositionCoExecutor`, `idDivisionCoExecutor`) VALUES
(1, 2, 16, 1, 1),
(2, 1, 13, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `division`
--

CREATE TABLE `division` (
  `idDivision` int(11) NOT NULL,
  `idUpperDivision` int(11) DEFAULT NULL,
  `idLowerDivision` int(11) DEFAULT NULL,
  `titleDivision` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `division`
--

INSERT INTO `division` (`idDivision`, `idUpperDivision`, `idLowerDivision`, `titleDivision`) VALUES
(1, NULL, NULL, 'Отдел информационно-аналитического обеспечения'),
(2, 1, NULL, '1 отделение ИАО'),
(3, 1, NULL, '2 отделение ИАО'),
(4, 1, NULL, '3 отделение ИАО'),
(5, NULL, NULL, '1 Отдел'),
(6, NULL, NULL, '2 Отдел'),
(7, NULL, NULL, '3 отдел'),
(8, NULL, NULL, '4 отдел');

-- --------------------------------------------------------

--
-- Структура таблицы `event`
--

CREATE TABLE `event` (
  `idEvent` int(11) NOT NULL,
  `idGroupEventEvent` int(11) DEFAULT NULL,
  `idCoExecutorEvent` int(11) DEFAULT NULL,
  `idExecutorEvent` int(11) DEFAULT NULL,
  `titleEvent` text NOT NULL,
  `deadLineEvent` date DEFAULT NULL,
  `commentEvent` text DEFAULT NULL,
  `idPlanEvent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `event`
--

INSERT INTO `event` (`idEvent`, `idGroupEventEvent`, `idCoExecutorEvent`, `idExecutorEvent`, `titleEvent`, `deadLineEvent`, `commentEvent`, `idPlanEvent`) VALUES
(1, 1, 1, 2, 'Подготовить и издать приказ по организации служебной деятельности подразделения на 2023 год', '2022-05-11', '', 5),
(2, 2, 2, 1, 'Обеспечение функционирования информационных систем', '2022-05-13', '', 1),
(3, 3, 1, 2, 'Выполнить работы по реконструкции резервного узла №4', '2022-10-27', NULL, 4),
(4, 3, 1, 2, 'Формирование отчета по объему трафика за предыдущий месяц.', NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `executor`
--

CREATE TABLE `executor` (
  `idExecutor` int(11) NOT NULL,
  `idServiceman` int(11) NOT NULL,
  `idRank` int(11) NOT NULL,
  `idPosition` int(11) NOT NULL,
  `idDivision` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `executor`
--

INSERT INTO `executor` (`idExecutor`, `idServiceman`, `idRank`, `idPosition`, `idDivision`) VALUES
(1, 2, 16, 1, 1),
(2, 1, 13, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `groupevent`
--

CREATE TABLE `groupevent` (
  `idGroupEvent` int(11) NOT NULL,
  `titleGroupEvent` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `groupevent`
--

INSERT INTO `groupevent` (`idGroupEvent`, `titleGroupEvent`) VALUES
(1, 'Основные мероприятия оперативно-служебной деятельности'),
(2, 'Взаимодействие с подразделениями государственной власти Российской Федерации, органами местного самоуправления, организациями'),
(3, 'Инормационно-аналитическое обеспечение'),
(4, 'Организационные мероприятия');

-- --------------------------------------------------------

--
-- Структура таблицы `militaryposition`
--

CREATE TABLE `militaryposition` (
  `idPosition` int(11) NOT NULL,
  `titlePosition` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `militaryposition`
--

INSERT INTO `militaryposition` (`idPosition`, `titlePosition`) VALUES
(1, 'Начальник отдела'),
(2, 'Зам. начальника отдела'),
(3, 'старший офицер'),
(4, 'инженер'),
(5, 'Начальник отделения'),
(6, 'Зам. начальника отделения');

-- --------------------------------------------------------

--
-- Структура таблицы `militaryrank`
--

CREATE TABLE `militaryrank` (
  `idRank` int(11) NOT NULL,
  `titleMilitaryRank` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `militaryrank`
--

INSERT INTO `militaryrank` (`idRank`, `titleMilitaryRank`) VALUES
(1, 'гражданский'),
(2, 'рядовой'),
(3, 'ефрейтор'),
(4, 'мл. сержант'),
(5, 'сержант'),
(6, 'ст. сержант'),
(7, 'старшина'),
(8, 'прапорщик'),
(9, 'ст. прапорщик'),
(10, 'мл. лейтенант'),
(11, 'лейтенант'),
(12, 'ст. лейтенант'),
(13, 'капитан'),
(14, 'майор'),
(15, 'подполковник'),
(16, 'полковник'),
(17, 'генерал-майор'),
(18, 'генерал-лейтенант'),
(19, 'генерал-полковник'),
(20, 'генерал армии');

-- --------------------------------------------------------

--
-- Структура таблицы `pattern`
--

CREATE TABLE `pattern` (
  `idPattern` int(11) NOT NULL,
  `idSecrecyStamp` text NOT NULL,
  `idTimeInterval` int(11) NOT NULL,
  `idApprover` int(11) NOT NULL,
  `idAgreeder` int(11) NOT NULL,
  `numberPlan` text NOT NULL,
  `titlePlan` text NOT NULL,
  `idDevisionPlan` int(11) NOT NULL,
  `titlePattern` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pattern`
--

INSERT INTO `pattern` (`idPattern`, `idSecrecyStamp`, `idTimeInterval`, `idApprover`, `idAgreeder`, `numberPlan`, `titlePlan`, `idDevisionPlan`, `titlePattern`) VALUES
(38, '', 0, 0, 0, '', '', 0, '38_sample.docx'),
(39, '', 0, 0, 0, '', '', 0, '39_betaSample.docx'),
(40, '', 0, 0, 0, '', '', 0, '40_betaSample.docx'),
(41, '', 0, 0, 0, '', '', 0, '41_sample.docx'),
(42, '', 0, 0, 0, '', '', 0, '42_sample.docx'),
(43, '', 0, 0, 0, '', '', 0, '43_sample.docx'),
(44, '', 0, 0, 0, '', '', 0, '44_sample.docx'),
(45, '', 0, 0, 0, '', '', 0, '45_Задание на ПП Котяшев.docx'),
(46, '', 0, 0, 0, '', '', 0, '46_sample.docx'),
(47, '', 0, 0, 0, '', '', 0, '47_betaSample.docx'),
(48, '', 0, 0, 0, '', '', 0, '48_betaSample.docx'),
(49, '', 0, 0, 0, '', '', 0, '49_Набросок шаблона.docx'),
(50, '', 0, 0, 0, '', '', 0, '50_sample.docx'),
(51, '', 0, 0, 0, '', '', 0, '51_sample.docx'),
(52, '', 0, 0, 0, '', '', 0, '52_'),
(53, '', 0, 0, 0, '', '', 0, '53_'),
(54, '', 0, 0, 0, '', '', 0, '54_'),
(55, '', 0, 0, 0, '', '', 0, '55_'),
(56, '', 0, 0, 0, '', '', 0, '56_'),
(57, '', 0, 0, 0, '', '', 0, '57_sample.docx'),
(58, '', 0, 0, 0, '', '', 0, '58_sample.docx'),
(59, '', 0, 0, 0, '', '', 0, '59_sample.docx'),
(60, '', 0, 0, 0, '', '', 0, '60_betaSample.docx'),
(61, '', 0, 0, 0, '', '', 0, '61_sample.docx'),
(62, '', 0, 0, 0, '', '', 0, '62_sample.docx'),
(63, '', 0, 0, 0, '', '', 0, '63_Первое приближение.docx'),
(64, '', 0, 0, 0, '', '', 0, '64_betaSample.docx'),
(65, '', 0, 0, 0, '', '', 0, '65_Задание на ПП Котяшев.docx'),
(66, '', 0, 0, 0, '', '', 0, '66_sample.docx'),
(67, '', 0, 0, 0, '', '', 0, '67_sample.docx'),
(68, '', 0, 0, 0, '', '', 0, '68_betaSample.docx'),
(69, '', 0, 0, 0, '', '', 0, '69_Набросок шаблона.docx'),
(70, '', 0, 0, 0, '', '', 0, '70_sample.docx'),
(71, '', 0, 0, 0, '', '', 0, '71_Задание на ПП Котяшев.docx');

-- --------------------------------------------------------

--
-- Структура таблицы `plan`
--

CREATE TABLE `plan` (
  `idPlan` int(11) NOT NULL,
  `idSecrecyStamp` int(11) NOT NULL,
  `idTimeInterval` int(11) NOT NULL,
  `idApprover` int(11) NOT NULL,
  `idAgreeder` int(11) NOT NULL,
  `numberPlan` text NOT NULL,
  `titlePlan` text NOT NULL,
  `idDivisionPlan` int(11) NOT NULL,
  `idPattern` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `plan`
--

INSERT INTO `plan` (`idPlan`, `idSecrecyStamp`, `idTimeInterval`, `idApprover`, `idAgreeder`, `numberPlan`, `titlePlan`, `idDivisionPlan`, `idPattern`) VALUES
(1, 4, 1, 1, 2, '80088080', 'План основных мероприятий', 2, 0),
(2, 4, 1, 2, 1, '1355', 'План основных мероприятий ', 3, 0),
(3, 3, 1, 1, 2, '84569456', 'План основных мероприятий', 3, 0),
(4, 1, 2, 1, 2, '10111', 'План основных мероприятий', 2, 0),
(5, 5, 2, 2, 1, '10223', 'План основных мероприятий', 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `secrecystamp`
--

CREATE TABLE `secrecystamp` (
  `idSecrecyStamp` int(11) NOT NULL,
  `titleSecrecyStamp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `secrecystamp`
--

INSERT INTO `secrecystamp` (`idSecrecyStamp`, `titleSecrecyStamp`) VALUES
(1, 'несекретно'),
(2, 'для служебного пользования'),
(3, 'секретно'),
(4, 'Совершенно секретно'),
(5, 'Особой важности');

-- --------------------------------------------------------

--
-- Структура таблицы `serviceman`
--

CREATE TABLE `serviceman` (
  `idServiceman` int(11) NOT NULL,
  `idRankServiceman` int(11) NOT NULL,
  `idPositionServiceman` int(11) NOT NULL,
  `idDivisionServiceman` int(11) NOT NULL,
  `firstNameServiceman` text NOT NULL,
  `secondNameServiceman` text NOT NULL,
  `middleNameServiceman` text NOT NULL,
  `document` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `serviceman`
--

INSERT INTO `serviceman` (`idServiceman`, `idRankServiceman`, `idPositionServiceman`, `idDivisionServiceman`, `firstNameServiceman`, `secondNameServiceman`, `middleNameServiceman`, `document`) VALUES
(1, 13, 2, 2, 'Василий', 'Назаров', 'Федорович', '123'),
(2, 16, 1, 1, 'Арсений', 'Белкин', 'Игоревич', '124'),
(14, 12, 4, 3, 'Никита', 'Булгаков', 'Эдуардович', 'АА12345678'),
(15, 14, 6, 2, 'Иван', 'Петров', 'Андреевич', 'АБ12345677');

-- --------------------------------------------------------

--
-- Структура таблицы `timeinterval`
--

CREATE TABLE `timeinterval` (
  `idTimeInterval` int(11) NOT NULL,
  `titleTimeInterval` text NOT NULL,
  `beginTimeInterval` date NOT NULL,
  `endTimeInterval` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `timeinterval`
--

INSERT INTO `timeinterval` (`idTimeInterval`, `titleTimeInterval`, `beginTimeInterval`, `endTimeInterval`) VALUES
(1, 'май 2022 года', '2022-05-01', '2022-05-31'),
(2, 'июнь 2022 года', '2022-06-01', '2022-06-30'),
(3, 'июль 2022', '2022-07-01', '2022-07-31'),
(4, '2022 год', '2022-01-01', '2022-12-31');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `agreeder`
--
ALTER TABLE `agreeder`
  ADD PRIMARY KEY (`idAgreeder`);

--
-- Индексы таблицы `approver`
--
ALTER TABLE `approver`
  ADD PRIMARY KEY (`idApprover`),
  ADD KEY `idServicemanApprover` (`idServicemanApprover`,`idRankApprover`,`idPositionApprover`,`idDivisionApprover`);

--
-- Индексы таблицы `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`login`);

--
-- Индексы таблицы `coexecutor`
--
ALTER TABLE `coexecutor`
  ADD PRIMARY KEY (`idCoExecutor`);

--
-- Индексы таблицы `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`idDivision`);

--
-- Индексы таблицы `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`idEvent`);

--
-- Индексы таблицы `executor`
--
ALTER TABLE `executor`
  ADD PRIMARY KEY (`idExecutor`);

--
-- Индексы таблицы `groupevent`
--
ALTER TABLE `groupevent`
  ADD PRIMARY KEY (`idGroupEvent`);

--
-- Индексы таблицы `militaryposition`
--
ALTER TABLE `militaryposition`
  ADD PRIMARY KEY (`idPosition`);

--
-- Индексы таблицы `militaryrank`
--
ALTER TABLE `militaryrank`
  ADD PRIMARY KEY (`idRank`);

--
-- Индексы таблицы `pattern`
--
ALTER TABLE `pattern`
  ADD PRIMARY KEY (`idPattern`);

--
-- Индексы таблицы `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`idPlan`);

--
-- Индексы таблицы `secrecystamp`
--
ALTER TABLE `secrecystamp`
  ADD PRIMARY KEY (`idSecrecyStamp`);

--
-- Индексы таблицы `serviceman`
--
ALTER TABLE `serviceman`
  ADD PRIMARY KEY (`idServiceman`),
  ADD KEY `idRankServiceman` (`idRankServiceman`,`idPositionServiceman`,`idDivisionServiceman`),
  ADD KEY `idPositionServiceman` (`idPositionServiceman`),
  ADD KEY `idDivisionServiceman` (`idDivisionServiceman`);

--
-- Индексы таблицы `timeinterval`
--
ALTER TABLE `timeinterval`
  ADD PRIMARY KEY (`idTimeInterval`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `agreeder`
--
ALTER TABLE `agreeder`
  MODIFY `idAgreeder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `approver`
--
ALTER TABLE `approver`
  MODIFY `idApprover` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `coexecutor`
--
ALTER TABLE `coexecutor`
  MODIFY `idCoExecutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `division`
--
ALTER TABLE `division`
  MODIFY `idDivision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `event`
--
ALTER TABLE `event`
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `executor`
--
ALTER TABLE `executor`
  MODIFY `idExecutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `groupevent`
--
ALTER TABLE `groupevent`
  MODIFY `idGroupEvent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `militaryposition`
--
ALTER TABLE `militaryposition`
  MODIFY `idPosition` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `militaryrank`
--
ALTER TABLE `militaryrank`
  MODIFY `idRank` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `pattern`
--
ALTER TABLE `pattern`
  MODIFY `idPattern` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT для таблицы `plan`
--
ALTER TABLE `plan`
  MODIFY `idPlan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `secrecystamp`
--
ALTER TABLE `secrecystamp`
  MODIFY `idSecrecyStamp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `serviceman`
--
ALTER TABLE `serviceman`
  MODIFY `idServiceman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `timeinterval`
--
ALTER TABLE `timeinterval`
  MODIFY `idTimeInterval` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
