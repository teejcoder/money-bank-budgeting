import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    // Toggle the same question or open a new one
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    { question: "What is your return policy?", answer: "Our return policy lasts 30 days..." },
    { question: "How do I track my order?", answer: "You can track your order by logging in..." },
    { question: "Do you ship internationally?", answer: "Yes, we ship to over 200 countries..." },
    // Add more questions as needed
  ];

  return (
    <div className="faq">
      {questions.map((item, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => handleQuestionClick(index)}>
            {item.question}
          </button>
          <div id={`answer-${index}`} className={`faq-answer ${activeIndex === index ? '' : 'hidden'}`}>
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
