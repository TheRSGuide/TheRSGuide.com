import React from 'react';

interface YouTubeEmbedProps {
  id: string;
  title?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  id,
  title = "YouTube video",
}) => {
  return (
    <div className="my-6 w-full">
      <div
        className="relative w-full overflow-hidden rounded-lg border border-border"
        style={{
          paddingBottom: "56.25%", // 16:9 aspect ratio
          height: 0,
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};
