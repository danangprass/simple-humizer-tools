# Simple Humanizer Tool

This project uses the Gemini AI model to "humanize" text. Follow these instructions to get it up and running:

**Setup Instructions:**

1.  **Configure Environment Variables:**
    *   Copy the example environment variables file:
        ```
        cp .env-example .env
        ```
    *   Edit the `.env` file and replace `YOUR_API_KEY` with your actual Gemini API key:

        ```
        API_KEY=YOUR_API_KEY
        ```

2.  **Install Dependencies:**

    *   Run the following command to install the required Node.js packages:

        ```
        npm install
        ```

3.  **Start the Application:**

    *   Run the following command to start the development server:

        ```
        npm start
        ```

4.  **Access the Tool:**

    *   Open your web browser and navigate to:

        ```
        http://localhost:3000
        ```

**Notes:**

*   **Gemini AI Model:** This tool uses the Gemini AI model for text humanization.
*   **API Key:** Make sure your API key is valid and has the necessary permissions to access the Gemini AI service. You can obtain an API key from [Google AI Studio](https://makersuite.google.com/).
*   **.env File:** Storing your API key in a `.env` file is a best practice for security and portability. **Never** commit your API key directly to your code repository.
*   **Troubleshooting:** If you encounter any issues, check the browser's developer console and the server's console for error messages.
