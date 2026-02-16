# Google Gemini API Key Setup

This application uses Google Gemini to power the AI audit analysis. You need to configure your Gemini API key to enable this functionality.

## Steps to Configure

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Select an existing Google Cloud project or create a new one
5. Copy the generated API key

### 2. Configure the API Key in Supabase

The Gemini API key needs to be set as a secret in your Supabase project:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
4. Add a new secret:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
5. Click **Save**

## How It Works

When you run an audit:

1. Your custom audit prompt is sent to the Gemini edge function
2. The edge function processes each record using Google Gemini (gemini-1.5-flash model)
3. Gemini analyzes:
   - Whether the record should be classified as "Retail" or "Non-Retail"
   - Appropriate threshold values (if not available)
   - Detailed reasoning for the classification
4. Results are saved to your database and displayed in the UI

## Cost Considerations

- The app uses **gemini-1.5-flash** which is cost-effective
- Approximately 20 records are processed in parallel batches
- Gemini offers generous free tier: 15 requests per minute, 1 million tokens per minute
- For most use cases, you can stay within the free tier
- Paid tier pricing is very competitive at $0.075 per 1M input tokens

## Troubleshooting

**Error: "GEMINI_API_KEY is not configured"**
- Make sure you've added the API key to Supabase Edge Function secrets
- Redeploy the edge function after adding the secret

**Error: "Gemini API error: 400"**
- Your API key may be invalid or the request format is incorrect
- Verify your API key is correct in Supabase secrets
- Check that the API key has proper permissions

**Error: "Gemini API error: 429"**
- You've exceeded your API rate limit
- Free tier: 15 requests per minute
- Wait a moment and try again, or upgrade to paid tier for higher limits
