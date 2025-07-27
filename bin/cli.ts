#!/usr/bin/env node
import { run } from "npm:@stricli/core@1.2.0";
import { app } from "../take-note.ts";
await run(app, process.argv.slice(2), { process });