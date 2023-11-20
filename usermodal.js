const mongoose = require('mongoose');

// Define the schema
const conversationSchema = new mongoose.Schema({
  

    
          role: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          // Add more fields as needed
        },
      
   

    // Other fields if needed
  );
// Define the model

const ConversationModel = mongoose.model('Conversation', conversationSchema);
module.exports = ConversationModel

