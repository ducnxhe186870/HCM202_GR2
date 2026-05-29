export default function Footer() {
  return (
    <footer className="bg-[#0b0c10]/90 text-neutral-400 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-amber-900/20 text-xs">
      <div className="flex flex-wrap gap-2 items-center">
        <span>Tác phẩm bởi Nhóm 2 (Dev by: Nguyễn Xuân Đức - HE186870)</span>
      </div>

      <p className="flex items-center gap-1.5 text-neutral-500">
        Bấm giữ 
        <kbd className="px-1.5 py-0.5 text-[10px] text-neutral-800 font-bold bg-amber-500 rounded shadow-sm">Shift</kbd>
        + gõ lần lượt
        {['D', 'U', 'C'].map((key, i) => (
          <kbd key={i} className="px-1.5 py-0.5 text-[10px] text-neutral-800 font-bold bg-amber-500 rounded shadow-sm">
            {key}
          </kbd>
        ))}
        để mở bất ngờ
      </p>
    </footer>
  );
}
