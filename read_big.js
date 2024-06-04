const fs = require("fs/promises");


(async( ) => {
    const fileHandleRead = await fs.open("src.txt","r");
    const stream = fileHandleRead.createReadStream({highWaterMark: 400});
    stream.on("data",(chunk) => {
        console.log("____________");
        console.log(chunk.length);
    });

})( );