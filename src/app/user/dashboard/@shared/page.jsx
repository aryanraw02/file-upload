import RecentSharedList from "@/components/RecentSharedList";

export default function SharedSlot() {
    return (
        <div>
            <h3 className="text-xl font-bold mb-4 text-text flex justify-center items-center">Recent Shared</h3>
            <RecentSharedList />
        </div>
    )
}