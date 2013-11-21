var system = require('system');

function handle_page(file){
    page.open(file,function(){
        page.render("demo.png");
        setTimeout(next_page,100);
    });
}
function next_page(){
    var file=system.args.shift();
    if(!file){phantom.exit(0);}
    handle_page(file);
}
next_page();