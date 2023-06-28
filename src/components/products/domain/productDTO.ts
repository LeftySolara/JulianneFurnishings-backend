interface ProductDTO {
  uuid: string;
  slug: string;
  name: string;
  description: string;
  regularPrice: number;
  salePrice: number | null;
  imageURL: string | null;
  category: string;
  subcategory: string;
  room: string | null;
  brand: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export { ProductDTO };
