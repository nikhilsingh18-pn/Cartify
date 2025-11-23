import React from 'react';
import { Trophy, Gift, Star, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Rewards: React.FC = () => {
  const { user } = useAuth();

  const rewardTiers = [
    { name: 'Bronze', points: 0, discount: 5, icon: Award, color: 'text-orange-600' },
    { name: 'Silver', points: 5000, discount: 10, icon: Star, color: 'text-gray-400' },
    { name: 'Gold', points: 15000, discount: 15, icon: Trophy, color: 'text-yellow-500' },
    { name: 'Platinum', points: 30000, discount: 20, icon: TrendingUp, color: 'text-primary' }
  ];

  const currentPoints = user?.rewards || 0;
  const currentTier = rewardTiers.slice().reverse().find(tier => currentPoints >= tier.points) || rewardTiers[0];
  const nextTier = rewardTiers.find(tier => currentPoints < tier.points);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Rewards Programme</h1>

        <div className="bg-primary text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Points</h2>
              <p className="text-4xl font-bold">{currentPoints.toLocaleString('en-IN')}</p>
            </div>
            <currentTier.icon className={`w-24 h-24 ${currentTier.color}`} />
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Current Tier: {currentTier.name}</span>
              <span>{currentTier.discount}% Discount</span>
            </div>
            {nextTier && (
              <>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentPoints - currentTier.points) / (nextTier.points - currentTier.points)) * 100}%`
                    }}
                  />
                </div>
                <p className="text-sm">
                  {(nextTier.points - currentPoints).toLocaleString('en-IN')} points to reach {nextTier.name}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {rewardTiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-lg shadow-md p-6 ${
                tier.name === currentTier.name ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <tier.icon className={`w-12 h-12 ${tier.color}`} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
                  <p className="text-gray-600">{tier.points.toLocaleString('en-IN')}+ points</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>{tier.discount}% discount on all purchases</li>
                <li>Exclusive member deals</li>
                <li>Priority customer support</li>
                {tier.points >= 15000 && <li>Free shipping on all orders</li>}
                {tier.points >= 30000 && <li>Early access to sales</li>}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How to Earn Points</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
              <Gift className="w-8 h-8 text-primary" />
              <div><h3 className="font-semibold text-gray-800">Make a Purchase</h3><p className="text-sm text-gray-600">Earn 1 point for every ₹1 spent</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
              <Star className="w-8 h-8 text-primary" />
              <div><h3 className="font-semibold text-gray-800">Write a Review</h3><p className="text-sm text-gray-600">Earn 50 points for each product review</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
              <Trophy className="w-8 h-8 text-primary" />
              <div><h3 className="font-semibold text-gray-800">Refer a Friend</h3><p className="text-sm text-gray-600">Earn 500 points for each successful referral</p></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rewards;
