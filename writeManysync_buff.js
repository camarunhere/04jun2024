const fs = require("node:fs");

(async ( ) => {
    console.time("writeManysync");
    fs.open("test.txt","w",(err,fd) => {
        for(let i=0;i<1000000;i++){
            const buff = Buffer.from( 'a' , "utf-8");
            fs.writeSync(fd, buff);
        }
        console.timeEnd("writeManysync");
    });
})( );