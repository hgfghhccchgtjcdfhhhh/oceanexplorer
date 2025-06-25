import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bot, Send, X, Waves } from "lucide-react";
import { apiRequest } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatResponse {
  answer: string;
  enhancedInsights?: string;
  sources: string[];
  confidence: number;
  relatedTopics: string[];
}

export default function OceanRobot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm OceanRobot, your AI assistant. While I specialize in marine biology and oceanography, I can help with any topic or question you have. Ask me about ocean life, general knowledge, creative tasks, or anything else!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/chat', { message, type: 'general' });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      return response;
    },
    onSuccess: async (response) => {
      const data: ChatResponse = await response.json();
      
      // Add AI response
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + '_ai',
        content: data.answer,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Add enhanced insights if available
      if (data.enhancedInsights) {
        const enhancedMessage: ChatMessage = {
          id: Date.now().toString() + '_enhanced',
          content: `**Additional Insights:** ${data.enhancedInsights}`,
          isUser: false,
          timestamp: new Date()
        };
        setTimeout(() => {
          setMessages(prev => [...prev, enhancedMessage]);
        }, 1000);
      }

      // Add related topics if available
      if (data.relatedTopics && data.relatedTopics.length > 0) {
        const topicsMessage: ChatMessage = {
          id: Date.now().toString() + '_topics',
          content: `**Related Topics:** ${data.relatedTopics.join(', ')}`,
          isUser: false,
          timestamp: new Date()
        };
        setTimeout(() => {
          setMessages(prev => [...prev, topicsMessage]);
        }, 1500);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      const errorContent = error instanceof Error 
        ? error.message.includes('API keys') 
          ? "I need API keys to be configured. Please check that OpenAI or Gemini API keys are set up properly."
          : `I'm having trouble right now: ${error.message}. Please try again.`
        : "I'm having trouble processing your request. Please try again with a different question.";
      
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '_error',
        content: errorContent,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue("");
  };

  const handleQuickQuestion = (topic: string) => {
    const questions: Record<string, string> = {
      'shark-behavior': 'Tell me about shark hunting and feeding behaviors',
      'coral-reefs': 'How do coral reefs support marine ecosystems?',
      'deep-sea': 'What adaptations help deep-sea creatures survive?',
      'youtube-ads': 'Help me create a perfect YouTube ad script',
      'creative-writing': 'Help me with creative writing and storytelling',
      'general-knowledge': 'Tell me something interesting I might not know'
    };
    
    const question = questions[topic] || 'Tell me more about this topic';
    setInputValue(question);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating AI Assistant Button */}
      <div className="relative">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white z-20 relative"
          >
            <Bot className="w-6 h-6" />
          </button>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75 z-10"></div>
          
          {/* Red notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse z-30">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Chat bubble notification */}
          {!isOpen && (
            <div className="absolute -top-12 -left-16 bg-white rounded-lg p-2 shadow-lg border animate-bounce z-30">
              <div className="text-xs text-gray-800 font-medium whitespace-nowrap">Ask me anything!</div>
              <div className="absolute bottom-0 left-6 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white transform translate-y-full"></div>
            </div>
          )}
        </div>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask OceanRobot about marine life
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-ocean-teal to-ocean-deep text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-5 h-5" />
              <div>
                <h4 className="font-semibold">OceanRobot</h4>
                <p className="text-xs opacity-90">Marine Biology AI Expert</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                {!message.isUser && (
                  <div className="w-8 h-8 bg-ocean-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`rounded-lg p-3 max-w-xs ${
                  message.isUser 
                    ? 'bg-ocean-teal text-white ml-auto' 
                    : 'bg-gray-100'
                }`}>
                  {message.isUser ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  ) : (
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                          h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                          p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                          li: ({children}) => <li className="text-sm">{children}</li>,
                          code: ({children}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">{children}</code>,
                          pre: ({children}) => <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">{children}</pre>,
                          strong: ({children}) => <strong className="font-bold">{children}</strong>,
                          em: ({children}) => <em className="italic">{children}</em>,
                          blockquote: ({children}) => <blockquote className="border-l-2 border-gray-300 pl-2 italic">{children}</blockquote>,
                          a: ({children, href}) => <a href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {message.isUser && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <Waves className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {chatMutation.isPending && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-ocean-teal rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-ocean-teal rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-ocean-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-ocean-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything - marine life, general topics, or creative tasks..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent text-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={chatMutation.isPending}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || chatMutation.isPending}
                className="bg-ocean-teal hover:bg-ocean-deep text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => handleQuickQuestion('youtube-ads')}
                className="text-xs bg-coral hover:bg-red-500 text-white px-2 py-1 rounded transition"
                disabled={chatMutation.isPending}
              >
                YouTube Ads
              </button>
              <button
                onClick={() => handleQuickQuestion('creative-writing')}
                className="text-xs bg-ocean-teal hover:bg-ocean-deep text-white px-2 py-1 rounded transition"
                disabled={chatMutation.isPending}
              >
                Creative Writing
              </button>
              <button
                onClick={() => handleQuickQuestion('shark-behavior')}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition"
                disabled={chatMutation.isPending}
              >
                Marine Life
              </button>
              <button
                onClick={() => handleQuickQuestion('general-knowledge')}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition"
                disabled={chatMutation.isPending}
              >
                General Topics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
