import { tsParticles, type Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";

(async () => {
  await loadSlim(tsParticles);
  await loadEmittersPlugin(tsParticles);
  await loadFireflyPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: false,

      preset: "firefly",

      particles: {

        shape: {
          type: "circle",
        },

        color: {
          value: "#f5cf0e",
        },

        move: {
          direction: "top",
          enable: true,

          speed: {
            min: .5,
            max: 1.7,
          },

          // trail: {
          //   enable: true,
          //   length: 10,
          // },

          outModes: {
            default: "destroy",
            bottom: "none",
          },
        },

        number: {
          value: 26 + 5,

          limit: {
            value: 26 + 5,
            mode: "wait",
          },
        },

        life: {
          delay: {
            value: 0,
          },

          duration: {
            sync: false,

            value: {
              min: 7,
              max: 26 + 5,
            },
          },
        },

        size: {
          value: {
            min: 1,
            max: 4,
          },

          animation: {
            enable: true,
            startValue: "max",
            destroy: "min",
            speed: 3,
            sync: false,
          },
        },
      },

      emitters: {
        direction: "top",

        life: {
          wait: false,
          count: 0,
          delay: 0,

          duration: {
            min: .15,
            max: .45,
          },
        },

        rate: {
          delay: {
            min: .03,
            max: .3,
          },

          quantity: {
            min: 1,
            max: 2,
          },
        },

        position: {
          x: {
            min: 0,
            max: 100,
          },

          y: 103,
        },
      },

      background: {
        color: "transparent",
      },

      autoPlay: true,
    },
  });

  const
    particlesDomItem: Container = tsParticles.domItem(0) as Container
  , documentWindow: Window = document.defaultView as Window
  ;

  let
    isPaused: boolean = false
  , ticking: boolean = false
  ;

  function updateState(): void {
    if (documentWindow.scrollY > 620) {

      if (!isPaused) {
        particlesDomItem.pause();
        isPaused = true;
      }

    } else if (isPaused) {
      particlesDomItem.play();
      isPaused = false;
    }

    ticking = false;
  }

  function scrollEv(): void {
    if (!ticking) {
      requestAnimationFrame(updateState);
      ticking = true;
    }
  }

  documentWindow.addEventListener("scroll", scrollEv, { passive: true });
})();
