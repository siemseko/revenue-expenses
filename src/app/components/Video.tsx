"use client"
// src/app/about/page.tsx
import React, { useEffect, useState } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  video_path: string;
}

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:7100/api/videos');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const { data } = await res.json();
        setVideos(data);
      } catch (err) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Videos</h1>
      <ul>
        {videos.map(video => (
          <li key={video.id}>
            <h2>{video.description}</h2>
            <video controls width="600">
              <source src={`http://localhost:7100/${video.video_path}`} type="video/mp4" />
              <source src={`http://localhost:7100/${video.video_path.replace('.mp4', '.webm')}`} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideosPage;