import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import {
    MdOutlineRotate90DegreesCcw,
    MdOutlineRotate90DegreesCw,
} from "react-icons/md";
import ImageItem from "../../utils/types/galleryImageTypes";

export default function EditImage({
    imageList,
    setImageList,
    selectedEditableImage,
}: {
    imageList: ImageItem[];
    setImageList: Function;
    selectedEditableImage: ImageItem;
}) {
    const editedImageRef = useRef<any>(null);

    const [changed, setChanged] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    // image edit state
    const [zoom, setZoom] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);
    const [height, setHeight] = useState<number>(250);
    const [width, setWidth] = useState<number>(250);

    const handleSaveEditedImage = () => {
        setSaving(true);
        if (editedImageRef.current) {
            const canvas = editedImageRef.current.getImage().toDataURL();
            fetch(canvas)
                .then((res) => res.blob())
                .then((blob) => {
                    const imageURL = window.URL.createObjectURL(blob);
                    console.log("edited: ", imageURL);
                    let newList = [...imageList];
                    if (selectedEditableImage) {
                        newList.splice(
                            imageList.findIndex(
                                (p) => p.id === selectedEditableImage.id
                            ),
                            1,
                            { id: selectedEditableImage.id, link: imageURL }
                        );
                    }
                    setImageList(newList);
                    setChanged(false);
                    setSaving(false);
                })
                .catch(() => {
                    setChanged(false);
                    setSaving(false);
                });
        }
    };

    return (
        <div className="w-full overflow-hidden bg-slate-100 block md:flex flex-col-reverse md:flex-row">
            <div className="w-full overflow-auto">
                <div className={`scale-[0.8] md:scale-[1] w-full h-full`}>
                    <AvatarEditor
                        ref={editedImageRef}
                        image={selectedEditableImage.link}
                        width={width}
                        height={height}
                        border={10}
                        color={[0, 0, 0, 0.6]} // RGBA
                        scale={zoom}
                        rotate={rotate}
                        onImageChange={() => setChanged(true)}
                    />
                </div>
            </div>
            <div className="w-full flex justify-between flex-col md:w-[100px] bg-slate-100 p-1">
                <div className="w-full grid grid-cols-3 gap-1 flex-wrap mb-3 md:grid-cols-1">
                    <div className="bg-white rounded">
                        <input
                            type="number"
                            defaultValue={height}
                            className="w-full px-1 py-1 text-[13px]"
                            placeholder="height"
                            min={50}
                            max={500}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                    </div>
                    <div className="bg-white rounded">
                        <input
                            type="number"
                            defaultValue={width}
                            className="w-full px-0.5 py-1 text-[13px]"
                            placeholder="Width"
                            min={50}
                            max={500}
                            onChange={(e) => setWidth(Number(e.target.value))}
                        />
                    </div>
                    <div className="bg-white rounded flex justify-around">
                        <button
                            className="px-2 py-2"
                            onClick={() => setZoom((z) => z + 0.1)}
                        >
                            <AiOutlineZoomIn />
                        </button>
                        <button
                            className="px-2 py-2"
                            onClick={() => setZoom((z) => z - 0.1)}
                        >
                            <AiOutlineZoomOut />
                        </button>
                    </div>
                    <div className="bg-white rounded flex justify-around mt-2">
                        <button
                            className="px-2 py-2"
                            onClick={() => setRotate((r) => r + 10)}
                        >
                            <MdOutlineRotate90DegreesCcw />
                        </button>
                        <button
                            className="px-2 py-2"
                            onClick={() => setRotate((r) => r - 10)}
                        >
                            <MdOutlineRotate90DegreesCw />
                        </button>
                    </div>
                </div>
                {changed && (
                    <button
                        onClick={handleSaveEditedImage}
                        className="px-1 py-0.5 text-sm bg-primary text-white font-semibold"
                    >
                        {saving ? "saving..." : "save"}
                    </button>
                )}
            </div>
        </div>
    );
}
