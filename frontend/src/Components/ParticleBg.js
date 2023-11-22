import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBg = () => {
  const particlesInit = async (main) => {
    console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: "rgb(10, 10, 25)",
        },
        style: {
          position: "absolute",
          height: "100vh",
          "z-index": -1, // Use "zIndex" instead of "z-index"
        },
        fpsLimit: 20,
        particles: {
          shape: {
            type: "circle",
          },
          size: {
            random: {
              enable: true,
              minimumValue: 0.5,
            },
            value: 1,
          },
          color: {
            value: "#f1f1f1",
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            limit: 0,
            value: 400,
          },
          opacity: {
            animation: {
              enable: true,
              minimumValue: 0.5,
              speed: 1.6,
              sync: false,
            },
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            value: 1,
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              resize: true,
            },
          },
        },
      }}
    />
  );
};

export default ParticleBg;
