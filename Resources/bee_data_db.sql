DROP TABLE IF EXISTS bee_data;

CREATE TABLE bee_data(
	index INT,
	year INT,
	state VARCHAR(20),
	price_received_$_per_lb FLOAT,
	production_lb INT,
	production_lb_per_colony INT,
	bee_colonies INT
	
);

SELECT * FROM bee_data;