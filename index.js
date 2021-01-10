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

    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * @param  {Array} directories
     * @param  {Array} files
     * @param  {string} output_path
     * @return {void}
     *
     */
    register(directories, files, output_path) {
        mix.after(() => {
            const output = file_system.createWriteStream(
                mix.paths.root(output_path)
            );

            const archive = archiver('zip');

            output.on('close', function () {
                console.log(`Wrote ${output_path} -  ${archive.pointer()} bytes`);
            });

            archive.on('error', function (err) {
                throw err;
            });

            archive.pipe(output);

            // append files from a sub-directory, putting its contents at the root of archive
            directories.forEach((directory) => {
                const absolute = mix.paths.root(directory);
                archive.directory(absolute, directory);
            });

            files.forEach((file) => {
                const absolute = mix.paths.root(file);
                archive.file(absolute, {name: file});
            });

            archive.finalize();
        });
    }
}

mix.extend('zip', new ZipPlugin());

