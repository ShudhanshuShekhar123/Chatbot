const express = require("express")
// const OpenAI = require("openai")
const session = require("express-session");

const cors = require('cors');
// require('dotenv').config();


const server = express()


// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

server.use(express.json())
server.use(cors())
// server.use(cors({ origin: '*' }));
server.use(session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
  




server.get("/",async (req, res) => {


    // console.log(req.body, "body here")

    // req.session.exampleData = 'This is session data.';

//     let prompt = req.body


//     console.log(req.session, "session property first")
  
  
//     let conversation = req.session.conversationContext || [];
//     console.log(conversation,"convertaio  arrya")
//     conversation.push(prompt)
//     console.log(conversation, "conversation")

//     const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 role: "user",
//                 content:
//                   "  you are a expert in Psychology.. you  have to help the user to solve their psychological problems . .you have to  answer in brief  but meaningfull at the same time dont give large responses . keep your points short.i you have to be very strict to  understand the context and if the context of questions is not related to Psychology   then tell the user to ask questions only related to Psychology  .dont answer the questions that is not aligning or if it does not depend on  the contetxt of Psychology or if it is out of scope of psychology. "
//               },
//               ...conversation


//         ],
//         temperature: 0.5,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     });




//    const ai_Response =  response['choices'][0]['message']
//    conversation.push(ai_Response)
//    req.session.conversationContext = conversation;

//    console.log(req.session, "session property second")
//  console.log(session.conversationContext, "here copnversations congtext")

//    res.json(req.session)
req.session.userName = 'Aditya@123';
 
res.json("Thanks for visiting");

})


server.get("/home", (req,res)=>{
    var userName = req.session.userName;
    res.json("Welcome " + userName);
})





// server.post("/destroy", (req,res)=>{
//     req.session.destroy(function(err) {
//         res.send("sessions desroyed")
//         // cannot access session here
//       })
// }) 







server.listen(8000, () => {
    console.log("Listening at PORT 8000")
})