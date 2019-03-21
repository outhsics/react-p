
const LodashPlugin = require('lodash-webpack-plugin');


export default config => {

    config.plugin().use(new LodashPlugin());
};