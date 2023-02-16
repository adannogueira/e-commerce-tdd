create table product (
	id_product integer primary key,
	description text,
	price numeric
);

insert into product (id_product, description, price) values (1, 'A', 1000);
insert into product (id_product, description, price) values (2, 'B', 5000);
insert into product (id_product, description, price) values (3, 'C', 30);

create table coupon (
	code text primary key,
	percentage numeric,
	expiresIn date
);

insert into coupon (code, percentage, expiresIn) values ('VALE20', 20, '2024-01-01');
insert into coupon (code, percentage, expiresIn) values ('VALE10', 10, '2022-01-01');
