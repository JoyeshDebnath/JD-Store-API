const { query } = require("express");
const Products = require("../models/product");
// for testing purpose
const getAllProductsStatic = async (req, res) => {
	try {
		// const products = await Products.find({}).sort("-name price");
		const fields = "price name";

		// const products = await Products.find({}).select(fields).limit(4);
		const products = await Products.find({ price: { $gt: 30 } })
			.sort("-price ")
			.select("name price");

		res.status(200).send({ products, nbHits: products.length });
	} catch (err) {
		res.status(500).json({ errMSG: "Something Went Wrong!!" });
	}
};

// actual pusrpose
const getAllProducts = async (req, res) => {
	try {
		const { featured, company, name, sort, fields, numericFilters } = req.query;
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

		// numeric filters
		if (numericFilters) {
			console.log(numericFilters);
			const operatorMap = {
				"<": "$lt",
				">": "$gt",
				">=": "$gte",
				"<=": "$lte",
			};
			const regEx = /\b(<|>|<=|>=|=)\b/g;
			let filters = numericFilters.replace(
				regEx,
				(match) => `-${operatorMap[match]}-`
			);
			console.log(filters);

			const options = ["price", "rating"];
			filters = filters.split(",").forEach((item) => {
				const [field, operator, value] = item.split("-");
				if (options.includes(field)) {
					queryObject[field] = { [operator]: Number(value) };
				}
			}); //creates an array of filtered splitted items

			console.log(filters);
			// filters.forEach((item) => {
			// 	const [field, operator, value] = item.split("-");
			// 	if (options.includes(field)) {
			// 		queryObject[field] = { [operator]: Number(value) };
			// 	}
			// });
			console.log(queryObject);
		}
		// numeric flters
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
		// pagination ..
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		results = results.skip(page - 1).limit(limit);

		// pagination

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
