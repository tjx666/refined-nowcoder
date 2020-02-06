import webpack from 'webpack';
import chalk from 'chalk';

import prodConfig from '../configs/webpack.prod';

const compiler = webpack(prodConfig);
compiler.run((error, stats) => {
    const compileError: Error & { details?: string } = error;

    if (error) {
        console.log(`${chalk.bgRed.black(' ERROR ')} webpack configuration error!`);
        console.error(error);

        if (compileError.details) {
            console.error(compileError.details);
        }

        return;
    }

    const prodStatsOpts = {
        preset: 'normal',
        colors: true,
    };
    console.log(stats.toString(prodStatsOpts));
});
