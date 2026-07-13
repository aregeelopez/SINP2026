"use client";
export default function ShredModal({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border-t-4 border-red-600 text-center">
        <div className="text-4xl mb-4">🔥</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">SHRED & END SESSION?</h2>
        <p className="text-sm text-slate-500 mb-6 font-medium">This will permanently wipe all notes from memory. Nothing is saved. Are you sure?</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">CANCEL</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-200">SHRED IT</button>
        </div>
      </div>
    </div>
  );
}
