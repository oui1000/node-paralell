const https = require('https')

//pos function
async function post(url, data) {
  const dataString = JSON.stringify(data)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
    },
    timeout: 30000, // in ms
  }

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`))
      }

      const body = []
      res.on('data', (chunk) => body.push(chunk))
      res.on('end', () => {
        const resString = Buffer.concat(body).toString()

        //console.log(resString)

        resolve(resString)
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request time out'))
    })

    req.write(dataString)
    req.end()
  })
}
//end function

//ทำงานแบบ parallel 
async function parallelRun(pos_data){
    let result = await Promise.all([
        post('https://api.dev.farmbook.co/mbapi/test', pos_data), 
        post('https://api.dev.farmbook.co/mbapi/test', pos_data), 
        post('https://api.dev.farmbook.co/mbapi/test', pos_data), 
        post('https://api.dev.farmbook.co/mbapi/test', pos_data), 
        post('https://api.dev.farmbook.co/mbapi/test', pos_data)
    ]);

    result.sort();
    console.log(result);
}
 


console.log("**********************************************************************")

console.log("start call api at : " + new Date())

console.log("**********************************************************************")

let post_data = {"fn":"nodeJS"};

parallelRun(post_data);

//test remark
//test remark 2
//test remark 3


 

 

