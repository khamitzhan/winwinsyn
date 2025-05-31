import React from 'react';
import Card from './Card';

interface LiveStreamProps {
  className?: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ className }) => {
  return (
    <Card className={className}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Live Stream</h2>
          <div className="flex items-center">
            <span className="animate-ping absolute h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative rounded-full h-2 w-2 bg-red-500"></span>
            <span className="ml-2 text-sm font-medium text-gray-300">LIVE</span>
          </div>
        </div>
        
        <div className="relative pt-[56.25%] overflow-hidden rounded-lg bg-gray-900">
          <iframe
            src="https://player.kick.com/win-win-syndicate"
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            title="Win-Win Syndicate Live Stream"
            onError={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              const parent = iframe.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="absolute inset-0 flex items-center justify-center bg-background-light border border-gray-800">
                    <div class="text-center p-4">
                      <p class="text-gray-400 mb-2">Stream will appear here when live</p>
                      <p class="text-xs text-gray-500">Please check back later</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Win-Win Syndicate LIVE</h3>
            <p className="text-sm text-gray-400">Hosted by CryptoMaster</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              <span className="bg-red-500 px-1.5 py-0.5 rounded text-white text-xs mr-1">LIVE</span>
              1,245 Viewers
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveStream;