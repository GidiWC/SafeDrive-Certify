import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const Rewards: React.FC = () => {
  const { rewards } = useSelector((state: RootState) => state.reward);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Driver Rewards</h2>
      <p>Earn rewards by maintaining high ratings and staying incident-free.</p>
      <div style={{ marginTop: '2rem' }}>
        {rewards.length === 0 ? (
          <p>No rewards available yet. Keep driving safely!</p>
        ) : (
          <ul>
            {rewards.map(reward => (
              <li key={reward.id} style={{ marginBottom: '1rem' }}>
                <h3>{reward.name}</h3>
                <p>{reward.description}</p>
                <p>Status: {reward.unlocked ? 'Unlocked' : 'Locked'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>How to Earn Rewards</h3>
        <ul>
          <li>Maintain a rating above 4.0</li>
          <li>Complete certification</li>
          <li>Stay incident-free for 6 months</li>
        </ul>
      </div>
    </div>
  );
};

export default Rewards;
