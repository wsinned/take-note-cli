import { CommandContext, Command } from '@stricli/core';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

interface StricliAutoCompleteContext extends CommandContext {
    readonly process: Pick<NodeJS.Process, "stderr" | "stdout" | "env">;
    readonly os?: Pick<typeof os, "homedir">;
    readonly fs?: {
        readonly promises: Pick<typeof fs.promises, "readFile" | "writeFile">;
    };
    readonly path?: Pick<typeof path, "join">;
}

type Shell = "bash";
type ShellAutoCompleteCommands = Readonly<Partial<Record<Shell, string>>>;
type ActiveShells = Readonly<Partial<Record<Shell, boolean>>>;

declare function buildInstallCommand<CONTEXT extends StricliAutoCompleteContext>(targetCommand: string, commands: ShellAutoCompleteCommands): Command<CONTEXT>;
declare function buildUninstallCommand<CONTEXT extends StricliAutoCompleteContext>(targetCommand: string, shells: ActiveShells): Command<CONTEXT>;

export { StricliAutoCompleteContext, buildInstallCommand, buildUninstallCommand };
