create table product (
	id_product integer primary key,
	description text,
	price numeric,
	largura integer,
	altura integer,
	profundidade integer,
	peso integer
);

insert into product (
	id_product, description, price, largura, altura, profundidade, peso
) values (1, 'Camera', 1000, 20, 15, 10, 1);
insert into product (
	id_product, description, price, largura, altura, profundidade, peso
) values (2, 'Geladeira', 5000, 200, 100, 50, 40);
insert into product (
	id_product, description, price, largura, altura, profundidade, peso
) values (3, 'Guitarra', 30, 100, 30, 10, 3);
insert into product (
	id_product, description, price, largura, altura, profundidade, peso
) values (5, 'D', 30, -100, 30, 10, 3);
insert into product (
	id_product, description, price, largura, altura, profundidade, peso
) values (6, 'E', 30, 100, 30, 10, -3);

create table coupon (
	code text primary key,
	percentage numeric,
	expiresIn date
);

insert into coupon (code, percentage, expiresIn) values ('VALE20', 20, '2024-01-01');
insert into coupon (code, percentage, expiresIn) values ('VALE10', 10, '2022-01-01');
