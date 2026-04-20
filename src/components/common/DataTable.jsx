import { HiSearch } from 'react-icons/hi';

export default function DataTable({
  columns,
  data,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  actions,
  emptyMessage = 'No records found.',
}) {
  return (
    <div className="card overflow-hidden !rounded-2xl">
      {/* Search & Actions Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white/40">
        <div className="search-input w-full sm:w-80">
          <HiSearch />
          <input
            type="text"
            className="form-input !rounded-full !bg-white/60 !py-2"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {actions && <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">{actions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={col.width ? { width: col.width } : {}}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-16 text-slate-400"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-[0.95rem] font-semibold text-slate-600">{emptyMessage}</p>
                    <p className="text-sm font-medium text-slate-400">Try adjusting your filters or search query.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {data.length > 0 && (
        <div className="p-4 border-t border-slate-200/50 text-[0.8rem] font-medium text-slate-500 bg-white/30 flex justify-between items-center">
          <span>Showing <span className="font-bold text-slate-700">{data.length}</span> record{data.length !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
}
