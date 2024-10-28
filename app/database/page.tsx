'use client';

import { useState } from 'react';
import { FiDatabase, FiSearch, FiRefreshCw, FiCheck, FiX, FiEye } from 'react-icons/fi';
import { TableModal } from '../components/TableModal';

interface DatabaseTable {
    name: string;
    status: 'Connected' | 'Disconnected';
    lastSync: string;
    location: string;
    type: string;
    data: (RequirementItem | TestCaseItem | ModuleItem)[];
}

interface TableData {
    id: number;
    [key: string]: string | number; // Index signature to allow any string keys
}

interface RequirementItem extends TableData {
    reqId: string;
    description: string;
    status: string;
    priority: string;
}

interface TestCaseItem extends TableData {
    testId: string;
    description: string;
    status: string;
    linkedReq: string;
}

interface ModuleItem extends TableData {
    moduleId: string;
    name: string;
    owner: string;
    status: string;
}

// Sample data with table contents
const initialTables: DatabaseTable[] = [
    {
        name: 'DOORS_Requirements',
        status: 'Connected',
        lastSync: '2024-01-28 13:45:00',
        location: 'C:/Program Files/IBM/Rational/DOORS/',
        type: 'Requirements',
        data: [
            { id: 1, reqId: 'REQ-001', description: 'System shall handle user authentication', status: 'Approved', priority: 'High' },
            { id: 2, reqId: 'REQ-002', description: 'System shall provide dark mode', status: 'In Review', priority: 'Medium' },
            { id: 3, reqId: 'REQ-003', description: 'System shall support multiple languages', status: 'Draft', priority: 'Low' },
        ]
    },
    {
        name: 'DOORS_TestCases',
        status: 'Connected',
        lastSync: '2024-01-28 13:45:00',
        location: 'C:/Program Files/IBM/Rational/DOORS/',
        type: 'Test Cases',
        data: [
            { id: 1, testId: 'TC-001', description: 'Verify user login', status: 'Passed', linkedReq: 'REQ-001' },
            { id: 2, testId: 'TC-002', description: 'Verify dark mode toggle', status: 'Failed', linkedReq: 'REQ-002' },
            { id: 3, testId: 'TC-003', description: 'Verify language switch', status: 'Not Run', linkedReq: 'REQ-003' },
        ]
    },
    {
        name: 'DOORS_Modules',
        status: 'Disconnected',
        lastSync: '2024-01-28 12:30:00',
        location: 'C:/Program Files/IBM/Rational/DOORS/',
        type: 'Modules',
        data: [
            { id: 1, moduleId: 'MOD-001', name: 'User Management', owner: 'John Doe', status: 'Active' },
            { id: 2, moduleId: 'MOD-002', name: 'Authentication', owner: 'Jane Smith', status: 'Active' },
            { id: 3, moduleId: 'MOD-003', name: 'Reporting', owner: 'Bob Johnson', status: 'Inactive' },
        ]
    }
];

export default function Database() {
    const [tables] = useState<DatabaseTable[]>(initialTables);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const handleViewTable = (table: DatabaseTable) => {
        setSelectedTable(table);
        setIsModalOpen(true);
    };

    const filteredTables = tables.filter(table =>
        Object.values(table).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FiDatabase className="text-3xl" />
                    <h1 className="text-3xl font-bold">DOORS Database Status</h1>
                </div>
                <button 
                    className={`btn-secondary flex items-center gap-2 ${isRefreshing ? 'opacity-50' : ''}`}
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <FiRefreshCw className={`${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh Status
                </button>
            </div>

            <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                    type="text"
                    placeholder="Search database tables..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--sidebar-bg)] border border-[var(--border)]
                             text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-4 text-left">Table Name</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Last Sync</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Type</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTables.map((table, index) => (
                            <tr 
                                key={index}
                                className="border-b border-[var(--border)] hover:bg-[var(--hover-bg)]"
                            >
                                <td className="px-6 py-4 font-medium">{table.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-2 ${
                                        table.status === 'Connected' 
                                            ? 'text-green-500' 
                                            : 'text-red-500'
                                    }`}>
                                        {table.status === 'Connected' ? (
                                            <FiCheck className="inline" />
                                        ) : (
                                            <FiX className="inline" />
                                        )}
                                        {table.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{table.lastSync}</td>
                                <td className="px-6 py-4">
                                    <span className="text-[var(--text-secondary)] text-sm">
                                        {table.location}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-sm rounded-full bg-[var(--hover-bg)]">
                                        {table.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleViewTable(table)}
                                        className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                                        disabled={table.status === 'Disconnected'}
                                    >
                                        <FiEye />
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedTable && (
                <TableModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    tableName={selectedTable.name}
                    data={selectedTable.data}
                />
            )}

            <div className="bg-[var(--sidebar-bg)] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Connection Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-[var(--text-secondary)]">Server Status</p>
                        <p className="text-green-500 flex items-center gap-2">
                            <FiCheck /> Connected
                        </p>
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)]">Last Update</p>
                        <p>{new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
