const file_system = require('fs');
const archiver = require('archiver');
const path = require('path');
const mix = require('laravel-mix');

class ZipPlugin {
	/**
	 * The optional name to be used when called by Mix.
	 * Defaults to the class name, lowercased.
	 *
	 * Ex: mix.example();
	 *
	 * @return {String|Array}
	 */
	name() {
		return 'zip';
	}

	/**
	 * All npm dependencies that should be installed by Mix.
	 *
	 * @return {Array}
	 */
	dependencies() {
		return ['archiver'];
	}

	register(dirs, files, output_path) {
		mix.after(() => {
			const output = file_system.createWriteStream(output_path);

			const archive = archiver('zip');

			output.on('close', function () {
				console.log(archive.pointer() + ' total bytes');
				console.log('Theme build output to /build/deploy/theme.zip.');
			});

			archive.on('error', function(err){
				throw err;
			});

			archive.pipe(output);

			// append files from a sub-directory, putting its contents at the root of archive
			dirs.forEach((dir) => {
				const absolute = path.join(__dirname,'/../' + dir);
				archive.directory(absolute, dir);
			});

			files.forEach((file) => {
				const absolute = path.join(__dirname,'/../' + file);
				archive.file(absolute, {name: file});
			});

			archive.finalize();
		});
	}
}

mix.extend('split', new ZipPlugin());

