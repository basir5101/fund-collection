const ProgressBar = ({ stats }) => {
  const percentage = Math.min((stats.raised / stats.target) * 100, 100);

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-xl border border-rose-50">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-bold text-slate-700">
          সংগৃহীত: ৳{stats.raised.toLocaleString()}
        </span>
        <span className="text-slate-500">
          লক্ষ্য: ৳{stats.target.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mb-6">
        <div
          className="bg-rose-500 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-rose-50 rounded-lg">
          <p className="text-xs text-slate-500">এই সাইট থেকে</p>
          <p className="font-bold text-rose-600">
            ৳{stats.sources.website.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-pink-50 rounded-lg">
          <p className="text-xs text-slate-500">বিকাশ</p>
          <p className="font-bold text-pink-600">
            ৳{stats.sources.bkash.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-xs text-slate-500">রকেট</p>
          <p className="font-bold text-purple-600">
            ৳{stats.sources.rocket.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-slate-500">ব্যাংক</p>
          <p className="font-bold text-blue-600">
            ৳{stats.sources.bank.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
