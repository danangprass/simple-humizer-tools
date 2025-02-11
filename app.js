const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));  // Use body-parser middleware
app.use(express.static('public')); // Serve static files (like your HTML)

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/generate', async (req, res) => {
    try {
        // Extract prompts
        const templatePrompt = req.body.customPrompt || ""; // Default to empty string if missing
        const userPrompt = req.body.prompt || ""; // Ensure 'prompt' exists, default to empty string

        // Combine prompts (if template is provided)
        let combinedPrompt = userPrompt; // Default to user prompt

        if (templatePrompt) {
            combinedPrompt = `${templatePrompt} ${userPrompt}`;  // Template + User prompt
        }

        // Check if the final prompt is empty
        if (!combinedPrompt) {
            return res.status(400).send('Error: Prompt cannot be empty.');
        }

        console.log("Combined Prompt:", combinedPrompt);

        // Generate Content
        const result = await model.generateContent(combinedPrompt);

        // Check for a valid response
        if (!result || !result.response || !result.response.text) {
            console.error("Invalid response from Gemini API:", result);
            return res.status(500).send('Error: Failed to generate content.');
        }

        const text = result.response.text();

        // Sanitize the output (very important!)
        // const sanitizedText = DOMPurify.sanitize(text); // Use a library like DOMPurify

        // Send the HTML response (consider escaping)
        res.send(`<p>${text}</p>`);  // Ensure proper HTML escaping or use a templating engine

    } catch (error) {
        console.error("Error during /generate:", error);
        res.status(500).send('Unexpected Error!!!');
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); //  your HTML file
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
