import type { Member } from '../types';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type MemberTableProps = {
    members: Member[];
    isLoading: boolean;
};

export const MemberTable = ({ members, isLoading }: MemberTableProps) => {
    if (isLoading) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm border p-8 space-y-4">
                <div className="h-8 bg-gray-100 rounded animate-pulse w-full"></div>
                <div className="h-8 bg-gray-100 rounded animate-pulse w-full"></div>
                <div className="h-8 bg-gray-100 rounded animate-pulse w-full"></div>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Member</th>
                            <th className="p-4 font-semibold text-gray-600">Contact</th>
                            <th className="p-4 font-semibold text-gray-600">Ministry</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {members.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No members found.</td></tr>
                        ) : (
                            members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4">
                                        <Link to={`/members/${member.id}`} className="block">
                                            <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {member.firstName} {member.lastName}
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        <div className="flex flex-col">
                                            <span>{member.email}</span>
                                            <span className="text-xs text-gray-400">{member.phone}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {member.ministry ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {member.ministry}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            member.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                        )}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link to={`/members/${member.id}`}>
                                                <button className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
