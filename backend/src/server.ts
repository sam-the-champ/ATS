import app from './app';

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Api is running.....☮✝☪🕉☸✡🔯❤💛💚");
});

const startServer = async () => {
    try {
        
        app.listen(PORT, () => {
            console.log(`🚀 Senior ATS Engine running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1); // Kill the process if the DB fails
    }
};

startServer();