import webpack from "webpack";
import { devWebpackConfig } from "../webpack/webpack.config.dev";
import { sleep } from "../../common/utils/sleep";
import { prodWebpackConfig } from "../webpack/webpack.config.prod";
import { environment } from "../../node/environment";
import { log } from "../../node/utils/log";

const envConfigs = {
  prod: prodWebpackConfig,
  dev: devWebpackConfig,
  test: devWebpackConfig,
};

const getConfig = () => {
  const { NODE_ENV } = environment();
  return envConfigs[NODE_ENV];
};

export const startWebpack = async () => {
  // somehow prevents compiling twice on webpack start
  await sleep(1000);

  const compiler = webpack(getConfig());

  return new Promise<void>((resolve) => {
    compiler.watch(
      {
        aggregateTimeout: 1000,
      },
      (err, stats) => {
        if (err) {
          log.error(err.message);
          return;
        }

        if (stats && !stats.hasErrors()) {
          log.success(
            `Webpack Compiled (${+stats.endTime! - +stats.startTime!}ms)`
          );
        }

        resolve();
      }
    );
  });
};
