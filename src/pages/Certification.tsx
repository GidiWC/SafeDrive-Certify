import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { certifyDriver } from '../store/slices/driverSlice';

const Certification: React.FC = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const dispatch = useDispatch();

  const questions = [
    {
      id: 1,
      question: "What should you do if a passenger is being aggressive?",
      options: [
        "Remain calm and call authorities if needed",
        "Engage in confrontation",
        "Ignore the situation completely"
      ],
      correct: "Remain calm and call authorities if needed"
    },
    {
      id: 2,
      question: "How should you handle road conflicts with other drivers?",
      options: [
        "Avoid confrontation and report to authorities",
        "Engage in road rage",
        "Speed up to escape"
      ],
      correct: "Avoid confrontation and report to authorities"
    }
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleCompleteQuiz = () => {
    const allAnswered = questions.every(q => answers[q.id]);
    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const allCorrect = questions.every(q => answers[q.id] === q.correct);
    if (allCorrect) {
      setQuizCompleted(true);
      dispatch(certifyDriver());
    } else {
      alert('Some answers are incorrect. Please review and try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      fontFamily: '"Poppins", sans-serif',
      padding: '2rem',
      opacity: 0.85
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '3rem',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#ddd',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          opacity: 0.9,
          textAlign: 'center'
        }}>
          Driver Certification
        </h2>
        {!quizCompleted ? (
          <div>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.5em',
              textAlign: 'center'
            }}>
              Professional Conduct Quiz
            </h3>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '2rem',
              fontSize: '1.1em',
              textAlign: 'center'
            }}>
              Complete this quiz to earn your Certified Safe Operator badge.
            </p>
            {questions.map((q, index) => (
              <div key={q.id} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '2rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <p style={{
                  color: '#e0e0e0',
                  marginBottom: '1rem',
                  fontSize: '1.2em',
                  fontWeight: '600'
                }}>
                  Question {index + 1}: {q.question}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {q.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(q.id, option)}
                      style={{
                        padding: '0.75rem 1rem',
                        border: answers[q.id] === option ? '2px solid #FF6B6B' : '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        background: answers[q.id] === option ? 'rgba(255, 107, 107, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        fontWeight: answers[q.id] === option ? '600' : '400'
                      }}
                      onMouseEnter={(e) => {
                        if (answers[q.id] !== option) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (answers[q.id] !== option) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                onClick={handleCompleteQuiz}
                style={{
                  width: '200px',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, #FF6B6B, #EE5A24)',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontSize: '2em'
            }}>
              🎉 Congratulations!
            </h3>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '1rem',
              fontSize: '1.2em'
            }}>
              You have successfully completed the certification quiz.
            </p>
            <p style={{
              color: '#fff',
              fontSize: '1.1em',
              fontWeight: '600'
            }}>
              Your Certified Safe Operator badge has been awarded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;
