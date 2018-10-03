
db.patients.insertMany([{
	firstName:"Rohan",
	 lastName:"Ganguly",
	 age:29,
	 history:[{disease:"cold",treatment:1}]},
	 {firstName: "Manu", lastName:"Lorenz",
	 age:30, history:[{disease:"fever", treatment:55}]}])
db.patients.find().pretty()//find the patients record in the collection

db.patients.updateOne({_id: ObjectId("5bb35c42351bee42e9796751")},{$set:{lastName:"Blakes", history:[{disease:"sneezing",treatment:80}]}})
db.patients.find({age:{$gte:30}}).pretty()

db.patients.deleteMany({"history.disease":"cold"})
//data schemas and modeling

db.companies.insertOne({name:"fresh apples inc", isStartup:true, employees:33, funding: 12345689, details:{CEO: 'Mark Super'}, tags:[{title:'super'}], createdAt: new Date(), inserted: new Timestamp()})
//modeling depends on the requirements of the business that will use the
//1-1
db.patients.insertOne({name:"Max",age:29,diseaseSummary:"summary-max-1"})
db.diseaseSummary.insertOne({_id:"summary-max-1", diseases:["cold","broken leg"]})

//find the disease details
//to create aggregate based on ref keys
db.books.aggregate([{$lookup:{from: "authors", localField:"authors", foreignField:"_id", as: "creators"}}]).pretty()
