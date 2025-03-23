// src/components/Features.jsx
import { FaChartLine, FaSearch, FaShieldAlt } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const featureList = [
    {
      icon: <FaChartLine />,
      title: "AI-Powered Insights",
      description: "Harness AI to analyze influencer data and provide credibility scores.",
    },
    {
      icon: <FaSearch />,
      title: "Deep Profile Scans",
      description: "Evaluate audience engagement, followers, and post history accurately.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust & Safety",
      description: "Detect fraudulent activity and protect your brand integrity.",
    },
  ];

  return (
    <section className="py-20 bg-[#0D0D0D] text-white text-center">
      <h2 className="text-4xl font-orbitron uppercase mb-12 text-cyan-400">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {featureList.map((feat, index) => (
          <FeatureCard
            key={index}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
