import { useState } from "react";
import CheckBox from "../custom-component/CheckBox";

export default function GalleryItem({
    image,
    isSelected,
    onSelect,
    onDragStart,
    onDrop,
    onSelectToEdit,
    onSelectFeatured,
}: {
    image: { id: number; link: string };
    isSelected: Boolean;
    onSelect: Function;
    onDrop: Function;
    onDragStart: Function;
    onSelectToEdit?: Function;
    onSelectFeatured?: Function;
}) {
    const [dragStarted, setDragStarted] = useState(false);
    return (
        <>
            {dragStarted && (
                <div
                    className={` h-full w-full flex justify-between absolute select-none ${
                        dragStarted
                            ? "bg-transparent -z-10"
                            : "bg-slate-900/10 group-hover:bg-slate-900/20 z-30"
                    } left-0 right-0 top-0 bottom-0 p-3`}
                ></div>
            )}
            <div
                className={`w-full h-full group overflow-hidden select-none ${
                    dragStarted &&
                    "bg-primary p-3 md:p-8 border-4 cursor-grabbing"
                } rounded p-3 border relative`}
                onDragOver={(e) => {
                    console.log("drag over");
                    e.preventDefault();
                }}
            >
                <div
                    onDragStart={(e) => {
                        onDragStart(e, image);
                        setDragStarted(true);
                        console.log("drag start");
                    }}
                    onDragEnd={() => {
                        setDragStarted(false);
                        console.log("drag end");
                    }}
                    onDrop={() => {
                        console.log("on drop");
                        onDrop(image);
                    }}
                    draggable={true}
                >
                    <div
                        className={` h-full w-full flex justify-between absolute select-none ${
                            dragStarted
                                ? "bg-white -z-10"
                                : "bg-slate-900/10 group-hover:bg-slate-900/20 z-30"
                        } left-0 right-0 top-0 bottom-0 p-3`}
                    >
                        <div>
                            <CheckBox
                                isSelected={isSelected}
                                onSelect={() => onSelect(image)}
                            />
                        </div>
                        {!isSelected && !dragStarted && (
                            <div className="flex group-hover:mr-2 -mr-[200px] transition-[0.33s_all] flex-col gap-y-3">
                                <button
                                    onClick={() =>
                                        onSelectFeatured !== undefined &&
                                        onSelectFeatured(image)
                                    }
                                    disabled={isSelected ? true : false}
                                    className="bg-white rounded-full p-2"
                                >
                                    <img
                                        src="/images/feature-icon.svg"
                                        className="h-[15px] w-auto"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        onSelectToEdit !== undefined &&
                                        onSelectToEdit(image)
                                    }
                                    disabled={isSelected ? true : false}
                                    className="bg-white rounded-full p-2.5"
                                >
                                    <img
                                        src="/images/pencil-icon.svg"
                                        className="h-[15px] w-auto"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                    <img
                        src={image.link}
                        alt="gallery image"
                        className="group-hover:scale-125 select-none transition-[0.33s] z-10 h-auto w-full object-contain"
                    />
                </div>
            </div>
        </>
    );
}
