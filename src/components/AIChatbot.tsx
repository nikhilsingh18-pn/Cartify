import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      message: 'Hello! I\'m your AI shopping assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes('track') || lowerCaseMessage.includes('order')) {
      return 'You can track your order by visiting the "Track Order" page from the customer service menu in the footer. Do you need the order number?';
    }
    if (lowerCaseMessage.includes('delivery') || lowerCaseMessage.includes('fast')) {
      return 'We have a special 10-minute delivery section for groceries and essentials! You can find it on the homepage or filter for it on the products page.';
    }
    if (lowerCaseMessage.includes('trending') || lowerCaseMessage.includes('popular')) {
      return 'Our trending products section is updated daily! You can find the most popular items right on the homepage.';
    }
    if (lowerCaseMessage.includes('support') || lowerCaseMessage.includes('help')) {
      return 'You can reach our support team at support@cartify.shop or call us at +91 80 1234 5678. How can I assist you right now?';
    }
    if (lowerCaseMessage.includes('return') || lowerCaseMessage.includes('refund')) {
      return 'We have a 30-day return policy on most items. You can initiate a return from your "Order History" page.';
    }
    // Default responses
    const defaultResponses = [
      'I see. Can you tell me more?',
      'That\'s interesting! How else can I help?',
      'I can help you find products, check on orders, and more.',
      'For your security, I\'m monitoring for unusual activity. Your account is safe with Cartify.',
      'Don\'t forget to review your purchases to earn 50 reward points!'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  const quickReplies = ["Track my order", "10-min delivery", "Trending products", "Contact support"];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: getAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-8 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border"
          >
            <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-primary-700 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><Sparkles size={16}/></div>}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-100 text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-2 border-t">
               <div className="flex gap-2 p-2 overflow-x-auto">
                {quickReplies.map(reply => (
                    <button key={reply} onClick={() => handleSendMessage(reply)} className="text-xs bg-gray-100 text-primary font-semibold px-3 py-1 rounded-full whitespace-nowrap hover:bg-primary-50">
                        {reply}
                    </button>
                ))}
               </div>
              <div className="flex gap-2 p-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => handleSendMessage(inputMessage)}
                  className="bg-primary text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
};

export default AIChatbot;
