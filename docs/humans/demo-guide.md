# Try a shortlist lookup

English · [Español](demo-guide.es.md)

With Node.js 22.18 or later installed, open a terminal in the Furrify folder. Run `npm ci` the first time, then `npm run dev`. Open the local address shown in the terminal. Press Ctrl+C in the terminal to stop the server.

The demo interface is in Spanish.

1. Enter **FUR-101** in **Código de solicitud** (request code) and select **Ver recomendaciones** (view recommendations). After a brief loading message, Taller Bruma and Atelier Musgo appear, each with a reason for the recommendation.
2. Try **FUR-000**. The page says there are no recommendations for this code yet.
3. Try **FUR-503**. The page reports a lookup problem and lets you try again. Enter **FUR-101** to recover and see the shortlist.
4. Enter **hola**. The page explains the expected code format.

The codes are fictional. Refreshing clears your input. This demo looks up existing examples only. The FUR-503 error repeats by design. [Pilot overview](overview.md).
