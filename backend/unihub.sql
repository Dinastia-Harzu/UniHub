-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2024 a las 21:15:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `unihub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `autor` int(11) NOT NULL,
  `trabajo` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `valoracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia`
--

CREATE TABLE `multimedia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `trabajo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `palabra-clave`
--

CREATE TABLE `palabra-clave` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `palabra-clave`
--

INSERT INTO `palabra-clave` (`id`, `nombre`) VALUES
(1, 'animacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `palabra-clave-trabajo`
--

CREATE TABLE `palabra-clave-trabajo` (
  `id-trabajo` int(11) NOT NULL,
  `id-palabra-clave` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tema`
--

CREATE TABLE `tema` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `css` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tema`
--

INSERT INTO `tema` (`id`, `nombre`, `css`) VALUES
(1, 'Oscuro', 'oscuro.css');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo-trabajo`
--

CREATE TABLE `tipo-trabajo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo-trabajo`
--

INSERT INTO `tipo-trabajo` (`id`, `nombre`) VALUES
(1, 'Trabajo Fin de Grado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacion`
--

CREATE TABLE `titulacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `titulacion`
--

INSERT INTO `titulacion` (`id`, `nombre`) VALUES
(1, 'Grado en Ingeniería Multimedia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo`
--

CREATE TABLE `trabajo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` int(11) NOT NULL,
  `autor` int(11) NOT NULL,
  `titulacion` int(11) NOT NULL,
  `publicacion` date NOT NULL,
  `resumen` text NOT NULL,
  `portada` varchar(255) NOT NULL,
  `documento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `trabajo`
--

INSERT INTO `trabajo` (`id`, `nombre`, `tipo`, `autor`, `titulacion`, `publicacion`, `resumen`, `portada`, `documento`) VALUES
(1, 'Realización de un cortometraje de animación en 3D', 1, 14, 1, '2024-05-02', 'Este trabajo consiste en la realización de un cortometraje que narra el día de un niño a través de la caracterización de un avión de papel. Este día comienza en el colegio y, al terminar las clases, se va al parque a disfrutar de su entorno...', 'portada.png', 'documento.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `titulacion` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `nacimiento` date NOT NULL,
  `tema` int(11) NOT NULL DEFAULT 0,
  `foto-perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `correo`, `clave`, `titulacion`, `direccion`, `nacimiento`, `tema`, `foto-perfil`) VALUES
(14, 'Arturo', 'García Richardson', 'agrg11@alu.ua.es', 'clave', 1, 'C/ del Presidente Adolfo Suárez, 22', '2002-10-24', 1, NULL),
(22, 'Paula', 'Lario Llinares', 'paula@alu.ua.es', 'clave', 1, 'C/ del Presidente Adolfo Suárez, 22', '2002-10-24', 1, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk__comentario-autor+usuario-id` (`autor`),
  ADD KEY `fk__comentario-trabajo+trabajo-id` (`trabajo`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk__multimedia-trabajo+trabajo-id` (`trabajo`);

--
-- Indices de la tabla `palabra-clave`
--
ALTER TABLE `palabra-clave`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `palabra-clave-trabajo`
--
ALTER TABLE `palabra-clave-trabajo`
  ADD PRIMARY KEY (`id-trabajo`,`id-palabra-clave`),
  ADD KEY `fk__palabra-clave-trabajo-id-palabra-clave+palabra-clave-id` (`id-palabra-clave`);

--
-- Indices de la tabla `tema`
--
ALTER TABLE `tema`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo-trabajo`
--
ALTER TABLE `tipo-trabajo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `titulacion`
--
ALTER TABLE `titulacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk__trabajo-autor+usuario-id` (`autor`),
  ADD KEY `fk__trabajo-tipo+tipo-trabajo-id` (`tipo`),
  ADD KEY `fk__trabajo-titulacion+titulacion-id` (`titulacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`) USING BTREE,
  ADD KEY `fk__usuario-tema+tema-id` (`tema`),
  ADD KEY `fk__usuario-titulacion+titulacion-id` (`titulacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `palabra-clave`
--
ALTER TABLE `palabra-clave`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tema`
--
ALTER TABLE `tema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo-trabajo`
--
ALTER TABLE `tipo-trabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `titulacion`
--
ALTER TABLE `titulacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `trabajo`
--
ALTER TABLE `trabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `fk__comentario-autor+usuario-id` FOREIGN KEY (`autor`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk__comentario-trabajo+trabajo-id` FOREIGN KEY (`trabajo`) REFERENCES `trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD CONSTRAINT `fk__multimedia-trabajo+trabajo-id` FOREIGN KEY (`trabajo`) REFERENCES `trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `palabra-clave-trabajo`
--
ALTER TABLE `palabra-clave-trabajo`
  ADD CONSTRAINT `fk__palabra-clave-trabajo-id-palabra-clave+palabra-clave-id` FOREIGN KEY (`id-palabra-clave`) REFERENCES `palabra-clave` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk__palabra-clave-trabajo-id-trabajo+trabajo-id` FOREIGN KEY (`id-trabajo`) REFERENCES `trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD CONSTRAINT `fk__trabajo-autor+usuario-id` FOREIGN KEY (`autor`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk__trabajo-tipo+tipo-trabajo-id` FOREIGN KEY (`tipo`) REFERENCES `tipo-trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk__trabajo-titulacion+titulacion-id` FOREIGN KEY (`titulacion`) REFERENCES `titulacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk__usuario-tema+tema-id` FOREIGN KEY (`tema`) REFERENCES `tema` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk__usuario-titulacion+titulacion-id` FOREIGN KEY (`titulacion`) REFERENCES `titulacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
