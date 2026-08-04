import { Variants } from "motion/react";

export const fadeUp:Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
};

export const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};


