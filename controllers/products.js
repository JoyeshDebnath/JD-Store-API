const { query } = require("express");
const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	try {
		// const products = await Products.find({}).sort("-name price");
		const fields = "price name";

		const products = await Products.find({}).select(fields).limit(4);
		res.status(200).send({ products, nbHits: products.length });
	} catch (err) {
		res.status(500).json({ errMSG: "Something Went Wrong!!" });
	}
};

const getAllProducts = async (req, res) => {
	try {
		const { featured, company, name, sort, fields } = req.query;
		const queryObject = {};
		if (featured) {
			queryObject.featured = featured === true ? true : false;
		}
		if (company) {
			queryObject.company = company;
		}
		if (name) {
			queryObject.name = { $regex: name, $options: "i" };
		}
		let results = Products.find(queryObject);
		if (sort) {
			let sortList = sort.split(",").join(" ");
			results = results.sort(sortList);
		} else {
			results = results.sort("createdAt"); //if sort is not provided then sort the items based on the createdAt
		}

		if (fields) {
			let selectList = fields.split(",").join(" ");
			results = results.select(selectList);
		}
		const products = await results;

		res.status(200).json({ products, nbHit: products.length });
	} catch (err) {
		res.status(500).json({ errMSG: "Something went Wrong!!!" });
	}
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
