export const customStyles = {
    option: (styles) => {
        return {
            ...styles,
            color: "#000",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            width: "100%",
            background: "#fff",
            ":hover": {
                backgroundColor: "rgb(243 244 246)",
                color: "#000",
                cursor: "pointer",
            },
        };
    },
};