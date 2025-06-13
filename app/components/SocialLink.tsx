import React, { ReactElement } from 'react';
import Link from 'next/link';
import { FaTelegram, FaInstagram } from 'react-icons/fa';

const iconMap: Record<string, ReactElement> = {
  telegram: <FaTelegram />,
  instagram: <FaInstagram />,
};

interface SocialLinkProps {
  platform: string;
  url: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, url }) => {
  const icon = iconMap[platform.toLowerCase()];

  if (!icon || !url) {
    console.error(`Invalid platform (${platform}) or URL (${url})`);
    return null;
  }

  return (
    <Link 
        href={url} 
        aria-label={platform} 
        target="_blank" 
        rel="noopener noreferrer" 
        passHref
        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[var(--accent-gold)]/20 hover:text-[var(--accent-gold)] transition-colors"
        >
            {icon}
    </Link>
  );
};

export default SocialLink;
