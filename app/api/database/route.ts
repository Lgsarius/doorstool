import { NextResponse } from 'next/server';
import { getAllTables, getTableInfo } from '@/app/lib/db';

export async function GET() {
    try {
        const tables = await getAllTables();
        const tablesWithInfo = await Promise.all(
            tables.map(async (table: { name: string }) => {
                const info = await getTableInfo(table.name);
                return {
                    name: table.name,
                    ...info
                };
            })
        );

        return NextResponse.json({ tables: tablesWithInfo });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch database information' },
            { status: 500 }
        );
    }
}
