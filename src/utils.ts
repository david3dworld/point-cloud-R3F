export function randomSamplingTypedArray(
  positionsArray,
  pointCount,
  itemSizePositions
) {
  const totalPoints = positionsArray.length / itemSizePositions;
  if (pointCount > totalPoints) {
    throw new Error("pointCount is too large for the provided arrays.");
  }

  const sampledPositions = new Float32Array(pointCount * itemSizePositions);

  // Reservoir sampling for positions and colors
  for (let i = 0; i < pointCount; i++) {
    for (let j = 0; j < itemSizePositions; j++) {
      sampledPositions[i * itemSizePositions + j] =
        positionsArray[i * itemSizePositions + j];
    }
  }

  // Process the rest of the elements
  for (let i = pointCount; i < totalPoints; i++) {
    const pos = Math.floor(Math.random() * (i + 1));
    if (pos < pointCount) {
      for (let j = 0; j < itemSizePositions; j++) {
        sampledPositions[pos * itemSizePositions + j] =
          positionsArray[i * itemSizePositions + j];
      }
    }
  }

  return sampledPositions;
}

export function randomSamplingTwoArrays(
  positionsArray,
  colorsArray,
  pointCount,
  itemSizePositions,
  itemSizeColors
) {
  const totalPoints = positionsArray.length / itemSizePositions;
  if (pointCount > totalPoints) {
    throw new Error("pointCount is too large for the provided arrays.");
  }

  const sampledPositions = new Float32Array(pointCount * itemSizePositions);
  const sampledColors = new Float32Array(pointCount * itemSizeColors);

  // Reservoir sampling for positions and colors
  for (let i = 0; i < pointCount; i++) {
    for (let j = 0; j < itemSizePositions; j++) {
      sampledPositions[i * itemSizePositions + j] =
        positionsArray[i * itemSizePositions + j];
    }
    for (let j = 0; j < itemSizeColors; j++) {
      sampledColors[i * itemSizeColors + j] =
        colorsArray[i * itemSizeColors + j];
    }
  }

  // Process the rest of the elements
  for (let i = pointCount; i < totalPoints; i++) {
    const pos = Math.floor(Math.random() * (i + 1));
    if (pos < pointCount) {
      for (let j = 0; j < itemSizePositions; j++) {
        sampledPositions[pos * itemSizePositions + j] =
          positionsArray[i * itemSizePositions + j];
      }
      for (let j = 0; j < itemSizeColors; j++) {
        sampledColors[pos * itemSizeColors + j] =
          colorsArray[i * itemSizeColors + j];
      }
    }
  }

  return { sampledPositions, sampledColors };
}
