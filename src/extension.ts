//
//  extension.ts
//  GRPH LSP VSCode Extension
// 
//  This Source Code Form is subject to the terms of the Mozilla Public
//  License, v. 2.0. If a copy of the MPL was not distributed with this
//  file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const config = workspace.getConfiguration();
	const path = config.get<string>('grph.languageServerPath');

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { command: path },
		debug: {
			command: path,
			args: ['--log-level', 'debug']
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for GRPH files
		documentSelector: [{ scheme: 'file', language: 'grph' }]
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'grphlsp',
		'GRPH LSP',
		serverOptions,
		clientOptions
	);

	console.log(path)
	console.log(client)

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
