const fs = require("node:fs/promises");

(async ( ) => {
    console.time("writeManyStream");
    const fileHandle = await fs.open("test.txt","w")
    const stream = fileHandle.createWriteStream();
    
    // const buff = Buffer.alloc(16383, "a");
    // console.log(stream.write(buff));
    // console.log(stream.write(Buffer.alloc(1,"a")));
    // console.log(stream.write(Buffer.alloc(1,"a")));
    // console.log(stream.write(Buffer.alloc(1,"a")));
    // console.log(stream.write(Buffer.alloc(1,"a")));

    // console.log(stream.writableLength);

    // stream.on("drain",( ) => {
    //     console.log(stream.write(Buffer.alloc(16384,"a")));
    //     console.log(stream.writableLength);
        
    //     console.log("We are now safe to write more into the Buffer");
    // })

    //setInterval(( ) => { },1000);
    
    // console.log(stream.writableHighWaterMark);
    // console.log(stream.writableLength);

    // const buff = Buffer.from("string");
    // stream.write(buff);
    // console.log(buff);
    
    // console.log(stream.writableLength)

    //  for (let i=0;i<10000000;i++){
    //          const buff = Buffer.alloc(100000000,`${i}`);

    //          console.log(stream.write(buff));
    //          console.log(stream.writableLength);
    //          stream.on("drain",( ) => {
    //             console.log(stream.write(Buffer.alloc(16383)));
    //             console.log(stream.writableLength);
    //             console.log("We can add more numbers into this text file");
    //          });
    //  }
    let i = 0;
    
    const writable = ( ) => {
        while (i < 1000000){
            const buff = Buffer.from (`${i} `,"utf-8");
            //This is our last write
            if (i === 999999){
                return stream.end(buff);
            }
            //if stream.write returns false break the statement
            if (!stream.write(buff)) break;
            i++;
        }
    };
    writable ( );
    stream.on("drain",( ) => {
        console.log("Drained!!!");
        writable( );
    });

    
    
    stream.on("finish",( ) => {
        fileHandle.close();
    });

    console.timeEnd("writeManyStream");
})( );