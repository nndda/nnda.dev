declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.png";
declare module "*.avif";
declare module "*.webp";

declare module "*.scss?url" {
  const url: string;
  export default url;
}
