//find people greater than 60
db.persons.find({ "dob.age": { $gt: 60 } })
//explain path
db.persons.explain("executionStats").find({ "dob.age": { $gt: 60 } })//all
//create index
db.persons.createIndex({"dob.age":1})
//drop index
db.persons.dropIndex({ "dob.age": 1 })
//compound index
db.persons.createIndex({"dob.age":1, gender:1})
//sorting-indexes
db.persons.explain().find({"dob.age":35}).sort({gender:1})
//check for existing index
db.persons.getIndexes()
//configure index
db.persons.createIndex({email:1},{unique:true})
//partial filter
db.persons.createIndex({"dob.age":1},{partialFilterExpression:{gender:"male"}})
//ttl
db.sessions.createIndex({createdAt:1},{expireAfterSeconds:10})
//multi key index on array of values

