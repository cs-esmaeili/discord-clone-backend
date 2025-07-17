import 'module-alias/register';
import Express from "express";
import { logInWithPassword, wadwa } from "@/test/test";

const app = Express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logInWithPassword();
  console.log(`Server running on port ${PORT}`);
});