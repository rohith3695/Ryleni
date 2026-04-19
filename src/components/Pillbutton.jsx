import { motion } from "framer-motion";

const PillButton = ({ label, href = "#", isSmall = false, variantColor = "#0e0e0e" }) => {
    return (
        <motion.a
            href={href}
            whileHover="hover"
            style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: isSmall ? "8px" : "14px",
                padding: isSmall ? "10px 20px" : "18px 32px",
                borderRadius: "999px",
                border: `1.5px solid ${variantColor}`,
                background: "#ffffff",
                color: variantColor,
                fontSize: isSmall ? "14px" : "18px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                overflow: "hidden",
                font: 'myfont',
                textDecoration: "none",
            }}
        >
            {/* Violet fill that sweeps up from bottom on hover */}
            <motion.div
                variants={{ hover: { y: "0%" } }}
                initial={{ y: "102%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "#7c3aed",
                    borderRadius: "999px",
                    zIndex: 0,
                }}
            />

            {/* Label */}
            <motion.span
                variants={{ hover: { color: "#ffffff" } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative", zIndex: 1, color: variantColor }}
            >
                {label}
            </motion.span>

            {/* Arrow SVG — variantColor by default, white on hover */}
            <motion.svg
                variants={{ hover: { x: 4, y: -4 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative", zIndex: 1 }}
                width={isSmall ? "18" : "28"}
                height={isSmall ? "18" : "28"}
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <motion.line
                    x1="7" y1="17" x2="17" y2="7"
                    variants={{ hover: { stroke: "#ffffff" } }}
                    style={{ stroke: variantColor }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polyline
                    points="7 7 17 7 17 17"
                    variants={{ hover: { stroke: "#ffffff" } }}
                    style={{ stroke: variantColor }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
            </motion.svg>
        </motion.a>
    );
};

export default PillButton;
