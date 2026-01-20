import React, { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);
  return (
    <section id="hero">
      <div>
        <h1> MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Title" />
      </div>
      <video src="/videos/hero.mp4" autoPlay muted playsInline />

      <button>Buy Now</button>
      <p>
        From $1,999 or $82.99/mo. for 24 mo. <a href="#">Learn more</a>
      </p>
    </section>
  );
};

export default Hero;
