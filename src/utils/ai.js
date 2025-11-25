// src/utils/ai.js - UPDATED WITH CURRENT MODELS
export const getAIResponse = async (message, conversationHistory = []) => {
  try {
    console.log('🔄 Starting AI call with message:', message);
    
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    // Build messages array
    const messages = [
      {
        role: 'system',
        content: 'You are a friendly fitness assistant. Provide short, helpful answers about workouts, nutrition, and exercise. Keep responses conversational and under 150 words.'
      },
      { role: 'user', content: message }
    ];

    console.log('📤 Sending request to Groq API...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        model: 'llama-3.1-8b-instant', 
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1,
        stream: false
      })
    });

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Groq API Error:', errorData);
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ API Success! Response:', data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid response format from API');
    }
    
  } catch (error) {
    console.error('💥 Full error:', error);
    
    if (error.message.includes('model')) {
      return "🔄 Updating AI model... Please try again in a moment!";
    } else {
      return `I'm your fitness assistant! How can I help with your fitness goals today? 💪`;
    }
  }
}