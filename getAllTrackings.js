var getAllTrackings = function() {
  try {
    var fs = require("fs");
    var handler = require("./modules/eventObjectHandler");
    var readPath = process.argv[2];
    var writePath = process.argv[3];
    var file = fs.readFileSync(readPath);
    var flow = JSON.parse(file);
    var trackEvents = [];

    for (const i in flow) {
      if (flow.hasOwnProperty(i)) {
        var enteringCustomActions = [];
        var leavingCustomActions = [];
        const block = flow[i];

        var enterTrackings = block.$enteringCustomActions.filter(a => {
          return a.type == "TrackEvent";
        });

        if (enterTrackings.length > 0) {
          enteringCustomActions = handler.createTrackingEventObj(enterTrackings, 0);
        }

        var outTrackings = block.$leavingCustomActions.filter(a => {
          return a.type == "TrackEvent";
        });

        if (outTrackings.length > 0) {
          leavingCustomActions = handler.createTrackingEventObj(outTrackings, 1);
        }

        var events = enteringCustomActions.concat(leavingCustomActions);

        trackEvents.push({
          title: block.$title,
          events
        });
      }
    }

    if (writePath) {
      fs.writeFileSync(writePath, JSON.stringify(trackEvents), {
        encoding: "utf8",
        flag: "w+"
      });
    } else {
      console.log(JSON.stringify(trackEvents));
    }
  } catch (e) {
    console.log(e);
  }
}

getAllTrackings();