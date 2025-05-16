import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ResumeField {
  label: string;
  value: string;
  completed: boolean;
}

const ResumeBuilder: React.FC = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [currentField, setCurrentField] = useState(0);
  const [messages, setMessages] = useState<{ type: 'bot' | 'user'; content: string }[]>([
    { type: 'bot', content: "Hi! Let's build your resume together. What's your full name?" }
  ]);

  const resumeFields: ResumeField[] = [
    { label: "Full Name", value: "", completed: false },
    { label: "University Name", value: "", completed: false },
    { label: "Major", value: "", completed: false },
    { label: "GPA", value: "", completed: false },
    { label: "Experience", value: "", completed: false },
    { label: "Projects", value: "", completed: false },
    { label: "Leadership", value: "", completed: false },
    { label: "Skills", value: "", completed: false }
  ];

  const [fields, setFields] = useState<ResumeField[]>(resumeFields);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: 'user' as const, content: currentInput }];

    // Update the current field
    const updatedFields = [...fields];
    updatedFields[currentField].value = currentInput;
    updatedFields[currentField].completed = true;

    // Determine next bot message
    let botMessage = "";
    if (currentField < fields.length - 1) {
      botMessage = `Great! Now, please tell me about your ${fields[currentField + 1].label}:`;
      setCurrentField(currentField + 1);
    } else {
      botMessage = "Thank you! I have all the information needed to build your resume.";
    }

    // Add bot response
    newMessages.push({ type: 'bot' as const, content: botMessage });

    setMessages(newMessages);
    setFields(updatedFields);
    setCurrentInput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      <div className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'bot'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Type your response..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Progress Display */}
      <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold mb-2">Resume Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                field.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {field.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 