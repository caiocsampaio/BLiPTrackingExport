exports.createTrackingEventObj = function (trackings, type) {
  var customActions = [];
  for (const j in trackings) {
    if (trackings.hasOwnProperty(j)) {
      const track = trackings[j];
      var conditions = [];

      var hasConditions = track.conditions.length > 0;
      if (hasConditions) {
        for (const k in track.conditions) {
          if (track.conditions.hasOwnProperty(k)) {
            const condition = track.conditions[k];
            conditions.push({
              comparison: condition.comparison,
              variable: condition.variable,
              values: condition.values
            });
          }
        }
      }

      customActions.push({
        $title: track.$title,
        category: track.settings.category,
        action: track.settings.action,
        conditions,
        type
      });
    }
  }

  return customActions;
}
