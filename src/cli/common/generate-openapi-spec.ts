import { generateSpec } from "@tsoa/cli";
import { Tsoa } from "tsoa";
import { log } from "../../node/utils/log";
import { Timer } from "../../node/utils/timer";

/**
 * Generates Open API/Swagger specification file
 */
export const generateOpenAPISpec = async (cache?: Tsoa.Metadata) => {
  const timer = new Timer();
  const metadata = await generateSpec(
    {
      basePath: "/api",
      entryFile: "",
      outputDirectory: "./.tmp",
      noImplicitAdditionalProperties: "ignore",
      controllerPathGlobs: ["src/server/controllers/**/*-controller.ts"],
      specVersion: 3,
    },
    undefined,
    undefined,
    cache
  );

  log.success(`Generated OpenAPI spec (${timer.elapsed()}ms)`);

  return metadata;
};
