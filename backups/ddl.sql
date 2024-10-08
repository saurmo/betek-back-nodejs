-- DDL : LENGUAJE DE DEFINICIÓN DE DATOS
-- Es el código que permite crear las tablas en la base de datos
-- Este código se ejecuta en un script en la base de datos (dbeaver - workbench)
-- para crear las tablas

-- tienda_virtual.Categorias definition

CREATE TABLE `Categorias` (
  `id` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- tienda_virtual.Clientes definition

CREATE TABLE `Clientes` (
  `dni` varchar(50) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `clave` varchar(300) NOT NULL,
  `correo` varchar(150) NOT NULL,
  PRIMARY KEY (`dni`)
);


-- tienda_virtual.Productos definition

CREATE TABLE `Productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(600) DEFAULT 'sin descripcion',
  `precio` decimal(10,0) NOT NULL,
  `cantidad_disponible` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);


-- tienda_virtual.CategoriasProductos definition

CREATE TABLE `CategoriasProductos` (
  `producto_id` int(11) NOT NULL,
  `categoria_id` varchar(10) NOT NULL,
  PRIMARY KEY (`producto_id`,`categoria_id`),
  KEY `Categorias_FK` (`categoria_id`),
  CONSTRAINT `CategoriasProductos_FK_p` FOREIGN KEY (`producto_id`) REFERENCES `Productos` (`id`),
  CONSTRAINT `Categorias_FK` FOREIGN KEY (`categoria_id`) REFERENCES `Categorias` (`id`)
);


-- tienda_virtual.Direcciones definition

CREATE TABLE `Direcciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomenclatura` varchar(200) NOT NULL,
  `notas` varchar(300) DEFAULT NULL,
  `cliente_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Direcciones_FK` (`cliente_id`),
  CONSTRAINT `Direcciones_FK` FOREIGN KEY (`cliente_id`) REFERENCES `Clientes` (`dni`)
);


-- tienda_virtual.Pedidos definition

CREATE TABLE `Pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `descuento` smallint(6) DEFAULT 0,
  `medio_pago` varchar(100) NOT NULL,
  `cliente_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Pedidos_FK` (`cliente_id`),
  CONSTRAINT `Pedidos_FK` FOREIGN KEY (`cliente_id`) REFERENCES `Clientes` (`dni`)
);


-- tienda_virtual.Items definition

CREATE TABLE `Items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Items_FK` (`producto_id`),
  KEY `Items_FK_1` (`pedido_id`),
  CONSTRAINT `Items_FK` FOREIGN KEY (`producto_id`) REFERENCES `Productos` (`id`),
  CONSTRAINT `Items_FK_1` FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos` (`id`)
);