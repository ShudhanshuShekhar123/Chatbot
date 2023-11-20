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




server.use(cors("*"))
server.use(express.json())






server.get("/chat", async (req, res) => {

  let conversationhistory =   await chatbot(req, res)
  res.json(conversationhistory)

  // res.json("Thanks for visiting");

})


const chatbot = async (req, res)=>{


  
  console.log(req.body, "body here")
  const { role, content } = req.body;


    


    // const conversationsData = [
    //   { conversation: ['Message 1', 'Message 2'] },
    //   { conversation: ['Hello', 'Hi', 'How are you?'] },
    //   // Add more conversation data as needed
    // ];


  // const condition ={_id : "655b1f19469ff698b9044899"}
  // const update = {
  //   $push: {
  //     conversation: { role: req.body.role, content: req.body.content },
  //   },
  // };

  // const options = { new: true, upsert: false }; 

  // const updatedDocument = await conversqationmodel.findOneAndUpdate(condition, update, options);

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

// console.log(allconverrsation,"consvs")



 
 


  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          {
              role: "system",
              content:
                "  you are a expert in Psychology.. you  have to help the user to solve their psychological problems . .you have to  answer in brief  but meaningfull at the same time dont give large responses . keep your points short.i you have to be very strict to  understand the context and if the context of questions is not related to Psychology   then tell the user to ask questions only related to Psychology  .dont answer the questions that is not aligning or if it does not depend on  the contetxt of Psychology or if it is out of scope of psychology. "
            },
        ...store

      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  });




   const ai_Response =  response['choices'][0]['message']
  //  const updatelater = {
  //   $push: {
  //     conversation: { role: "assistnat", content: ai_Response},
  //   },
  // };
  console.log(ai_Response)

  const  updatedDocument = await conversationmodal.create(ai_Response);
  const getconvo =  await  conversationmodal.find({})
  

console.log(getconvo,"convo here")
return ai_Response




}

server.get("/start",  async(req, res) => {
 
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