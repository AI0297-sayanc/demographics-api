const shapefile = require("shapefile")

// module.exports = {
//   async post(req, res) {
//     try {
//       const source = await shapefile.open("/home/ai/shpfile/Dist.shp")
//       const result = await source.read()
//       while (!result.done) {
//         console.log(result.value)
//         console.log(result)
//       }
//       return res.send("Shapefile opened successfully!")
//     } catch (error) {
//       return res.status(500).json({ error: true, message: error.message })
//     }
//   }
// }

// module.exports = {
//   async post(req, res) {
//     try {
//       const source = await shapefile.open("/home/ai/shpfile/Dist.shp")
//       let result = await source.read()
//       console.log("result ==> ", result)
//       while (result.done) {
//         console.log(result.value)
//       }
//       await source.close()
//       return res.send("Shapefile opened successfully!")
//     } catch (error) {
//       console.log("error ==> ", error)
//       return res.status(500).json({ error: true, message: error.message })
//     }
//   },
// }

module.exports = {
  async post(req, res) {
    try {
      const source = await shapefile.open("/home/ai/shpfile/Dist.shp");
      const reader = source.read();
      const log = async function (result) {
        if (result.done) {
          await source.close();
          return;
        }
        console.log(result.value);
        const nextResult = await reader.next();
        await log(nextResult);
      };
      await log(await reader.next());
      return res.send("Shapefile opened successfully!");
    } catch (error) {
      console.log("error ==> ", error)
      return res.status(500).json({ error: true, message: error.message });
    }
  },
};
