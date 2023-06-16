import dotenv from 'dotenv';
import { app } from '@app/infrastructure/api/express';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const port = Number(process.env.PORT) || 3333;

app.listen(port, () => {
  console.log(`🚀 HTTP server listening on http://localhost:${port}`);
});
