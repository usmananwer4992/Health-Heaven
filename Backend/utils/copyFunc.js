const copyToClipBoard = async (key) => {
    try {
        console.log(CopylUrl)
        await navigator.clipboard.writeText(`${CopylUrl}register/${key}`);
        initial.setSnacky({
            color: "success",
            message: "Successfully Copied!",
            open: true,
        });
    } catch (err) {
        initial.setSnacky({
            color: "error",
            message: "Failed to copy",
            open: true,
        });
    }
};