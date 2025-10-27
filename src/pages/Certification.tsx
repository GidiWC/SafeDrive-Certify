import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { certifyDriver } from '../store/slices/driverSlice';

const Certification: React.FC = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const dispatch = useDispatch();

  const handleCompleteQuiz = () => {
    setQuizCompleted(true);
    dispatch(certifyDriver());
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Driver Certification</h2>
      {!quizCompleted ? (
        <div>
          <h3>Professional Conduct Quiz</h3>
          <p>Complete this quiz to earn your Certified Safe Operator badge.</p>
          <div style={{ marginTop: '2rem' }}>
            <p>Question 1: What should you do if a passenger is being aggressive?</p>
            <button onClick={handleCompleteQuiz} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
              Remain calm and call authorities if needed
            </button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p>Question 2: How should you handle road conflicts with other drivers?</p>
            <button onClick={handleCompleteQuiz} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
              Avoid confrontation and report to authorities
            </button>
          </div>
          <button onClick={handleCompleteQuiz} style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}>
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3>Congratulations!</h3>
          <p>You have successfully completed the certification quiz.</p>
          <p>Your Certified Safe Operator badge has been awarded.</p>
        </div>
      )}
    </div>
  );
};

export default Certification;
