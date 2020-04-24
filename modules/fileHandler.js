const fs = require("fs");

exports.readFile = function(readPath) {
  return fs.readFileSync(readPath);
};
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
        var csv = jsonToCsv(trackEvents);
        fs.writeFileSync(writePath, csv, {
          encoding: "utf8",
          flag: "w+"
        });
        break;
      default:
        console.log("ERROR: NOT SUPPORTED FILE EXTENSION");
        break;
    }
  } else {
    console.log(JSON.stringify(trackEvents));
  }
};

function jsonToCsv(trackEvents) {
  var header = [
    "title",
    "events_$title",
    "events_category",
    "events_action",
    "events_type",
    "events_conditions_comparison",
    "events_conditions_variable",
    "events_conditions_values"
  ];
  var csv = header.join(";").concat("\r\n");
  var rows = [];
  for (const i in trackEvents) {
    if (trackEvents.hasOwnProperty(i)) {
      const block = trackEvents[i];
      if (block.events.length > 0) {
        block.events.forEach(b => {
          var row = [block.title];
          row = row.concat([b.$title, b.category, b.action, b.type]);

          if (b.conditions.length > 0) {
            var conditions = b.conditions[0];
            row = row.concat([
              conditions.comparison,
              conditions.variable,
              conditions.values
            ]);
          }
          row = row.concat(Array(header.length - row.length).fill(""));
          rows.push(row);
        });
      }
    }
  }

  rows.forEach(row => {
    csv = csv.concat(row.join(";")).concat("\r\n");
  });

  return csv;
}
