import { useState, useEffect } from 'react';
import GalleryItem from '../components/gallery/GalleryItem';
import galleryList from './../data/imagelist.json'
import CheckBox from '../components/custom-component/CheckBox';
import GallerySckeliton from '../components/gallery/GallerySckeliton';
import ImageItem from '../utils/types/galleryImageTypes';
import Modal from '../components/custom-component/modal/Modal';

import AvatarEditor from "react-avatar-editor";

import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import {
    MdOutlineRotate90DegreesCcw,
    MdOutlineRotate90DegreesCw,
} from "react-icons/md";



export default function Home() {

    const [showEditImageModal, setShowEditImageModal] = useState<boolean>(false);

    const [loading, setLoading] = useState(true);
    const [imageList, setImageList] = useState<ImageItem[]>([]);
    const [featuredImage, setFeaturedImage] = useState<any>(null)
    const [featuredImageDragStarted, setFeaturedImageDragStarted] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState <ImageItem[]>([]);
    const [sourceItem, setSourceItem] = useState<ImageItem>()
    const [selectedEditableImage, setSelectedEditableImage] = useState<ImageItem>()

    // image edit state
    const [zoom, setZoom] = useState<number>(1)
    const [rotate, setRotate] = useState<number>(0)
    const [height, setHeight] = useState<number>(250)
    const [width, setWidth] = useState<number>(250)
    const [imageRound, setImageRound] = useState<number>(0);



    const handleSelectImage = (image:ImageItem) => {
        const index = selectedImage.findIndex(p=>p.id===image.id)
        if(index>-1){
            const newList = [...selectedImage];
            newList.splice(index,1);
            setSelectedImage(newList);
        }else{
            setSelectedImage(prev=>[...prev,image]);
        }
    }
    const handleDeleteSelectedImage = () => {
        if (selectedImage.length > 0) {
            let newList = [...imageList];
            selectedImage.map((item) => {
                if (item.id === featuredImage.id) {
                    for (let i = 0; i < imageList.length; i++) {
                        if (!selectedImage.includes(imageList[i])) {
                            setFeaturedImage(imageList[i]);
                            newList.splice(
                                newList.findIndex(
                                    (p) => p.id === imageList[i].id
                                ),
                                1
                            );
                            i = imageList.length;
                        }
                    }
                } else {
                    const index = newList.findIndex((p) => p.id === item.id);
                    newList.splice(index, 1);
                }
            });
            setImageList(newList);
            setSelectedImage([]);
        }
    };

    const handleAddNewImage = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (data) => {
            const src = data.target?.result;
            const newIndex = imageList[imageList.length - 1].id + 1;
            setImageList((il) => [...il, { id: newIndex, link: src }]);
        };
        reader.readAsDataURL(file);
    };

    const handleOnDrop = (image: ImageItem) => {
        setFeaturedImageDragStarted(false);
        if (sourceItem !== undefined) {
            if (sourceItem.id === featuredImage.id) {
                setFeaturedImage(image);
                let newImageList = [...imageList];
                newImageList[imageList.findIndex((p) => p.id === image.id)] =
                    featuredImage;
                setImageList(newImageList);
            } else {
                let newImageList = [...imageList];
                newImageList.splice(
                    imageList.findIndex((p) => p.id === sourceItem.id),
                    1,
                    {
                        id: image?.id,
                        link: image?.link,
                    }
                );
                newImageList.splice(
                    imageList.findIndex((p) => p.id === image.id),
                    1,
                    {
                        id: sourceItem?.id,
                        link: sourceItem?.link,
                    }
                );
                setImageList(newImageList);
            }
        }
    };

    const handleShowEditImageModal = (image: ImageItem) => {
        if (showEditImageModal) {
            setShowEditImageModal(false);
            setSelectedEditableImage({ id: -1, link: null });
        } else {
            setSelectedEditableImage(image);
            setShowEditImageModal(true);
        }
    };

    useEffect(() => {
        const list = [...galleryList];
        list.splice(0, 1);
        setImageList(list);
        setFeaturedImage(galleryList[0]);
        setLoading(false);
    }, []);

    if (loading) {
        return <GallerySckeliton />;
    }

    return (
        <div className="bg-[#edf2f7] h-screen w-full px-1 py-1 overflow-hidden sm:py-4 md:py-5 sm:px-4 md:px-6 lg:px-10 xl:px-14">
            {selectedEditableImage !== undefined && (
                <Modal
                    show={showEditImageModal}
                    title="Edit Image"
                    onHide={handleShowEditImageModal}
                >
                    <div className="w-full bg-slate-400 block md:flex flex-col-reverse">
                        <div className="w-full">
                            <AvatarEditor
                                image={selectedEditableImage.link}
                                width={width}
                                height={height}
                                border={50}
                                borderRadius={imageRound}
                                color={[0, 0, 0, 0.6]} // RGBA
                                scale={zoom}
                                rotate={rotate}
                            />
                        </div>
                        <div className="w-full flex gap-1 flex-wrap md:block md:w-[100px] bg-slate-100 p-1">
                            <div className="bg-white rounded mb-2">
                                <input
                                    type="number"
                                    defaultValue={height}
                                    className="w-full px-0.5 py-1 text-[13px]"
                                    placeholder="height"
                                    min={50}
                                    max={500}
                                    onChange={(e) =>
                                        setHeight(Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className="bg-white rounded mb-2">
                                <input
                                    type="number"
                                    defaultValue={width}
                                    className="w-full px-0.5 py-1 text-[13px]"
                                    placeholder="Width"
                                    min={50}
                                    max={500}
                                    onChange={(e) =>
                                        setWidth(Number(e.target.value))
                                    }
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
                            <div className="bg-white rounded flex justify-around mt-2">
                                <input
                                    type="number"
                                    className="w-full px-0.5 py-1 text-[13px]"
                                    placeholder="round"
                                    min={0}
                                    max={150}
                                    onChange={(e) =>
                                        setImageRound(Number(e.target.value))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="w-full h-full overflow-auto bg-white rounded border p-3 py-2 md:px-10 sm:py-6">
                {/* image selection header */}
                <div className="p-1 mb-5 border-b sm:p-3">
                    {selectedImage.length > 0 ? (
                        <div className="w-full flex justify-between">
                            <div className="flex items-center gap-x-2">
                                <CheckBox
                                    onSelect={() => setSelectedImage([])}
                                    isSelected={true}
                                />
                                <h3 className="text-base font-semibold text-slate-700 sm:text-xl md:text-2xl">
                                    {selectedImage.length} selected files
                                </h3>
                            </div>
                            <button
                                className="text-red-400 font-semibold bg-red-500/[0.05] hover:bg-red-500/10 transition-all rounded px-3 py-1"
                                onClick={handleDeleteSelectedImage}
                            >
                                Delete files
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <h3 className="text-base font-semibold text-violet-900 uppercase sm:text-xl md:text-2xl">
                                Image Gallery
                            </h3>
                            <label className="px-1.5 py-1 flex justify-center items-center bg-blue-400/10 hover:bg-blue-400/30 transition-all rounded">
                                <div className="flex items-center gap-x-2">
                                    <img
                                        src="/images/upload-icon.png"
                                        className="h-[20px] w-auto mx-auto"
                                    />
                                    <h3 className="text-[14px] text-blue-600 font-semibold">
                                        Add Image
                                    </h3>
                                </div>
                                <input
                                    type="file"
                                    onChange={handleAddNewImage}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                </div>
                <div className="grid grid-flow-row grid-cols-2 gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    <div className="group overflow-hidden rounded p-3 border col-span-2 row-span-2">
                        <div
                            className={`relative ${
                                featuredImageDragStarted
                                    ? "w-[50%] aspect-square"
                                    : "w-full"
                            }`}
                            draggable={true}
                            onDragStart={() => {
                                setSourceItem(featuredImage);
                                setFeaturedImageDragStarted(true);
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setFeaturedImageDragStarted(false);
                            }}
                            onDrop={() => {
                                if (sourceItem !== undefined) {
                                    let newImageList = [...imageList];
                                    newImageList.splice(
                                        imageList.findIndex(
                                            (p) => p.id === sourceItem.id
                                        ),
                                        1,
                                        featuredImage
                                    );
                                    setFeaturedImage(sourceItem);
                                    setSourceItem({ id: -1, link: null });
                                    setImageList(newImageList);
                                }
                            }}
                        >
                            <div className="absolute z-30 bg-slate-900/10 group-hover:bg-slate-900/20 left-0 right-0 top-0 bottom-0 h-full w-full p-3">
                                <CheckBox
                                    isSelected={
                                        selectedImage.findIndex(
                                            (p) => p.id === featuredImage.id
                                        ) > -1
                                    }
                                    onSelect={() =>
                                        handleSelectImage(featuredImage)
                                    }
                                />
                            </div>
                            <img
                                src={featuredImage.link}
                                alt="gallery image"
                                className="h-auto group-hover:scale-125 transition-[0.33s] z-10 w-full object-contain"
                            />
                        </div>
                    </div>
                    {imageList.map((image, i) => (
                        <GalleryItem
                            onDragStart={() => {
                                setSourceItem(image);
                            }}
                            onSelectToEdit={(image: ImageItem) =>
                                handleShowEditImageModal(image)
                            }
                            onSelectFeatured={(image: ImageItem) => {
                                let newList = [...imageList];
                                newList.splice(
                                    imageList.findIndex(
                                        (p) => p.id === image.id
                                    ),
                                    1,
                                    { ...featuredImage }
                                );
                                setFeaturedImage(image);
                                setImageList(newList);
                            }}
                            onDrop={(image: ImageItem) => handleOnDrop(image)}
                            key={i}
                            isSelected={
                                selectedImage.findIndex(
                                    (p) => p.id === image.id
                                ) > -1
                            }
                            onSelect={handleSelectImage}
                            image={image}
                        />
                    ))}
                    <div className="border-2 aspect-square hidden md:block border-primary hover:bg-primary/10 transition-all border-dashed rounded relative z-10">
                        <label className="absolute h-full w-full left-0 bottom-0 top-0 right-0 z-30 flex justify-center items-center">
                            <div className="">
                                <img
                                    src="/images/upload-icon.png"
                                    className="h-[50px] w-auto mx-auto"
                                />
                                <h3>Add Image</h3>
                            </div>
                            <input
                                type="file"
                                onChange={handleAddNewImage}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}