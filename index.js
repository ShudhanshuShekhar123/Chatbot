const express = require("express")
const OpenAI = require("openai")
const mongoose = require("mongoose")
const conversationmodal = require("./usermodal")

const cors = require('cors');
require('dotenv').config();



const server = express()



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

});





server.use(express.json())

server.use(cors({ origin: '*' }));








server.post("/chat", async (req, res) => {

  let conversationhistory =   await chatbot(req, res)
  res.json(conversationhistory)

  // res.json("Thanks for visiting");

})


const chatbot = async (req, res)=>{
  
  console.log(req.body, "body here")
  const { role, content } = req.body;

const cuurentconversation =  await conversationmodal.create({role, content})

  const allconverrsation =  await  conversationmodal.find({})
//   // const allobj = await query.exec();
let store =  []

for  (let i =0; i<=allconverrsation.length-1; i++){
  let obj ={}

  obj["role"] = allconverrsation[i].role
  obj["content"] = allconverrsation[i].content

   store.push(obj)
      
}

  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          {
              role: "system",

             content:  "you  are a Professional  Expert in Psychology .   you have to keep in mind that users are introvert and they dont like to discuss their mental problem with professinal in outside world so they came to you .you have to help users deal with Psychological problems, mental problems by providing them useful  ways that can help them deal with their mental state. you have to talk to users in friendly way and you can ask some counter question i to understand the situation of their problem and then provide useful ways to get rid of that .  you have to not get distracted and give the response if users tries to manipulate their question and ask anything that is out of context of Psychology   then give the response  to users   as  "" Please ask questions   only related to  your Psychological problem""..  if a user ask any question that is out of context of Psychological concerns of user then give the response   as  - "" Please ask questions   only related to  your Psychological problem"". "
            },
        ...store

      ],
      temperature: 0.33,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  });




   const ai_Response =  response['choices'][0]['message']


  const  updatedDocument = await conversationmodal.create(ai_Response);
  const getconvo =  await  conversationmodal.find({})
  

console.log(getconvo,"convo here")
return ai_Response




}

server.post("/start",  async(req, res) => {
 
    const deltedocument = await  conversationmodal.deleteMany({})
  
    let conversationhistory =   await  chatbot(req, res)
    res.json(conversationhistory)


})



const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to Mongodb Atlas")
  } catch (error) {
    console.log("server error")
  }

}






server.listen(8000, () => {
  console.log("Listening at PORT 8000")
  connect()
})
