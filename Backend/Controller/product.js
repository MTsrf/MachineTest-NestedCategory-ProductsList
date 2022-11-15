const Product = require('../model/Products')
const slugify = require('slugify')
const Category = require('../model/category')
exports.addProducts = async (req, res) => {
    console.log(req.body);
    const { name, description, price, category } = req.body
    const productdata = new Product({
        name,
        slug: `${slugify(name)}`,
        description,
        price,
        category
    })
    try {
        const saveProduct = await productdata.save()
        console.log(saveProduct);
        if (saveProduct) {
            res.status(200).json(saveProduct)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getCount = async (req, res) => {
    try {
        const count = await Product.aggregate([{
            $group: {

                "_id": {
                    "category": "$category"
                },
                "counts": { "$sum": 1 }

            }
        }])
        let countCategory = []
        const products = await Product.find()
        const category = await Category.find()
        for (const x in products) {
            for (const y in category) {
                if (products[x].category.equals(category[y]._id)) {
                    console.log("hai", products[x].category);
                }
            }
        }
        console.log("sub", sub);
        console.log(category);
        console.log(products);
        res.send(count)
    } catch (error) {

    }
}