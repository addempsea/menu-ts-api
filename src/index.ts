/**
 * Required External Modules
 */
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { userRouter } from "./users/user.router";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { authenticate, checkIfUserExists } from "./middleware/auth.middleware";

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/items", authenticate, itemsRouter);
app.use("/user", userRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
