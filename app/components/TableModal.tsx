interface TableData {
    id: number;
    [key: string]: string | number | boolean | null | undefined;
}

interface TableModalProps {
    isOpen: boolean;
    onClose: () => void;
    tableName: string;
    data: TableData[];
}

export function TableModal({ isOpen, onClose, tableName, data }: TableModalProps) {
    if (!isOpen) return null;

    // Get all unique columns from the data
    const columns = data.length > 0 
        ? Object.keys(data[0]).filter(key => key !== 'id')
        : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-xl w-11/12 max-w-6xl max-h-[90vh] flex flex-col">
                <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
                    <h2 className="text-xl font-bold">{tableName}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--hover-bg)] rounded-lg"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="overflow-auto flex-1 p-4">
                    <table className="w-full">
                        <thead className="border-b border-[var(--border)]">
                            <tr>
                                {columns.map((column) => (
                                    <th key={column} className="px-4 py-2 text-left">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id} className="border-b border-[var(--border)] hover:bg-[var(--hover-bg)]">
                                    {columns.map((column) => (
                                        <td key={column} className="px-4 py-2">
                                            {row[column]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
