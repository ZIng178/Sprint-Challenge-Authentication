const request= require("supertest")

const server=require("./server.js")


 describe("GET", ()=>{
     it ("should return 200 ok", ()=>{
         return request(server)
         .get("/")
         .then(res=>{
             expect(res.status).toBe(200)
             expect(res.body.message).toBe("server is up and running")
             
         })
     })
     it("should return JSON formatted response", ()=> {
        return request(server)
          .get("/")
          .then(res => {
            expect(res.type).toMatch(/json/i);
          });
      });
 })



