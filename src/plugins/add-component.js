import plugin from "tailwindcss/plugin";

function addComponentPlugin({ addComponents }) {
  addComponents({
    ".btn": {
      padding: ".5rem 1rem",
      borderRadius: ".25rem",
      fontWeight: "600",
    },
    ".btn-primary": {
      backgroundColor: "#3490dc",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#2779bd",
      },
    },
    ".btn-secondary": {
        backgroundColor: "#7c3aed",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#4c1d95",
        },
      },
    ".btn-danger": {
      backgroundColor: "#e3342f",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#cc1f1a",
      },
    },
  });
}

export default plugin(addComponentPlugin);
