const request =require("supertest");
const server=require("../api/server")
 const db=require("../database/dbConfig")

// describe("Auth", ()=>{
//     describe("Login", ()=>{
//         it("returns 200 on valid user", ()=>{
//             return request(server)
//             .post("/api/auth/login")
//             .send({username:"Wangdi", password:"simple"})
//             .expect(200)
//         })
//     })
// })

beforeEach(async () => {
    await db("users").truncate()
})

describe("Add a user", () => {
    it("should return a token", async () => {
        
        const res = await request(server)
            .post("/api/auth/register")
            .send({ username: "Wangdi", password: "simple" })
            expect(res.body.token).toBeTruthy()
            const token = res.body.token

        const jokes = await request(server)
            .get("/api/jokes")
            .set({ "Authorization": token })
            expect(jokes.status).toBe(200)
            
    })
})