import { run } from "npm:@stricli/core@1.2.0";
import { buildApplication, buildRouteMap } from "@stricli/core";
// import { buildInstallCommand, buildUninstallCommand } from "@stricli/auto-complete";
// import { name, version, description } from "../package.json";
import { weeklyCommand } from "./commands/weeklyCommand/command.ts";
// import { nestedRoutes } from "./commands/nested/commands";
import meta from "./deno.json" with { type: "json" };

const description = 'Take-Note: A cli note taking helper'

const routes = buildRouteMap({
    routes: {
        // config: configCommand,
        weekly: weeklyCommand,
        // daily: dailyCommand
    },
    docs: {
        brief: description,
        hideRoute: {},
    },
});

export const app = buildApplication(routes, {
    name: "take-note",
    versionInfo: {
        currentVersion: meta.version
    },
});

await run(app, process.argv.slice(2), { process });

