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
("Node.js Guide", "John Smith", 29.99, "Programming", "/Images/node.js.jpg"),
("Javascript Mastery", "David Brown", 34.99, "Programming", "/Images/javascript-mastery.jpg"),
("CSS Design", "Sarah Wilson", 19.99, "Web Design", "/Images/css-design.jpg");