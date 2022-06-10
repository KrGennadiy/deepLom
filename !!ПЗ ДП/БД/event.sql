-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 10 2022 г., 22:00
-- Версия сервера: 10.4.22-MariaDB
-- Версия PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(3, NULL, 1, 2, 'Выполнить работы по реконструкции резервного узла №4', '2022-10-27', NULL, 4),
(4, 3, 1, 2, 'Формирование отчета по объему трафика за предыдущий месяц.', NULL, NULL, 2),
(5, NULL, NULL, NULL, 'testEvent', NULL, 'comment', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`idEvent`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `event`
--
ALTER TABLE `event`
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
