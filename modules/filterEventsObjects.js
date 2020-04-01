const handler = require("./eventObjectHandler");

exports.filterEventsObjects = function(block, customAction) {
  var trackings = block.$enteringCustomActions.filter(a => {
    return a.type == "TrackEvent";
  });

  if (trackings.length > 0) {
    return handler.createTrackingEventObj(trackings, customAction);
  } else {
    return [];
  }
};
