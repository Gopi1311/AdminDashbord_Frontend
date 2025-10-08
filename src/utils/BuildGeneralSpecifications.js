export const buildGeneralSpecifications = (
  data,
  colors,
  otherColors,
  isClothingCategory,
  sizes,
  material,
  clothingType
) => {
  const generalSpec = {};

  const allColors = [...(colors || [])];
  if (otherColors) {
    const additionalColors = otherColors
      .split(",")
      .map((color) => color.trim())
      .filter((color) => color);
    allColors.push(...additionalColors);
  }

  if (allColors.length > 0) {
    generalSpec.colors = allColors;
  }

  if (isClothingCategory()) {
    if (sizes && sizes.length > 0) {
      generalSpec.sizes = sizes;
    }
    if (material) {
      generalSpec.material = material;
    }
    if (clothingType) {
      generalSpec.type = clothingType;
    }
  }

  return Object.keys(generalSpec).length > 0 ? JSON.stringify(generalSpec) : "";
};
