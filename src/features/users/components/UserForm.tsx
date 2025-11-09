import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateUserPayload } from '../../../api/api';



const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().optional(),
});


type FormValues = z.infer<typeof schema>;


export function UserForm({
    initialValues,
    onSubmit,
    submitLabel = 'Save',
}: {
    initialValues?: Partial<FormValues>;
    onSubmit: (values: CreateUserPayload) => void;
    submitLabel?: string;
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialValues as any,
    });


    return (
        <form onSubmit={handleSubmit(v => onSubmit(v))} className="space-y-3">
            <div>
                <label className="block text-sm">Email</label>
                <input {...register('email')} className="border p-2 w-full" />
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>


            <div>
                <label className="block text-sm">First name</label>
                <input {...register('firstName')} className="border p-2 w-full" />
                {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
            </div>


            <div>
                <label className="block text-sm">Last name</label>
                <input {...register('lastName')} className="border p-2 w-full" />
            </div>


            <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={isSubmitting}>
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}