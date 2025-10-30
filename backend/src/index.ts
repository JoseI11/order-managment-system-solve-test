import app from "./app.js";

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT as number, '0.0.0.0', () => console.log(`API on :${PORT}`));
