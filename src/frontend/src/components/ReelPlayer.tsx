import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Reel } from '../backend';

interface ReelPlayerProps {
  reel: Reel;
}

export default function ReelPlayer({ reel }: ReelPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-[9/16] max-h-[70vh]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23333' width='400' height='600'/%3E%3Ctext fill='%23fff' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E🎬%3C/text%3E%3C/svg%3E"
      >
        <source src={reel.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-16 w-16 rounded-full bg-black/50 hover:bg-black/70 text-white"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8 ml-1" />
          )}
        </Button>
      </div>

      {/* Mute Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="rounded-full bg-black/50 hover:bg-black/70 text-white"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Title and Description */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold text-lg mb-1">{reel.title}</h3>
        <p className="text-white/80 text-sm">{reel.description}</p>
      </div>
    </div>
  );
}
