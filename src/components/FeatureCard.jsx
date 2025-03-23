// src/components/FeatureCard.jsx
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300">
      <div className="text-4xl mb-4 text-cyan-400">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
