//filter based on name
db.movies.findOne({ name: "Glee" })
//comparison op
db.movies.find({ runtime: { $lte: 30 } }).pretty()

//quering embeded fields and arrays
db.movies.find({ "externals.tvrage": { $gt: 2406 } }).pretty()

db.movies.find({ genres: ["Drama"] }).pretty() //to find equality in an array embed item
//to find a runtime in the set of 30 and 42
db.movies.find({ runtime: { $in: [30, 42] } }).pretty()
//logical or to find a range
db.movies.find({ $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }] }).pretty()
//AND
db.movies.find({ $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }] }).pretty()
//alternative AND syntax
db.movies.find({ "rating.average": { $gt: 9 }, genres: "Drama" }).count()
//not 
db.movies.find({ runtime: { $not: { $eq: 60 } } }).count()

//exists and type
db.movies.find({ genres: { $exists: true } }).pretty()
db.movies.find({ genres: { $exists: true, $eq: "Horror" } }).count()

db.movies.find({ genres: { $type: "string" } }).count()
//evaluation
//regex
db.movies.findOne({ summary: { $regex: /musical/ } })//finding the word musical in a doc
//expression $expr
db.sales.find({$expr:{$gt:["$volume","$target"]}})
//WHERE
db.movies.find({ $expr: { $lt: ["$externals.tvrage", "externals.thetvdb"] } }).count()

//subtract 10 if volume gt 190

db.sales.find({$expr:{$gt:[{$cond:{if: {$gte:["$volume",190]},then:{$subtract:["$volume",10]}, else: "$volume"}},"$target"]}}).pretty()
//search and find docs that have a rating gt 9.2 and runtime lower than 100
db.movies.find({ $and: [{ "rating.average": { $gt: 3 } }, { "runtime": { $gt: 90 } }] }).count()
//query array
db.boxoffice.find({ "meta.rating": 9.3 }).pretty()
//finding by array size
db.boxoffice.find({ genre: { $size: 2 } }).count()
//find keywords in array
db.boxoffice.find({ genre: { $all: ["thriller", "action"] } }).count()
//find movies with 2 genres
db.exmoviestarts.find({ genre: { $size: 2 } }).pretty()
//find movies aired in 2018
db.exmoviestarts.find({ "meta.aired": 2018 }).pretty()
//find movies greater than 8 but lower than 10
db.exmoviestarts.find({ ratings: { $elemMatch: { $gt: 8, $lt: 10 } } }).pretty()
//sort desc
db.movies.find().sort({ "rating.average": -1 }).pretty()
//sort based on rating and runtime
db.movies.find().sort({ "rating.average": -1, runtime: -1 }).count() 
//skip
db.movies.find().sort({ "rating.average": -1, runtime: -1 }).skip(10).count()
//limit
db.movies.find().sort({ "rating.average": -1, runtime: -1 }).limit(1)
//projection
db.movies.find({}, { name: 1, genres: 1, runtime: 1, rating: 1 }).pretty()
//only project horror 
db.movies.find({ genres: "Drama" }, { genres: { $elemMatch: { $eq: "Horror" } } })
//slice-skip and include 2
db.movies.find({ genres: "Drama" }, { genres: { $slice: [1,2] }, name: 1 }).pretty()