import { Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useFavorites } from "./zustandStore";

export function ImageCard({ photo, onOpen }) {
  const favorites = useFavorites((s) => s.items);
  const toggle = useFavorites((s) => s.toggle);
  const isFav = Boolean(favorites[photo.id]);

  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Flex cursor={"pointer"} onClick={() => onOpen(photo)}>
        <div
          className="relative group p-3 cursor-zoom-in overflow-hidden rounded-3xl shadow-sm border border-black/10"
          
          style={{ background: photo.color || "#eee" }}
        >
          
          <img
            src={photo.urls.small}
            alt={photo.alt_description || "Unsplash Photo"}
            loading="lazy"
            className="w-full h-auto block transition-transform group-hover:scale-[1.02]"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition">
            <div className="flex items-center gap-2 text-white drop-shadow">
              {photo.user?.profile_image?.small ? (
                <img
                  src={photo.user.profile_image.small}
                  className="w-6 h-6 rounded-full"
                />
              ) : null}
              <span className="text-xs font-medium">
                {photo.user?.name || photo.user?.username}
              </span>
            </div>
            <Button
              className={`text-xs bg-white/90 backdrop-blur hover:bg-white ${
                isFav ? "!bg-green-200" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggle(photo);
              }}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              {isFav ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </Flex>
    </motion.div>
  );
}
