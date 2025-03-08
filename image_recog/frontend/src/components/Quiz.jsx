import React, { useState, useEffect } from "react";

const allQuestions = [
    { id: 1, question: "What should you say if you accidentally bump into someone?", options: ["Ignore them", "Say sorry", "Walk away"], answer: "Say sorry" },
    { id: 2, question: "Which face shows someone feeling happy?", options: ["😊", "😢", "😡"], answer: "😊" },
    { id: 3, question: "If a friend is sad, what can you do to help?", options: ["Laugh at them", "Ask if they're okay", "Walk away"], answer: "Ask if they're okay" },
    { id: 4, question: "What is the polite way to ask for help?", options: ["Give me that!", "Please, can you help me?", "I don't need help"], answer: "Please, can you help me?" },
    { id: 5, question: "Which action shows good listening?", options: ["Looking away", "Interrupting", "Making eye contact"], answer: "Making eye contact" },
    { id: 6, question: "How do you know if someone is angry?", options: ["They are smiling", "They have a frown and raised voice", "They are laughing"], answer: "They have a frown and raised voice" },
    { id: 7, question: "What should you do if you feel frustrated?", options: ["Yell at someone", "Take deep breaths", "Throw something"], answer: "Take deep breaths" },
    { id: 8, question: "How can you show kindness to a friend?", options: ["Ignore them", "Share and help them", "Take their things"], answer: "Share and help them" },
    { id: 9, question: "What should you do if you see someone alone at lunch?", options: ["Sit with them", "Ignore them", "Take their food"], answer: "Sit with them" },
    { id: 10, question: "How can you show you are paying attention?", options: ["Look at the speaker", "Talk over them", "Look away"], answer: "Look at the speaker" },
    { id: 11, question: "What do you say when you receive a gift?", options: ["Nothing", "Thank you", "Give it back"], answer: "Thank you" },
    { id: 12, question: "How can you tell if someone is sad?", options: ["They are crying", "They are laughing", "They are jumping"], answer: "They are crying" },
    { id: 13, question: "What is a good way to start a conversation?", options: ["Ignore them", "Say hi and ask a question", "Walk away"], answer: "Say hi and ask a question" },
    { id: 14, question: "What should you do if you forget someone's name?", options: ["Call them anything", "Ask politely", "Ignore them"], answer: "Ask politely" },
    { id: 15, question: "What should you do if you see someone being bullied?", options: ["Join in", "Tell a teacher or adult", "Ignore it"], answer: "Tell a teacher or adult" },
    { id: 16, question: "How can you tell if someone wants to talk to you?", options: ["They look at you and smile", "They walk away", "They frown"], answer: "They look at you and smile" },
    { id: 17, question: "What should you do if someone shares a secret with you?", options: ["Tell everyone", "Keep it private", "Laugh at them"], answer: "Keep it private" },
    { id: 18, question: "What is the best way to resolve an argument?", options: ["Listen and talk calmly", "Yell and walk away", "Ignore the other person"], answer: "Listen and talk calmly" },
    { id: 19, question: "What should you do if someone is talking to you?", options: ["Look at them and listen", "Turn away", "Interrupt them"], answer: "Look at them and listen" },
    { id: 20, question: "How can you show gratitude?", options: ["Say thank you", "Ignore them", "Take more"], answer: "Say thank you" },
    { id: 21, question: "What should you do if you make a mistake?", options: ["Blame someone else", "Admit it and fix it", "Ignore it"], answer: "Admit it and fix it" },
    { id: 22, question: "How can you calm down when you're upset?", options: ["Take deep breaths", "Yell at someone", "Throw things"], answer: "Take deep breaths" },
    { id: 23, question: "How do you know if someone wants to be your friend?", options: ["They smile and talk to you", "They run away", "They ignore you"], answer: "They smile and talk to you" },
    { id: 24, question: "What is a good way to ask someone to play?", options: ["Grab their toy", "Ask politely", "Ignore them"], answer: "Ask politely" },
    { id: 25, question: "What should you do if you are feeling anxious?", options: ["Take deep breaths", "Ignore it", "Yell at someone"], answer: "Take deep breaths" },
    { id: 26, question: "How do you show empathy?", options: ["Listen and understand", "Ignore the person", "Laugh at them"], answer: "Listen and understand" },
    { id: 27, question: "What should you do if you lose a game?", options: ["Congratulate the winner", "Get angry", "Quit playing"], answer: "Congratulate the winner" },
    { id: 28, question: "What is the best way to say goodbye?", options: ["Wave and say 'Goodbye'", "Walk away", "Ignore them"], answer: "Wave and say 'Goodbye'" }
  ];

const getRandomQuestions = (questions, num) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Quiz = ({ mode }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playClick] = useSound(clickSound);

  useEffect(() => {
    setQuestions(getRandomQuestions(allQuestions, 10));
  }, []);

  const handleAnswer = (option) => {
    playClick();
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      playCorrect();
    } else {
      playWrong();
    }
    setSelectedAnswer(option);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="p-6 bg-blue-100 rounded-xl shadow-lg text-center">
      {currentQuestion < questions.length ? (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 
            className="text-lg font-semibold mb-4" 
            onMouseEnter={() => speakText(questions[currentQuestion].question)}
          >
            {questions[currentQuestion].question}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg text-white font-semibold transition-all ${selectedAnswer === option ? (option === questions[currentQuestion].answer ? 'bg-green-500' : 'bg-red-500') : 'bg-blue-500 hover:bg-blue-700'}`}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                onMouseEnter={() => speakText(option)}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="text-lg font-semibold">Quiz Complete! Your Score: {score}/{questions.length}</motion.h2>
      )}
    </motion.div>
  );
};

export default Quiz;
