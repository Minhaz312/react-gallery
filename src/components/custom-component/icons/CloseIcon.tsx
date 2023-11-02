export default function CloseIcon({height="10px",width="auto"}:{height?:string,width?:string}) {
  return (
    <img src='/images/close-icon.svg' className={`h-[${height}] w-[${width}]`} />
  )
}
