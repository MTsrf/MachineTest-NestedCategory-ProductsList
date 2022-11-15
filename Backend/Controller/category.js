const slugify = require('slugify')
const category = require('../model/category')

exports.addCategory = async (req, res) => {
    console.log(req.body);
    const { name, parentId } = req.body
    const createObj = {
        name: name,
        slug: `${slugify(name)}`,
    }

    if (parentId) {
        createObj.parentId = parentId
    }
    console.log("sdfsd", createObj);
    const addcategory = new category(createObj);
    console.log(addcategory);
    try {
        const category = await addcategory.save()
        console.log(category);
        if (category) {
            res.status(200).json({ success: true })
        }
    } catch (error) {

        res.status(500).json({ error })
    }
}

function nestedCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => String(cat.parentId) == String(parentId));
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: nestedCategories(categories, cate._id)
        })
    }
    return categoryList;
}

exports.getCategory = async (req, res) => {
    try {
        const categories = await category.find({})
        if (!categories) return [];
        const categoryList = nestedCategories(categories)
        console.log(categoryList);
        res.status(200).json(categoryList)
    } catch (error) {
        res.status(500).json({ error })
    }
}