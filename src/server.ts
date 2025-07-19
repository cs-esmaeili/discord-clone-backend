import 'module-alias/register';
import { createApp } from "@/app";

import { sign, verify } from "./token/token"

const app = createApp();

const PORT = process.env.PORT || 3000;


app?.listen(PORT, () => {

  sign({ name: "ali" }).then((token) => {
    console.log(token);
    verify(token);
  })

  console.log(`Server running on port ${PORT}`);
});