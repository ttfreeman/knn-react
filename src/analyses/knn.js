import * as tf from "@tensorflow/tfjs";

export default function knn(features, labels, predictionPoint, k) {
  features = tf.tensor(features);
  labels = tf.tensor(labels);
  predictionPoint = tf.tensor(predictionPoint);

  const { mean, variance } = tf.moments(features, 0);
  const scaledPrediction = predictionPoint.sub(mean).div(variance.pow(0.5));

  return (
    features
      .sub(mean)
      .div(variance.pow(0.5))
      .sub(scaledPrediction)
      .pow(2)
      .sum(1)
      .pow(0.5)
      .expandDims(1)
      .concat(labels, 1)
      .unstack()
      .sort((a, b) => (a.get(0) > b.get(0) ? 1 : -1))
      .slice(0, k)
      .reduce((acc, element) => acc + element.get(1), 0) / k
  );
}
