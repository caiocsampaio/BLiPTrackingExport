const handler = require("./eventObjectHandler");

exports.filterEventsObjects = function(block, customAction) {
  var actionTypes = ["entering", "leaving"];
  var type = actionTypes[customAction];

  if (type == "entering") {
    var trackings = block.$enteringCustomActions.filter(a => {
      return a.type == "TrackEvent";
    });
  } else if ((type = "leaving")) {
    var trackings = block.$leavingCustomActions.filter(a => {
      return a.type == "TrackEvent";
    });
  }

  if (trackings.length > 0) {
    return handler.createTrackingEventObj(trackings, type);
  } else {
    return [];
  }
};
