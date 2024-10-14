export const copyToClipBoard = async (key) => {
    try {
        await navigator.clipboard.writeText(`${key}`);
        console.log("Successfully Copied!")

    } catch (err) {
        console.log("Failed to copy")
    }
};

