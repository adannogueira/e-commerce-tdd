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
	percentage numeric
);

insert into coupon (code, percentage) values ('VALE20', 20);
