exports.exportFile = function(writePath, trackEvents, fileType) {
  if (writePath) {
    switch (fileType) {
      case "json":
        fs.writeFileSync(writePath, JSON.stringify(trackEvents), {
          encoding: "utf8",
          flag: "w+"
        });
        break;
      case "csv":
        console.log("exportar para csv");
        break;
      default:
        console.log("ERROR: NOT SUPPORTED FILE EXTENSION");
        break;
    }
  } else {
    console.log(JSON.stringify(trackEvents));
  }
};
