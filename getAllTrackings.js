const fs = require("fs");
const filterTrackings = require("./modules/filterEventsObjects");
const yargs = require("yargs");
const exportFile = require('./modules/exportFile')
const argv = yargs
  .option("read", {
    alias: "r",
    description: "Input json path",
    type: "string"
  })
  .option("write", {
    alias: "w",
    description: "Output file path, if wanted",
    type: "string"
  })
  .option("output", {
    alias: "o",
    description: "Output file type: json or csv",
    type: "string"
  })
  .help()
  .alias("help", "h").argv;

const readPath = argv.r;
const writePath = argv.w;
const outputType = argv.o;

var getAllTrackings = function() {
  try {
    var file = fs.readFileSync(readPath);
    var flow = JSON.parse(file);
    var trackEvents = [];

    for (const i in flow) {
      if (flow.hasOwnProperty(i)) {
        var enteringCustomActions = [];
        var leavingCustomActions = [];
        const block = flow[i];

        enteringCustomActions = filterTrackings.filterEventsObjects(block, 0);
        leavingCustomActions = filterTrackings.filterEventsObjects(block, 1);

        var events = enteringCustomActions.concat(leavingCustomActions);

        trackEvents.push({
          title: block.$title,
          events
        });
      }
    }

    exportFile.exportFile(writePath, trackEvents, outputType)
  } catch (e) {
    console.log(e);
  }
};

getAllTrackings();
