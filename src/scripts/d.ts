declare module "*.webp";

declare module "*.scss?url" {
  const url: string;
  export default url;
}
