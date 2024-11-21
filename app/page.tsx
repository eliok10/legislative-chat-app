'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [messages, setMessages] = useState([
    { 
      role: 'system', 
      content: 'Bem-vindo ao chat sobre legislação. Faça sua pergunta sobre o Diário da República.' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');

    try {
      const response = await fetch('/api/legislative-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputMessage })
      });

      const aiResponse = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse.response 
      }]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta.' 
      }]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-2xl w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Chat sobre Legislação - Diário da República</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-2 p-2 rounded ${
                    msg.role === 'user' 
                      ? 'bg-blue-100 text-right' 
                      : 'bg-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Faça sua pergunta sobre legislação"
                className="flex-grow"
              />
              <Button onClick={handleSendMessage}>Enviar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
