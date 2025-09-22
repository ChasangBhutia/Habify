import confetti from "canvas-confetti";

export const fireSchoolPrideConfetti = (e, colors = ["#0033A0", "#FFFFFF"]) => {
    const rect = e.target.getBoundingClientRect();

    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
        particleCount: 100,
        spread: 70,
        startVelocity: 50,
        colors: colors, // 🎓 your school pride colors
        origin: { x, y }
    });
};
