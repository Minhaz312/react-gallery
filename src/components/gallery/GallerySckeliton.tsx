export default function GallerySckeliton() {
  return (
      <div className="bg-[#edf2f7] h-screen w-full px-14 py-5 overflow-hidden">
          <div className="w-full h-full overflow-auto bg-white rounded border px-10 py-6">
              {/* image selection header */}
              <div className="p-3 mb-5 border-b">
                  <h3 className="text-xl font-semibold text-primary">
                      Image Gallery
                  </h3>
              </div>
              <div className="grid grid-cols-10 grid-flow-row gap-10">
                  <div className="overflow-hidden aspect-square bg-slate-200 animate-pulse rounded p-3 border col-span-4 row-span-2 relative"></div>
                  {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((i) => (
                      <div
                          key={i}
                          className="group overflow-hidden bg-slate-100 rounded p-3 border col-span-2 relative aspect-square"
                      >
                          <div className="absolute z-30 bg-slate-900/10 group-hover:bg-slate-900/20 left-0 right-0 top-0 bottom-0 h-full w-full p-3"></div>
                      </div>
                  ))}
                  <div className="col-span-2 cursor-pointer border-2 border-primary hover:bg-primary/10 transition-all border-dashed rounded relative z-10">
                      <label className="absolute h-full w-full left-0 bottom-0 top-0 right-0 z-30 flex justify-center items-center">
                          <div className="">
                              <img
                                  src="/images/upload-icon.png"
                                  className="h-[50px] w-auto mx-auto"
                              />
                              <h3>Add Image</h3>
                          </div>
                          <input type="file" className="hidden" />
                      </label>
                  </div>
              </div>
          </div>
      </div>
  );
}
