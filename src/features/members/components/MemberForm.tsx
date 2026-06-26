import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const memberSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    ministry: z.string().optional(),
});

type MemberFormData = z.infer<typeof memberSchema>;

export const MemberForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<MemberFormData>({
        resolver: zodResolver(memberSchema)
    });

    const onSubmit = (data: MemberFormData) => {
        console.log('Form data:', data);
        alert('Member saved (mock)! Check console for data.');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register('firstName')} placeholder="John" />
                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register('lastName')} placeholder="Doe" />
                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register('phone')} placeholder="123-456-7890" />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="ministry">Ministry (Optional)</Label>
                <Input id="ministry" {...register('ministry')} placeholder="Worship Team" />
            </div>

            <div className="pt-2">
                <Button type="submit" className="w-full sm:w-auto">Save Member</Button>
            </div>
        </form>
    );
};
