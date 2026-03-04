import localFont from "next/font/local";

export const waterfont = localFont({
    src: "../../public/fonts/water.otf",
});

export const Helvetica = localFont({
    src: [
        {
            path: "../../public/fonts/helvetica/Helvetica.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/helvetica/helvetica-light-587ebe5a59211.ttf",
            weight: "400",
            style: "light",
        },
        {
            path: "../../public/fonts/helvetica/Helvetica-Bold.ttf",
            weight: "700",
            style: "bold",
        },
        {
            path: "../../public/fonts/helvetica/Helvetica-Oblique.ttf",
            weight: "400",
            style: "italic",
        },
    ],
});
