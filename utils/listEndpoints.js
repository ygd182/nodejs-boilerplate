module.exports =  function (baseUrl, routes) {
    var Table = require('cli-table');
    var table = new Table({ head: ['', 'Path'] });
    console.log('\nAPI for ' + baseUrl);
    console.log('\n********************************************');

    for (var key in routes) {
        if (routes.hasOwnProperty(key)) {
            var val = routes[key];
            if(val.route) {
                val = val.route;
                var _o = {};
                _o[val.stack[0].method]  = [baseUrl + val.path];
                table.push(_o);
            }
        }
    }

    console.log(table.toString());
    return table;
};