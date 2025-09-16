import { Dialog } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "../../translation/contextTranslation/ContextProvider";
import { useMainHook } from "../../lib/hooks/useMainHook";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  onSelectLocation?: (address: string) => void;
}

const LocationSelector = ({
  setMarker,
}: {
  setMarker: (latlng: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number } }) {
      setMarker(e.latlng);
    },
  });
  return null;
};

const MapModal = ({ open, onClose, onSelectLocation }: MapModalProps) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const { language } = useLanguage();
  const { t } = useMainHook();
  const handleSelect = async () => {
    if (marker) {
      const { lat, lng } = marker;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`
      );
      const data = await response.json();
      const address = data.display_name || `${lat}, ${lng}`;
      if (onSelectLocation) onSelectLocation(address);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          {t("Select School Location")}
        </h2>
        <div className="w-full h-[400px]">
          <MapContainer
            // @ts-ignore
            center={[24.7136, 46.6753]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              // @ts-ignore
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={` ${
                language == "ar"
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              } `}
            />
            <LocationSelector setMarker={setMarker} />
            {marker && <Marker position={[marker.lat, marker.lng]} />}
          </MapContainer>
        </div>

        <button
          onClick={handleSelect}
          className="mt-4 px-4 py-2 bg-[#0096FF] cursor-pointer text-white rounded"
          disabled={!marker}
        >
          {t("Confirm")}
        </button>
      </div>
    </Dialog>
  );
};

export default MapModal;
