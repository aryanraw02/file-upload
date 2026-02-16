export default function DashboardSlotsLayout({ children, uploads, shared }) {
    return (
        <div className="p-6 h-full overflow-y-auto">
            <section className="mb-8">
                {children}
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface rounded-2xl border-background p-5 shadow-sm">
                    {uploads}
                </div>
                <div className="bg-surface rounded-2xl border-background p-5 shadow-sm">
                    {shared}
                </div>
            </div>
        </div>
    );
}