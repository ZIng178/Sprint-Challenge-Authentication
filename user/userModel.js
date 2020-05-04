const db=require("../database/dbConfig")

module.exports={
    add,
    find
}

function add(user){
    return db("users")
    .insert(user)
}

function find(user){
    return db("users").where("user")
}