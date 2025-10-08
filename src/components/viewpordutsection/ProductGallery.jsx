export default function ProductGallery({
  images,
  selectedImage,
  onImageSelect,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Main Image */}
      <div className="flex-1">
        <img
          alt={images[selectedImage]?.alt}
          src={images[selectedImage]?.src}
          className="w-full h-[500px] lg:h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/600x600?text=Image+Not+Loaded";
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 lg:mt-0 lg:flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            alt={image.alt}
            src={image.src}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
              selectedImage === index
                ? "ring-2 ring-indigo-500"
                : "hover:opacity-75"
            }`}
            onClick={() => onImageSelect(index)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100x100?text=Error";
            }}
          />
        ))}
      </div>
    </div>
  );
}
