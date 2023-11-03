export default function GallerySckeliton() {
  return (
      <div className="bbg-[#edf2f7] h-screen w-full px-1 py-1 overflow-hidden sm:py-4 md:py-5 sm:px-4 md:px-6 lg:px-10 xl:px-14">
          <div className="w-full h-full overflow-auto bg-white rounded border p-3 py-2 md:px-10 sm:py-6">
              {/* image selection header */}
              <div className="grid grid-flow-row grid-cols-2 gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                  <div className="overflow-hidden aspect-square bg-slate-200 animate-pulse rounded p-3 border col-span-2 row-span-2 relative"></div>
                  {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((i) => (
                      <div
                          key={i}
                          className="group overflow-hidden bg-slate-100 rounded p-3 border relative aspect-square"
                      >
                          <div className="absolute z-30 bg-slate-900/10 group-hover:bg-slate-900/20 left-0 right-0 top-0 bottom-0 h-full w-full p-3"></div>
                      </div>
                  ))}
                  <div className="cursor-pointer border-2 border-primary hover:bg-primary/10 transition-all border-dashed rounded relative z-10">
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
