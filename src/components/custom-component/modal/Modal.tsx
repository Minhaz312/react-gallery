import React from 'react'
import CloseIcon from '../icons/CloseIcon';
export default function Modal({
    children,
    show,
    title,
    onHide,
}: {
    children: React.ReactNode,
    show:boolean,
    title: any,
    onHide: Function,
}) {
    if(show===false){
        return <></>
    }
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-ful h-screen p-5  bg-black/30 z-50 flex justify-center items-center">
            <div className="bg-white flex justify-between flex-col p-5 w-full max-h-[95%] overflow-hidden md:min-w-[400px] md:w-auto md:max-w-[60%] xl:max-w-[80%]">
                <div className="flex justify-between items-center mb-3 pb-3 border-b">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button onClick={() => onHide()}>
                        <CloseIcon height="15px" />
                    </button>
                </div>
                <div className=" h-auto w-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
