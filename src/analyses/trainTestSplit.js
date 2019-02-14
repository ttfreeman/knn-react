import _ from "lodash";
import shuffleSeed from "shuffle-seed";

const extractColumns = (data, columnNames) => {
  const headers = _.first(data);

  const indexes = _.map(columnNames, column => headers.indexOf(column));
  const extracted = _.map(data, row => _.pullAt(row, indexes));

  return extracted;
};

export default function trainTestSplit(
  data,
  { featureColumns = [], labelColumns = [], shuffle = true, splitTest = false }
) {
  let labels = extractColumns(data, labelColumns);
  let features = extractColumns(data, featureColumns);

  labels.shift();
  features.shift();

  if (shuffle) {
    labels = shuffleSeed.shuffle(labels, 1);
    features = shuffleSeed.shuffle(features, 1);
  }

  if (splitTest) {
    const trainSize = _.isNumber(splitTest)
      ? splitTest
      : Math.floor(data.length / 2);
    return {
      features: features.slice(trainSize),
      labels: labels.slice(trainSize),
      testFeatures: features.slice(0, trainSize),
      testLabels: labels.slice(0, trainSize)
    };
  } else {
    return { features, labels };
  }
}
