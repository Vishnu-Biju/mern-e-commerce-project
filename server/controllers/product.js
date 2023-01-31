const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let product = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(product);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

//without pagination

// exports.list = async (req, res) => {
//   try {
//     //created At/updated At = sort, desc,asc = sort, limit = 3
//     const {sort, order, limit} = req.body
//     const products = await Product.find({})
//     .populate('category')
//     .populate('subs')
//     .sort([[sort, order]])
//     .limit(limit)
//     .exec();
//     res.json(products);
//   } catch (err) {
//     console.log("PRODUCT LIST ERROR ----> ", err);
//   }
// }

//with pagination

exports.list = async (req, res) => {
  try {
    //created At/updated At = sort, desc,asc = sort, limit = 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4;
    const products = await Product.find({})
      //to skip the previous page whwn whe click on the next page
      //here if we click on 3 rd page the we have to skip the 12 products and show from 13 th product on thate page
      //ie,(3-1)*4 = 12
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    console.log("PRODUCT LIST ERROR ----> ", err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

//star rating
exports.productStar = async (req, res) => {
  
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } =  await req.body;
  
  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};


exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(4)
    .populate("category")
    .populate("subs")
    .exec();

  res.json(related);
};








