import { useMembers } from '../hooks/useMembers';
import { Link } from 'react-router-dom';
import { MemberTable } from '../components/MemberTable';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

export const MembersListPage = () => {
    const { data: members = [], isLoading, error } = useMembers();

    if (error) return (
        <div className="p-8 text-center bg-red-50 text-red-600 rounded-lg border border-red-200">
            Error loading members. Please try again.
        </div>
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        <Users className="w-8 h-8 text-indigo-600" />
                        Members
                    </h1>
                    <p className="text-gray-500 mt-1">Manage and view your church members roster.</p>
                </div>
                <Link to="/members/new">
                    <Button size="lg">
                        <Plus className="mr-2 h-5 w-5" /> Add Member
                    </Button>
                </Link>
            </div>

            <MemberTable members={members} isLoading={isLoading} />
        </div>
    );
};
