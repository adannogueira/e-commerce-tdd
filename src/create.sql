create table product (
	id_product integer primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer,
	currency text
);

insert into product (
	id_product, description, price, width, height, length, weight, currency
) values (1, 'Camera', 1000, 20, 15, 10, 1, 'BRL');
insert into product (
	id_product, description, price, width, height, length, weight, currency
) values (2, 'Geladeira', 5000, 200, 100, 50, 40, 'BRL');
insert into product (
	id_product, description, price, width, height, length, weight, currency
) values (3, 'Guitarra', 30, 100, 30, 10, 3, 'BRL');
insert into product (
	id_product, description, price, width, height, length, weight, currency
) values (5, 'D', 30, -100, 30, 10, 3, 'BRL');
insert into product (
	id_product, description, price, width, height, length, weight, currency
) values (6, 'E', 30, 100, 30, 10, -3, 'BRL');
insert into product (
	id_product, description, price, width, height, length, weight, currency
) values (7, 'Guitar', 30, 100, 30, 10, 3, 'USD');

create table coupon (
	code text primary key,
	percentage numeric,
	expiresIn date
);

insert into coupon (code, percentage, expiresIn) values ('VALE20', 20, '2024-01-01');
insert into coupon (code, percentage, expiresIn) values ('VALE10', 10, '2022-01-01');

create table 'order' (
	id_order integer primary key,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	email text,
	issue_date timestamp,
	freight numeric,
	total numeric,
	sequence integer,
	products text
);

create table item (
	id_order integer references 'order' (id_order),
	id_product integer references product (id_product),
	price numeric,
	quantity integer,
	primary key (id_order, id_product)
)