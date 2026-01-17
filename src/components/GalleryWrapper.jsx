import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import GalleryGrid from "./Gallery";

export default async function GalleryWrapper() {
  await dbConnect();
  const imagesRes = await Gallery.find({});
  // convert to json
  const images = JSON.parse(JSON.stringify(imagesRes));

  return <GalleryGrid images={images} />;
}
