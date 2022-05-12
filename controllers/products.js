const getAllProductsStatic = async (req, res) => {
	try {
		res.status(200).json({ msg: "Testing the Products Routes " });
	} catch (err) {
		res.status(500).json({ errMSG: "Something Went Wrong!!" });
	}
};

const getAllProducts = async (req, res) => {
	try {
		res.status(200).json({ msg: "This is get all products route " });
	} catch (err) {
		res.status(500).json({ errMSG: "Something went Wrong!!!" });
	}
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
