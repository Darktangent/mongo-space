//user, post, comments- data entities
//every entity should have _id
//user might have _id,name,age,email
//post- _id,title,text,tags
//comments- _id, text
//user can creatre edit del post
//user can also comments posts can have multiple commentsposts

//posts - comments have one to many therefore comments can be embeded in posts as arrays
db.users.insertMany([{name: "Max",age:29,email:"max@example.com"},{name:"manu",age:30,email:"manu@test.com "}])
//posts collection
db.posts.insertOne({title:"My first post", text:"This is my first post", tags:["programming","blog"],creator:ObjectId("5bb38b26b3f82f92aaf47116"), comments:[{text:"I like this post",author:ObjectId("5bb38b26b3f82f92aaf47117")}]})

//posts schema is following

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ['title','text', 'creator', 'comments'],
      properties:{
        title:{
          bsonType: "string",
          description:"must be a string and required"
        },
        text:{
          bsonType:"string",
          description:"must be a string and required"
        },
        creator:{
          bsonType:"objectId",
          description:"must be a string and required"
        },
        comments:{
          bsonType:"array",
          description:"must be an array and required",
          items:{
            bsonType:"object",
            required:["text","author"],
            properties:{
              text: {
                bsonType:"string",
                description:"must be a string and required"
              },
              author:{
                bsonType:"objectId",
                description:"must be an objectId and required"
              }

            }
          }
        }
      }

    }



  }
})
