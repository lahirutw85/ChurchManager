import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const memberSchema = z.object({
    // Personal
    memberNo: z.string().trim().min(1, "Member No is required"),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    dob: z.string().optional(), // YYYY-MM-DD (browser input)
    phone: z.string().trim().optional(),
    email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
    nicOrPassport: z.string().trim().optional(),

    // Address
    addressLine1: z.string().trim().optional(),
    addressLine2: z.string().trim().optional(),
    city: z.string().trim().optional(),
    country: z.string().trim().optional(),

    // Family
    householdName: z.string().trim().optional(),
    maritalStatus: z.enum(["Single", "Married", "Widowed", "Divorced"]).optional(),
    spouseName: z.string().trim().optional(),
    childrenCount: z.coerce.number().min(0).max(20).optional(),

    // Membership / Church
    memberStatus: z.enum(["Visitor", "Regular", "Member", "Inactive"]),
    joinedDate: z.string().optional(),
    baptismStatus: z.enum(["Not Baptized", "Baptized"]).optional(),
    baptismDate: z.string().optional(),
    previousChurch: z.string().trim().optional(),

    // Emergency
    emergencyName: z.string().trim().optional(),
    emergencyRelationship: z.string().trim().optional(),
    emergencyPhone: z.string().trim().optional(),

    // Notes
    notes: z.string().trim().max(2000).optional(),
}).superRefine((data, ctx) => {
    if (data.baptismStatus === "Baptized" && !data.baptismDate) {
        ctx.addIssue({
            code: "custom",
            message: "Baptism date is required when Baptized is selected.",
            path: ["baptismDate"],
        });
    }
});

type MemberFormValues = z.infer<typeof memberSchema>;

export const MemberCreatePage = () => {
    const navigate = useNavigate();

    const defaultValues: MemberFormValues = useMemo(
        () => ({
            memberNo: "",
            firstName: "",
            lastName: "",
            gender: undefined,
            dob: "",
            phone: "",
            email: "",
            nicOrPassport: "",

            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "UAE",

            householdName: "",
            maritalStatus: undefined,
            spouseName: "",
            childrenCount: 0,

            memberStatus: "Regular",
            joinedDate: "",
            baptismStatus: "Not Baptized",
            baptismDate: "",
            previousChurch: "",

            emergencyName: "",
            emergencyRelationship: "",
            emergencyPhone: "",

            notes: "",
        }),
        []
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<MemberFormValues>({
        defaultValues,
        resolver: zodResolver(memberSchema),
        mode: "onTouched",
    });

    const baptismStatus = watch("baptismStatus");

    async function onSubmit(values: MemberFormValues) {
        // TODO: replace with API call
        // await membersApi.create(values)
        console.log("CREATE MEMBER:", values);

        navigate("/members");
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Add Member</h1>
                    <p className="text-sm text-gray-500">
                        Create a new member profile for your church.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        form="add-member-form"
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-60"
                    >
                        {isSubmitting ? "Saving..." : "Save Member"}
                    </button>
                </div>
            </div>

            <form id="add-member-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <Section title="Personal Information" subtitle="Basic details for identification and contact.">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Field label="Member No *" error={errors.memberNo?.message}>
                            <input
                                {...register("memberNo")}
                                className={inputClass(errors.memberNo)}
                                placeholder="e.g. M-00021"
                            />
                        </Field>

                        <Field label="First Name *" error={errors.firstName?.message}>
                            <input
                                {...register("firstName")}
                                className={inputClass(errors.firstName)}
                                placeholder="e.g. Lahiru"
                            />
                        </Field>

                        <Field label="Last Name *" error={errors.lastName?.message}>
                            <input
                                {...register("lastName")}
                                className={inputClass(errors.lastName)}
                                placeholder="e.g. Perera"
                            />
                        </Field>

                        <Field label="Gender" error={errors.gender?.message}>
                            <select {...register("gender")} className={selectClass(errors.gender)}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </Field>

                        <Field label="Date of Birth" error={errors.dob?.message}>
                            <input {...register("dob")} type="date" className={inputClass(errors.dob)} />
                        </Field>

                        <Field label="NIC / Passport" error={errors.nicOrPassport?.message}>
                            <input
                                {...register("nicOrPassport")}
                                className={inputClass(errors.nicOrPassport)}
                                placeholder="Optional"
                            />
                        </Field>

                        <Field label="Phone" error={errors.phone?.message}>
                            <input
                                {...register("phone")}
                                className={inputClass(errors.phone)}
                                placeholder="+971..."
                            />
                        </Field>

                        <Field label="Email" error={errors.email?.message}>
                            <input
                                {...register("email")}
                                className={inputClass(errors.email)}
                                placeholder="name@email.com"
                            />
                        </Field>
                    </div>
                </Section>

                {/* Address */}
                <Section title="Address" subtitle="Used for visitation and communication.">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Address Line 1" error={errors.addressLine1?.message}>
                            <input {...register("addressLine1")} className={inputClass(errors.addressLine1)} />
                        </Field>

                        <Field label="Address Line 2" error={errors.addressLine2?.message}>
                            <input {...register("addressLine2")} className={inputClass(errors.addressLine2)} />
                        </Field>

                        <Field label="City" error={errors.city?.message}>
                            <input {...register("city")} className={inputClass(errors.city)} />
                        </Field>

                        <Field label="Country" error={errors.country?.message}>
                            <input {...register("country")} className={inputClass(errors.country)} />
                        </Field>
                    </div>
                </Section>

                {/* Family */}
                <Section title="Family" subtitle="Helps to group members into households.">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Field label="Household Name" error={errors.householdName?.message}>
                            <input
                                {...register("householdName")}
                                className={inputClass(errors.householdName)}
                                placeholder="e.g. Perera Family"
                            />
                        </Field>

                        <Field label="Marital Status" error={errors.maritalStatus?.message}>
                            <select {...register("maritalStatus")} className={selectClass(errors.maritalStatus)}>
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </Field>

                        <Field label="Children Count" error={errors.childrenCount?.message}>
                            <input
                                {...register("childrenCount")}
                                type="number"
                                min={0}
                                className={inputClass(errors.childrenCount)}
                            />
                        </Field>

                        <Field label="Spouse Name" error={errors.spouseName?.message}>
                            <input
                                {...register("spouseName")}
                                className={inputClass(errors.spouseName)}
                                placeholder="Optional"
                            />
                        </Field>
                    </div>
                </Section>

                {/* Church Info */}
                <Section title="Church Information" subtitle="Membership and spiritual milestones.">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Field label="Member Status *" error={errors.memberStatus?.message}>
                            <select {...register("memberStatus")} className={selectClass(errors.memberStatus)}>
                                <option value="Visitor">Visitor</option>
                                <option value="Regular">Regular</option>
                                <option value="Member">Member</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </Field>

                        <Field label="Joined Date" error={errors.joinedDate?.message}>
                            <input {...register("joinedDate")} type="date" className={inputClass(errors.joinedDate)} />
                        </Field>

                        <Field label="Baptism Status" error={errors.baptismStatus?.message}>
                            <select {...register("baptismStatus")} className={selectClass(errors.baptismStatus)}>
                                <option value="Not Baptized">Not Baptized</option>
                                <option value="Baptized">Baptized</option>
                            </select>
                        </Field>

                        <Field label="Baptism Date" error={errors.baptismDate?.message}>
                            <input
                                {...register("baptismDate")}
                                type="date"
                                disabled={baptismStatus !== "Baptized"}
                                className={[
                                    inputClass(errors.baptismDate),
                                    baptismStatus !== "Baptized" ? "bg-gray-100 cursor-not-allowed" : "",
                                ].join(" ")}
                            />
                            {baptismStatus !== "Baptized" && (
                                <p className="mt-1 text-xs text-gray-500">Enable by selecting “Baptized”.</p>
                            )}
                        </Field>

                        <Field label="Previous Church" error={errors.previousChurch?.message}>
                            <input
                                {...register("previousChurch")}
                                className={inputClass(errors.previousChurch)}
                                placeholder="Optional"
                            />
                        </Field>
                    </div>
                </Section>

                {/* Emergency */}
                <Section title="Emergency Contact" subtitle="Used if anything happens during events.">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Field label="Contact Name" error={errors.emergencyName?.message}>
                            <input {...register("emergencyName")} className={inputClass(errors.emergencyName)} />
                        </Field>

                        <Field label="Relationship" error={errors.emergencyRelationship?.message}>
                            <input
                                {...register("emergencyRelationship")}
                                className={inputClass(errors.emergencyRelationship)}
                                placeholder="e.g. Spouse / Brother / Parent"
                            />
                        </Field>

                        <Field label="Contact Phone" error={errors.emergencyPhone?.message}>
                            <input
                                {...register("emergencyPhone")}
                                className={inputClass(errors.emergencyPhone)}
                                placeholder="+971..."
                            />
                        </Field>
                    </div>
                </Section>

                {/* Notes */}
                <Section title="Notes" subtitle="Pastoral notes, follow-up, prayer needs (keep it private).">
                    <Field label="Notes" error={errors.notes?.message}>
                        <textarea
                            {...register("notes")}
                            className={[
                                "min-h-[120px]",
                                inputClass(errors.notes),
                            ].join(" ")}
                            placeholder="Write notes here..."
                        />
                    </Field>
                </Section>
            </form>
        </div>
    );
}

/** UI Helpers */

function Section({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6">
            <div className="mb-4">
                <h2 className="text-base font-semibold">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
            {children}
        </section>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            {children}
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}

function inputClass(err: unknown) {
    return [
        "w-full rounded-xl border px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-gray-300",
        err ? "border-red-300 focus:ring-red-200" : "border-gray-200",
    ].join(" ");
}

function selectClass(err: unknown) {
    return [
        "w-full rounded-xl border px-3 py-2 text-sm outline-none bg-white",
        "focus:ring-2 focus:ring-gray-300",
        err ? "border-red-300 focus:ring-red-200" : "border-gray-200",
    ].join(" ");
}
