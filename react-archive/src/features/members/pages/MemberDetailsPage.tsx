import { useParams, Link } from 'react-router-dom';
import { useMember } from '../hooks/useMembers';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Phone, Mail, Calendar, Users, Activity } from 'lucide-react';
import { useState } from 'react';

export const MemberDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: member, isLoading, error } = useMember(id || '');
    const [activeTab, setActiveTab] = useState('overview');

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading member details...</div>;
    if (error || !member) return <div className="p-8 text-center text-red-500">Member not found</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-4">
                <Link to="/members">
                    <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Members
                    </Button>
                </Link>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <User className="w-10 h-10" />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{member.firstName} {member.lastName}</h1>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" /> {member.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" /> {member.phone}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {member.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button>Log Interaction</Button>
                </div>
            </div>

            {/* Tabs Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="family">Family</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="giving">Giving</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-gray-400" /> Ministry Involvement
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Currently serving in: <span className="font-semibold text-gray-900">{member.ministry || 'None'}</span>
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-400" /> Key Dates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Date of Birth</span>
                                    <span>{member.dob || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Baptism Status / Date</span>
                                    <span>
                                        {member.baptismStatus === 'Baptized' 
                                            ? `Baptized (${member.baptismDate || 'Date missing'})` 
                                            : 'Not Baptized'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Joined Date</span>
                                    <span>{member.joinedDate || '-'}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="family">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-400" /> Household
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {member.householdName || member.spouseName ? (
                                <div className="space-y-3 text-sm">
                                    {member.householdName && (
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500 font-medium">Household Name</span>
                                            <span>{member.householdName}</span>
                                        </div>
                                    )}
                                    {member.spouseName && (
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500 font-medium">Spouse Name</span>
                                            <span>{member.spouseName}</span>
                                        </div>
                                    )}
                                    {member.childrenCount !== undefined && (
                                        <div className="flex justify-between pb-2">
                                            <span className="text-gray-500 font-medium">Children Count</span>
                                            <span>{member.childrenCount}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No family members linked yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="attendance">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8 text-gray-500">
                                Attendance data will appear here.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="giving">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8 text-gray-500">
                                Giving history is private.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
