import { tsParticles } from "@tsparticles/engine";
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
            max: 1.5,
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
          limit: {
            value: 26,
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
              max: 14,
            },
          },
        },

        size: {
          value: {
            min: 1,
            max: 4,
          },

          // animation: {
          //   enable: true,
          //   speed: 10,
          //   startValue: "max",
          //   destroy: "min",
          //   sync: false,
          //   count: 1,
          //   decay: 0.05,
          //   // mode: "decrease",
          // },
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
})();