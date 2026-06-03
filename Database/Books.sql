create database bookstore;
use bookstore;

create table books(
id int auto_increment primary key,
title varchar(225),
author varchar(255),
price decimal(10,2),
category varchar(100),
image varchar(500)
);

insert into books(title, author, price, category,image)
values
("Node.js Guide", "John Smith", 29.99, "Programming", "https://picsum.photos/200/300"),
("Javascript Mastery", "David Brown", 34.99, "Programming", "https://picsum.photos/200/301"),
("CSS Design", "Sarah Wilson", 19.99, "Web Design", "https://picsum.photos/200/302");