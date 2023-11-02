export default function CheckBox({isSelected,onSelect}:{isSelected:Boolean,onSelect:Function}) {
  return (
      <button
          className={`${
              isSelected ? "border-violet-700" : "border-transparent"
          } rounded-full border-2 p-1 checkbox-bg place-content-center`}
          onClick={() => onSelect()}
      >
          <div
              className={`h-[10px] w-[10px] rounded-full ${
                  isSelected ? `bg-violet-700` : "bg-slate-300"
              }`}
          ></div>
      </button>
  );
}
