import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductLoading from "../components/viewpordutsection/ProductLoading";
import ProductError from "../components/viewpordutsection/ProductError";
import ProductHeader from "../components/viewpordutsection/ProductHeader";
import ProductGallery from "../components/viewpordutsection/ProductGallery";
import ProductInfo from "../components/viewpordutsection/ProductInfo";
import ProductDetails from "../components/viewpordutsection/ProductDetails";
import { BaseURL } from "../utils/BaseURL";

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(
          `${BaseURL}product/${id}`
        );
        const productData = result.data;
        const transformedProduct = transformProductData(productData);
        setProduct(transformedProduct);
        // Set default selections
        if (transformedProduct.colors.length > 0) {
          setSelectedColor(transformedProduct.colors[0].id);
        }
        if (transformedProduct.sizes.length > 0) {
          setSelectedSize(transformedProduct.sizes[0].id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Transform product data
  const transformProductData = (productData) => {
    const generalSpec = productData.general_spec || {};
    const highlights = productData.highlits?.highlits || [];

    // Calculate discounted price
    const originalPrice = parseFloat(productData.price);
    let discountedPrice = originalPrice;
    let discountAmount = 0;

    if (productData.discount_type && productData.discount_value) {
      const discountValue = parseFloat(productData.discount_value);
      if (productData.discount_type === "percentage") {
        discountAmount = (originalPrice * discountValue) / 100;
        discountedPrice = originalPrice - discountAmount;
      } else if (productData.discount_type === "flat") {
        discountAmount = discountValue;
        discountedPrice = originalPrice - discountAmount;
      }
    }

    return {
      id: productData.id,
      name: productData.product_name,
      price: originalPrice,
      discountedPrice: discountedPrice,
      discountAmount: discountAmount,
      brand: productData.brand,
      description: productData.description,
      highlights: highlights,
      category: productData.category_name,
      is_refurbished: productData.is_refurbished,
      stock_quantity: productData.stock_quantity,
      hasDiscount: productData.discount_type && productData.discount_value,
      discountType: productData.discount_type,
      discountValue: productData.discount_value,
      discountDesc: productData.discount_desc,
      couponCode: productData.coupon_code,
      minPurchase: productData.min_purchase,
      usageLimit: productData.limit,
      startDate: productData.start_date,
      endDate: productData.end_date,
      images: getProductImages(productData),
      colors: generalSpec.colors
        ? generalSpec.colors.map((color) => ({
            id: color.toLowerCase().replace(/\s+/g, "-"),
            name: color,
            value: color.toLowerCase(),
          }))
        : [],
      sizes: generalSpec.sizes
        ? generalSpec.sizes.map((size) => ({
            id: size,
            name: size,
            inStock: productData.stock_quantity > 0,
          }))
        : [],
      material: generalSpec.material,
      type: generalSpec.type,
      breadcrumbs: [
        { id: 1, name: "All Poducts", to: "/products" },
        {
          id: 2,
          name: productData.category_name,
          to: `/category/${productData.category_id}`,
        },
        { id: 3, name: productData.product_name, to: "/nopage" },
      ],
    };
  };

  // Handle product images
  const getProductImages = (productData) => {
    if (productData.product_image && productData.product_image.data) {
      try {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(productData.product_image.data))
        );
        return [
          {
            src: `data:image/jpeg;base64,${base64String}`,
            alt: productData.product_name,
          },
        ];
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }

    return [
      {
        src: "https://via.placeholder.com/600x600?text=No+Image",
        alt: productData.product_name,
      },
    ];
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    });
    alert("Product added to cart!");
  };

  if (loading) return <ProductLoading />;
  if (!product) return <ProductError />;

  return (
    <div className="bg-white ">
      <ProductHeader breadcrumbs={product.breadcrumbs} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:pt-10 lg:pb-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div>
            {/* Gallery */}
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
            />
            {/* Product Details full width below */}
            <div className="lg:mt-2">
              <ProductDetails product={product} />
            </div>
          </div>

          {/* Product Info + Stock */}
          <div className="mt-6 lg:mt-0 lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.stock_quantity > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-lg text-gray-600 mt-2">by {product.brand}</p>

            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              onColorSelect={setSelectedColor}
              onSizeSelect={setSelectedSize}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
