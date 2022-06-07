import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

const IsDev = process.env.NODE_ENV === "development";

export function getEnvVariable() {
  if (IsDev) {
    return DevEnvironment;
  } else {
    return ProdEnvironment;
  }
}
